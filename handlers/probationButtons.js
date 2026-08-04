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


            await interaction.deferReply();




            const userId =

                interaction.customId.replace(
                    "acceptMilsim_",
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







            // přidat MILSIM


            await member.roles.add(
                "1381662796646973542"
            );







            // přidat Vojín


            await member.roles.add(
                "1129066157425561601"
            );









            // databáze


            memberDB.updateMember(

                userId,

                {


                    role:"Milsim",


                    rank:"Vojín",


                    probation:false,


                    probationChecked:true,


                    milSimMemberSince:

                    new Date().toISOString()



                }

            );








            await interaction.editReply({


                content:


                `✅ ${member} byl přijat do GUTALAX MILSIM.\n\n` +

                `🎖 Hodnost: **Vojín**\n` +

                `🪖 Status: **MILSIM člen**`


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



            await interaction.deferReply({
                ephemeral:true
            });






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


                    probation:true,


                    probationChecked:false



                }

            );









            await interaction.editReply({


                content:

                "⏳ Zkušební doba byla prodloužena o 30 dní."



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



            await interaction.deferReply();






            const userId =

                interaction.customId.replace(
                    "rejectMilsim_",
                    ""
                );







            const member =

                await interaction.guild.members.fetch(
                    userId
                );









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









            await interaction.editReply({


                content:

                `❌ ${member} nebyl přijat do GUTALAX MILSIM.`


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
