var data = 0;
var display = document.getElementById("body")
console.log("on")

function updateData(){
    display.innerHTML = data;
}
//refreshing stuff
var socket = io();
socket.on('formchange', (newInfo)=>{
    console.log("updating")
    data = newInfo
    updateData()
})