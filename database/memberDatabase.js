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
            "{}"
        );

    }



    return JSON.parse(
        fs.readFileSync(
            filePath,
            "utf8"
        )
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



    members[member.id] = member;



    saveMembers(
        members
    );


}





function removeMember(id) {


    const members = loadMembers();



    delete members[id];



    saveMembers(
        members
    );


}





function getMember(id) {


    const members = loadMembers();



    return members[id];

}





function getMembers() {


    return loadMembers();


}





module.exports = {


    addMember,

    removeMember,

    getMember,

    getMembers


};
