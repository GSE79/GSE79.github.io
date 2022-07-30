/////////////////////////////////////////////////////////////
// Declare Variables
let msgCounter = 0;
let running = false;
var intervalCounter = 0;
let myVar = setInterval(myTimer ,100);
clearInterval(myVar);

////////////////////////////////////////////////////////////
// Define message handler callback
self.addEventListener('message', function(e){
    // we got a message / array buffer from the main thread
    msgCounter++;
    if(running==true){
      clearInterval(myVar);
    }else{
      myVar = setInterval(myTimer ,100);
    }
  }, false);


///////////////////////////////////////////////////////////
// Define worker thread timer object and callback
function myTimer() {
  const d = new Date();
  if(intervalCounter%10==0){
    // once per second    
    ;
  }
  // ten times per second
  let ab = new ArrayBuffer(msgCounter.toString());
    this.postMessage(ab, [ab]);
  intervalCounter++;
}

