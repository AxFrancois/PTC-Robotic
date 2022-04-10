const socket = io('ws://localhost:8080');
console.log(socket);
socket.on('message', text => {
    console.log("on message");
    document.getElementById('txtDataReceived') += text;

});

document.getElementById('submit').onclick = () => {
    console.log("Dedans");
    const text = document.getElementById('txtCommande').value;
    socket.emit('message', text)
    console.log(text);
    
}