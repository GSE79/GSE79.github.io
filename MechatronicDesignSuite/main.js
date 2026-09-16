///////////////////////////////////////////////////////////////////////////////
// file: main.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "main" application.

////////////////////////////////////////////////////////////////
// GO! - main application function
if (typeof(Worker) !== "undefined") {
    
    // Create the Execution System, link to gui timer period
    var ModelExeSys = new modelExecutionSystem();
    ModelExeSys.resetActiveModel();

    // Create the Model(s), link the execution system instance
    var GarysGearShaft = new ideal_GearShaft("Gary's Ideal Gear Shaft", ModelExeSys);
    var SholandasGearShaft = new ideal_GearShaft("Sholanda's Ideal Gear Shaft", ModelExeSys);

    // Launch WebWorker Thread
    var worker = new Worker('worker.js');

    // Assign Message Listener
    worker.addEventListener('message', ModelExeSys.workerMsgParse(), false);

    // Start GUI Timer
    let guiTimer = setInterval(ModelExeSys.GUITimer(), ModelExeSys.guitimerPeriodMS);

} else {
    alert('Web Workers are not supported in your browser!');
}
