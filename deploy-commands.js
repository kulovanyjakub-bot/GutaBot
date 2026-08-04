const {
    REST,
    Routes
} = require("discord.js");

const fs = require("fs");
const path = require("path");

require("dotenv").config();



const commands = [];


// složka commands
const commandsPath = path.join(
    __dirname,
    "commands"
);



const commandFiles = fs.readdirSync(
    commandsPath
)
.filter(file => file.endsWith(".js"));




// načtení commandů
for (const file of commandFiles) {


    const command = require(
        path.join(
            commandsPath,
            file
        )
    );



    // pouze skutečné slash commandy
    if(command.data){


        commands.push(
            command.data.toJSON()
        );


        console.log(
            `✅ Načten command: ${file}`
        );


    }
    else {


        console.log(
            `⚠️ Přeskočen ${file} (není slash command)`
        );


    }

}




const rest = new REST({
    version:"10"
})
.setToken(
    process.env.TOKEN
);





(async () => {


    try {


        console.log(
            "Registruji příkazy..."
        );



        await rest.put(


            Routes.applicationGuildCommands(

                process.env.CLIENT_ID,

                process.env.GUILD_ID

            ),


            {
                body: commands
            }


        );



        console.log(
            `✅ Příkazy zaregistrovány (${commands.length})`
        );



    }
    catch(err){


        console.error(
            err
        );


    }



})();
