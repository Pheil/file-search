var FSviewer_s = {
    prefManager: null,
    PN_saved_a: null,

sview_setup: function() 
 {
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var PN_saved_a = prefManager.getCharPref("extensions.partnumbersearch.Part_Number_a");
        document.title = PN_saved_a;
        
    document.getElementById("FULLdwg").setAttribute("data", PN_saved_a);
    document.getElementById("FULLdwg").QueryInterface(Components.interfaces.nsIObjectLoadingContent).playPlugin();   // Forge enable plugin (Temporary)
    
    //Sets page title to PDF name
    var src2 = PN_saved_a.match(/[a-zA-Z0-9-_]+\.pdf/i);
    document.title = src2;    
},
 };