// Your JavaScript goes here...

function loadMessages() {
    //create request instance
    request = new XMLHttpRequest();

    //set up HTTP REQUEST
    request.open("GET", "./data.json", true);

    //set up response
    request.onreadystatechange = function() {
        if (request.readystate == 4 && request.status == 200) {
            messagesDiv = document.getElementById("messages");

            theString = request.responseText;

            messages = JSON.parse(theString);

            outputString = "";
            for (i = 0; i < 2; i++) {
                outputString += "<p>" + messages[i]["content"] + "<sub> " + messages[i]["username"] + "</sub></p>";
            }
            messagesDiv.innerHTML = outputString;
        }
    };
}