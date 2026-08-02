const {
    EmbedBuilder
} = require("discord.js");


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



            // ===============================
            // LOG DO #NÁBOR-LOG
            // ===============================

            const logChannel =
                interaction.guild.channels.cache.get(
                    "SEM_DEJ_ID_NÁBOR_LOGU"
                );


            if (logChannel) {


                const logEmbed = new EmbedBuilder()

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



                await logChannel.send({

                    embeds: [
                        logEmbed
                    ]

                });


            }




            // ===============================
            // DM UCHAZEČI
            // ===============================

            await member.send({

                embeds: [

                    new EmbedBuilder()

                    .setColor("Green")

                    .setTitle("🎖 Přijat do GUTALAX MILSIM")

                    .setDescription(

`Gratulujeme ${member}!

Byl jsi přijat do jednotky **GUTALAX MILSIM**.

Byla ti přidělena role **Rekrut**.

Brzy tě bude kontaktovat náborář s dalšími informacemi.`

                    )

                    .setTimestamp()

                ]

            }).catch(() => {

                console.log(
                    "Nelze poslat DM uchazeči."
                );

            });





            // ===============================
            // ZPRÁVA V TICKETU
            // ===============================

            await interaction.update({

                content:

`✅ ${member} byl přijat do GUTALAX MILSIM.

📩 Uchazeči byla odeslána zpráva.

🗑 Ticket bude uzavřen.`,

                embeds: [],

                components: []

            });





            // ===============================
            // SMAZÁNÍ TICKETU
            // ===============================

            setTimeout(() => {


                interaction.channel.delete()

                .catch(() => {});


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

                allowedMentions: {

                    users: [
                        member.id
                    ],

                    roles: [
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




            await member.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor("Red")

                    .setTitle("❌ Přihláška zamítnuta")

                    .setDescription(

`Ahoj ${member},

děkujeme za tvůj zájem o **GUTALAX MILSIM**.

Tentokrát jsme se rozhodli nepokračovat v náboru.

Přejeme hodně štěstí.`

                    )

                    .setTimestamp()

                ]

            }).catch(()=>{});





            const logChannel =
                interaction.guild.channels.cache.get(
                    "SEM_DEJ_ID_NÁBOR_LOGU"
                );


            if(logChannel){


                await logChannel.send({

                    embeds:[

                        new EmbedBuilder()

                        .setColor("Red")

                        .setTitle("❌ Rekrut odmítnut")

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





    } catch(err){


        console.error(
            "❌ RECRUIT BUTTON ERROR:"
        );


        console.error(err);



        if(!interaction.replied && !interaction.deferred){


            await interaction.reply({

                content:
                "❌ Chyba při zpracování tlačítka.",

                ephemeral:true

            }).catch(()=>{});


        }


    }


};
