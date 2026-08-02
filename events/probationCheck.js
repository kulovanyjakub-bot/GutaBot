const {
    Events,
    EmbedBuilder
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");



module.exports = {


    name: Events.ClientReady,



    async execute(client){



        console.log(
            "✅ Kontrola zkušební doby aktivní"
        );




        async function checkProbation(){



            const members =

                memberDB.loadMembers();






            const now =

                new Date();







            for(const data of members){



                if(
                    !data.probation
                )
                    continue;





                if(
                    data.probationChecked
                )
                    continue;







                if(
                    !data.milSimJoinDate
                )
                    continue;







                const joinDate =

                    new Date(

                        data.milSimJoinDate

                    );






                const diff =

                    now - joinDate;







                const threeMonths =

                    1000 *

                    60 *

                    60 *

                    24 *

                    90;







                if(
                    diff >= threeMonths
                ){





                    const guild =

                        client.guilds.cache.first();





                    if(!guild)
                        continue;







                    const member =

                        await guild.members.fetch(

                            data.id

                        ).catch(()=>null);





                    const channel =

                        guild.channels.cache.get(

                            "1471077301105197180"

                        );







                    if(channel && member){



                        const embed =


                            new EmbedBuilder()



                            .setColor("Orange")



                            .setTitle(

                                "🪖 Kontrola zkušební doby"

                            )



                            .setDescription(

`Člen ${member} dokončil 3 měsíční zkušební období.

Vyžaduje se vyhodnocení velením.`

                            )



                            .addFields(


                                {

                                    name:

                                    "🎯 Mise",

                                    value:

                                    `${data.missions || 0}`,

                                    inline:true

                                },


                                {

                                    name:

                                    "🏋️ Výcviky",

                                    value:

                                    `${data.trainings || 0}`,

                                    inline:true

                                },


                                {

                                    name:

                                    "⚡ Aktivita",

                                    value:

                                    `${data.activity || 0}/100`,

                                    inline:true

                                },


                                {

                                    name:

                                    "🤝 Týmová práce",

                                    value:

                                    `${data.teamwork || 0}/100`,

                                    inline:true

                                }


                            )


                            .setTimestamp();







                        await channel.send({



                            content:

                            `<@&1533447617957073117>`,


                            embeds:[

                                embed

                            ]



                        });



                    }









                    memberDB.updateMember(


                        data.id,


                        {

                            probationChecked:true

                        }


                    );







                    console.log(

                        `⏳ Zkušební doba dokončena: ${data.username}`

                    );




                }




            }





        }









        // kontrola při startu

        checkProbation();





        // kontrola každých 24 hodin


        setInterval(

            checkProbation,


            1000 *

            60 *

            60 *

            24

        );





    }



};
