const {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = async (interaction) => {


    // ===============================
    // PŘIJMOUT REKRUTA
    // ===============================

    if (interaction.customId.startsWith("acceptRecruit_")) {


        const userId = interaction.customId.replace(
            "acceptRecruit_",
            ""
        );


        const member = await interaction.guild.members.fetch(userId);



        // Přidání role Rekrut

        await member.roles.add(
            "1458487234989654201"
        );



        // Přejmenování ticketu

        await interaction.channel.setName(
            `rekrut-${member.user.username}`
        );



        await interaction.update({

            content:
`✅ ${member} byl přijat do GUTALAX MILSIM.

🎖 Byla ti přidělena role Rekrut.
Vítej v jednotce!`,

            embeds: interaction.message.embeds,

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

<@701088576779059200>
<@807310842713735178>
<@1119313377257341129>

Prosím domluvte s uchazečem termín pohovoru.`,

            ephemeral: false

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



        await interaction.update({

            content:
`❌ ${member} byl odmítnut.`,

            embeds: interaction.message.embeds,

            components: []

        });



        setTimeout(() => {

            interaction.channel.delete()
                .catch(() => {});

        }, 5000);



        return;

    }


};
