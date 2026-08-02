require("dotenv").config();


const fs = require("fs");
const path = require("path");


const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require("discord.js");



// VYTVOŘENÍ BOTA

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




// NAČTENÍ COMMANDŮ

const commandsPath = path.join(
    __dirname,
    "commands"
);


if (fs.existsSync(commandsPath)) {


    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(
            file => file.endsWith(".js")
        );


    for (const file of commandFiles) {


        const command = require(
            path.join(commandsPath, file)
        );


        if (
            command.data &&
            command.execute
        ) {


            client.commands.set(
                command.data.name,
                command
            );


            console.log(
                `✅ Načten command: ${command.data.name}`
            );


        }


    }


}




// READY

client.once(
    "ready",
    () => {


        console.log(
            `✅ Přihlášen jako ${client.user.tag}`
        );


    }
);





// EVENTY

const interactionHandler = require(
    "./events/interactionCreate"
);





client.on(
    "interactionCreate",
    async (interaction) => {


        try {



            // BUTTONY + MODALY

            if (

                interaction.isButton() ||

                interaction.isModalSubmit()

            ) {


                return await interactionHandler(
                    interaction,
                    client
                );


            }





            // SLASH COMMANDY

            if (
                !interaction.isChatInputCommand()
            )
                return;





            const command = client.commands.get(
                interaction.commandName
            );



            if (!command)
                return;




            await command.execute(
                interaction,
                client
            );





        } catch (err) {


            console.error(
                "❌ Interaction error:",
                err
            );



            if (
                interaction.replied ||
                interaction.deferred
            ) {


                await interaction.followUp({

                    content:
                    "❌ Nastala chyba.",

                    ephemeral:true

                });



            } else {



                await interaction.reply({

                    content:
                    "❌ Nastala chyba.",

                    ephemeral:true

                });



            }


        }


    }
);






// LOGIN

client.login(
    process.env.TOKEN
);
