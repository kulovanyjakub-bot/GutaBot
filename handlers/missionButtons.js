const {
    EmbedBuilder
} = require("discord.js");


const missionDB =
    require("../database/missionDatabase");


const memberDB =
    require("../database/memberDatabase");


const rankChecker =
    require("../utils/rankChecker");





module.exports = async (interaction) => {


    try {



        console.log(
            "MISSION BUTTON:",
            interaction.customId
        );







        // =================================
        // PŘIHLÁŠENÍ NA MISI
        // =================================


        if(
            interaction.customId.startsWith(
                "missionJoin_"
            )
        ){



            const missionId =
                interaction.customId.replace(
                    "missionJoin_",
                    ""
                );




            missionDB.addParticipant(

                missionId,

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








            const entry =

                `🪖 ${interaction.user.username}`;







            if(
                !users.includes(entry)
            ){


                users.push(entry);


            }







            field.value =

                users.join("\n");







            await interaction.update({

                embeds:[

                    embed

                ]

            });





            return;


        }









        // =================================
        // ODHLÁŠENÍ Z MISE
        // =================================


        if(
            interaction.customId.startsWith(
                "missionLeave_"
            )
        ){



            const missionId =
                interaction.customId.replace(
                    "missionLeave_",
                    ""
                );





            missionDB.removeParticipant(

                missionId,

                interaction.user.id

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







            await interaction.update({

                embeds:[

                    embed

                ]

            });






            return;


        }









        // =================================
        // UKONČENÍ MISE
        // =================================


        if(
            interaction.customId.startsWith(
                "missionClose_"
            )
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
                    "❌ Pouze MILSIM může ukončit misi.",


                    ephemeral:true


                });


            }







            const missionId =

                interaction.customId.replace(

                    "missionClose_",

                    ""

                );








            const mission =

                missionDB.getMission(

                    missionId

                );







            console.log(

                "UKONČUJI MISI:",

                mission

            );








            if(mission){



                console.log(

                    "ÚČASTNÍCI MISE:",

                    mission.participants

                );





                for(
                    const member of mission.participants
                ){





                    console.log(

                        "PŘIDÁVÁM MISI:",

                        member.id,

                        member.username

                    );







                    memberDB.addMission(

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



                        await rankChecker.checkRank(

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

                    "1533538567756972163"

                );







            if(archive){



                await archive.send({

                    embeds:

                    interaction.message.embeds


                });


            }









            await interaction.update({

                content:

                "🔒 Mise ukončena. Statistiky účastníků aktualizovány.",



                embeds:

                interaction.message.embeds,



                components:[]

            });







            return;


        }






    }


    catch(err){



        console.error(

            "❌ MISSION BUTTON ERROR:",

            err

        );




        if(

            !interaction.replied &&

            !interaction.deferred

        ){


            await interaction.reply({

                content:

                "❌ Chyba při zpracování mise.",


                ephemeral:true


            }).catch(()=>{});



        }



    }



};
