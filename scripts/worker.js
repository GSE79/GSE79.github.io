/////////////////////////////////////////////////////////////
// Declare Variables
let msgCounter = 0;
let running = false;
var intervalCounter = 0;
let myVar = setInterval(myTimer ,100);
clearInterval(myVar);
var enc = new TextEncoder();
var dec = new TextDecoder();

////////////////////////////////////////////////////////////
// Define message handler callback
self.addEventListener('message', function(e){
    // we got a message / array buffer from the main thread
    msgCounter++;
    if(running!=true){
      if(msgCounter>1)
      {
        myVar = setInterval(myTimer ,100);
        running=true;
      }
      
    }
  }, false);


///////////////////////////////////////////////////////////
// Define worker thread timer object and callback
function myTimer() {
  if(running)
  {
    const d = new Date();
    if(intervalCounter%10==0){
      // once per second    
      ;
    }
    // ten times per second
    let stringab = msgCounter.toString();
    let uint8ab = enc.encode(stringab);
    //let ab = new ArrayBuffer();
      this.postMessage(uint8ab.buffer, [uint8ab.buffer]);
    intervalCounter++;
  }
  
}

