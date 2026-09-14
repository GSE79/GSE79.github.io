///////////////////////////////////////////////////////////////////////////////
// file: class_Units.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the "units" class definition.  Units refers to physical units.
// MKS - Meters, Kilograms, Seconds is the base system.
// - Model Calculations are always performed in standard MKS
// - Properties and Values can be displayed, input, transmitted, and received
// -- in any units.
// The Units class provides accurate converstion to and from MKS units.  
// Length: (m, inches, feet)
// Mass: (kilograms, pounds)
// Time: (seconds, hours)
class Units {
    static Torque = new Units({"(kg*m^2)/(s^2)":1.0});
    static Inertia = new Units({"kg*m^2)":1.0});
    static Length = new Units({"m":1.0, "in":0.0254, "ft":0.3048});
    static Mass = new Units({"kg":1.0, "lbs":0.45359237});
    static Time = new Units({"s":1.0, "hrs":3600.0});
    static Number = new Units({"-":1.0});
    static Angle = new Units({"rad":1.0, "deg":180/Math.PI});
    static AngleVel = new Units({"rad/s":1.0, "deg/s":180/Math.PI});
    static AngleAccel = new Units({"rad/s^2":1.0, "deg/s^2":180/Math.PI});
    
    constructor(LabelConversionPairs){
        this.LabelConversionPairs = LabelConversionPairs;
    }

}