module.exports = async (interaction, client) => {

    try {

        if (interaction.isButton()) {

            const recruitButtons = require("../handlers/recruitButtons");

            return await recruitButtons(interaction);

        }


        if (interaction.isModalSubmit()) {

            const recruitModal = require("../handlers/recruitModal");

            return await recruitModal(interaction);

        }


    } catch (err) {

        console.error("❌ INTERACTION ERROR:");
        console.error(err);


        if (!interaction.replied && !interaction.deferred) {

            await interaction.reply({

                content: "❌ Nastala chyba při zpracování.",

                ephemeral: true

            }).catch(()=>{});

        }

    }

};
