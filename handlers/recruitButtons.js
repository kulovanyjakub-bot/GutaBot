const {
    EmbedBuilder
} = require("discord.js");


// KANÁLY

const LOG_CHANNEL_ID = "1533447352684380361";

const ARCHIVE_CHANNEL_ID = "1533467882720202812";


// ROLE

const RECRUIT_ROLE_ID = "1458487234989654201";

const RECRUITER_ROLE_ID = "1533447617957073117";



module.exports = async (interaction) => {


    try {



        // ===============================
        // PŘIJMOUT REKRUTA
        // ===============================


        if(interaction.customId.startsWith("acceptRecruit_")){


            const userId = interaction.customId.replace(
                "acceptRecruit_",
                ""
            );


            const member =
                await interaction.guild.members.fetch(userId);



            await member.roles.add(
                RECRUIT_ROLE_ID
            );



            await interaction.channel.setName(
                `rekrut-${member.user.username}`
            ).catch(()=>{});





            // LOG

            const logChannel =
                interaction.guild.channels.cache.get(
                    LOG_CHANNEL_ID
                );


            if(logChannel){


                await logChannel.send({

                    embeds:[

                        new EmbedBuilder()

                        .setColor("Green")

                        .setTitle("✅ Rekrut přijat")

                        .addFields(

                            {
                                name:"Uchazeč",
                                value:`${member}`
                            },

                            {
                                name:"Přijal",
                                value:`${interaction.user}`
                            }

                        )

                        .setTimestamp()

                    ]

                });


            }






            // ARCHIV

            const archiveChannel =
                interaction.guild.channels.cache.get(
                    ARCHIVE_CHANNEL_ID
                );


            if(archiveChannel){


                await archiveChannel.send({

                    embeds:[

                        new EmbedBuilder()

                        .setColor("Green")

                        .setTitle("📁 Nábor archiv - přijat")

                        .addFields(

                            {
                                name:"Uchazeč",
                                value:`${member}`
                            },

                            {
                                name:"Výsledek",
                                value:"✅ Přijat"
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







            // DM UCHAZEČ


            await member.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor("Green")

                    .setTitle("🎖 Přijat do GUTALAX MILSIM")

                    .setDescription(

`Gratulujeme ${member}!

Byl jsi přijat do jednotky **GUTALAX MILSIM**.

Byla ti přidělena role **Rekrut**.

Náborář tě bude kontaktovat s dalšími informacemi.`

                    )

                    .setTimestamp()

                ]

            }).catch(()=>{});







            await interaction.update({

                content:

`✅ ${member} byl přijat.

📩 Uchazeči byla odeslána zpráva.

🗑 Ticket bude uzavřen.`,

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


        if(interaction.customId.startsWith("interviewRecruit_")){


            const userId = interaction.customId.replace(
                "interviewRecruit_",
                ""
            );


            const member =
                await interaction.guild.members.fetch(userId);



            await interaction.reply({

                content:

`${member}

🎤 **Pohovor požadován**

<@&${RECRUITER_ROLE_ID}>

Náborář prosím zahajte pohovor s uchazečem.`,

                allowedMentions:{

                    users:[
                        member.id
                    ],

                    roles:[
                        RECRUITER_ROLE_ID
                    ]

                }

            });



            return;


        }









        // ===============================
        // ODMÍTNOUT
        // ===============================


        if(interaction.customId.startsWith("rejectRecruit_")){


            const userId = interaction.customId.replace(
                "rejectRecruit_",
                ""
            );


            const member =
                await interaction.guild.members.fetch(userId);





            const archiveChannel =
                interaction.guild.channels.cache.get(
                    ARCHIVE_CHANNEL_ID
                );


            if(archiveChannel){


                await archiveChannel.send({

                    embeds:[

                        new EmbedBuilder()

                        .setColor("Red")

                        .setTitle("📁 Nábor archiv - odmítnut")

                        .addFields(

                            {
                                name:"Uchazeč",
                                value:`${member}`
                            },

                            {
                                name:"Výsledek",
                                value:"❌ Odmítnut"
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






            await member.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor("Red")

                    .setTitle("❌ Nábor zamítnut")

                    .setDescription(

`Děkujeme za zájem o **GUTALAX MILSIM**.

Tentokrát jsme se rozhodli v náboru nepokračovat.`

                    )

                    .setTimestamp()

                ]

            }).catch(()=>{});







            await interaction.update({

                content:

`❌ ${member} byl odmítnut.

🗑 Ticket bude uzavřen.`,

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
        // UZAVŘÍT TICKET
        // ===============================


        if(interaction.customId === "closeRecruitTicket"){



            const archiveChannel =
                interaction.guild.channels.cache.get(
                    ARCHIVE_CHANNEL_ID
                );



            if(archiveChannel){


                await archiveChannel.send({

                    embeds:[


                        new EmbedBuilder()

                        .setColor("Grey")

                        .setTitle("🔒 Ticket uzavřen")

                        .addFields(

                            {
                                name:"Ticket",
                                value:interaction.channel.name
                            },

                            {
                                name:"Uzavřel",
                                value:`${interaction.user}`
                            }

                        )

                        .setTimestamp()


                    ]

                });


            }







            await interaction.update({

                content:

`🔒 Ticket uzavřen uživatelem ${interaction.user}.

🗑 Kanál bude odstraněn za 5 sekund.`,

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
            "❌ RECRUIT BUTTON ERROR:"
        );


        console.error(err);



        if(
            !interaction.replied &&
            !interaction.deferred
        ){


            await interaction.reply({

                content:
                "❌ Nastala chyba.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
