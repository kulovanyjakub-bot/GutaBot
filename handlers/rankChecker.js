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






        let currentRank = null;



        for(const rank of ranks){


            if(

                member.roles.cache.has(

                    rank.id

                )

            ){

                currentRank = rank;

            }


        }







        let newRank = null;






        for(const rank of ranks){



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








        // odebrání staré hodnosti


        for(const rank of ranks){



            if(

                member.roles.cache.has(

                    rank.id

                )

            ){



                await member.roles.remove(

                    rank.id

                ).catch(()=>{});


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

⬆️ Nová hodnost: **${newRank.name}**

🎯 Mise: ${data.missions || 0}
🏋️ Výcviky: ${data.trainings || 0}
⚡ Aktivita: ${data.activity || 0}/100
🤝 Týmová práce: ${data.teamwork || 0}/100

🪖 **GUTALAX MILSIM**
Respekt. Komunikace. Tým.`


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
