///////////////////////////////////////////////////////////////////////////////
// file: class_Model.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "model" class definition.  Models combine two collections of
// values with two methods called for execution, init() and loop().
// Properties are a collection of values that describe a model.  Properties
// can be saved and restored.  States are a collection of values also.
class Model {
    // Static Model Properties
    static modelInstanceArray = [];
    static modelSelectionArray = [];
    // Base Model Properties
    modelType = "baseModelType";
    modelDescription = "";    
    instanceName = "";
    deltaTime = 0.001; // s Time Loop Period
    exeSysLink = null;
    // Base Model States
    initCycles = 0;
    loopCycles = 0;
    loopsDuration = 0.0; // s Time cummulative total of all loop periods
    // Base Model Constructor
    constructor(instanceName, exeSysLinkIn) {
        // Dis-allow instantiation of base class: Model
        if (new.target === Model) {
            throw new Error("Cannot instantiate abstract class Model directly.");
        }        
        // Set Unique Instance Name
        this.instanceName = instanceName;
        // Link Instance with Execution System Instance
        this.exeSysLink = exeSysLinkIn;
        
        // Create Property Values Array
        this.properties = [new Valueclass(this.modelType, null),
                            new Valueclass(this.instanceName, null),
                            new Valueclass(this.deltaTime, Units.Time)
        ];
        // Create State Values Array
        this.states = [new Valueclass(this.initCycles, null),
                        new Valueclass(this.loopCycles, null),
                        new Valueclass(this.loopsDuration, Units.Time)
        ];
         
        Model.modelInstanceArray.push(this);                                    // add instance reference to static array
        let staticInstanceIndex = Model.modelInstanceArray.length-1;            // latch current array size for indexing
        Model.modelSelectionArray.push(function() {                             // add function
            const modelref = Model.modelInstanceArray[staticInstanceIndex];     // get model reference from static array
            const exesysref = modelref.exeSysLink;                              // get exesys reference from model
            const ufunc = exesysref.setActiveModel;                             // get unbound function
            const bfunc = ufunc.bind(exesysref);                                // bind to model's exesyslink
            bfunc(modelref);                                                    // call bound function
            console.log("modelfunction()");               
        });
    }
    // Init / Re-Init Method
    Init_ReInit() {
        throw new Error("Abstract method 'Init_ReInit' must be implemented.");
    }
    // Time Loop Method
    Time_Loop() {
        throw new Error("Abstract method 'Loop' must be implemented.");
    }
    // The Timed Loop called by ExeSys
    ExecuteTimeSlice() {
        this.Time_Loop();
        this.loopCycles++;
        this.loopsDuration += this.deltaTime;
    }
    // The InitReInit called by ExeSys
    ExecuteInitReInit() {
        this.Init_ReInit();
        this.initCycles++;
    }



}