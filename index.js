require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel
    ]
});

client.commands = new Collection();

// ---------- Načtení commandů ----------
const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    if (
        command.data &&
        command.execute
    ) {

        client.commands.set(
            command.data.name,
            command
        );

    }

}

// ---------- Ready ----------
client.once("ready", () => {

    console.log(`✅ Přihlášen jako ${client.user.tag}`);

});

// ---------- Interakce ----------
const interactionHandler = require("./events/interactionCreate");

client.on("interactionCreate", async (interaction) => {

    // Nejprve předáme tlačítka do interaction handleru
    if (interaction.isButton()) {
        return interactionHandler(interaction, client);
    }

    // Slash příkazy
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (err) {

        console.error(err);

        if (interaction.replied || interaction.deferred) {

            await interaction.followUp({
                content: "❌ Nastala chyba.",
                ephemeral: true
            });

        } else {

            await interaction.reply({
                content: "❌ Nastala chyba.",
                ephemeral: true
            });

        }

    }

});

client.login(process.env.TOKEN);
