const socket = io('ws://localhost:8080');

const cmdTerminal = document.getElementById('cmdTerminal');
const cmdSubmit = document.getElementById('cmdSubmit');

socket.on('message', text => {
    cmdTerminal.value += text+"\n";
    cmdTerminal.scrollTop = cmdTerminal.scrollHeight;
});

document.getElementById('submit').onclick = () => {
    const text = cmdSubmit.value;
    socket.emit('message', text);
}

cmdSubmit.disabled = true;

setTimeout(() => {
    var cmdTerminalLog = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            cmdTerminalLog = xmlhttp.responseText;
            cmdTerminal.value += cmdTerminalLog+"\n";
        }
    };
    xmlhttp.open("GET","/MEDIA/LOG/cmdTerminal.log",true);
    xmlhttp.send();
    cmdSubmit.disabled = false;
}, 100);