module.exports = async (interaction, client) => {


    // OTEVŘENÍ FORMULÁŘE

    if (
        interaction.isButton() &&
        interaction.customId === "openRecruit"
    ) {

        const openRecruit = require("../handlers/openRecruit");

        return openRecruit(interaction);

    }



    // ODESLÁNÍ FORMULÁŘE

    if (
        interaction.isModalSubmit() &&
        interaction.customId === "recruitForm"
    ) {

        const recruitModal = require("../handlers/recruitModal");

        return recruitModal(interaction);

    }



    // TLAČÍTKA V TICKETU

    if (
        interaction.isButton()
    ) {

        const recruitButtons = require("../handlers/recruitButtons");

        return recruitButtons(interaction);

    }


};
