const {
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


module.exports = async (interaction) => {


    await interaction.deferReply({
        ephemeral: true
    });



    const guild = interaction.guild;



    const existing = guild.channels.cache.find(
        c => c.name === `ticket-${interaction.user.id}`
    );


    if (existing) {

        return interaction.editReply({

            content: `❌ Už máš otevřený ticket: ${existing}`

        });

    }



    const vek = interaction.fields.getTextInputValue("vek");

    const platforma = interaction.fields.getTextInputValue("platforma");

    const mikrofon = interaction.fields.getTextInputValue("mikrofon");

    const zkusenosti = interaction.fields.getTextInputValue("zkusenosti");

    const proc = interaction.fields.getTextInputValue("proc");





    const channel = await guild.channels.create({

        name: `ticket-${interaction.user.id}`,

        type: ChannelType.GuildText,


        // KATEGORIE NÁBOR
        parent: "1533445763747807332",



        permissionOverwrites: [


            // skryje před všemi
            {
                id: guild.roles.everyone.id,

                deny: [

                    PermissionsBitField.Flags.ViewChannel

                ]

            },



            // uchazeč
            {
                id: interaction.user.id,

                allow: [

                    PermissionsBitField.Flags.ViewChannel,

                    PermissionsBitField.Flags.SendMessages,

                    PermissionsBitField.Flags.ReadMessageHistory

                ]

            },



            // náboráři
            {
                id: "1533447617957073117",

                allow: [

                    PermissionsBitField.Flags.ViewChannel,

                    PermissionsBitField.Flags.SendMessages,

                    PermissionsBitField.Flags.ReadMessageHistory,

                    PermissionsBitField.Flags.ManageMessages

                ]

            }


        ]

    });







    const embed = new EmbedBuilder()

        .setColor("#d4a017")

        .setTitle("🎖 Nová přihláška GUTALAX MILSIM")

        .setDescription(`Žadatel: ${interaction.user}`)


        .addFields(

            {
                name: "Věk",
                value: vek
            },

            {
                name: "Platforma",
                value: platforma
            },

            {
                name: "Mikrofon",
                value: mikrofon
            },

            {
                name: "Zkušenosti s MILSIM",
                value: zkusenosti
            },

            {
                name: "Proč se chce přidat",
                value: proc
            }

        )

        .setTimestamp();







    const buttons = new ActionRowBuilder()

        .addComponents(


            new ButtonBuilder()

                .setCustomId(`acceptRecruit_${interaction.user.id}`)

                .setLabel("✅ Přijmout")

                .setStyle(ButtonStyle.Success),



            new ButtonBuilder()

                .setCustomId(`interviewRecruit_${interaction.user.id}`)

                .setLabel("🎤 Pohovor")

                .setStyle(ButtonStyle.Primary),



            new ButtonBuilder()

                .setCustomId(`rejectRecruit_${interaction.user.id}`)

                .setLabel("❌ Odmítnout")

                .setStyle(ButtonStyle.Danger)


        );







    await channel.send({

        content: `👋 Vítej ${interaction.user}\n<@&1533447617957073117>`,

        embeds: [embed],

        components: [buttons]

    });







    await interaction.editReply({

        content: `✅ Přihláška odeslána.\nTicket: ${channel}`

    });



};
