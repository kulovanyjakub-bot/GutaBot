
const fs = require("fs");
const path = require("path");


const filePath = path.join(
    __dirname,
    "trainings.json"
);



function loadTrainings() {


    if(!fs.existsSync(filePath)){

        fs.writeFileSync(
            filePath,
            "[]"
        );

    }


    return JSON.parse(
        fs.readFileSync(
            filePath
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
        )

    );


}





function createTraining(training){


    const trainings =
        loadTrainings();


    trainings.push(training);


    saveTrainings(
        trainings
    );


}





function getTraining(id){


    const trainings =
        loadTrainings();


    return trainings.find(
        t => t.id === id
    );


}





function updateTraining(id,data){


    const trainings =
        loadTrainings();



    const index =
        trainings.findIndex(
            t => t.id === id
        );



    if(index === -1)
        return;



    trainings[index] = {

        ...trainings[index],

        ...data

    };



    saveTrainings(
        trainings
    );


}





function addParticipant(trainingId,user){


    const training =
        getTraining(trainingId);



    if(!training)
        return;



    if(!training.participants.includes(user.id)){


        training.participants.push({

            id:user.id,

            username:user.username

        });


    }



    updateTraining(

        trainingId,

        training

    );


}





function removeParticipant(trainingId,userId){


    const training =
        getTraining(trainingId);



    if(!training)
        return;



    training.participants =
        training.participants.filter(

            u => u.id !== userId

        );



    updateTraining(

        trainingId,

        training

    );


}





module.exports = {


    createTraining,

    getTraining,

    updateTraining,

    addParticipant,

    removeParticipant


};
