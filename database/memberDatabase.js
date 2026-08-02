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
            "[]",
            "utf8"
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



    if(exists)
        return;



    members.push(
        member
    );



    saveMembers(
        members
    );


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









function addTraining(id){


    let members =
        loadMembers();



    let member =
        members.find(

            m =>
            m.id === id

        );





    // AUTOMATICKÉ VYTVOŘENÍ ČLENA

    if(!member){


        member = {


            id:id,


            trainings:0,


            missions:0,


            lastActivity:null


        };



        members.push(
            member
        );


    }








    if(!member.trainings){


        member.trainings = 0;


    }






    member.trainings++;




    member.lastActivity =
        new Date().toISOString();





    saveMembers(
        members
    );



    console.log(
        "✅ ULOŽEN VÝCVIK ČLENOVI:",
        member
    );


}









function addMission(id){


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


            trainings:0,


            missions:0,


            lastActivity:null


        };



        members.push(
            member
        );


    }








    if(!member.missions){


        member.missions = 0;


    }





    member.missions++;




    member.lastActivity =
        new Date().toISOString();





    saveMembers(
        members
    );



    console.log(
        "✅ ULOŽENA MISE ČLENOVI:",
        member
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
