//require("babel/register");
var babel = require("babel");


class Message {
    constructor(message, type="error") {
        this.message = document.createElement("div");
        this.message.classList.add("message");
        this.message.classList.add(type);
        this.message.appendChild(document.createTextNode(message.toString()));
    }
}
class Log {
    constructor(id) {
        this.logs = document.getElementById(id);
    }

    addMessage(msg) {
        this.logs.appendChild(new Message(msg).message);
    }

    clear() {
        while(this.logs.firstChild)
            this.logs.removeChild(this.logs.firstChild);
    }
}

var log = new Log("log");
document.querySelector("#input").addEventListener("change", function(){
    var transformedCode = babel.transform(this.value).code;
    chrome.devtools.inspectedWindow.eval(transformedCode, function(result, isException) {
        if(isException) {
            log.addMessage(result, "error");
        }else{
            log.addMessage(result, "log");
        }
    });
    this.value = "";
});
