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



        const milsimMembers = interaction.guild.members.cache
            .filter(member =>
                member.roles.cache.has(milsimRole)
            );


        const recruitMembers = interaction.guild.members.cache
            .filter(member =>
                member.roles.cache.has(recruitRole)
            );



        const milsimList = milsimMembers
            .map(member =>
                `🪖 ${member.user.username}`
            )
            .slice(0, 30)
            .join("\n") || "Žádní členové";



        const recruitList = recruitMembers
            .map(member =>
                `🎖 ${member.user.username}`
            )
            .slice(0, 30)
            .join("\n") || "Žádní rekruti";




        const embed = new EmbedBuilder()

            .setColor("#1f8b4c")

            .setTitle("📋 GUTALAX MILSIM")

            .setDescription(
                "Personální evidence jednotky"
            )


            .addFields(

                {
                    name:`🪖 MILSIM (${milsimMembers.size})`,
                    value:milsimList,
                    inline:false
                },


                {
                    name:`🎖 Rekruti (${recruitMembers.size})`,
                    value:recruitList,
                    inline:false
                },


                {
                    name:"📊 Statistiky",
                    value:
                    `👥 Celkem: **${milsimMembers.size + recruitMembers.size}**\n` +
                    `🪖 Aktivní členové: **${milsimMembers.size}**\n` +
                    `🎖 Rekruti: **${recruitMembers.size}**`
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
