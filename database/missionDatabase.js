const fs = require("fs");
const path = require("path");



const filePath =
    path.join(
        __dirname,
        "missions.json"
    );





function loadMissions(){


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







function saveMissions(data){


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









function createMission(mission){


    const missions =
        loadMissions();



    missions.push(
        mission
    );



    saveMissions(
        missions
    );


}









function addParticipant(
    missionId,
    user
){


    const missions =
        loadMissions();



    const mission =
        missions.find(

            m =>
            m.id === missionId

        );



    if(!mission)
        return;





    const exists =
        mission.participants.find(

            p =>
            p.id === user.id

        );



    if(!exists){


        mission.participants.push(
            user
        );


    }



    saveMissions(
        missions
    );


}









function removeParticipant(
    missionId,
    userId
){


    const missions =
        loadMissions();



    const mission =
        missions.find(

            m =>
            m.id === missionId

        );



    if(!mission)
        return;





    mission.participants =

        mission.participants.filter(

            p =>
            p.id !== userId

        );





    saveMissions(
        missions
    );


}









function getMissions(){


    return loadMissions();


}









function getMission(id){


    const missions =
        loadMissions();



    return missions.find(

        m =>
        m.id === id

    );


}









module.exports = {


    createMission,

    addParticipant,

    removeParticipant,

    getMissions,

    getMission


};
