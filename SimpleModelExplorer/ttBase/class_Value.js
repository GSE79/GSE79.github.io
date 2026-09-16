///////////////////////////////////////////////////////////////////////////////
// file: class_Value.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "value" class definition.  Values have units to give physical meaning.
// Values have serialization and logging features.
// Values have graphical input and output features.
class Valueclass {

    constructor(ValueName, ValueDescription, ValueReference, UnitsReference){
        this.name = ValueName;
        this.description = ValueDescription;
        this.value = ValueReference;
        this.units = UnitsReference;

        // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        // Bind all methods
        methods
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
    }

    getValueString() {
        return this.value
    }

} 