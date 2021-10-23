var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('change', (e)=> {
    e.preventDefault();
    if (input.value) {
        socket.emit('formchange', input.value);
    }
});