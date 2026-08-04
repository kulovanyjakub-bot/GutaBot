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


            await interaction.deferUpdate();




            const userId =

                interaction.customId.replace(

                    "acceptRecruit_",

                    ""

                );





            // ===============================
            // NAČTENÍ ÚDAJŮ Z TICKETU
            // ===============================


            let recruitData = {


                vek:"Neuvedeno",


                platforma:"Neuvedeno",


                mikrofon:"Neuvedeno",


                zkusenosti:"Neuvedeno",


                proc:"Neuvedeno"


            };





            const messages =

                await interaction.channel.messages.fetch({

                    limit:10

                });





            const recruitMessage =

                messages.find(

                    m =>

                    m.embeds.length &&

                    m.embeds[0].title === "🎖 Nová přihláška"

                );





            if(recruitMessage){


                const fields =

                    recruitMessage.embeds[0].fields;





                for(const field of fields){



                    if(field.name === "Věk")

                        recruitData.vek = field.value;




                    if(field.name === "Platforma")

                        recruitData.platforma = field.value;




                    if(field.name === "Mikrofon")

                        recruitData.mikrofon = field.value;




                    if(field.name === "Zkušenosti")

                        recruitData.zkusenosti = field.value;




                    if(field.name === "Proč se chce přidat")

                        recruitData.proc = field.value;



                }


            }









            const member =

                await interaction.guild.members.fetch(

                    userId

                );









            // ROLE REKRUT


            await member.roles.add(

                "1458487234989654201"

            );









            // PROFIL


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









            await interaction.channel.setName(

                `rekrut-${member.user.username}`

            ).catch(()=>{});









            // ===============================
            // NÁBOR ARCHIV
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

                            name:"👤 Uchazeč",

                            value:`${member}`

                        },



                        {

                            name:"🎮 Platforma",

                            value:recruitData.platforma

                        },



                        {

                            name:"🎤 Mikrofon",

                            value:recruitData.mikrofon

                        },



                        {

                            name:"🪖 Zkušenosti",

                            value:recruitData.zkusenosti

                        },



                        {

                            name:"📝 Důvod vstupu",

                            value:recruitData.proc

                        },



                        {

                            name:"📅 Datum přijetí",

                            value:

                            `<t:${Math.floor(Date.now()/1000)}:d>`

                        },



                        {

                            name:"👑 Přijal",

                            value:`${interaction.user}`

                        },



                        {

                            name:"🎖 Role",

                            value:"<@&1458487234989654201>"

                        },



                        {

                            name:"⏳ Zkušební doba",

                            value:"3 měsíce"

                        }


                    )



                    .setTimestamp();





                await logChannel.send({

                    embeds:[

                        logEmbed

                    ]

                });


            }









            // DM ZPRÁVA


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

🎖 Role: Rekrut

⏳ Začíná tvoje 3 měsíční zkušební období.


GUTALAX MILSIM
Respekt. Komunikace. Tým.`


                    )


                    .setTimestamp()


                ]


            }).catch(()=>{});









            await interaction.message.edit({


                content:


                `✅ ${member} byl přijat do GUTALAX MILSIM.\n\n` +

                `🎖 Role Rekrut přidělena.\n` +

                `🎮 Platforma: ${recruitData.platforma}\n` +

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


                `🎤 **Pohovor požaduje ${member}**\n\n` +

                `<@&1533447617957073117>\n\n` +

                `Náborář prosím zahajte pohovor s uchazečem.`,



                allowedMentions:{


                    users:[member.id],


                    roles:["1533447617957073117"]


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


            await interaction.deferUpdate();




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



                await logChannel.send({


                    embeds:[


                        new EmbedBuilder()


                        .setColor("Red")


                        .setTitle(

                            "❌ Uchazeč odmítnut"

                        )


                        .addFields(


                            {

                                name:"Uchazeč",

                                value:`${member}`

                            },


                            {

                                name:"Rozhodl",

                                value:`${interaction.user}`

                            }


                        )


                        .setTimestamp()


                    ]

                });


            }









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
