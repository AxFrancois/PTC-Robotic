function SendRecieve(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "/JS/sender.js");

    xmlhttp.onreadystatechange = function()
    {
        // DONE
        if (xmlhttp.readyState == 4)
        {
            switch(xmlhttp.status)
            {
                case 200:
                    //alert("OK");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                case 500:
                    alert("Internal Server Error");
                    break;
                default:
                    alert("Unexpected Error. HTTP Status: " + xmlhttp.status);
            }
        }
    };
    xmlhttp.send();
  }