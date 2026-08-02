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


            const member = await interaction.guild.members.fetch(userId);



            await member.roles.add(
                "1458487234989654201"
            );



            await interaction.deferUpdate();



            await interaction.message.edit({

                content:
`✅ ${member} byl přijat do GUTALAX MILSIM.

🎖 Byla ti přidělena role Rekrut.
Vítej v jednotce!`,

                embeds: [],

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


            const member = await interaction.guild.members.fetch(userId);



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


            const member = await interaction.guild.members.fetch(userId);



            await interaction.deferUpdate();



            await interaction.message.edit({

                content:
`❌ ${member} byl odmítnut.`,

                embeds: [],

                components: []

            });



            setTimeout(() => {

                interaction.channel.delete()
                .catch(()=>{});


            },5000);



            return;

        }



    } catch(err) {


        console.error(
            "❌ RECRUIT BUTTON ERROR:"
        );

        console.error(err);



        if (!interaction.replied && !interaction.deferred) {


            await interaction.reply({

                content:
                "❌ Chyba při zpracování tlačítka.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
