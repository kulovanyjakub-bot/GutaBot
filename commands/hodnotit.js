const {
    SlashCommandBuilder
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");


const rankChecker =
    require("../handlers/rankChecker");





const COMMAND_ROLES = [

    "1502598398736338954",

    "1502599934220701836",

    "1533447617957073117"

];





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

        )



        .addIntegerOption(option =>

            option

            .setName("disciplina")

            .setDescription("Disciplína 0-100")

            .setRequired(true)

            .setMinValue(0)

            .setMaxValue(100)

        ),







    async execute(interaction){



        console.log(
            "HODNOTIT SPUŠTĚN"
        );





        const allowed =

            interaction.member.roles.cache.some(

                role =>

                COMMAND_ROLES.includes(

                    role.id

                )

            );





        if(!allowed){


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





        const discipline =

            interaction.options.getInteger(

                "disciplina"

            );







        console.log(
            "HODNOCENÍ:",
            user.username,
            activity,
            teamwork,
            discipline
        );









        memberDB.updateEvaluation(

            user.id,

            activity,

            teamwork,

            discipline

        );





        console.log(
            "HODNOCENÍ ULOŽENO"
        );









        await interaction.reply({

            content:


            `✅ Hodnocení aktualizováno pro ${user}\n\n` +


            `⚡ Aktivita: **${activity}/100**\n` +


            `🤝 Týmová práce: **${teamwork}/100**\n` +


            `🎖 Disciplína: **${discipline}/100**`


        });







        console.log(
            "REPLY ODESLÁN"
        );









        try{



            const member =

                await interaction.guild.members.fetch(

                    user.id

                );





            console.log(
                "ČLEN NALEZEN:",
                member.user.username
            );







            await rankChecker(

                member,

                interaction.guild

            );





            console.log(
                "RANK CHECK HOTOV"
            );



        }



        catch(err){



            console.error(

                "❌ Rank checker chyba:",

                err

            );


        }







    }


};
