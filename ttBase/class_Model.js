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
    
    // Base Model Constructor
    constructor(instanceNamein, exeSysLinkIn) {

        // Dis-allow instantiation of base class: Model
        if (new.target === Model) {
            throw new Error("Cannot instantiate abstract class Model directly.");
        }   
        
        // Add this instance to static array with static function to set the instance as active model on exesys
        Model.modelInstanceArray.push(this);                                    // add instance reference to static array
        let staticInstanceIndex = Model.modelInstanceArray.length-1;            // latch current array size for indexing
        this.staticarrayindex = staticInstanceIndex;                            // latch static array index to model field
        Model.modelSelectionArray.push(function() {                             // add function
            const modelref = Model.modelInstanceArray[staticInstanceIndex];     // get model reference from static array
            const exesysref = modelref.exeSysLink;                              // get exesys reference from model
            const ufunc = exesysref.setActiveModel;                             // get unbound function
            const bfunc = ufunc.bind(exesysref);                                // bind to model's exesyslink
            bfunc(modelref);                                                    // call bound function           
        });
        
        // Set Unique Instance Name
        this.instanceName = new Valueclass(instanceNamein, null);

        // Link Model Instance with Execution System Instance
        this.exeSysLink = exeSysLinkIn;

        // Base Model Properties
        this.modelType = new Valueclass("baseModelType", null);
        this.modelDescription = new Valueclass("abstract base class from which models are built", null);           
        this.deltaTime = new Valueclass(0.001, Units.Time); // s Time Loop Period

        // Base Model States
        this.initCycles = new Valueclass(0, null);
        this.loopCycles = new Valueclass(0, null);
        this.loopsDuration = new Valueclass(0.0, Units.Time); // s Time cummulative total of all loop periods
        
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