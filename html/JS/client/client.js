async function connectToServer() {
   const ws = new WebSocket('ws://localhost:7071/JS/server');
   return new Promise((resolve, reject) => {
       const timer = setInterval(() => {
           if(ws.readyState === 1) {
               clearInterval(timer)
               resolve(ws);
           }
       }, 10);
   });
}

/*
$(document).ready(function () {
    $("#submit").click(function () {
       $.post("/JS/serveur",
          {
             name: "viSion",
             designation: "Professional gamer"
          },
          function (data, status) {
             //console.log(data);
          });
    });
 });
*/