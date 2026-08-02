const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");


const ranks =
    require("../config/ranks");





module.exports = {


    data: new SlashCommandBuilder()

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
            interaction.options.getUser("clen");



        if(!user){

            user =
            interaction.user;

        }






        const member =
            await interaction.guild.members.fetch(
                user.id
            );







        // ===============================
        // HODNOST
        // ===============================


        let rank =
            "Bez hodnosti";



        let highestLevel = 0;



        for(
            const r of ranks
        ){


            if(

                member.roles.cache.has(r.id)

                &&

                r.level > highestLevel

            ){


                rank =
                r.name;


                highestLevel =
                r.level;


            }


        }







        // ===============================
        // STATISTIKY
        // ===============================


        let data =
            memberDB.getMember(
                user.id
            );





        if(!data){


            data = {


                id:
                user.id,


                username:
                user.username,


                trainings:
                0,


                missions:
                0,


                joined:
                new Date().toISOString(),


                lastActivity:
                null


            };



            memberDB.createMember(
                data
            );


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
                rank

            },


            {

                name:
                "🏋️ Výcviky",

                value:
                `${data.trainings}`

            },


            {

                name:
                "🎯 Mise",

                value:
                `${data.missions}`

            },


            {

                name:
                "📅 Člen od",

                value:
                `<t:${Math.floor(
                    new Date(data.joined)
                    .getTime() / 1000
                )}:d>`

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
