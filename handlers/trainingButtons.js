const {
    EmbedBuilder
} = require("discord.js");


const trainingDB =
    require("../database/trainingDatabase");


const memberDB =
    require("../database/memberDatabase");



module.exports = async (interaction) => {


    try {


        console.log(
            "TRAINING BUTTON:",
            interaction.customId
        );



        // ÚČAST


        if(
            interaction.customId.startsWith("trainingJoin_")
        ){


            const trainingId =
                interaction.customId.replace(
                    "trainingJoin_",
                    ""
                );



            console.log(
                "PŘIHLAŠUJI NA VÝCVIK:",
                trainingId,
                interaction.user.id
            );



            trainingDB.addParticipant(

                trainingId,

                {

                    id:
                    interaction.user.id,


                    username:
                    interaction.user.username

                }

            );



            console.log(
                "DB VÝCVIKY:",
                trainingDB.getTrainings()
            );





            const embed =
                EmbedBuilder.from(
                    interaction.message.embeds[0]
                );



            let field =
                embed.data.fields.find(

                    f =>
                    f.name === "👥 Účast"

                );



            let users =
                field.value === "Nikdo přihlášen"

                ?

                []

                :

                field.value.split("\n");



            users.push(
                `🪖 ${interaction.user.username}`
            );



            field.value =
                users.join("\n");





            await interaction.update({

                embeds:[
                    embed
                ]

            });



            return;

        }






        // ODHLÁŠENÍ


        if(
            interaction.customId.startsWith("trainingLeave_")
        ){


            const trainingId =
                interaction.customId.replace(
                    "trainingLeave_",
                    ""
                );



            trainingDB.removeParticipant(

                trainingId,

                interaction.user.id

            );



            await interaction.update({

                embeds:
                interaction.message.embeds

            });



            return;

        }






        // UKONČENÍ


        if(
            interaction.customId.startsWith("trainingClose_")
        ){


            const trainingId =
                interaction.customId.replace(
                    "trainingClose_",
                    ""
                );



            const training =
                trainingDB.getTraining(
                    trainingId
                );



            console.log(
                "UKONČUJI:",
                training
            );



            if(training){


                for(
                    const member of training.participants
                ){


                    console.log(
                        "PŘIDÁVÁM VÝCVIK:",
                        member.id
                    );


                    memberDB.addTraining(
                        member.id
                    );


                }


            }



            await interaction.update({

                content:
                "🔒 Výcvik ukončen. Statistiky aktualizovány.",

                embeds:
                interaction.message.embeds,

                components:[]

            });



        }



    }
    catch(err){


        console.error(
            "TRAINING ERROR:",
            err
        );


    }


};
