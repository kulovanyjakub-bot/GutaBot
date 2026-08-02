require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

// Načtení příkazů
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
    }
}

// Načtení eventů
const ready = require("./events/ready");
const interactionCreate = require("./events/interactionCreate");

client.once("clientReady", () => ready(client));
client.on("interactionCreate", (interaction) => interactionCreate(interaction, client));

client.login(process.env.TOKEN);
