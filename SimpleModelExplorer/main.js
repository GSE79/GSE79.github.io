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

/////////////////////
// SCICHART

// Equivalent of imports when using index.min.js is to declare global variables like this
const { SciChartSurface, NumericAxis, FastLineRenderableSeries, XyDataSeries } =
  SciChart;

async function initSciChart() {
  // Create the SciChartSurface in the div 'scichart-root'
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    "ttExeSys_mainview"
  );

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  // Add a series
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      dataSeries: new XyDataSeries(wasmContext, {
        xValues: [0, 1, 2, 3, 4],
        yValues: [2, 1, 4, 3, 2],
      }),
    })
  );
}

SciChartSurface.configure({
  wasmUrl: `../scichart/6.0.0-alpha.193/scichart.wasm`,
  wasmNoSimdUrl: `../scichart/6.0.0-alpha.193/scichart-nosimd.wasm`,
});

initSciChart();

// SCICHART
/////////////////////

// Start GUI Timer
let guiTimer = setInterval(ModelExeSys.GUITimer.bind(ModelExeSys), 100);
