var data = 0;
const link_name = window.location.pathname
var display = document.getElementById("body")

function updateData(){
    display.innerHTML = data;
}
//refreshing stuff
var socket = io();
socket.on(link_name, (newInfo)=>{
    console.log(newInfo)
    console.log("updating")
    data = newInfo
    updateData()
})