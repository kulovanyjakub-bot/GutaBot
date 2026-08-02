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



    console.log(
        "✅ Vytvořen výcvik:",
        JSON.stringify(
            training,
            null,
            4
        )
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






    if(
        !training.participants
    ){

        training.participants = [];

    }








    const exists =
        training.participants.find(

            p =>
            p.id === user.id

        );





    if(!exists){


        training.participants.push({

            id:
            user.id,


            username:
            user.username

        });


    }






    console.log(
        "✅ Přidávám účastníka:",
        JSON.stringify(
            training,
            null,
            4
        )
    );





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



    console.log(
        "❌ Odebrán účastník:",
        userId
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
