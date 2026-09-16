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
    modelType = new Valueclass("baseModelType", null);
    modelDescription = "";    
    instanceName = new Valueclass("", null);
    deltaTime = new Valueclass(0.001, Units.Time); // s Time Loop Period
    exeSysLink = null;
    // Base Model States
    initCycles = new Valueclass(0, null);
    loopCycles = new Valueclass(0, null);
    loopsDuration = new Valueclass(0.0, Units.Time); // s Time cummulative total of all loop periods
    // Base Model Constructor
    constructor(instanceNamein, exeSysLinkIn) {
        // Dis-allow instantiation of base class: Model
        if (new.target === Model) {
            throw new Error("Cannot instantiate abstract class Model directly.");
        }        
        // Set Unique Instance Name
        this.instanceName.value = instanceNamein;
        // Link Instance with Execution System Instance
        this.exeSysLink = exeSysLinkIn;
        
        Model.modelInstanceArray.push(this);                                    // add instance reference to static array
        let staticInstanceIndex = Model.modelInstanceArray.length-1;            // latch current array size for indexing
        this.staticarrayindex = staticInstanceIndex;                            // latch static array index to model field
        Model.modelSelectionArray.push(function() {                             // add function
            let modelref = Model.modelInstanceArray[staticInstanceIndex];       // get model reference from static array
            modelref.exeSysLink.setActiveModel(modelref);                       // call bound function            
        });

        // Create Property Values Array
        this.properties = [this.modelType,
                            this.instanceName,
                            this.deltaTime
        ];
        // Create State Values Array
        this.states = [this.initCycles,
                        this.loopCycles,
                        this.loopsDuration
        ];

        // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        // Bind all methods
        methods
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
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
        this.loopCycles.value++;
        this.loopsDuration.value += this.deltaTime.value;
    }
    // The InitReInit called by ExeSys
    ExecuteInitReInit() {
        this.Init_ReInit();
        this.initCycles++;
    }



}