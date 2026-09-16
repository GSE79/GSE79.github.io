///////////////////////////////////////////////////////////////////////////////
// file: main.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "main" application.

// Create the Execution System, link to gui timer period
var ModelExeSys = new modelExecutionSystem();
var uResetActiveModel = ModelExeSys.resetActiveModel;
var bResetActiveModel = uResetActiveModel.bind(ModelExeSys);
bResetActiveModel();

// Create the Model(s), link the execution system instance
var GarysGearShaft = new ideal_GearShaft("Gary's Ideal Gear Shaft", ModelExeSys);
var SholandasGearShaft = new ideal_GearShaft("Sholanda's Ideal Gear Shaft", ModelExeSys);

// Start GUI Timer
let guiTimer = setInterval(ModelExeSys.GUITimer.bind(ModelExeSys), 100);
