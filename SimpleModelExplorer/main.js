///////////////////////////////////////////////////////////////////////////////
// file: main.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "main" application.

// Create the Execution System, link to gui timer period
var ModelExeSys = new modelExecutionSystem();

// Create the Model(s), link the execution system instance
var GarysGearShaft = new ideal_GearShaft("Gary's Ideal Gear Shaft", ModelExeSys);
var SholandasGearShaft = new ideal_GearShaft("Sholanda's Ideal Gear Shaft", ModelExeSys);

// Start GUI Timer
const uGUITimer = ModelExeSys.GUITimer;
const bGUITimer = uGUITimer.bind(ModelExeSys);
let guiTimer = setInterval(bGUITimer(), ModelExeSys.guitimerPeriodMS);
