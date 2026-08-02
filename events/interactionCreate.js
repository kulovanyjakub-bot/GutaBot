module.exports = async (interaction, client) => {

    try {


        console.log(
            "INTERACTION:",
            interaction.type,
            interaction.customId || interaction.commandName
        );



        // ===============================
        // TLAČÍTKA
        // ===============================

        if (interaction.isButton()) {


            console.log(
                "BUTTON:",
                interaction.customId
            );



            // Otevření náborového formuláře

            if (
                interaction.customId === "openRecruit"
            ) {


                const recruitModal = require(
                    "../handlers/recruitModal"
                );


                return await recruitModal(
                    interaction
                );

            }




            const recruitButtons = require(
                "../handlers/recruitButtons"
            );


            return await recruitButtons(
                interaction
            );


        }





        // ===============================
        // MODAL
        // ===============================

        if (interaction.isModalSubmit()) {


            console.log(
                "MODAL:",
                interaction.customId
            );



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



    } catch(err) {


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
