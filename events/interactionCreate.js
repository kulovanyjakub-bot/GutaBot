const recruitModal = require("../handlers/recruitModal");
const recruitButtons = require("../handlers/recruitButtons");

module.exports = async (interaction, client) => {


    // OTEVŘENÍ FORMULÁŘE
    if (
        interaction.isButton() &&
        interaction.customId === "openRecruit"
    ) {

        return recruitModal(interaction, client);

    }



    // ODESLÁNÍ FORMULÁŘE
    if (
        interaction.isModalSubmit() &&
        interaction.customId === "recruitForm"
    ) {

        return recruitModal(interaction, client);

    }



    // TLAČÍTKA NÁBORÁŘŮ
    if (
        interaction.isButton()
    ) {

        return recruitButtons(interaction, client);

    }

};
