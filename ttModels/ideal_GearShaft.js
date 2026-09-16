///////////////////////////////////////////////////////////////////////////////
// file: ideal_GearShaft.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is a model definition for an Ideal Gear Shaft.  An Ideal Gear Shaft
// has no friction and is infinitely stiff.  The total inertia is lumped; 
// mismatch of input and output inertias is not considered.
class ideal_GearShaft extends Model {
    
    // Public Model Constructor
    constructor(instanceName, exeSysLinkIn){
        // Sets unique instance name and links the exesys instance
        super(instanceName, exeSysLinkIn);
        // Set Model Type
        this.modelType.value = "ideal_GearShaft";
        this.modelDescription.value = "The ideal gear shaft has no friction and is infinitely stiff.  Total inertia is lumped; mismatch of input/output inertias is not considered.  Dynamics are driven by a Net Torque applied as the sum of Input Torque and Distrubance Torque";
        // Public Model Properties
        this.inertia = new Valueclass(1.0,Units.Inertia);           // kg*m^2 Lumped inertia of gear shaft    
        this.properties.push(this.inertia);
        // Public Model States
        this.inputTorque = new Valueclass(0.0,Units.Torque);        // (kg*m^2)/(s^2) Torque applied as input to drive dynamics
        this.states.push(this.inputTorque);
        this.disturbanceTorque = new Valueclass(0.0,Units.Torque);  // (kg*m^2)/(s^2) Torque applied as disturbance also drives dynamics
        this.states.push(this.disturbanceTorque);
        this.netTorque = new Valueclass(0.0,Units.Torque);          // (kg*m^2)/(s^2) Net Torque, sum of input+disturbance
        this.states.push(this.netTorque);
        this.acceleration = new Valueclass(0.0,Units.AngleAccel);   // rad/s^2  Angular acceleration of gear shaft
        this.states.push(this.acceleration);
        this.velocity = new Valueclass(0.0,Units.AngleVel);         // rad/s    Angular velocity of gear shaft
        this.states.push(this.velocity);        
        this.position = new Valueclass(0.0,Units.Angle);            // rad      Angular position of gear shaft
        this.states.push(this.position);
        
         // Get all defined class methods
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        // Bind all methods
        methods
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
    }
    // Init / Re-Init of Ideal Gear Shaft Model
    Init_ReInit(...args){
        ; // do nothing???
    }
    // Time Loop of Ideal Gear Shaft Model
    // - this is where physics is calculated
    Time_Loop(...args){
        // net torque is the sum of all torques acting on the inertia
        netTorque = disturbanceTorque + inputTorque; 
        // angular acceleration is the net torque divided by inertia
        acceleration = netTorque / inertia;
        // velocity is in the integral of acceleration
        velocity += acceleration * deltaTime;
        // position is in the integral of velocity
        position += velocity * deltaTime;
    }
}