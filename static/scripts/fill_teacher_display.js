var data = 0;
const link_name = window.location.pathname
var display = document.getElementById("body")
console.log(link_name)

function updateData(){
    display.innerHTML = data;
}
//refreshing stuff
var socket = io();
socket.on(link_name, (newInfo)=>{
    console.log("updating")
    data = newInfo
    updateData()
})