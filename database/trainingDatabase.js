const fs = require("fs");
const path = require("path");


const filePath = path.join(
    __dirname,
    "trainings.json"
);



function loadTrainings() {


    if (!fs.existsSync(filePath)) {

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




function saveTrainings(data) {


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





function createTraining(training) {


    console.log(
        "📅 Vytvářím výcvik:",
        training
    );


    const trainings =
        loadTrainings();


    trainings.push(
        training
    );


    saveTrainings(
        trainings
    );


}







function getTraining(id) {


    const trainings =
        loadTrainings();


    return trainings.find(

        t => t.id === id

    );


}







function addParticipant(trainingId, user) {


    const training =
        getTraining(trainingId);



    if(!training)
        return;



    const exists =
        training.participants.find(

            p => p.id === user.id

        );



    if(!exists){

        training.participants.push({

            id:user.id,

            username:user.username

        });

    }



    saveTrainings(
        loadTrainings().map(

            t =>
            t.id === trainingId
            ?
            training
            :
            t

        )
    );


}







function removeParticipant(trainingId, userId) {


    const training =
        getTraining(trainingId);



    if(!training)
        return;



    training.participants =
        training.participants.filter(

            p =>
            p.id !== userId

        );



    saveTrainings(
        loadTrainings().map(

            t =>
            t.id === trainingId
            ?
            training
            :
            t

        )
    );


}







module.exports = {


    createTraining,

    getTraining,

    addParticipant,

    removeParticipant


};
