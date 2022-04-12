const socket = io('ws://localhost:8080');

const cmdTerminal = document.getElementById('cmdTerminal');
const cmdSubmit = document.getElementById('cmdSubmit');

socket.on('message', text => {
    cmdTerminal.value += text+"\n";
});

document.getElementById('submit').onclick = () => {
    const text = cmdSubmit.value;
    socket.emit('message', text);
}
