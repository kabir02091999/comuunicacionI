const express = require('express');
const app = express();//

const { createServer } = require("http") 
const { Server } = require("socket.io") 
const path = require('path')

let jugadores = 0	;


const httpServer = createServer(app);
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
    jugadores++;
    // enviar mesaje
    socket.emit("inicio", jugadores);
    console.log("conecion establecida")
    //hacertar mesaje final
    socket.on("final", (jugador) => {
        io.emit("arracar", jugador+1);

        
    })
    //desconectar
    socket.on("disconnect", () => {
        jugadores--;
        console.log("desconectado")
    })
    socket.on("atras", (jugador) => {
        io.emit("desdeatras", jugador-1);
    })
    //enviar a todos lo jugadores el mensaje
    socket.broadcast.emit('ultimo', jugadores);
    socket.emit('ultimo', jugadores);
    
});




httpServer.listen(3000);

console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
  res.send('hello')
})