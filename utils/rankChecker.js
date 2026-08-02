const ranks =
    require("../config/ranks");


const memberDB =
    require("../database/memberDatabase");





async function rankChecker(member, guild){


    try{


        const data =
            memberDB.getMember(
                member.id
            );



        if(!data)
            return;





        let currentRank =
            ranks.find(

                r =>
                member.roles.cache.has(
                    r.id
                )

            );





        let newRank = null;





        for(
            const rank of ranks
        ){


            if(
                !rank.automatic
            )
                continue;




            if(

                data.missions >= rank.missions &&

                data.trainings >= rank.trainings &&

                data.activity >= rank.activity &&

                data.teamwork >= rank.teamwork

            ){

                newRank = rank;

            }


        }







        if(!newRank)
            return;







        if(

            currentRank &&

            currentRank.level >= newRank.level

        ){

            return;

        }







        // odebrání starých hodností


        for(
            const rank of ranks
        ){


            if(
                member.roles.cache.has(
                    rank.id
                )
            ){


                await member.roles.remove(
                    rank.id
                );


            }


        }








        // přidání nové hodnosti


        await member.roles.add(

            newRank.id

        );







        memberDB.updateRank(

            member.id,

            newRank.name

        );









        const channel =

            guild.channels.cache.get(

                "1471077301105197180"

            );







        if(channel){


            await channel.send({


                content:

                `🎖 **POVÝŠENÍ ČLENA**\n\n` +

                `🪖 Člen: ${member}\n\n` +

                `⬆️ Nová hodnost: **${newRank.name}**\n\n` +

                `🎯 Mise: ${data.missions}\n` +

                `🏋️ Výcviky: ${data.trainings}\n` +

                `⚡ Aktivita: ${data.activity}/100\n` +

                `🤝 Týmová práce: ${data.teamwork}/100\n\n` +

                `🪖 **GUTALAX MILSIM**\n` +

                `Respekt. Komunikace. Tým.`


            });


        }






        console.log(

            `🎖 ${member.user.username} povýšen na ${newRank.name}`

        );



    }


    catch(err){


        console.error(

            "RANK CHECK ERROR:",

            err

        );


    }


}






module.exports = rankChecker;
