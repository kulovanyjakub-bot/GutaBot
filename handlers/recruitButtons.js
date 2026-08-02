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



            // přidání role Rekrut

            await member.roles.add(
                "1458487234989654201"
            );



            // přejmenování ticketu

            await interaction.channel.setName(
                `rekrut-${member.user.username}`
            ).catch(() => {});



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



            const embed = new EmbedBuilder()

                .setColor("Red")

                .setTitle("❌ Uchazeč odmítnut")

                .setDescription(
`${member} nebyl přijat do GUTALAX MILSIM.`
                )

                .addFields(

                    {
                        name: "Rozhodl",
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



        if (!interaction.replied && !interaction.deferred) {


            await interaction.reply({

                content:
                "❌ Nastala chyba při zpracování tlačítka.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
