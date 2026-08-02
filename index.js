client.on("interactionCreate", async (interaction) => {

    const interactionHandler = require("./events/interactionCreate");

    if (
        interaction.isButton() ||
        interaction.isModalSubmit()
    ) {
        return interactionHandler(interaction, client);
    }


    if (!interaction.isChatInputCommand()) return;


    const command = client.commands.get(
        interaction.commandName
    );


    if (!command) return;


    try {

        await command.execute(interaction);

    } catch(err){

        console.error(err);

    }

});
