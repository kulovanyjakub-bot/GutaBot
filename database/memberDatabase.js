const fs = require("fs");
const path = require("path");



const filePath =
    path.join(
        __dirname,
        "members.json"
    );







function loadMembers(){


    if(
        !fs.existsSync(filePath)
    ){

        fs.writeFileSync(
            filePath,
            "[]"
        );

    }



    return JSON.parse(

        fs.readFileSync(
            filePath,
            "utf8"
        )

    );


}








function saveMembers(data){


    fs.writeFileSync(

        filePath,

        JSON.stringify(
            data,
            null,
            4
        ),

        "utf8"

    );


}









function getMember(id){


    const members =
        loadMembers();



    return members.find(

        m =>
        m.id === id

    );


}









function createMember(member){


    const members =
        loadMembers();



    const exists =
        members.find(

            m =>
            m.id === member.id

        );



    if(!exists){


        members.push(
            member
        );


        saveMembers(
            members
        );


    }


}









function updateMember(id,data){


    const members =
        loadMembers();



    const index =
        members.findIndex(

            m =>
            m.id === id

        );



    if(index === -1)
        return;



    members[index] = {

        ...members[index],

        ...data

    };



    saveMembers(
        members
    );


}









function addTraining(
    id,
    username
){


    let members =
        loadMembers();



    let member =
        members.find(

            m =>
            m.id === id

        );




    if(!member){


        member = {


            id:id,


            username:
            username || "Neznámý",


            trainings:1,


            missions:0,


            activity:3,


            teamwork:0,


            joined:
            new Date().toISOString(),


            lastActivity:
            new Date().toISOString()


        };



        members.push(
            member
        );


    }

    else{


        if(!member.trainings){

            member.trainings = 0;

        }



        member.trainings++;





        // ===============================
        // AKTIVITA ZA VÝCVIK
        // ===============================


        if(!member.activity){

            member.activity = 0;

        }



        member.activity += 3;



        if(member.activity > 100){

            member.activity = 100;

        }






        member.lastActivity =
        new Date().toISOString();


    }




    saveMembers(
        members
    );


}









function addMission(
    id,
    username
){


    let members =
        loadMembers();



    let member =
        members.find(

            m =>
            m.id === id

        );




    if(!member){


        member = {


            id:id,


            username:
            username || "Neznámý",


            trainings:0,


            missions:1,


            activity:5,


            teamwork:0,


            joined:
            new Date().toISOString(),


            lastActivity:
            new Date().toISOString()


        };



        members.push(
            member
        );


    }

    else{


        if(!member.missions){

            member.missions = 0;

        }



        member.missions++;





        // ===============================
        // AKTIVITA ZA MISI
        // ===============================


        if(!member.activity){

            member.activity = 0;

        }



        member.activity += 5;



        if(member.activity > 100){

            member.activity = 100;

        }






        member.lastActivity =
        new Date().toISOString();


    }




    saveMembers(
        members
    );


}









function updateEvaluation(
    id,
    activity,
    teamwork
){


    const members =
        loadMembers();



    const member =
        members.find(

            m =>
            m.id === id

        );



    if(!member)
        return;



    member.activity =
    activity;



    member.teamwork =
    teamwork;



    saveMembers(
        members
    );


}









function updateRank(
    id,
    rank
){


    const members =
        loadMembers();



    const member =
        members.find(

            m =>
            m.id === id

        );



    if(!member)
        return;



    member.rank =
    rank;



    saveMembers(
        members
    );


}









module.exports = {


    loadMembers,

    getMember,

    createMember,

    updateMember,

    addTraining,

    addMission,

    updateEvaluation,

    updateRank


};
