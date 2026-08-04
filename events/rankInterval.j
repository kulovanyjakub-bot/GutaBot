const rankChecker =
require("../utils/rankChecker");


module.exports = {


    name:"ready",


    async execute(client){


        setInterval(async()=>{


            console.log(
                "🔄 Kontrola automatických povýšení..."
            );


            for(
                const guild of client.guilds.cache.values()
            ){


                const members =
                await guild.members.fetch();



                for(
                    const member of members.values()
                ){


                    await rankChecker(
                        member,
                        guild
                    );


                }


            }


        }, 86400000); // 24 hodin


    }


};
