const openRecruit = require("../handlers/openRecruit");
const recruitModal = require("../handlers/recruitModal");
const recruitButtons = require("../handlers/recruitButtons");


module.exports = async (interaction, client) => {


    // Otevření náborového formuláře

    if (
        interaction.isButton() &&
        interaction.customId === "openRecruit"
    ) {

        return openRecruit(interaction, client);

    }



    // Odeslání formuláře

    if (
        interaction.isModalSubmit() &&
        interaction.customId === "recruitForm"
    ) {

        return recruitModal(interaction, client);

    }



    // Tlačítka náborářů

    if (
        interaction.isButton() &&
        (
            interaction.customId.startsWith("acceptRecruit_") ||
            interaction.customId.startsWith("interviewRecruit_") ||
            interaction.customId.startsWith("rejectRecruit_")
        )
    ) {

        return recruitButtons(interaction, client);

    }


};
