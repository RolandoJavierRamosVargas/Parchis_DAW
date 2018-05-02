var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
  id: 1,
  texto: "hola tendo tierras",
  author: "pepe viruela"
}]

app.use(express.static('public'));

app.get('/',function(req, res){
  res.status(200).send("Pipas pal pajaro");
});

io.on('connection',function(socket){
  console.log("Alguien se ha conectado con socket");
  socket.emit('messages',mensajes);

  socket.on("new-message",function(data){
    mensajes.push(data);
    io.sockets.emit('messages',mensajes);
  });

  
  socket.on("dados",function(dados){
    console.log(dados[0],dados[1]);
    io.sockets.emit("actualizartitulo",dados);
  });
  
});

server.listen(9090,function(){
  console.log("Servidor iniciado por el pueto http://localhost:9090");
});
