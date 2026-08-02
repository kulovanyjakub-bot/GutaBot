const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = async (interaction) => {


    const modal = new ModalBuilder()

        .setCustomId(
            "recruitModal"
        )

        .setTitle(
            "Nábor GUTALAX MILSIM"
        );




    const vek = new TextInputBuilder()

        .setCustomId("vek")

        .setLabel("Věk")

        .setStyle(TextInputStyle.Short);




    const platforma = new TextInputBuilder()

        .setCustomId("platforma")

        .setLabel("Platforma (PC/Xbox/PS)")

        .setStyle(TextInputStyle.Short);




    const mikrofon = new TextInputBuilder()

        .setCustomId("mikrofon")

        .setLabel("Máš mikrofon?")

        .setStyle(TextInputStyle.Short);




    const zkusenosti = new TextInputBuilder()

        .setCustomId("zkusenosti")

        .setLabel("Zkušenosti s milsim")

        .setStyle(TextInputStyle.Paragraph);




    const proc = new TextInputBuilder()

        .setCustomId("proc")

        .setLabel("Proč se chceš přidat?")

        .setStyle(TextInputStyle.Paragraph);




    modal.addComponents(

        new ActionRowBuilder().addComponents(vek),

        new ActionRowBuilder().addComponents(platforma),

        new ActionRowBuilder().addComponents(mikrofon),

        new ActionRowBuilder().addComponents(zkusenosti),

        new ActionRowBuilder().addComponents(proc)

    );



    await interaction.showModal(modal);


};
