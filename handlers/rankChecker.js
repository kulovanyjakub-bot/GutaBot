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

                rank =>

                member.roles.cache.has(

                    rank.id

                )

            );







        if(!currentRank)
            return;







        const nextRank =

            ranks.find(

                rank =>

                rank.level === currentRank.level + 1

                &&

                rank.automatic

            );







        if(!nextRank)
            return;







        if(


            data.missions < nextRank.missions

            ||

            data.trainings < nextRank.trainings

            ||

            data.activity < nextRank.activity

            ||

            data.teamwork < nextRank.teamwork


        ){

            return;

        }









        // ===============================
        // ODEBRÁNÍ STARÉ HODNOSTI
        // ===============================


        await member.roles.remove(

            currentRank.id

        ).catch(()=>{});









        // ===============================
        // PŘIDÁNÍ NOVÉ HODNOSTI
        // ===============================


        await member.roles.add(

            nextRank.id

        );








        memberDB.updateRank(

            member.id,

            nextRank.name

        );










        // ===============================
        // OZNÁMENÍ POVÝŠENÍ
        // ===============================


        const channel =

            guild.channels.cache.get(

                "1534259937532837958"

            );






        if(channel){



            await channel.send({


                content:


`🎖 **POVÝŠENÍ ČLENA**

🪖 Člen: ${member}

⬆️ Nová hodnost: **${nextRank.name}**

🎯 Mise: ${data.missions || 0}
🏋️ Výcviky: ${data.trainings || 0}
⚡ Aktivita: ${data.activity || 0}/100
🤝 Týmová práce: ${data.teamwork || 0}/100

🪖 **GUTALAX MILSIM**
Respekt. Komunikace. Tým.`


            });


        }







        console.log(

            `🎖 ${member.user.username} povýšen na ${nextRank.name}`

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
