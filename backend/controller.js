const sendMessage = (newMessage)=>{
    const recipent  = newMessage.to.name
    const recipentId = users[recipent]

    console.log(users)
    io.to(recipentId).emit("fromServer",newMessage)
    console.log( `${newMessage.from.name} : ${newMessage.msg}`);
  }
  