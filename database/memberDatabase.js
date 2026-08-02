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


    const data = fs.readFileSync(
        filePath,
        "utf8"
    );


    if (!data) {

        return [];

    }


    return JSON.parse(data);

}





function saveMembers(data) {


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





function addMember(member) {


    console.log(
        "📥 Ukládám člena:",
        member
    );


    const members = loadMembers();


    // ochrana proti duplicitě

    const exists = members.find(
        m => m.id === member.id
    );


    if (exists) {

        console.log(
            "⚠️ Člen už existuje:",
            member.id
        );

        return;

    }



    members.push(member);



    saveMembers(
        members
    );



    console.log(
        "✅ Člen uložen"
    );


}





function removeMember(id) {


    let members = loadMembers();


    members = members.filter(

        m => m.id !== id

    );


    saveMembers(
        members
    );


}





function getMembers() {


    return loadMembers();


}





module.exports = {

    addMember,

    removeMember,

    getMembers

};
