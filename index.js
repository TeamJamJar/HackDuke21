//require libraries
const express        = require('express');
const path           = require('path');
require('dotenv').config();

//Start the server
const app = express();
const port = process.env.PORT || 5000;

//Set up socket connections
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
module.exports.io = io; //export io so that other files can use it.
io.on('connection', (socket) =>{
    console.log("connection established");
    socket.on('formchange', (sent)=>{
        io.emit(`/host${sent.roomid}`, sent.data);
    })
});
server.listen(port, () => {
    console.log(`listening on ${port}`);
});

//Use middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

//Use routes
const homeRoutes = require('./routes/home.js');
app.use('/', homeRoutes);

//404 message
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'public','404.html'));
});