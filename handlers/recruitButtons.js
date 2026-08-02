const {
    EmbedBuilder
} = require("discord.js");


const db = require("../database/memberDatabase");



module.exports = async (interaction) => {


    try {



        // ===============================
        // PŘIJMOUT REKRUTA
        // ===============================

        if (interaction.customId.startsWith("acceptRecruit_")) {



            const userId = interaction.customId.replace(
                "acceptRecruit_",
                ""
            );



            const member =
                await interaction.guild.members.fetch(userId);



            // Přidání role Rekrut

            await member.roles.add(
                "1458487234989654201"
            );



            // Uložení do databáze

            db.addMember({

                id: member.id,

                username: member.user.username,

                discordTag: member.user.tag,

                role: "Rekrut",

                joined: new Date().toISOString()

            });





            // Přejmenování ticketu

            await interaction.channel.setName(
                `rekrut-${member.user.username}`
            );





            // Nábor log

            const logChannel =
                interaction.guild.channels.cache.get(
                    "1533467882720202812"
                );



            if (logChannel) {


                const logEmbed =
                    new EmbedBuilder()

                    .setColor("Green")

                    .setTitle("✅ Rekrut přijat")

                    .addFields(

                        {
                            name: "Uchazeč",
                            value: `${member}`
                        },

                        {
                            name: "Přijal",
                            value: `${interaction.user}`
                        },

                        {
                            name: "Role",
                            value: "<@&1458487234989654201>"
                        }

                    )

                    .setTimestamp();



                logChannel.send({

                    embeds:[
                        logEmbed
                    ]

                });


            }





            // DM zpráva uchazeči

            await member.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor("Green")

                    .setTitle("🎖 Přijat do GUTALAX MILSIM")

                    .setDescription(

`Gratulujeme ${member}!

Byl jsi přijat do jednotky **GUTALAX MILSIM**.

Byla ti přidělena role **Rekrut**.

Nyní čekej na další instrukce od velení.`

                    )

                    .setTimestamp()

                ]

            }).catch(()=>{});







            // uzavření ticketu

            await interaction.deferUpdate();



            await interaction.message.edit({

                content:

`✅ ${member} byl přijat do GUTALAX MILSIM.

🎖 Role Rekrut přidělena.
📁 Záznam uložen do evidence.`,

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


        if (interaction.customId.startsWith("interviewRecruit_")) {



            const userId = interaction.customId.replace(
                "interviewRecruit_",
                ""
            );



            const member =
                await interaction.guild.members.fetch(userId);





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


        if (interaction.customId.startsWith("rejectRecruit_")) {



            const userId = interaction.customId.replace(
                "rejectRecruit_",
                ""
            );



            const member =
                await interaction.guild.members.fetch(userId);





            const logChannel =
                interaction.guild.channels.cache.get(
                    "1533467882720202812"
                );



            if(logChannel){


                logChannel.send({

                    embeds:[

                        new EmbedBuilder()

                        .setColor("Red")

                        .setTitle("❌ Uchazeč odmítnut")

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
            "❌ RECRUIT BUTTON ERROR:"
        );


        console.error(err);



        if(!interaction.replied && !interaction.deferred){


            interaction.reply({

                content:
                "❌ Chyba při zpracování tlačítka.",

                ephemeral:true

            }).catch(()=>{});


        }



    }



};
