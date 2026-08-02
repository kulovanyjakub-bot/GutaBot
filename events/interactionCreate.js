module.exports = async (interaction, client) => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (err) {
            console.error(err);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "❌ Nastala chyba.",
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "❌ Nastala chyba.",
                    ephemeral: true
                });
            }
        }
    }

    if (interaction.isButton()) {
        // Sem přidáme tlačítka Přijmout / Odmítnout / Pohovor
    }
};
