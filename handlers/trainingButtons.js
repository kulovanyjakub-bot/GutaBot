const {
    EmbedBuilder
} = require("discord.js");


const trainingDB =
    require("../database/trainingDatabase");


const memberDB =
    require("../database/memberDatabase");


const rankChecker =
    require("./rankChecker");





module.exports = async (interaction) => {


    try {


        console.log(
            "TRAINING BUTTON:",
            interaction.customId
        );





        // ==================================
        // ÚČAST NA VÝCVIKU
        // ==================================


        if(
            interaction.customId.startsWith("trainingJoin_")
        ){


            const trainingId =
                interaction.customId.replace(
                    "trainingJoin_",
                    ""
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





            const embed =
                EmbedBuilder.from(

                    interaction.message.embeds[0]

                );





            const field =
                embed.data.fields.find(

                    f =>
                    f.name === "👥 Účast"

                );





            if(field){


                let users =

                    field.value === "Nikdo přihlášen"

                    ?

                    []

                    :

                    field.value.split("\n");





                const entry =

                    `🪖 ${interaction.user.username}`;





                if(
                    !users.includes(entry)
                ){

                    users.push(entry);

                }





                field.value =

                    users.join("\n");


            }





            await interaction.update({

                embeds:[

                    embed

                ]

            });





            return;


        }









        // ==================================
        // ODHLÁŠENÍ Z VÝCVIKU
        // ==================================


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







            const embed =

                EmbedBuilder.from(

                    interaction.message.embeds[0]

                );






            const field =

                embed.data.fields.find(

                    f =>
                    f.name === "👥 Účast"

                );







            if(field){



                let users =


                    field.value === "Nikdo přihlášen"


                    ?

                    []


                    :


                    field.value.split("\n");







                users =

                    users.filter(

                        u =>

                        u !==

                        `🪖 ${interaction.user.username}`

                    );







                field.value =


                    users.length


                    ?


                    users.join("\n")


                    :


                    "Nikdo přihlášen";



            }







            await interaction.update({

                embeds:[

                    embed

                ]

            });







            return;


        }









        // ==================================
        // UKONČENÍ VÝCVIKU
        // ==================================


        if(
            interaction.customId.startsWith("trainingClose_")
        ){





            const milsimRole =

                "1381662796646973542";







            if(

                !interaction.member.roles.cache.has(

                    milsimRole

                )

            ){


                return interaction.reply({

                    content:

                    "❌ Pouze MILSIM může ukončit výcvik.",


                    ephemeral:true


                });


            }








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

                "UKONČUJI VÝCVIK:",

                training

            );







            if(training){



                for(

                    const member of training.participants

                ){



                    console.log(

                        "PŘIDÁVÁM VÝCVIK:",

                        member.id,

                        member.username

                    );







                    memberDB.addTraining(

                        member.id,

                        member.username

                    );








                    // ===============================
                    // KONTROLA POVÝŠENÍ
                    // ===============================


                    try{



                        const discordMember =

                            await interaction.guild.members.fetch(

                                member.id

                            );





                        await rankChecker(

                            discordMember,

                            interaction.guild

                        );



                    }

                    catch(err){


                        console.error(

                            "Rank check error:",

                            err

                        );


                    }





                }



            }









            const archive =


                interaction.guild.channels.cache.get(

                    "1533504495437353120"

                );







            if(archive){



                await archive.send({

                    embeds:

                    interaction.message.embeds


                });


            }








            await interaction.update({


                content:

                "🔒 Výcvik ukončen. Statistiky účastníků aktualizovány.",



                embeds:

                interaction.message.embeds,



                components:[]



            });







            return;


        }








    }

    catch(err){



        console.error(

            "❌ TRAINING BUTTON ERROR:",

            err

        );






        if(

            !interaction.replied &&

            !interaction.deferred

        ){



            await interaction.reply({

                content:

                "❌ Chyba při zpracování výcviku.",


                ephemeral:true


            }).catch(()=>{});



        }


    }



};
