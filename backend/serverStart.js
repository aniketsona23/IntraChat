const mongoose = require("mongoose")
const port = process.env.PORT
const db_url = process.env.DB_URI

function startServer(server){
    mongoose.connect(db_url)
    .then(()=>{
        console.log("[+] Connected to Database")
        server.listen(port, ()=>{
            console.log("Server started at http://localhost:"+port);
        })
    }).catch((err)=>{
        console.log(`[-] Error : ${err} `)
    })
}
module.exports= startServer