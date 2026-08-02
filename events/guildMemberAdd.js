const {
    Events
} = require("discord.js");


const memberDB =
    require("../database/memberDatabase");




module.exports = {


    name: Events.GuildMemberAdd,



    async execute(member){



        const exists =

            memberDB.getMember(

                member.id

            );





        if(exists){

            return;

        }







        const data = {


            id:

            member.id,



            username:

            member.user.username,



            missions:0,



            trainings:0,



            activity:0,



            teamwork:0,



            discipline:0,



            rank:"Rekrut",



            joined:

            new Date().toISOString(),



            lastActivity:null



        };








        memberDB.createMember(

            data

        );







        console.log(

            `✅ Vytvořen profil: ${member.user.tag}`

        );



    }


};
