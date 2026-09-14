///////////////////////////////////////////////////////////////////////////////
// file: class_ExeSys.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the execution system (ExeSys) class definition.  The ExeSys executes
// models and provides API access to each model.
class modelExecutionSystem {

    // Private Class Fields
    #activeModel;            // Link to the active model for execution
    #guitimerPeriodMS;        // Time Period of GUI backend execution (ms)
    #guitimerHTMLModulo;       // Modulo Value, Every Modulo cycles, html updates
    #intervalCounter;           // Execution Cycle Counter

    // InterThread Comm Variables
    command = 'test';
    value = 'textValue';
    msgCounter = 0;

    // Constructor for the Execution System Class
    constructor(guitimerPeriodMSIn, guitimerHTMLModuloIn) {
        this.#guitimerPeriodMS = guitimerPeriodMSIn;
        this.#guitimerHTMLModulo = guitimerHTMLModuloIn;
        this.#activeModel = null;
        this.#intervalCounter = 0;
    }

    /////////////////////////////////////////////////////////////////
    // Private method to update html elements
    #updateHTML() {
        // ExeSys HTML

        // Models HTML
        if(this.#activeModel != null)
        {

        }
    }

    /////////////////////////////////////////////////////////////////
    // TIMER CALLBACK - called once per gui timer period
    GUITimer() {

        // once per gui timer period
        // prepare container for possible
        // command and value strings
        let workermessagearray = "";

        // once per gui timer period
        // execute the models
        if(this.#activeModel != null)
        {

        }

        // execute every nth cycle
        // update relevant HTML
        // prepare next worker message
        if (this.#intervalCounter % this.#guitimerHTMLModulo == 0) {
            ModelExeSys.updateHTML();
        }

        // once per gui timer period
        // if a message should be sent this cycle
        if (workermessagearray.length > 0) {
            worker.postMessage(workermessagearray);  // send the message to the worker
        }

        // once per gui timer period
        // increment counter
        this.#intervalCounter++;
    }


    /////////////////////////////////////////////////////////////////
    // WORKER MESSAGE CALLBACK - On each rx'd msg
    workerMsgParse(workermessage) {
        // we got a message,  from the worker thread
        msgCounter++;

        const receivedString = workermessage.data;

        if(receivedString.length > 0)
        {

        }
    }

}