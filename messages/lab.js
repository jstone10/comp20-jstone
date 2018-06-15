// Your JavaScript goes here...

function parse() {
    //create request instance
    console.log("setting up XML request");
    request = new XMLHttpRequest();

    //set up HTTP REQUEST
    request.open("GET", "data.json", true);

    //set up response
    request.onreadystatechange = function() {

        console.log(request.readyState);
        console.log(request.status);
        if (request.readyState == 4 && request.status == 200) {

            console.log("parsing request data");
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

    request.send(null);
}