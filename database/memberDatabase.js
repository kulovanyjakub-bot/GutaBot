const fs = require("fs");
const path = require("path");


const filePath = path.join(
    __dirname,
    "members.json"
);



function loadMembers() {

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
            filePath,
            "[]"
        );
    }


    return JSON.parse(
        fs.readFileSync(filePath)
    );

}



function saveMembers(data) {

    fs.writeFileSync(
        filePath,
        JSON.stringify(
            data,
            null,
            4
        )
    );

}



function addMember(member) {


    const members = loadMembers();


    members.push(member);


    saveMembers(members);

}



function removeMember(id) {


    let members = loadMembers();


    members = members.filter(
        m => m.id !== id
    );


    saveMembers(members);

}



function getMembers() {

    return loadMembers();

}



module.exports = {

    addMember,
    removeMember,
    getMembers

};
