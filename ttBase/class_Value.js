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

        // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        // Bind all methods
        methods
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
    }
    getValueDescriptionAndValueString() {
        return this.instancedesc + " : " + this.value + " " + this.units.getUnitsString();
    }
    getValueString() {
        return this.value;
    }

} 