const {
    ChannelType,
    PermissionsBitField,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");


const recruitModal = require("../handlers/recruitModal");
const recruitButtons = require("../handlers/recruitButtons");


module.exports = async (interaction, client) => {


    try {


        // ================================
        // OTEVŘENÍ FORMULÁŘE
        // ================================

        if (
            interaction.isButton() &&
            interaction.customId === "openRecruit"
        ) {


            const modal = new ModalBuilder()

                .setCustomId("recruitForm")

                .setTitle("Nábor GUTALAX MILSIM");



            const vek = new TextInputBuilder()

                .setCustomId("vek")

                .setLabel("Tvůj věk")

                .setStyle(TextInputStyle.Short)

                .setRequired(true);



            const platforma = new TextInputBuilder()

                .setCustomId("platforma")

                .setLabel("Platforma (PC / Xbox / PS5)")

                .setStyle(TextInputStyle.Short)

                .setRequired(true);



            const mikrofon = new TextInputBuilder()

                .setCustomId("mikrofon")

                .setLabel("Máš funkční mikrofon?")

                .setStyle(TextInputStyle.Short)

                .setRequired(true);



            const zkusenosti = new TextInputBuilder()

                .setCustomId("zkusenosti")

                .setLabel("Zkušenosti s MILSIM")

                .setStyle(TextInputStyle.Paragraph)

                .setRequired(true);



            const proc = new TextInputBuilder()

                .setCustomId("proc")

                .setLabel("Proč se chceš přidat?")

                .setStyle(TextInputStyle.Paragraph)

                .setRequired(true);



            modal.addComponents(

                new ActionRowBuilder().addComponents(vek),

                new ActionRowBuilder().addComponents(platforma),

                new ActionRowBuilder().addComponents(mikrofon),

                new ActionRowBuilder().addComponents(zkusenosti),

                new ActionRowBuilder().addComponents(proc)

            );



            return interaction.showModal(modal);

        }



        // ================================
        // ODESLÁNÍ FORMULÁŘE
        // ================================


        if (

            interaction.isModalSubmit() &&

            interaction.customId === "recruitForm"

        ) {


            return recruitModal(interaction, client);


        }



        // ================================
        // TLAČÍTKA NÁBORÁŘŮ
        // ================================


        if (interaction.isButton()) {


            if (

                interaction.customId.startsWith("acceptRecruit_") ||

                interaction.customId.startsWith("rejectRecruit_") ||

                interaction.customId.startsWith("interviewRecruit_")

            ) {


                return recruitButtons(interaction, client);


            }


        }



    } catch (err) {


        console.error("INTERACTION ERROR:");

        console.error(err);



        if (!interaction.replied) {


            await interaction.reply({

                content:
                "❌ Chyba: " + err.message,

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
