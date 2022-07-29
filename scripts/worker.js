
let msgCounter = 0;

self.addEventListener('message', function(e){
    // we got a message / array buffer from the main thread
    msgCounter++;
    
  }, false);

var intervalCounter = 0;

let myVar2 = setInterval(myTimer ,100);


function myTimer() {
  const d = new Date();
  if(intervalCounter%10==0){
    // once per second    
    ;
  }
  // ten times per second
  let ab = new ArrayBuffer(8);
  let msg = new  String(ab);
    msg = msgCounter.toString(8);
    this.postMessage(ab, [ab]);
  intervalCounter++;
}

