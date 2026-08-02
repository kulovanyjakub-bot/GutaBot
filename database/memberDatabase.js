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


    let member =
        getMember(id);



    if(!member)
        return;



    member.trainings++;


    member.lastActivity =
        new Date().toISOString();



    updateMember(

        id,

        member

    );


}








function addMission(id){


    let member =
        getMember(id);



    if(!member)
        return;



    member.missions++;


    member.lastActivity =
        new Date().toISOString();



    updateMember(

        id,

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
