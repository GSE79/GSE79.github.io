///////////////////////////////////////////////////////////////////////////////
// file: class_Value.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "value" class definition.  Values have units to give physical meaning.
// Values have serialization and logging features.
// Values have graphical input and output features.
class Valueclass {

    constructor(InstanceDescription, ValueReferenceorInitialValue, UnitsReference){
        this.value = ValueReferenceorInitialValue;
        this.units = UnitsReference;
        this.instancedesc = InstanceDescription;
        this.SelectedUnitsIndex = 0;
        this.treeviewLIref = null;
        this.yValues = [];
        // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        // Bind all methods
        methods
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
    }
    getValueDescriptionAndValueString() {
        if(this.units != null)
            return this.instancedesc + " : " + this.value + " " + this.units.getUnitsString(this.SelectedUnitsIndex);
        else
            return this.instancedesc + " : " + this.value;
    }
    getValueString() {
        return this.value;
    }
    addValuetoSciChart(){
        // 1. Create and populate the DataSeries
        const dataSeries = new XyDataSeries(wasmcontext, {
            xValues: ModelExeSys.activeModel.xValues,
            yValues: this.yValues,
            dataSeriesName: this.instancedesc
        });

        // 2. Create the line series and link the data
        const lineSeries = new FastLineRenderableSeries(wasmcontext, {
            stroke: "#FF6600",
            strokeThickness: 3,
            dataSeries: dataSeries
        });

        // 3. Add to the SciChartSurface (triggers automatic redraw)
        scicharsurfaceref.renderableSeries.add(lineSeries);
        

        // 4. Optional: Rescale axes to fit the new line
        scicharsurfaceref.zoomExtents();

    }

} 