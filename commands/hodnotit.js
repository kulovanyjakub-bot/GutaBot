const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");


const rankChecker =
    require("../utils/rankChecker");





module.exports = {


    data:

    new SlashCommandBuilder()

        .setName("hodnotit")

        .setDescription("Hodnocení člena velením")



        .addUserOption(option =>

            option

            .setName("clen")

            .setDescription("Člen k hodnocení")

            .setRequired(true)

        )


        .addIntegerOption(option =>

            option

            .setName("aktivita")

            .setDescription("Aktivita 0-100")

            .setRequired(true)

            .setMinValue(0)

            .setMaxValue(100)

        )


        .addIntegerOption(option =>

            option

            .setName("tymovaprace")

            .setDescription("Týmová práce 0-100")

            .setRequired(true)

            .setMinValue(0)

            .setMaxValue(100)

        ),







    async execute(interaction){



        // oprávnění velení

        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.Administrator
            )
        ){


            return interaction.reply({

                content:
                "❌ Tento příkaz může použít pouze velení.",

                ephemeral:true

            });


        }







        const user =

            interaction.options.getUser(
                "clen"
            );




        const activity =

            interaction.options.getInteger(
                "aktivita"
            );




        const teamwork =

            interaction.options.getInteger(
                "tymovaprace"
            );









        memberDB.updateEvaluation(

            user.id,

            activity,

            teamwork

        );








        const member =

            await interaction.guild.members.fetch(

                user.id

            );







        await rankChecker(

            member,

            interaction.guild

        );









        await interaction.reply({

            content:

            `✅ Hodnocení aktualizováno pro ${user}\n\n` +

            `⚡ Aktivita: **${activity}/100**\n` +

            `🤝 Týmová práce: **${teamwork}/100**`

        });



    }


};
