const mongoose = require("mongoose")

function connectDatabase(db_url){
    mongoose.connect(db_url).then(()=>{
        console.log("[+] Connected to Database")
    }).catch((err)=>{
        console.log("[-] Failed to connect to Database : "+err)
    })
}

module.exports = connectDatabase