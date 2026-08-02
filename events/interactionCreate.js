module.exports = async (interaction, client) => {


    try {


        // ===============================
        // TLAČÍTKA
        // ===============================

        if (interaction.isButton()) {


            const recruitButtons = require(
                "../handlers/recruitButtons"
            );


            return await recruitButtons(
                interaction
            );


        }





        // ===============================
        // MODAL (PŘIHLÁŠKA)
        // ===============================

        if (interaction.isModalSubmit()) {


            const recruitModal = require(
                "../handlers/recruitModal"
            );


            return await recruitModal(
                interaction
            );


        }





        // ===============================
        // SLASH COMMANDY
        // ===============================

        if (!interaction.isChatInputCommand())
            return;



        const command =
            client.commands.get(
                interaction.commandName
            );



        if (!command)
            return;



        await command.execute(
            interaction
        );



    }
    catch (err) {


        console.error(
            "❌ INTERACTION CREATE ERROR:"
        );


        console.error(err);



        if (
            !interaction.replied &&
            !interaction.deferred
        ) {


            await interaction.reply({

                content:
                "❌ Nastala chyba při zpracování.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
