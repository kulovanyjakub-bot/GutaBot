const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const trainingDB =
    require("../database/trainingDatabase");



module.exports = {


    data: new SlashCommandBuilder()

        .setName("vytvorit-vycvik")

        .setDescription("Vytvoří nový výcvik GUTALAX MILSIM")

        .addStringOption(option =>
            option
            .setName("nazev")
            .setDescription("Název výcviku")
            .setRequired(true)
        )

        .addStringOption(option =>
            option
            .setName("datum")
            .setDescription("Datum a čas výcviku")
            .setRequired(true)
        )

        .addStringOption(option =>
            option
            .setName("popis")
            .setDescription("Popis výcviku")
            .setRequired(true)
        ),




    async execute(interaction) {



        const milsimRole =
            "1381662796646973542";



        if(
            !interaction.member.roles.cache.has(milsimRole)
        ){

            return interaction.reply({

                content:
                "❌ Tento příkaz mohou používat pouze členové MILSIM.",

                ephemeral:true

            });

        }




        const nazev =
            interaction.options.getString("nazev");


        const datum =
            interaction.options.getString("datum");


        const popis =
            interaction.options.getString("popis");





        const trainingId =
            Date.now().toString();





        trainingDB.createTraining({

            id: trainingId,

            name: nazev,

            date: datum,

            description: popis,

            participants: []

        });








        const embed =
            new EmbedBuilder()

            .setColor("#1f8b4c")

            .setTitle("🎖 VÝCVIK")

            .setDescription(
                `**${nazev}**`
            )

            .addFields(

                {
                    name:"📅 Datum",
                    value:datum
                },

                {
                    name:"📋 Popis",
                    value:popis
                },

                {
                    name:"👥 Účast",
                    value:"Nikdo přihlášen"
                }

            )

            .setTimestamp();








        const buttons =
            new ActionRowBuilder()

            .addComponents(



                new ButtonBuilder()

                .setCustomId(
                    `trainingJoin_${trainingId}`
                )

                .setLabel("✅ Účastním se")

                .setStyle(
                    ButtonStyle.Success
                ),




                new ButtonBuilder()

                .setCustomId(
                    `trainingLeave_${trainingId}`
                )

                .setLabel("❌ Neúčastním se")

                .setStyle(
                    ButtonStyle.Danger
                ),




                new ButtonBuilder()

                .setCustomId(
                    `trainingClose_${trainingId}`
                )

                .setLabel("🔒 Ukončit výcvik")

                .setStyle(
                    ButtonStyle.Secondary
                )


            );








        const channel =
            interaction.guild.channels.cache.get(
                "1381674086089883698"
            );



        if(!channel){

            return interaction.reply({

                content:
                "❌ Kanál výcviků nebyl nalezen.",

                ephemeral:true

            });

        }







        await channel.send({

            content:
            "@everyone",

            allowedMentions:{

                parse:[
                    "everyone"
                ]

            },


            embeds:[

                embed

            ],


            components:[

                buttons

            ]

        });







        await interaction.reply({

            content:
            "✅ Výcvik vytvořen.",

            ephemeral:true

        });


    }


};
