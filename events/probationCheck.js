const {
    Events,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
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





            const now = new Date();





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







                const days =

                    (now - joinDate)

                    /

                    (1000 * 60 * 60 * 24);








                // 3 měsíce cca 90 dní


                if(
                    days < 90
                )
                    continue;









                const guild =

                    client.guilds.cache.first();





                if(!guild)
                    continue;









                const member =

                    await guild.members.fetch(

                        data.id

                    )

                    .catch(()=>null);







                if(!member)
                    continue;








                const channel =

                    guild.channels.cache.get(

                        "1471077301105197180"

                    );







                if(channel){



                    const embed =


                        new EmbedBuilder()


                        .setColor("Orange")


                        .setTitle(

                            "🪖 Kontrola zkušební doby"

                        )


                        .setDescription(

`Člen ${member} dokončil 3 měsíční zkušební období.

Je potřeba rozhodnutí velení.`

                        )



                        .addFields(



                            {

                                name:"🎯 Mise",

                                value:

                                `${data.missions || 0}`,

                                inline:true

                            },



                            {

                                name:"🏋️ Výcviky",

                                value:

                                `${data.trainings || 0}`,

                                inline:true

                            },



                            {

                                name:"⚡ Aktivita",

                                value:

                                `${data.activity || 0}/100`,

                                inline:true

                            },



                            {

                                name:"🤝 Týmová práce",

                                value:

                                `${data.teamwork || 0}/100`,

                                inline:true

                            }


                        )



                        .setTimestamp();








                    const buttons =


                        new ActionRowBuilder()



                        .addComponents(



                            new ButtonBuilder()

                            .setCustomId(

                                `acceptMilsim_${data.id}`

                            )

                            .setLabel(

                                "Přijmout MILSIM"

                            )

                            .setStyle(

                                ButtonStyle.Success

                            ),





                            new ButtonBuilder()

                            .setCustomId(

                                `extendProbation_${data.id}`

                            )

                            .setLabel(

                                "Prodloužit"

                            )

                            .setStyle(

                                ButtonStyle.Secondary

                            ),





                            new ButtonBuilder()

                            .setCustomId(

                                `rejectMilsim_${data.id}`

                            )

                            .setLabel(

                                "Ukončit členství"

                            )

                            .setStyle(

                                ButtonStyle.Danger

                            )



                        );









                    await channel.send({



                        content:

                        `<@&1533447617957073117>`,



                        embeds:[

                            embed

                        ],



                        components:[

                            buttons

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









        // kontrola po startu bota


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
