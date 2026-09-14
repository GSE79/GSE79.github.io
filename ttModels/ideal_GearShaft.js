///////////////////////////////////////////////////////////////////////////////
// file: ideal_GearShaft.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is a model definition for an Ideal Gear Shaft.  An Ideal Gear Shaft
// has no friction and is infinitely stiff.  The total inertia is lumped; 
// mismatch of input and output inertias is not considered.
class ideal_GearShaft extends Model {
    // Public Model Properties
    inertia = 1.0;  // kg*m^2 Lumped inertia of gear shaft    
    // Public Model States
    inputTorque = 0.0; // (kg*m^2)/(s^2)
    disturbanceTorque = 0.0; // (kg*m^2)/(s^2)
    netTorque = 0.0;    // (kg*m^2)/(s^2)
    acceleration = 0.0; // rad/s^2
    velocity = 0.0; // rad/s
    position = 0.0; // rad
    // Public Model Constructor
    constructor(instanceName){
        // Sets unique instance name
        super(instanceName);
        // Set Model Type
        modelType = "ideal_GearShaft";
        // Add properties to Values array
        properties.push(new class_value(inertia,Units.Inertia));
        // Add states to Values array
        states.push(new class_value(inputTorque,Units.Torque));
        states.push(new class_value(disturbanceTorque,Units.Torque));
        states.push(new class_value(netTorque,Units.Torque));
        states.push(new class_value(acceleration,Units.AngleAccel));
        states.push(new class_value(velocity,Units.AngleVel));
        states.push(new class_value(position,Units.Angle));
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