const {
    SlashCommandBuilder
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");


const ranks =
    require("../config/ranks");



const COMMAND_ROLES = [

    "1502598398736338954",

    "1502599934220701836",

    "1533447617957073117"

];




module.exports = {


    data:

    new SlashCommandBuilder()

        .setName("povýšit")

        .setDescription("Ruční povýšení člena")



        .addUserOption(option =>

            option

            .setName("člen")

            .setDescription("Člen k povýšení")

            .setRequired(true)

        )


        .addStringOption(option =>

            option

            .setName("hodnost")

            .setDescription("Nová hodnost")

            .setRequired(true)

            .addChoices(

                ...ranks.map(rank => ({

                    name: rank.name,

                    value: rank.name

                }))

            )

        ),







    async execute(interaction){



        const allowed =

            interaction.member.roles.cache.some(

                role =>

                COMMAND_ROLES.includes(
                    role.id
                )

            );





        if(!allowed){


            return interaction.reply({

                content:

                "❌ Tento příkaz může použít pouze velení.",


                ephemeral:true

            });


        }







        const user =

            interaction.options.getUser(
                "člen"
            );




        const rankName =

            interaction.options.getString(
                "hodnost"
            );







        const newRank =

            ranks.find(

                r =>

                r.name === rankName

            );





        if(!newRank){


            return interaction.reply({

                content:

                "❌ Hodnost nebyla nalezena.",


                ephemeral:true

            });


        }








        const member =

            await interaction.guild.members.fetch(

                user.id

            );








        // odebrání starých hodností


        for(

            const rank of ranks

        ){


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








        // přidání nové hodnosti


        await member.roles.add(

            newRank.id

        );








        // uložení do databáze


        memberDB.updateRank(

            user.id,

            newRank.name

        );








        const channel =

            interaction.guild.channels.cache.get(

                "1471077301105197180"

            );






        if(channel){


            await channel.send({


                content:

                `🎖 **POVÝŠENÍ ČLENA**\n\n` +

                `🪖 Člen: ${user}\n\n` +

                `⬆️ Nová hodnost: **${newRank.name}**\n\n` +

                `📜 Rozhodnutí velení\n\n` +

                `👤 Povýšil: ${interaction.user}\n\n` +

                `🪖 **GUTALAX MILSIM**\n` +

                `Respekt. Komunikace. Tým.`


            });


        }








        await interaction.reply({

            content:

            `✅ ${user} byl povýšen na **${newRank.name}**.`

        });



    }


};
