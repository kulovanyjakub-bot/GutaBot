const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Vytvoří náborový panel"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#d4a017")
            .setTitle("🎖 Nábor do GUTALAX MILSIM")
            .setDescription(
`Vítej!

Chceš se stát členem **GUTALAX MILSIM**?

Klikni na tlačítko níže a vyplň krátkou přihlášku.

Po odeslání se automaticky vytvoří soukromý ticket, kde bude pokračovat nábor.

Hodně štěstí!`
            );

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("openRecruit")
                    .setLabel("📋 Přihlásit se")
                    .setStyle(ButtonStyle.Success)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });

    }
};
