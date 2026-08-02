module.exports = async (interaction, client) => {


    try {


        // ===============================
        // TLAČÍTKA
        // ===============================

        if (interaction.isButton()) {


            console.log(
                "BUTTON:",
                interaction.customId
            );



            // OTEVŘÍT NÁBOROVÝ MODAL

            if (
                interaction.customId === "openRecruit"
            ) {


                const recruitOpen =
                    require(
                        "../handlers/recruitOpen"
                    );


                return await recruitOpen(
                    interaction
                );


            }





            // TLAČÍTKA V TICKETU

            const recruitButtons =
                require(
                    "../handlers/recruitButtons"
                );


            return await recruitButtons(
                interaction
            );


        }





        // ===============================
        // MODAL SUBMIT
        // ===============================

        if (
            interaction.isModalSubmit()
        ) {


            console.log(
                "MODAL:",
                interaction.customId
            );



            if (
                interaction.customId === "recruitModal"
            ) {


                const recruitModal =
                    require(
                        "../handlers/recruitModal"
                    );


                return await recruitModal(
                    interaction
                );


            }


        }





        // ===============================
        // SLASH COMMANDY
        // ===============================

        if (
            !interaction.isChatInputCommand()
        )
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





    } catch (err) {



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

                ephemeral: true

            }).catch(() => {});


        }



    }


};
