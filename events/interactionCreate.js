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



        // Přidání role člena

        await member.roles.add(
            "1458487234989654201"
        );



        // LOG

        const logChannel =
            interaction.guild.channels.cache.get(
                "1533447352684380361"
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



        if (logChannel) {

            logChannel.send({
                embeds: [embed]
            });

        }





        await interaction.update({

            content:
            `✅ ${member} byl přijat do GUTALAX MILSIM.`,

            embeds: interaction.message.embeds,

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



        // ochrana proti timeoutu

        await interaction.deferReply();



        const member =
            await interaction.guild.members.fetch(userId);





        // LOG

        const logChannel =
            interaction.guild.channels.cache.get(
                "1533447352684380361"
            );



        const embed = new EmbedBuilder()

            .setColor("Blue")

            .setTitle("🎤 Pohovor zahájen")

            .addFields(

                {
                    name: "Uchazeč",
                    value: `${member}`
                },

                {
                    name: "Náborář",
                    value: `${interaction.user}`
                }

            )

            .setTimestamp();



        if (logChannel) {

            logChannel.send({
                embeds: [embed]
            });

        }





        await interaction.editReply({

            content:
`${member}

🎤 Uchazeč byl pozván na pohovor.

<@&1533447617957073117> prosím kontaktujte uchazeče.`

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





        // LOG

        const logChannel =
            interaction.guild.channels.cache.get(
                "1533447352684380361"
            );



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




        if (logChannel) {

            logChannel.send({
                embeds: [embed]
            });

        }





        await interaction.update({

            content:
            `❌ ${member} byl odmítnut.`,

            embeds: interaction.message.embeds,

            components: []

        });





        setTimeout(() => {


            interaction.channel.delete()
                .catch(() => {});


        },5000);



        return;

    }



};
