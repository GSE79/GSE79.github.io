///////////////////////////////////////////////////////////////////////////////
// file: main.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "main" application.

////////////////////////////////////////////////////////////////
// GO! - main application function
if (typeof(Worker) !== "undefined") {
    
    // Create GUI Timer Period and Modulo
    var guitimerPeriodMS = 100;         // 100 ms main gui timer
    var guitimerHTMLModulo = 10;        // update html every 10th cycle

    // Create the Execution System, link to gui timer period
    var ModelExeSys = new modelExecutionSystem(guitimerPeriodMS, guitimerHTMLModulo);
    var uResetActiveModel = ModelExeSys.resetActiveModel;
    var bResetActiveModel = uResetActiveModel.bind(ModelExeSys);
    bResetActiveModel();

    // Create the Model(s), link the execution system instance
    var IdealGearShaft = new ideal_GearShaft("Ideal Gear Shaft", ModelExeSys);

    // Launch WebWorker Thread
    var worker = new Worker('worker.js');

    // Assign Message Listener
    worker.addEventListener('message', ModelExeSys.workerMsgParse.bind(ModelExeSys), false);

    // Start GUI Timer
    let guiTimer = setInterval(ModelExeSys.GUITimer.bind(ModelExeSys), guitimerPeriodMS);

} else {
    alert('Web Workers are not supported in your browser!');
}
