const {
    EmbedBuilder
} = require("discord.js");


const trainingDB =
    require("../database/trainingDatabase");



module.exports = async (interaction) => {


    try {



        // ===============================
        // ÚČAST
        // ===============================

        if(
            interaction.customId.startsWith(
                "trainingJoin_"
            )
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



            let field =
                embed.data.fields.find(
                    f =>
                    f.name === "👥 Účast"
                );



            let members =
                field.value === "Nikdo přihlášen"

                ? []

                : field.value.split("\n");



            const entry =
                `🪖 ${interaction.user.username}`;



            if(
                !members.includes(entry)
            ){

                members.push(entry);

            }



            field.value =
                members.join("\n");



            await interaction.update({

                embeds:[
                    embed
                ]

            });



            return;


        }







        // ===============================
        // ODHLÁŠENÍ
        // ===============================


        if(
            interaction.customId.startsWith(
                "trainingLeave_"
            )
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



            let field =
                embed.data.fields.find(
                    f =>
                    f.name === "👥 Účast"
                );



            let members =
                field.value === "Nikdo přihlášen"

                ? []

                : field.value.split("\n");



            members =
                members.filter(

                    m =>
                    m !==
                    `🪖 ${interaction.user.username}`

                );



            field.value =
                members.length

                ? members.join("\n")

                : "Nikdo přihlášen";



            await interaction.update({

                embeds:[
                    embed
                ]

            });



            return;


        }







        // ===============================
        // UKONČENÍ
        // ===============================


        if(
            interaction.customId.startsWith(
                "trainingClose_"
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
                    "❌ Pouze MILSIM může ukončit výcvik.",

                    ephemeral:true

                });


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
                "🔒 Výcvik uložen do archivu.",

                embeds:
                interaction.message.embeds,

                components:[]

            });



        }



    }
    catch(err){


        console.error(
            "❌ TRAINING BUTTON ERROR:"
        );


        console.error(err);



        if(
            !interaction.replied &&
            !interaction.deferred
        ){


            interaction.reply({

                content:
                "❌ Chyba při zpracování výcviku.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
