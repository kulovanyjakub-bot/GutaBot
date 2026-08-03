const recruitButtons =
    require("../handlers/recruitButtons");


const missionButtons =
    require("../handlers/missionButtons");


const trainingButtons =
    require("../handlers/trainingButtons");


const probationButtons =
    require("../handlers/probationButtons");


const openRecruit =
    require("../handlers/openRecruit");


const recruitModal =
    require("../handlers/recruitModal");








module.exports = async (interaction, client) => {


    try {



        // ===============================
        // BUTTONY
        // ===============================


        if(interaction.isButton()){





            // ===============================
            // OTEVŘENÍ NÁBORU
            // ===============================


            if(

                interaction.customId ===
                "openRecruit"

            ){


                return openRecruit(
                    interaction
                );


            }








            // ===============================
            // NÁBOR
            // ===============================


            if(

                interaction.customId.startsWith(
                    "acceptRecruit_"
                )

                ||

                interaction.customId.startsWith(
                    "interviewRecruit_"
                )

                ||

                interaction.customId.startsWith(
                    "rejectRecruit_"
                )

            ){


                return recruitButtons(
                    interaction
                );


            }








            // ===============================
            // MISE
            // ===============================


            if(

                interaction.customId.startsWith(
                    "missionJoin_"
                )

                ||

                interaction.customId.startsWith(
                    "missionLeave_"
                )

                ||

                interaction.customId.startsWith(
                    "missionClose_"
                )

            ){


                return missionButtons(
                    interaction
                );


            }








            // ===============================
            // VÝCVIK
            // ===============================


            if(

                interaction.customId.startsWith(
                    "trainingJoin_"
                )

                ||

                interaction.customId.startsWith(
                    "trainingLeave_"
                )

                ||

                interaction.customId.startsWith(
                    "trainingClose_"
                )

            ){


                return trainingButtons(
                    interaction
                );


            }








            // ===============================
            // ZKUŠEBNÍ DOBA MILSIM
            // ===============================


            if(

                interaction.customId.startsWith(
                    "acceptMilsim_"
                )

                ||

                interaction.customId.startsWith(
                    "extendProbation_"
                )

                ||

                interaction.customId.startsWith(
                    "rejectMilsim_"
                )

            ){


                return probationButtons(
                    interaction
                );


            }








            return;


        }









        // ===============================
        // MODALY
        // ===============================


        if(interaction.isModalSubmit()){



            if(

                interaction.customId ===
                "recruitForm"

            ){


                return recruitModal(
                    interaction
                );


            }





            return;


        }









        // ===============================
        // SLASH COMMANDY
        // ===============================


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


    catch(err){



        console.error(

            "❌ INTERACTION CREATE ERROR:",

            err

        );







        if(

            !interaction.replied &&

            !interaction.deferred

        ){



            await interaction.reply({


                content:

                "❌ Nastala chyba při zpracování.",


                ephemeral:true



            }).catch(()=>{});



        }



    }



};
