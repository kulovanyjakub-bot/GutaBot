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



        member.lastActivity =
        new Date().toISOString();


    }




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

    addMission


};
