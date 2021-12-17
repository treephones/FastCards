document.getElementById("send").onclick = () => {
    var xhttp = new XMLHttpRequest();
    var er = document.getElementById("err");
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4) {
            var end = new Date();
            try {
                document.getElementById("res").value = JSON.stringify(JSON.parse(xhttp.responseText), undefined, 4);
                er.textContent = "";
                document.getElementById("time").textContent = `Time: ${end-start} ms`;
                document.getElementById("status").textContent = `Status: ${xhttp.status}`;
            }
            catch {
                er.textContent = "Something wrong with request.";
            }
        }
    };
    var ta = document.getElementById("jsa")
    xhttp.open("POST", "/api/flashcards", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    try {
        let tav = JSON.parse(ta.value);
        xhttp.send(ta.value);
        var start = new Date();
    }
    catch {
        er.textContent = "Something wrong with request.";
    }
}