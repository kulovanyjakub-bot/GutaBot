const {
    EmbedBuilder
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");



module.exports = async (interaction) => {


    try {



        // =================================
        // PŘIJMOUT MILSIM
        // =================================


        if(
            interaction.customId.startsWith(
                "acceptMilsim_"
            )
        ){



            const userId =

                interaction.customId.replace(

                    "acceptMilsim_",

                    ""

                );





            const member =

                await interaction.guild.members.fetch(

                    userId

                );







            // Odebrat Rekrut


            await member.roles.remove(

                "1458487234989654201"

            ).catch(()=>{});







            // Přidat MILSIM


            await member.roles.add(

                "1381662796646973542"

            );







            // Přidat hodnost Vojín


            await member.roles.add(

                "1129066157425561601"

            );








            // Aktualizace databáze


            memberDB.updateMember(

                userId,

                {


                    role:"Milsim",


                    rank:"Vojín",


                    probation:false,


                    milSimMemberSince:

                    new Date().toISOString(),


                    probationChecked:true



                }

            );









            await interaction.reply({



                content:


                `✅ ${member} byl přijat jako plnohodnotný člen GUTALAX MILSIM.\n\n` +

                `🎖 Hodnost: **Vojín**\n` +

                `🪖 Status: **MILSIM člen**`,



                ephemeral:false



            });







            return;


        }









        // =================================
        // PRODLOUŽIT ZKUŠEBNÍ DOBU
        // =================================


        if(
            interaction.customId.startsWith(
                "extendProbation_"
            )
        ){



            const userId =

                interaction.customId.replace(

                    "extendProbation_",

                    ""

                );







            const newDate =

                new Date();




            newDate.setDate(

                newDate.getDate() + 30

            );







            memberDB.updateMember(

                userId,

                {


                    milSimJoinDate:

                    newDate.toISOString(),


                    probationChecked:false



                }

            );







            await interaction.reply({



                content:


                "⏳ Zkušební doba byla prodloužena o 30 dní.",



                ephemeral:true



            });






            return;


        }









        // =================================
        // UKONČIT ČLENSTVÍ
        // =================================


        if(
            interaction.customId.startsWith(
                "rejectMilsim_"
            )
        ){



            const userId =

                interaction.customId.replace(

                    "rejectMilsim_",

                    ""

                );







            const member =

                await interaction.guild.members.fetch(

                    userId

                );








            // odebrat Rekrut


            await member.roles.remove(

                "1458487234989654201"

            ).catch(()=>{});








            memberDB.updateMember(

                userId,

                {


                    role:null,


                    rank:null,


                    probation:false,


                    probationChecked:true



                }

            );









            await interaction.reply({



                content:


                `❌ ${member} nebyl přijat do GUTALAX MILSIM.`,



                ephemeral:false



            });







            return;


        }







    }


    catch(err){



        console.error(

            "❌ PROBATION BUTTON ERROR:",

            err

        );





        if(

            !interaction.replied &&

            !interaction.deferred

        ){


            await interaction.reply({


                content:

                "❌ Chyba při zpracování zkušební doby.",


                ephemeral:true


            }).catch(()=>{});



        }



    }



};
