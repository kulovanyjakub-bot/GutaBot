const trainingButtons =
    require("../handlers/trainingButtons");


const missionButtons =
    require("../handlers/missionButtons");



module.exports = async (
    interaction
) => {



    // ===============================
    // BUTTONY
    // ===============================


    if(
        interaction.isButton()
    ){



        if(
            interaction.customId.startsWith("training")
        ){


            return trainingButtons(
                interaction
            );


        }




        if(
            interaction.customId.startsWith("mission")
        ){


            return missionButtons(
                interaction
            );


        }



    }






    // ===============================
    // SLASH COMMANDY
    // ===============================


    if(
        !interaction.isChatInputCommand()
    )
        return;




    const command =
        interaction.client.commands.get(
            interaction.commandName
        );



    if(!command)
        return;



    try{


        await command.execute(
            interaction
        );


    }
    catch(err){


        console.error(
            err
        );



        if(
            !interaction.replied
        ){


            await interaction.reply({

                content:
                "❌ Chyba při provádění příkazu.",

                ephemeral:true

            });


        }


    }


};
