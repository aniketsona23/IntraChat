const port = process.env.PORT
const db_url = process.env.DB_URI
const connectDatabase = require("./dbase/connectDb")

function startServer(server){
    try{    
        connectDatabase(db_url)
        server.listen(port, ()=>{
            console.log("[+] Server started at http://localhost:"+port);
        })
    }catch(err){
        console.log("[-] Server startup failed : "+err)
    }
}
module.exports= startServer