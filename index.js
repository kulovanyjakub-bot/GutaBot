require("dotenv").config();


const fs = require("fs");
const path = require("path");


const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require("discord.js");




// ==========================
// VYTVOŘENÍ CLIENTA
// ==========================


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





// ==========================
// NAČTENÍ COMMANDŮ
// ==========================


const commandsPath = path.join(
    __dirname,
    "commands"
);




if(fs.existsSync(commandsPath)){


    const commandFiles = fs

        .readdirSync(commandsPath)

        .filter(

            file =>

            file.endsWith(".js")

        );





    for(const file of commandFiles){



        const command = require(

            path.join(

                commandsPath,

                file

            )

        );





        if(

            command.data &&

            command.execute

        ){



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








// ==========================
// NAČTENÍ EVENTŮ
// ==========================


const eventsPath = path.join(

    __dirname,

    "events"

);





if(fs.existsSync(eventsPath)){



    const eventFiles = fs

        .readdirSync(eventsPath)

        .filter(

            file =>

            file.endsWith(".js")

        );







    for(const file of eventFiles){



        const event = require(

            path.join(

                eventsPath,

                file

            )

        );






        if(event.name){



            client.on(

                event.name,

                (...args) =>

                event.execute(...args)

            );






            console.log(

                `✅ Načten event: ${event.name}`

            );



        }



    }



}









// ==========================
// READY
// ==========================


client.once(

    "ready",

    () => {


        console.log(

            `✅ Přihlášen jako ${client.user.tag}`

        );


    }


);









// ==========================
// INTERACTION HANDLER
// ==========================


const interactionHandler = require(

    "./events/interactionCreate"

);






client.on(

    "interactionCreate",

    async (interaction) => {



        try {




            // BUTTONY + MODALY


            if(


                interaction.isButton() ||


                interaction.isModalSubmit()


            ){



                return await interactionHandler(

                    interaction,

                    client

                );


            }








            // SLASH COMMANDY


            if(

                !interaction.isChatInputCommand()

            )

                return;







            const command =

                client.commands.get(

                    interaction.commandName

                );







            if(!command)

                return;








            await command.execute(

                interaction,

                client

            );






        }



        catch(error){



            console.error(

                "❌ Interaction error:",

                error

            );






            if(

                interaction.replied ||

                interaction.deferred

            ){



                await interaction.followUp({

                    content:

                    "❌ Nastala chyba.",


                    ephemeral:true


                }).catch(()=>{});



            }

            else {



                await interaction.reply({


                    content:

                    "❌ Nastala chyba.",


                    ephemeral:true



                }).catch(()=>{});



            }



        }



    }


);









// ==========================
// CHYBY
// ==========================


client.on(

    "error",

    console.error

);









// ==========================
// LOGIN
// ==========================


client.login(

    process.env.TOKEN

);
