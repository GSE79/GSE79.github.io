///////////////////////////////////////////////////////////////////////////////
// file: class_ExeSys.js 
// author: Gary Eades (GSE79)
// repo: https://github.com/GSE79/GSE79.github.io
// 
// This is the execution system (ExeSys) class definition.  The ExeSys executes
// models and provides API access to each model.
class modelExecutionSystem {

    // Class Fields (consider making private...)
    //activeModel;            // Link to the active model for execution
    //guitimerPeriodMS;       // Time Period of GUI backend execution (ms)
    //guitimerHTMLModulo;     // Modulo Value, Every Modulo cycles, html updates
    //intervalCounter;        // Execution Cycle Counter
    //updateCounter;          // HTML Update Cycle Counter
    //messageOutCounter;      // Worker Request Message Counter
    //messageInCounter;       // Worker Response Message Counter

    // Constructor for the Execution System Class
    constructor(guitimerPeriodMSIn, guitimerHTMLModuloIn) {
        this.guitimerPeriodMS = guitimerPeriodMSIn;
        this.guitimerHTMLModulo = guitimerHTMLModuloIn;
        this.activeModel = null;
        this.intervalCounter = 0;
        this.updateCounter = 0;
        this.messageOutCounter = 0;
        this.messageInCounter = 0;
        // More Class Fields, not declared above...
        this.headerLink = document.getElementById("ttExeSys_header");       // link to the exesys header div
        this.headerPainted = false;                                         // trigger to (re)paint header
        this.headerActiveModel = null;                                      // link to indication of Active Model
        this.activeModelNameUpdate = false;                                 // trigger to update Active Model indication
        this.footerLink = document.getElementById("ttExeSys_footer");       // link to exesys footer div
        this.footerPainted = false;                                         // trigger to (re)paint footer
        this.treeViewLink = document.getElementById("ttExeSys_treeview");   // link to exesys treeview div
        this.treeViewPainted = false;                                       // trigger to (re)paint treeview div
    }
    setActiveModel(modelLink){
        this.activeModel = modelLink;
        this.activeModelNameUpdate = true; 
        console.log("exesysfunction()");
    }

    /////////////////////////////////////////////////////////////////
    // helper methods to paint html elements
    paintHeader() {
        let htmlString = `<h1>Simple Model Explorer</h1>
            <h2>TT Digital Systems</h2>
            <h3 id="activeModel">active model: no model selected</h3>`;
        this.headerLink.innerHTML = htmlString;
        this.headerActiveModel = document.getElementById("activeModel");
        this.headerPainted = true;
        this.activeModelNameUpdate = true; 
    }
    paintModelsListTreeView(){
        let modelscount = 0;
        let htmlString = `<h3>Select a Model Instance</h3>
        <dl>`;
        Model.modelInstanceArray.forEach((modelInstance) => {
            htmlString = htmlString + "\n<dt onclick='Model.modelSelectionArray["+modelscount.toString(10)+"]'>" + modelInstance.instanceName + "</dt>";
            htmlString = htmlString + "\n<dd>" + modelInstance.modelDescription + "</dd>"; 
        });
        htmlString = htmlString + "\n</dl>"; 
        this.treeViewLink.innerHTML = htmlString;
        console.log(this.treeViewLink.innerHTML);

    }
    paintActiveModelTreeView(){

    }
    paintTreeView(){
        if(this.activeModel != null)
        {
            this.paintModelsListTreeView();
        }
        else
        {
            this.paintModelsListTreeView();
        }
        this.treeViewPainted = true;
    }
    paintFooter(){

        this.footerPainted = true;
    }
    /////////////////////////////////////////////////////////////////
    // methods to update html elements
    // - (re)paint only iff triggered
    updateHeader() {
        if(!this.headerPainted)
        {
            this.paintHeader();
            this.activeModelNameUpdate = true;
        }
        if(this.activeModelNameUpdate)
        {
            if(this.activeModel != null)
            {
                this.headerActiveModel.innerHTML = this.activeModel.instanceName;
            }
            else
            {
                this.headerActiveModel.innerHTML = "No Model Selected";
            }
            this.activeModelNameUpdate = false;
        }
    }
    updateTreeView() {
        if(!this.treeViewPainted)
        {
            this.paintTreeView();
            
        }
    }
    updateFooter() {
        if(!this.footerPainted)
        {
            this.paintFooter();
            
        }
    }
    updateHTML() {
        this.updateHeader();
        this.updateTreeView();        
        this.updateFooter();

        // Models HTML
        if(this.activeModel != null)
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
        if(this.activeModel != null)
        {

        }

        // execute every nth cycle
        // update relevant HTML
        // prepare next worker message
        if (this.intervalCounter % this.guitimerHTMLModulo == 0) {
            this.updateHTML();
            this.updateCounter++;
        }

        // once per gui timer period
        // if a message should be sent this cycle
        if (workermessagearray.length > 0) {
            this.worker.postMessage(workermessagearray);  // send the message to the worker
            this.messageOutCounter++;
        }

        // once per gui timer period
        // increment counter
        this.intervalCounter++;
    }

    /////////////////////////////////////////////////////////////////
    // WORKER MESSAGE CALLBACK - On each rx'd msg
    workerMsgParse(workermessage) {

        const receivedString = workermessage.data;

        if(receivedString.length > 0)
        {

            this.messageInCounter++;
        }
    }

}