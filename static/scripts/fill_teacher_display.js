var data = [];
var display = document.getElementById("output")


//refreshing stuff
var socket = io();
socket.on('formchange', (newInfo)=>{
    data.push(newInfo)
})