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



        const milsimRole =
            "1381662796646973542";


        const recruitRole =
            "1458487234989654201";



        const recruits =
            interaction.guild.members.cache
            .filter(member =>
                member.roles.cache.has(recruitRole)
            )
            .map(member =>
                `🎖 ${member}`
            )
            .join("\n") || "Žádní rekruti";



        const milsim =
            interaction.guild.members.cache
            .filter(member =>
                member.roles.cache.has(milsimRole)
            )
            .map(member =>
                `🪖 ${member}`
            )
            .join("\n") || "Žádní členové";



        const embed = new EmbedBuilder()

            .setTitle("📋 GUTALAX MILSIM - Evidence členů")

            .addFields(
                {
                    name:"🎖 Rekruti",
                    value:recruits
                },
                {
                    name:"🪖 MILSIM",
                    value:milsim
                }
            )

            .setTimestamp();



        await interaction.editReply({
            embeds:[
                embed
            ]
        });


    }

};
