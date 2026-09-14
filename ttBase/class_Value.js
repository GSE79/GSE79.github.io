///////////////////////////////////////////////////////////////////////////////
// file: class_Value.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "value" class definition.  Values have units to give physical meaning.
// Values have serialization and logging features.
// Values have graphical input and output features.
class Value {

    constructor(InitialValue = 0.0, UnitsReference = null){
        this.value = InitialValue;
        this.UnitsReference = UnitsReference;
    }

} 