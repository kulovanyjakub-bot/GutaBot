const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()
        .setName("members")
        .setDescription("Zobrazí evidenci členů GUTALAX MILSIM"),



    async execute(interaction) {


        await interaction.deferReply();



        await interaction.guild.members.fetch();



        const milsimRole = "1381662796646973542";
        const recruitRole = "1458487234989654201";



        const recruits = interaction.guild.members.cache
            .filter(member =>
                member.roles.cache.has(recruitRole)
            )
            .map((member, index) =>
                `**${index + 1}.** ${member}`
            )
            .join("\n") || "*Žádní rekruti*";



        const milsim = interaction.guild.members.cache
            .filter(member =>
                member.roles.cache.has(milsimRole)
            )
            .map((member, index) =>
                `**${index + 1}.** ${member}`
            )
            .join("\n") || "*Žádní členové*";



        const total =
            interaction.guild.members.cache.filter(member =>
                member.roles.cache.has(milsimRole) ||
                member.roles.cache.has(recruitRole)
            ).size;



        const embed = new EmbedBuilder()

            .setColor(0x1f8b4c)

            .setTitle("📋 GUTALAX MILSIM")
            
            .setDescription(
                "## Personální evidence jednotky"
            )

            .addFields(

                {
                    name: "🪖 MILSIM",
                    value: milsim,
                    inline: false
                },


                {
                    name: "🎖 Rekruti",
                    value: recruits,
                    inline: false
                },


                {
                    name: "📊 Statistiky",
                    value:
                    `👥 Celkem evidováno: **${total}**\n` +
                    `🪖 Aktivní členové: **${interaction.guild.members.cache.filter(m => m.roles.cache.has(milsimRole)).size}**\n` +
                    `🎖 Rekruti: **${interaction.guild.members.cache.filter(m => m.roles.cache.has(recruitRole)).size}**`,
                    inline:false
                }

            )


            .setFooter({
                text:"GUTALAX MILSIM Personnel System"
            })


            .setTimestamp();



        await interaction.editReply({

            embeds:[
                embed
            ]

        });


    }

};
