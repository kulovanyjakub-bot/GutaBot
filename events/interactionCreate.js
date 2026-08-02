module.exports = async (interaction) => {


    // ==========================
    // PŘIJMOUT REKRUTA
    // ==========================

    if (interaction.customId.startsWith("acceptRecruit_")) {


        const userId = interaction.customId.replace(
            "acceptRecruit_",
            ""
        );


        const member = await interaction.guild.members.fetch(userId);



        await member.roles.add(
            "1458487234989654201"
        );



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



        // zabrání timeoutu Discordu
        await interaction.deferReply();



        const member =
            await interaction.guild.members.fetch(userId);



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
