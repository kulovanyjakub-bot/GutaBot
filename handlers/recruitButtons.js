const {
    EmbedBuilder
} = require("discord.js");


const db =
    require("../database/memberDatabase");



module.exports = async (interaction) => {


    try {



        // ===============================
        // PŘIJMOUT REKRUTA
        // ===============================


        if(
            interaction.customId.startsWith(
                "acceptRecruit_"
            )
        ){



            const userId =

                interaction.customId.replace(

                    "acceptRecruit_",

                    ""

                );





            const member =

                await interaction.guild.members.fetch(

                    userId

                );







            // ===============================
            // ROLE REKRUT
            // ===============================


            await member.roles.add(

                "1458487234989654201"

            );









            // ===============================
            // VYTVOŘENÍ / ÚPRAVA PROFILU
            // ===============================



            const existing =

                db.getMember(

                    member.id

                );






            if(!existing){



                db.createMember({



                    id:

                    member.id,



                    username:

                    member.user.username,



                    missions:0,



                    trainings:0,



                    activity:0,



                    teamwork:0,



                    discipline:0,



                    rank:null,



                    role:"Rekrut",



                    probation:true,



                    milSimJoinDate:

                    new Date().toISOString(),



                    probationChecked:false,



                    joined:

                    new Date().toISOString(),



                    lastActivity:

                    new Date().toISOString()



                });



            }

            else {



                db.updateMember(

                    member.id,

                    {


                        role:"Rekrut",


                        probation:true,


                        milSimJoinDate:

                        new Date().toISOString(),


                        probationChecked:false



                    }

                );


            }









            // ===============================
            // PŘEJMENOVÁNÍ TICKETU
            // ===============================


            await interaction.channel.setName(

                `rekrut-${member.user.username}`

            );









            // ===============================
            // NÁBOR LOG
            // ===============================


            const logChannel =

                interaction.guild.channels.cache.get(

                    "1533467882720202812"

                );







            if(logChannel){



                const logEmbed =


                    new EmbedBuilder()


                    .setColor("Green")


                    .setTitle(

                        "✅ Rekrut přijat"

                    )


                    .addFields(



                        {

                            name:

                            "Uchazeč",

                            value:

                            `${member}`

                        },



                        {

                            name:

                            "Přijal",

                            value:

                            `${interaction.user}`

                        },



                        {

                            name:

                            "Role",

                            value:

                            "<@&1458487234989654201>"

                        },



                        {

                            name:

                            "Zkušební doba",

                            value:

                            "3 měsíce"

                        }



                    )


                    .setTimestamp();






                logChannel.send({


                    embeds:[

                        logEmbed

                    ]


                });


            }









            // ===============================
            // DM UCHAZEČI
            // ===============================


            await member.send({


                embeds:[



                    new EmbedBuilder()



                    .setColor("Green")



                    .setTitle(

                        "🎖 Přijat do GUTALAX MILSIM"

                    )



                    .setDescription(


`Gratulujeme ${member}!

Byl jsi přijat do jednotky **GUTALAX MILSIM**.

Byla ti přidělena role **Rekrut**.

⏳ Začíná tvoje 3 měsíční zkušební období.

Během něj sledujeme:

🪖 Chování
📡 Komunikaci
🤝 Týmovou spolupráci
🎯 Přístup k misím
🏋️ Účast na výcvicích

Po ukončení zkušební doby proběhne vyhodnocení velením.

GUTALAX MILSIM
Respekt. Komunikace. Tým.`


                    )


                    .setTimestamp()


                ]


            }).catch(()=>{});









            // ===============================
            // UKONČENÍ TLAČÍTKA
            // ===============================


            await interaction.deferUpdate();





            await interaction.message.edit({


                content:


                `✅ ${member} byl přijat do GUTALAX MILSIM.\n\n` +

                `🎖 Role Rekrut přidělena.\n` +

                `⏳ Zahájeno 3 měsíční zkušební období.\n` +

                `📁 Záznam uložen do evidence.`,



                embeds:[],


                components:[]



            });








            setTimeout(()=>{


                interaction.channel.delete()

                .catch(()=>{});


            },5000);







            return;


        }









        // ===============================
        // POHOVOR
        // ===============================


        if(

            interaction.customId.startsWith(

                "interviewRecruit_"

            )

        ){



            const userId =

                interaction.customId.replace(

                    "interviewRecruit_",

                    ""

                );



            const member =

                await interaction.guild.members.fetch(

                    userId

                );





            await interaction.reply({


                content:


`🎤 **Pohovor požaduje ${member}**

<@&1533447617957073117>

Náborář prosím zahajte pohovor s uchazečem.`,



                allowedMentions:{



                    users:[

                        member.id

                    ],



                    roles:[

                        "1533447617957073117"

                    ]


                }



            });





            return;


        }









        // ===============================
        // ODMÍTNOUT
        // ===============================


        if(

            interaction.customId.startsWith(

                "rejectRecruit_"

            )

        ){



            const userId =

                interaction.customId.replace(

                    "rejectRecruit_",

                    ""

                );



            const member =

                await interaction.guild.members.fetch(

                    userId

                );







            const logChannel =

                interaction.guild.channels.cache.get(

                    "1533467882720202812"

                );







            if(logChannel){



                logChannel.send({


                    embeds:[



                        new EmbedBuilder()



                        .setColor("Red")



                        .setTitle(

                            "❌ Uchazeč odmítnut"

                        )



                        .addFields(



                            {

                                name:

                                "Uchazeč",

                                value:

                                `${member}`

                            },


                            {

                                name:

                                "Rozhodl",

                                value:

                                `${interaction.user}`

                            }


                        )


                        .setTimestamp()



                    ]


                });



            }







            await interaction.deferUpdate();







            await interaction.message.edit({



                content:


                `❌ ${member} byl odmítnut.`,



                embeds:[],


                components:[]



            });








            setTimeout(()=>{


                interaction.channel.delete()

                .catch(()=>{});


            },5000);






            return;


        }





    }



    catch(err){



        console.error(

            "❌ RECRUIT BUTTON ERROR:",

            err

        );




        if(

            !interaction.replied &&

            !interaction.deferred

        ){



            await interaction.reply({


                content:

                "❌ Chyba při zpracování tlačítka.",



                ephemeral:true



            }).catch(()=>{});



        }



    }



};
