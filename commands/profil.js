const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");


const ranks =
    require("../config/ranks");





module.exports = {


    data:

    new SlashCommandBuilder()

        .setName("profil")

        .setDescription("Zobrazí profil člena MILSIM")


        .addUserOption(option =>

            option

            .setName("clen")

            .setDescription("Člen")

            .setRequired(false)

        ),







    async execute(interaction){



        let user =

            interaction.options.getUser(
                "clen"
            );



        if(!user){

            user =
            interaction.user;

        }






        const member =

            await interaction.guild.members.fetch(

                user.id

            );








        const data =

            memberDB.getMember(

                user.id

            );







        if(!data){


            return interaction.reply({

                content:

                "❌ Člen nemá vytvořený profil.",

                ephemeral:true

            });


        }







        // ===============================
        // AKTUÁLNÍ HODNOST
        // ===============================


        let currentRank =

            "Rekrut";


        let currentLevel = 0;




        for(

            const rank of ranks

        ){


            if(

                member.roles.cache.has(

                    rank.id

                )

                &&

                rank.level > currentLevel

            ){

                currentRank =
                rank.name;


                currentLevel =
                rank.level;

            }


        }









        // ===============================
        // DALŠÍ HODNOST
        // ===============================


        const nextRank =

            ranks.find(

                r =>

                r.level === currentLevel + 1

            );







        let progress =

        "🏆 Maximální hodnost";







        if(nextRank){



            progress =


            `🎯 Mise: **${data.missions || 0}/${nextRank.missions}**\n` +

            `🏋️ Výcviky: **${data.trainings || 0}/${nextRank.trainings}**\n` +

            `⚡ Aktivita: **${data.activity || 0}/${nextRank.activity}**\n` +

            `🤝 Týmová práce: **${data.teamwork || 0}/${nextRank.teamwork}**`;



        }









        const embed =


        new EmbedBuilder()


        .setColor("#1f8b4c")


        .setTitle(

            "🪖 GUTALAX MILSIM - Profil"

        )


        .setThumbnail(

            user.displayAvatarURL()

        )




        .addFields(



            {

                name:

                "👤 Člen",

                value:

                `${user}`

            },




            {

                name:

                "🎖 Hodnost",

                value:

                `**${currentRank}**`

            },




            {

                name:

                "📊 Statistiky",

                value:


                `🎯 Mise: **${data.missions || 0}**\n` +

                `🏋️ Výcviky: **${data.trainings || 0}**`

            },




            {

                name:

                "⚡ Hodnocení",

                value:


                `⚡ Aktivita: **${data.activity || 0}/100**\n` +

                `🤝 Týmová práce: **${data.teamwork || 0}/100**`

            },




            {

                name:

                "⬆️ Postup na další hodnost",

                value:

                progress

            }



        )



        .setTimestamp();








        await interaction.reply({

            embeds:[

                embed

            ]

        });



    }


};
