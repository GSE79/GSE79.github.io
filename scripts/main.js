////////////////////////////////////////////////
// Initialize Variables
var LT = document.getElementById("localtime");
var IC = document.getElementById("intervals");
var intervalCounter = 0;
var msgCounter = 0;
var msg = "";
var running = false;

let myVar = setInterval(myTimer ,100);
clearInterval(myVar);

var enc = new TextEncoder();
var dec = new TextDecoder();

////////////////////////////////////////////////
// Defiine Functions and Objects

////////////////////////////////
// Main Thread Timer Object and  Callbacks
function startTimer() {
  if(!running)
  {
    myVar = setInterval(myTimer ,100);
    running = true;
  }
  
}
  
function stopTimer() {
  if(running)
  {
    clearInterval(myVar);
    running = false;
    let ab2 = new Uint8Array(1);
    ab2[0] = 0;
    worker.postMessage(ab2.buffer, [ab2.buffer]);
  }
  
}

function resetTimer() {
  if(!running)
  {
    let ab2 = new Uint8Array(1);
    ab2[0] = 255;
    worker.postMessage(ab2.buffer, [ab2.buffer]);
    msgCounter = 0;
    intervalCounter = 0;
    msg = "0";
    IC.innerHTML = intervalCounter.toString() + " - " + msgCounter.toString() + " - " + (msgCounter-intervalCounter).toString()+ " - " + msg;
  }
  
}

function myTimer() {
  if(running)
  {
    const d = new Date();
    if(intervalCounter%10==0){
      LT.innerHTML = d.toLocaleTimeString();   
       
    } 
    let ab2 = new Uint8Array(1);
    ab2[0] = 1; // already running
    worker.postMessage(ab2.buffer, [ab2.buffer]);
    IC.innerHTML = intervalCounter.toString() + " - " + msgCounter.toString() + " - " + (msgCounter-intervalCounter).toString()+ " - " + msg;
    
    intervalCounter++;
  }
  
}


//////////////////////////////
// Main Thread Launch of WebWorker, assign msgListner
if (typeof(Worker) !== "undefined") {

    var worker = new Worker('scripts/worker.js');
    worker.addEventListener('message',function(e){
      // we got a message / array buffer from the worker thread
      msgCounter++; 
      let dat = new Uint8Array(e.data);
      msg = dec.decode(dat);
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







