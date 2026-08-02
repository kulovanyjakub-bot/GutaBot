const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const missionDB =
    require("../database/missionDatabase");



module.exports = {


    data: new SlashCommandBuilder()

        .setName("vytvorit-misi")

        .setDescription("Vytvoří novou misi GUTALAX MILSIM")



        .addStringOption(option =>
            option
            .setName("nazev")
            .setDescription("Název mise")
            .setRequired(true)
        )


        .addStringOption(option =>
            option
            .setName("datum")
            .setDescription("Datum a čas mise")
            .setRequired(true)
        )


        .addStringOption(option =>
            option
            .setName("mapa")
            .setDescription("Mapa mise")
            .setRequired(true)
        )


        .addStringOption(option =>
            option
            .setName("popis")
            .setDescription("Popis mise")
            .setRequired(true)
        ),






    async execute(interaction) {



        const milsimRole =
            "1381662796646973542";





        if(
            !interaction.member.roles.cache.has(
                milsimRole
            )
        ){


            return interaction.reply({

                content:
                "❌ Tento příkaz mohou používat pouze členové MILSIM.",

                ephemeral:true

            });


        }







        await interaction.deferReply({

            ephemeral:true

        });








        const nazev =
            interaction.options.getString("nazev");


        const datum =
            interaction.options.getString("datum");


        const mapa =
            interaction.options.getString("mapa");


        const popis =
            interaction.options.getString("popis");







        const missionId =
            Date.now().toString();








        missionDB.createMission({

            id:
            missionId,


            name:
            nazev,


            date:
            datum,


            map:
            mapa,


            description:
            popis,


            participants:
            []

        });







        console.log(
            "=============================="
        );


        console.log(
            "VYTVOŘENÁ MISE:"
        );


        console.log({

            id:
            missionId,


            name:
            nazev,


            participants:
            []

        });


        console.log(
            "AKTUÁLNÍ MISE:"
        );


        console.log(
            missionDB.getMissions()
        );


        console.log(
            "=============================="
        );








        const embed =
            new EmbedBuilder()



            .setColor("#c0392b")



            .setTitle("🎯 MISE")



            .setDescription(

                `**${nazev}**`

            )



            .addFields(

                {

                    name:
                    "🗺 Mapa",

                    value:
                    mapa

                },


                {

                    name:
                    "📅 Datum",

                    value:
                    datum

                },


                {

                    name:
                    "📋 Popis",

                    value:
                    popis

                },


                {

                    name:
                    "👥 Účast",

                    value:
                    "Nikdo přihlášen"

                }


            )


            .setTimestamp();








        const buttons =


            new ActionRowBuilder()

            .addComponents(



                new ButtonBuilder()

                .setCustomId(
                    `missionJoin_${missionId}`
                )

                .setLabel(
                    "✅ Účastním se"
                )

                .setStyle(
                    ButtonStyle.Success
                ),





                new ButtonBuilder()

                .setCustomId(
                    `missionLeave_${missionId}`
                )

                .setLabel(
                    "❌ Neúčastním se"
                )

                .setStyle(
                    ButtonStyle.Danger
                ),





                new ButtonBuilder()

                .setCustomId(
                    `missionClose_${missionId}`
                )

                .setLabel(
                    "🔒 Ukončit misi"
                )

                .setStyle(
                    ButtonStyle.Secondary
                )



            );









        const channel =

            interaction.guild.channels.cache.get(

                "1381674086089883698"

            );







        if(!channel){


            return interaction.editReply({

                content:
                "❌ Kanál misí nebyl nalezen."

            });


        }









        await channel.send({

            content:
            "@everyone",



            embeds:[

                embed

            ],



            components:[

                buttons

            ],



            allowedMentions:{

                parse:[

                    "everyone"

                ]

            }


        });









        await interaction.editReply({

            content:
            "✅ Mise vytvořena."

        });





    }


};
