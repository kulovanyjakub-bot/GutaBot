const interactionHandler = require("./events/interactionCreate");


client.on(
    "interactionCreate",
    async (interaction) => {


        if (
            interaction.isButton() ||
            interaction.isModalSubmit()
        ) {

            return interactionHandler(
                interaction,
                client
            );

        }


        if (!interaction.isChatInputCommand())
            return;



        const command = client.commands.get(
            interaction.commandName
        );


        if (!command)
            return;



        try {

            await command.execute(
                interaction
            );


        } catch(err) {

            console.error(err);


            if (
                interaction.replied ||
                interaction.deferred
            ) {


                await interaction.followUp({

                    content:"❌ Nastala chyba.",

                    ephemeral:true

                });


            } else {


                await interaction.reply({

                    content:"❌ Nastala chyba.",

                    ephemeral:true

                });


            }

        }


    }
);
