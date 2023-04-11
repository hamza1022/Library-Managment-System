const express = require('express')
const socketio = require("socket.io")
const app = express()
const http = require("http")
const { allowedOrigins } = require('./config/env/development')
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

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('message', (msg) => {
//       console.log('client message: ' + msg);
//   });

//   socket.on('disconnect', () => {
//       console.log('user disconnected');
//   });

//   socket.on("connect_error", (err) => {
//     console.log(`connect_error due to ${err.message}`);
//   });

//   socket.emit("Server","Recieve from  Server")
// });



global.LmsSocket = require("socket.io")(server, {
	cors: {
		credentials: true,
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			// console.log("ORIGIN", origin);
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	},
});

LmsSocket.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
  socket.emit("Server", "sent from server")
});



server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
