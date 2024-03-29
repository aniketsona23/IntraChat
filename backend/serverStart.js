const port = process.env.PORT
const db_url = process.env.DB_URI
const { default: mongoose } = require("mongoose")

function startServer(server){
    try{    
        mongoose.connect(db_url).then(()=>{
            console.log("[+] Connected to Database")
            server.listen(port, ()=>{
                console.log("[+] Server started at http://localhost:"+port);
            })
        })
        .catch(err=>{
            console.log("[-] Failed to connect to DataBase : "+err)
        })
    }catch(err){
        console.log("[-] Server startup failed : "+err)
    }
}
module.exports= startServer