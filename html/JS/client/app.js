const socket = io('ws://localhost:8080');

socket.on('message', text => {
    
    document.getElementById('txtDataReceived') += text;

});

document.getElementById('submit').onclick = () => {

    const text = document.getElementById('txtCommande').value;
    socket.emit('message', text)
    
}