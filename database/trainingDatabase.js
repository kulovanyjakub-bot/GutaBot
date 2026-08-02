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


    console.log(
        "💾 Ukládám výcviky:",
        data
    );


    fs.writeFileSync(

        filePath,

        JSON.stringify(
            data,
            null,
            4
        ),

        "utf8"

    );


    console.log(
        "✅ Uloženo do:",
        filePath
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



    if(!training){

        console.log(
            "❌ Výcvik nenalezen:",
            trainingId
        );

        return;

    }





    const exists =
        training.participants.find(

            p =>
            p.id === user.id

        );



    if(!exists){


        training.participants.push({

            id:user.id,

            username:user.username

        });


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









module.exports = {


    createTraining,

    addParticipant,

    removeParticipant,

    getTrainings


};
