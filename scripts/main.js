////////////////////////////////////////////////
// Initialize Variables
var LT = document.getElementById("localtime");
var IC = document.getElementById("intervals");
var intervalCounter = 0;
var msgCounter = 0;
var msg = "";


let myVar = setInterval(myTimer ,100);
clearInterval(myVar);

////////////////////////////////////////////////
// Defiine Functions and Objects

////////////////////////////////
// Main Thread Timer Object and  Callbacks
function startTimer() {
  myVar = setInterval(myTimer ,100);
}
  
function stopTimer() {
  clearInterval(myVar);
}

function myTimer() {
  const d = new Date();
  if(intervalCounter%10==0){
    LT.innerHTML = d.toLocaleTimeString();   
     
  } 
  let ab2 = new ArrayBuffer(1);
  worker.postMessage(ab2, [ab2]);
  IC.innerHTML = intervalCounter.toString() + " - " + msgCounter.toString() + " - " + (msgCounter-intervalCounter).toString()+ " - " + msg;
  
  intervalCounter++;
}


//////////////////////////////
// Main Thread Launch of WebWorker, assign msgListner
if (typeof(Worker) !== "undefined") {

    var worker = new Worker('scripts/worker.js');
    worker.addEventListener('message',function(e){
      // we got a message / array buffer from the worker thread
      msgCounter++; 
      msg = new TextDecoder().decode(e.data);
    },false);


    // run once at startup to check transferables support
    var ab = new ArrayBuffer(1);
    worker.postMessage(ab, [ab]);
    if (ab.byteLength) {
        alert('Transferables are not supported in your browser!');
    } else {
        // Transferables are supported.
    }

    // check for TextEncoder/Decoder support
    if (!("TextEncoder" in window)) {
      alert("Sorry, this browser does not support TextEncoder...");
    }

  } else {
    alert('Web Workers are not supported in your browser!');
}







