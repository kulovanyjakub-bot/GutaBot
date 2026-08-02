const {
    ChannelType,
    PermissionsBitField
} = require("discord.js");

module.exports = async (interaction, client) => {

    if (interaction.isButton()) {

        if (interaction.customId === "openRecruit") {

            const guild = interaction.guild;

            const existing = guild.channels.cache.find(c =>
                c.name === `ticket-${interaction.user.username.toLowerCase()}`
            );

            if (existing) {
                return interaction.reply({
                    content: "❌ Už máš otevřený ticket.",
                    ephemeral: true
                });
            }

            const channel = await guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages
                        ]
                    }
                ]
            });

            await channel.send(
`# 🎖 Nábor GUTALAX MILSIM

Vítej ${interaction.user}

Brzy zde bude formulář.

Prosíme zatím vyčkej.`
            );

            return interaction.reply({
                content: `✅ Ticket vytvořen: ${channel}`,
                ephemeral: true
            });

        }

    }

};
