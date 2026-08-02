const {
    EmbedBuilder
} = require("discord.js");


module.exports = async (interaction) => {


    try {


        // ===============================
        // PŘIJMOUT REKRUTA
        // ===============================

        if (interaction.customId.startsWith("acceptRecruit_")) {


            const userId = interaction.customId.replace(
                "acceptRecruit_",
                ""
            );


            const member =
                await interaction.guild.members.fetch(userId);



            // Přidání role Rekrut

            await member.roles.add(
                "1458487234989654201"
            );



            // Přejmenování ticketu

            await interaction.channel.setName(
                `rekrut-${member.user.username}`
            ).catch(() => {});





            // ===============================
            // LOG NÁBORU
            // ===============================


            const logChannel =
                interaction.guild.channels.cache.get(
                    "1533447352684380361"
                );



            const logEmbed = new EmbedBuilder()

                .setColor("Green")

                .setTitle("✅ Rekrut přijat")

                .addFields(

                    {
                        name: "Uchazeč",
                        value: `${member}`,
                        inline: true
                    },


                    {
                        name: "Přijal",
                        value: `${interaction.user}`,
                        inline: true
                    },


                    {
                        name: "Role",
                        value: "<@&1458487234989654201>",
                        inline: true
                    }

                )

                .setTimestamp();





            if (logChannel) {


                await logChannel.send({

                    embeds: [
                        logEmbed
                    ]

                });


            } else {


                console.log(
                    "❌ Nenašel se log kanál"
                );


            }







            // Upravení ticket zprávy

            const embed = new EmbedBuilder()

                .setColor("Green")

                .setTitle("✅ Rekrut přijat")

                .setDescription(
`${member} byl přijat do **GUTALAX MILSIM**.

🎖 Byla mu přidělena role **Rekrut**.
Vítej v jednotce!`
                )

                .addFields(

                    {
                        name: "Přijal",
                        value: `${interaction.user}`
                    }

                )

                .setTimestamp();





            await interaction.update({

                content: null,

                embeds: [
                    embed
                ],

                components: []

            });



            return;

        }








        // ===============================
        // POHOVOR
        // ===============================

        if (interaction.customId.startsWith("interviewRecruit_")) {



            const userId = interaction.customId.replace(
                "interviewRecruit_",
                ""
            );



            const member =
                await interaction.guild.members.fetch(userId);




            await interaction.reply({

                content:
`🎤 **Pohovor požaduje ${member}**

<@&1533447617957073117>

Náborář prosím zahajte pohovor s uchazečem.`,

                allowedMentions: {

                    users: [
                        member.id
                    ],

                    roles: [
                        "1533447617957073117"
                    ]

                }

            });



            return;

        }








        // ===============================
        // ODMÍTNOUT
        // ===============================

        if (interaction.customId.startsWith("rejectRecruit_")) {



            const userId = interaction.customId.replace(
                "rejectRecruit_",
                ""
            );



            const member =
                await interaction.guild.members.fetch(userId);




            const logChannel =
                interaction.guild.channels.cache.get(
                    "1533447352684380361"
                );



            const logEmbed = new EmbedBuilder()

                .setColor("Red")

                .setTitle("❌ Uchazeč odmítnut")

                .addFields(

                    {
                        name: "Uchazeč",
                        value: `${member}`
                    },

                    {
                        name: "Rozhodl",
                        value: `${interaction.user}`
                    }

                )

                .setTimestamp();




            if(logChannel){

                await logChannel.send({

                    embeds:[
                        logEmbed
                    ]

                });

            }





            await interaction.update({

                content:
                `❌ ${member} byl odmítnut.`,

                embeds: [],

                components: []

            });





            setTimeout(() => {


                interaction.channel.delete()
                .catch(() => {});


            },5000);



            return;

        }





    } catch(err) {


        console.error(
            "❌ RECRUIT BUTTON ERROR:"
        );


        console.error(err);



        if(
            !interaction.replied &&
            !interaction.deferred
        ){


            await interaction.reply({

                content:
                "❌ Chyba při zpracování tlačítka.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
