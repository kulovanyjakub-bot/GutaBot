const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()
        .setCustomId("recruitForm")
        .setTitle("Nábor GUTALAX MILSIM");


    const vek = new TextInputBuilder()
        .setCustomId("vek")
        .setLabel("Tvůj věk")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);


    const platforma = new TextInputBuilder()
        .setCustomId("platforma")
        .setLabel("Platforma (PC / Xbox / PS5)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);


    const mikrofon = new TextInputBuilder()
        .setCustomId("mikrofon")
        .setLabel("Máš funkční mikrofon?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);


    const zkusenosti = new TextInputBuilder()
        .setCustomId("zkusenosti")
        .setLabel("Zkušenosti s MILSIM")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);


    const proc = new TextInputBuilder()
        .setCustomId("proc")
        .setLabel("Proč se chceš přidat?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);


    modal.addComponents(
        new ActionRowBuilder().addComponents(vek),
        new ActionRowBuilder().addComponents(platforma),
        new ActionRowBuilder().addComponents(mikrofon),
        new ActionRowBuilder().addComponents(zkusenosti),
        new ActionRowBuilder().addComponents(proc)
    );


    await interaction.showModal(modal);

};
