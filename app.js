const express = require('express')
const socketio = require("socket.io")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = socketio(server)
let  PORT = 8080;
require("dotenv").config();

require("./app-config")(app);

app.use(express.urlencoded({ extended: false }))
app.use(express.json())





// Server Testing 
app.get("/",(req,res)=>{
  res.send("heloo")
})


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
      console.log('client message: ' + msg);
    });

  socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.emit("Server","Recieve from  Server")



});


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})