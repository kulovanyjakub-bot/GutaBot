const {
    ChannelType,
    PermissionsBitField
} = require("discord.js");

module.exports = async (interaction, client) => {

    if (interaction.isButton()) {

        const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

if (interaction.customId === "openRecruit") {

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
        .setLabel("Na čem hraješ? (PC/Xbox/PS5)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const mikrofon = new TextInputBuilder()
        .setCustomId("mikrofon")
        .setLabel("Máš funkční mikrofon? (ANO/NE)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const zkusenosti = new TextInputBuilder()
        .setCustomId("zkusenosti")
        .setLabel("Jaké máš zkušenosti s MILSIM?")
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

    return interaction.showModal(modal);
}
