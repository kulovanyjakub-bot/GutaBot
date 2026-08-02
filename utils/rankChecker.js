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







        // =================================
        // NAJDI AKTUÁLNÍ NEJVYŠŠÍ HODNOST
        // =================================


        let currentRank = null;

        let currentLevel = 0;




        for(const rank of ranks){



            if(

                member.roles.cache.has(
                    rank.id
                )

                &&

                rank.level > currentLevel

            ){


                currentRank = rank;


                currentLevel = rank.level;


            }


        }







        let newRank = null;







        // =================================
        // KONTROLA AUTOMATICKÝCH HODNOSTÍ
        // =================================


        for(const rank of ranks){



            // pouze automatické hodnosti

            if(
                !rank.automatic
            )
                continue;





            // maximálně Rotný

            if(
                rank.level > 5
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








        // už má stejnou nebo vyšší hodnost

        if(

            currentLevel >= newRank.level

        ){

            return;

        }









        // =================================
        // ODEBRÁNÍ STARÉ HODNOSTI
        // =================================


        for(const rank of ranks){



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








        // =================================
        // PŘIDÁNÍ NOVÉ HODNOSTI
        // =================================


        await member.roles.add(

            newRank.id

        );









        memberDB.updateRank(

            member.id,

            newRank.name

        );









        // =================================
        // LOG POVÝŠENÍ
        // =================================


        const channel =

            guild.channels.cache.get(

                "1471077301105197180"

            );







        if(channel){



            await channel.send({



                content:


                `🎖 **POVÝŠENÍ ČLENA**\n\n` +


                `🪖 Člen: ${member}\n\n` +


                `⬆️ Hodnost:\n` +

                `**${currentRank ? currentRank.name : "Bez hodnosti"}** ➡️ **${newRank.name}**\n\n` +


                `📊 Statistiky:\n` +

                `🎯 Mise: **${data.missions}**\n` +

                `🏋️ Výcviky: **${data.trainings}**\n` +

                `⚡ Aktivita: **${data.activity}/100**\n` +

                `🤝 Týmová práce: **${data.teamwork}/100**\n\n` +


                `🪖 **GUTALAX MILSIM**\n` +

                `Respekt. Komunikace. Tým.`



            });


        }









        console.log(


            `🎖 ${member.user.username} povýšen ${currentRank ? currentRank.name : "bez hodnosti"} → ${newRank.name}`


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
