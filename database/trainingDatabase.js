const fs = require("fs");
const path = require("path");



const filePath =
    path.join(
        __dirname,
        "trainings.json"
    );





function loadTrainings(){


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







function saveTrainings(data){


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








function createTraining(training){


    const trainings =
        loadTrainings();



    trainings.push(
        training
    );



    saveTrainings(
        trainings
    );


}








function addParticipant(
    trainingId,
    user
){


    const trainings =
        loadTrainings();



    const training =
        trainings.find(

            t =>
            t.id === trainingId

        );



    if(!training)
        return;





    const exists =
        training.participants.find(

            p =>
            p.id === user.id

        );



    if(!exists){


        training.participants.push(
            user
        );


    }



    saveTrainings(
        trainings
    );


}








function removeParticipant(
    trainingId,
    userId
){


    const trainings =
        loadTrainings();



    const training =
        trainings.find(

            t =>
            t.id === trainingId

        );



    if(!training)
        return;





    training.participants =

        training.participants.filter(

            p =>
            p.id !== userId

        );





    saveTrainings(
        trainings
    );


}








function getTrainings(){


    return loadTrainings();


}








function getTraining(id){


    const trainings =
        loadTrainings();



    return trainings.find(

        t =>
        t.id === id

    );


}








module.exports = {


    createTraining,

    addParticipant,

    removeParticipant,

    getTrainings,

    getTraining


};
