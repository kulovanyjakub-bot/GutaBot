const {
    EmbedBuilder
} = require("discord.js");



module.exports = async (interaction) => {



    // ==========================
    // PŘIJMOUT REKRUTA
    // ==========================

    if (interaction.customId.startsWith("acceptRecruit_")) {


        const userId = interaction.customId.replace(
            "acceptRecruit_",
            ""
        );


        const member =
            await interaction.guild.members.fetch(userId);



        // Přidání členské role

        await member.roles.add(
            "1458487234989654201"
        );



        const embed = new EmbedBuilder()

            .setColor("Green")

            .setTitle("✅ Člen přijat")

            .addFields(

                {
                    name: "Uchazeč",
                    value: `${member}`
                },

                {
                    name: "Přijal",
                    value: `${interaction.user}`
                }

            )

            .setTimestamp();





        await interaction.update({

            content:
            `✅ ${member} byl přijat do GUTALAX MILSIM.`,

            embeds: [
                embed
            ],

            components: []

        });



        return;

    }







    // ==========================
    // POHOVOR
    // ==========================

    if (interaction.customId.startsWith("interviewRecruit_")) {



        const userId = interaction.customId.replace(
            "interviewRecruit_",
            ""
        );



        const member =
            await interaction.guild.members.fetch(userId);



        await interaction.reply({

            content:
`${member}

🎤 Uchazeč byl pozván na pohovor.

<@&1458487234989654201> prosím kontaktujte uchazeče.`,

            allowedMentions: {

                users: [
                    member.id
                ],

                roles: [
                    "1458487234989654201"
                ]

            }

        });



        return;

    }







    // ==========================
    // ODMÍTNOUT
    // ==========================

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





        await interaction.update({

            content:
            `❌ ${member} byl odmítnut.`,

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



};
