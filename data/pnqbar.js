 //Cu.import("resource:///modules/CustomizableUI.jsm");
 // CustomizableUI.createWidget(
 // { id : "FS-button",
//    type : "view",
//    viewId : "aus-view-panel",
//    defaultArea : CustomizableUI.AREA_NAVBAR,
//    label : "Hello Button",
//    tooltiptext : "Hello!",
//    onViewShowing : function (aEvent) {
//      // initialize code
//    },
//    onViewHiding : function (aEvent) {
//      // cleanup code
//    }
//  });

var thepartarray = "customarray2";            // Sets variable scope higher with default list so that something always shows up (might not do anything)

var FSToolBar = {
    prefManager: null,
    prefManager2: null,
    aselect: null,
     
// Initialize the extension  
startup: function()  
    {  
        this.prefManager = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.partnumbersearch.");
        this.prefManager.QueryInterface(Components.interfaces.nsIPrefBranch2);
        this.prefManager.addObserver("", this, false); 
        
        this.prefManager2 = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("browser.link.");
        this.prefManager2.QueryInterface(Components.interfaces.nsIPrefBranch2);
        this.prefManager2.addObserver("", this, false);
        

        
        this.prefManager.setCharPref("Part_Num_type","P");
    },  

shutdown: function()
    {
        this.prefManager.removeObserver("", this);
        this.prefManager2.removeObserver("", this);
    },
    
DropdownUpdate: function()  
    {  
        document.getElementById("PNQ-lst-DropTools").hidden = !this.prefManager.getBoolPref("DropTools");
        document.getElementById("PNQ-lst-DropSketch").hidden = !this.prefManager.getBoolPref("DropSketch");
        document.getElementById("PNQ-lst-DropCost").hidden = !this.prefManager.getBoolPref("DropCost");
        document.getElementById("PNQ-lst-DropTS").hidden = !this.prefManager.getBoolPref("DropTS");
        document.getElementById("PNQ-lst-DropRFP").hidden = !this.prefManager.getBoolPref("DropRFP");
        document.getElementById("PNQ-lst-DropEWS").hidden = !this.prefManager.getBoolPref("DropEWS");
        document.getElementById("PNQ-lst-DropPS").hidden = !this.prefManager.getBoolPref("DropPS");
        document.getElementById("PNQ-lst-DropMS").hidden = !this.prefManager.getBoolPref("DropMS");
        document.getElementById("PNQ-lst-DropEPF").hidden = !this.prefManager.getBoolPref("DropEPF");
    },
    
Shortcut_key: function()  
    {  
        var toolbar = document.getElementById("FileSearchBar");
        if(toolbar.collapsed)
        {
            toolbar.collapsed = !toolbar.collapsed;
            document.persist("FileSearchBar", "collapsed");
        }
        document.getElementById("search-terms2").focus();
    },

ArrCheck: function()  
    {  
        var superarraypref = this.prefManager.getBoolPref("Super_array");
        var AdvSelection = this.prefManager.getCharPref("Part_Num_type");                               // This gets the drop down item selected.
        var arraypref = this.prefManager.getBoolPref("Part_array");                                     // Auto updated part list
        var thepartarray;
        if(arraypref === true)
        {
            if(superarraypref === true)
            {
                thepartarray = "superarray"; // Save variable for auto set back to part mode code
                if (AdvSelection == "P")
                    {
                        document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'superarray');
                    }
            }
            else if (superarraypref === false)
            {
                thepartarray = "customarray2";
                if (AdvSelection == "P")
                {
                    document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'customarray2');
                }
            }
        }
        else if (arraypref === false)
        {// Static Array
            thepartarray = "customarray2b";
            if (AdvSelection == "P")
            {
                document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'customarray2b');
            }
        }

        if (AdvSelection != "P" && superarraypref === false)
        {
            if (AdvSelection == "R"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'PSarray');}
            else if (AdvSelection == "S"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'TSarray');}
            else if (AdvSelection == "D"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'RFParray');}
            else if (AdvSelection == "M"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'MSarray');}
            else if (AdvSelection == "K"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'sketcharray');}
            else if (AdvSelection == "T"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'Tarray');}
            else if (AdvSelection == "C"){document.getElementById("search-terms2").setAttribute('autocompletesearchparam', 'costarray');}
        }
        else if (AdvSelection != "P" && superarraypref === true)
        {
            document.getElementById("search-terms2").setAttribute('autocompletesearchparam', "superarray");
            thepartarray = "superarray";
        }
        return thepartarray;
    },

ToolBarFix: function()  
    {
        this.prefManager = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.partnumbersearch.");
        //document.getElementById("cam-button").hidden = !this.prefManager.getBoolPref("rtc");  //Not working yet
                
        var suggestpref = this.prefManager.getCharPref("Suggest");
        if (suggestpref == "disabled")
        {
            document.getElementById("search-terms2").setAttribute('type', "search");
        }
        else if (suggestpref == "simple")
        {
            document.getElementById("search-terms2").setAttribute('type', "autocomplete");
        }
        else if (suggestpref == "advanced")
        {
            document.getElementById("search-terms2").setAttribute('type', "autocomplete");
        }
    },

FSOpenOptions: function()  
    { 
        BrowserOpenAddonsMgr("addons://detail/" + encodeURIComponent("partnumbersearch@170.64.172.65") + "/preferences");
    },

Transferable: function(source)
    {
        const nsTransferable = Components.Constructor("@mozilla.org/widget/transferable;1", "nsITransferable");
        var res = nsTransferable();
        if ('init' in res)
        {
            // When passed a Window object, find a suitable privacy context for it.
            if (source instanceof Ci.nsIDOMWindow)
            // Note: in Gecko versions >16, you can import the PrivateBrowsingUtils.jsm module
            // and use PrivateBrowsingUtils.privacyContextFromWindow(sourceWindow) instead
            source = source.QueryInterface(Ci.nsIInterfaceRequestor)
                           .getInterface(Ci.nsIWebNavigation);
            res.init(source);
        }
        return res;
    },

PasteGo: function(e)  
    { 
        if(e == 1)
        {
            var trans = FSToolBar.Transferable();
            trans.addDataFlavor("text/unicode");
            Services.clipboard.getData(trans, Services.clipboard.kGlobalClipboard);

            var str       = {};
            var strLength = {};

            trans.getTransferData("text/unicode", str, strLength);
            if (str)
            {
              var pastetext = str.value.QueryInterface(Ci.nsISupportsString).data;
              pastetext = pastetext.replace(/\s+/g, '');
              document.getElementById("search-terms2").value = pastetext;
              FSToolBar.FSdisplay('one');
              console.log("PasteGo: Original value '" + str.value.QueryInterface(Ci.nsISupportsString).data + "'");
            }
        }
        return true;
    },
    
OpenXUL: function()  
    { 
        gBrowser.selectedTab = gBrowser.addTab("chrome://partnumbersearch/content/EPFViewer.xul");
    },

occurrences: function(string, subString, allowOverlapping)
    {
        string+=""; subString+="";
        if(subString.length<=0) return string.length+1;

        var n=0, pos=0;
        var step=(allowOverlapping)?(1):(subString.length);

        while(true){
            pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
        }
        return(n);
    },

Download: function()  
    {
        Components.utils.import("resource://gre/modules/Downloads.jsm");
        Components.utils.import("resource://gre/modules/osfile.jsm");
        Components.utils.import("resource://gre/modules/Task.jsm");
        // Get URL and file name from active window PDF
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                   .getService(Components.interfaces.nsIWindowMediator);
        var recentWindow = wm.getMostRecentWindow("navigator:browser");
        var data_URL =  recentWindow ? recentWindow.content.document.location : null;
        var n = FSToolBar.occurrences(String(data_URL),".pdf");
        var classObj;
        var alertService;
        if (n == 1)
            {
                data_URL = String(data_URL).replace(/[:\/\.a-z]+#/i, "");                     //Remove chrome content from URL if fav-icons are enabled

                var DL_PDF_name = data_URL.match(/[a-zA-Z0-9-_]+\.pdf/i);                     //With .pdf
                //var DL_PDF_name2 = String(DL_PDF_name).replace(/.pdf/i, "");                  //Without .pdf

                // Sets default PDF dir to desktop if not set.
                var pdf_dir = this.prefManager.getCharPref("PDF-DIR");
                if (pdf_dir === "" || pdf_dir === undefined)
                    {
                        pdf_dir = Components.classes["@mozilla.org/file/directory_service;1"].
                            getService(Components.interfaces.nsIProperties).
                            get("Desk", Components.interfaces.nsIFile);
                        this.prefManager.setCharPref("PDF-DIR",pdf_dir.path);
                    }
                else 
                    {
                        var prefs = Components.classes["@mozilla.org/preferences-service;1"].
                            getService(Components.interfaces.nsIPrefService).
                            getBranch("extensions.partnumbersearch.");
                        pdf_dir = prefs.getComplexValue("PDF-DIR", Components.interfaces.nsILocalFile);
                    }

                // Create file for holding PDF
                var file = Components.classes["@mozilla.org/file/local;1"]
                   .createInstance(Components.interfaces.nsILocalFile);
                file.initWithPath(pdf_dir.path + "\\" + DL_PDF_name);
                //file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);

                // Get document displayed in the selected tab of the most recently used browser window and save to storage file.
                var obj_URI = Services.io.newURI(data_URL, null, null);                          // Convert URL to URI
                Task.spawn(function () {

                  yield Downloads.fetch(obj_URI, file);

                  console.log("PDF downloaded.");

                }).then(null, Components.utils.reportError);

                //Save notice
                stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
                classObj = Cc["@mozilla.org/alerts-service;1"];
                alertService = classObj.getService(Components.interfaces.nsIAlertsService);
                alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_note"), stringBundle.getString("fs_saveA") + DL_PDF_name + '" ' + stringBundle.getString("fs_save") +  pdf_dir.path);
            }
        else {
            //Error
            stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
            console.error("Cannot verify PDF from URL string");
            classObj = Cc["@mozilla.org/alerts-service;1"];
            alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_error7") + ' ' + data_URL);
            }
    },

Email: function()  
    { 
        Components.utils.import("resource://gre/modules/Downloads.jsm");
        Components.utils.import("resource://gre/modules/osfile.jsm");
        Components.utils.import("resource://gre/modules/Task.jsm");
        
        // Get URL and file name from active window PDF
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                   .getService(Components.interfaces.nsIWindowMediator);
        var recentWindow = wm.getMostRecentWindow("navigator:browser");
        var data_URL =  recentWindow ? recentWindow.content.document.location : null;
        var n = FSToolBar.occurrences(String(data_URL),".pdf");
        if (n == 1)
            {
                data_URL = String(data_URL).replace(/[:\/\.a-z]+#/i, "");                       //Remove chrome content from URL if fav-icons are enabled

                var open_PDF_name = data_URL.match(/[a-zA-Z0-9-_]+\.pdf/i);                     //With .pdf
                var open_PDF_name2 = String(open_PDF_name).replace(/.pdf/i, "");                //Without .pdf

                // Sets default PDF dir to desktop if not set.
                var pdf_dir = this.prefManager.getCharPref("PDF-DIR");
                if (pdf_dir === "" || pdf_dir === undefined)
                    {
                        pdf_dir = Components.classes["@mozilla.org/file/directory_service;1"].
                            getService(Components.interfaces.nsIProperties).
                            get("Desk", Components.interfaces.nsIFile);
                        this.prefManager.setCharPref("PDF-DIR",pdf_dir.path);
                    }
                else 
                    {
                        var prefs = Components.classes["@mozilla.org/preferences-service;1"].
                            getService(Components.interfaces.nsIPrefService).
                            getBranch("extensions.partnumbersearch.");
                        pdf_dir = prefs.getComplexValue("PDF-DIR", Components.interfaces.nsILocalFile);
                    }
                    

                // Create file for holding PDF to email
                var file = Components.classes["@mozilla.org/file/local;1"]
                   .createInstance(Components.interfaces.nsILocalFile);
                file.initWithPath(pdf_dir.path + "\\" + open_PDF_name);
                    
                // Get document displayed in the selected tab of the most recently used browser window and save to storage file.
                Components.utils.import("resource://gre/modules/PrivateBrowsingUtils.jsm");
                const WebBrowserPersist = Components.Constructor("@mozilla.org/embedding/browser/nsWebBrowserPersist;1",
                                                     "nsIWebBrowserPersist");

                var obj_URI = Services.io.newURI(data_URL, null, null);                          // Convert URL to URI
            
                Task.spawn(function () {

                  yield Downloads.fetch(obj_URI, file);

                  console.log("PDF downloaded, ready for email.");
                          const url = "mailto://?subject=" + open_PDF_name2 + "%20Print&body=%0AAttached%20is%20the%20Tenneco%20" + open_PDF_name2 + "%20print.%0A%0A&attach=" + file.path + "";
                          document
                              .getElementById("content")
                              .webNavigation
                              .loadURI(url, 0, null, null, null);

                }).then(null, Components.utils.reportError);
                
            }
        else {
            //ERROR
            var stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
            console.error("Cannot verify URL contains PDF");
            var classObj = Cc["@mozilla.org/alerts-service;1"];
            var alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_error7") + ' ' + data_URL);
            }
    },

ToggleCAM: function()  
    { 
        //gBrowser.selectedTab = gBrowser.addTab("chrome://partnumbersearch/content/webRTC.xul");

        //var script=document.createElement("script");
        //script.setAttribute("type","text/javascript");
        //script.setAttribute("src","https://togetherjs.com/togetherjs.js");
        //var p = gBrowser.selectedBrowser.contentDocument.getElementsByTagName("head")[0];
        //p.appendChild(script);
        //var body = gBrowser.selectedBrowser.contentDocument.getElementsByTagName("body")[0];
        //var button=document.createElement("button");
        //    button.setAttribute("id","collaborate");
        //    button.setAttribute("type","button");
        //    button.setAttribute("label","Collaborate");
        //    button.setAttribute("onclick","javascript:document.getElementById('collaborate').addEventListener('click', TogetherJS, false);");
        //body.appendChild(button);
    },

FileSearchBar_toggleToolbar: function()  
    { 
        var toolbar = document.getElementById("FileSearchBar");
        toolbar.collapsed = !toolbar.collapsed;
        document.persist("FileSearchBar", "collapsed");
    },

FSdisplay: function(e)  
    {
        var classObj;
        var alertService;
        //this.prefManager.setCharPref("Part_Num_type","P");
        var thepartarray = FSToolBar.ArrCheck();
        FSToolBar.Indicator('false');
        var stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
        //Get the search term depending on which textbox is used (only one textbox currently)
        var terms;
        if (e == "one")
        {
            terms = document.getElementById("search-terms2").value;
        }
        else 
        {
            alert('Bad Error!');
            console.error("FSdisplay error. Variable 'e': <" + e + " >.");
        }

        if(terms === "" || terms === undefined)                                //Search without a search term
        {
            FSToolBar.Indicator('true');
            //Empty search error
            classObj = Cc["@mozilla.org/alerts-service;1"];
            alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_emptysearch"));
            //alert('You need to enter a search term.');
            return;
        }

        var termsUP = terms.toUpperCase();                    // Change case to all uppercase
        
        // Check if dual view is requested
        if(termsUP.indexOf('!') !== -1)
            {
                  var darray = termsUP.split('!');
                  var a = darray[0], b = darray[1];
                  this.prefManager.setCharPref("Part_Number_a",a);
                  this.prefManager.setCharPref("Part_Number_b",b);
                  console.log("Dual View: Requesting '" + a + "' & '" + b + "'");
                  //gBrowser.selectedTab = gBrowser.addTab("chrome://partnumbersearch/content/viewer.xul");
                 newTabBrowser_d = gBrowser.getBrowserForTab(gBrowser.selectedTab = gBrowser.addTab("chrome://partnumbersearch/content/viewer.xul"));
                  FSToolBar.Indicator('true');
                  return;
            }


        // Start of Whitelist
        //var whitelist; // Defined in whitelist.js
        //var matchlist; // Defined in whitelist.js
        var WL = this.prefManager.getBoolPref("WhiteList");
        if(WL === true)
        {
            for (var i = 0; i < whitelist.length; i++)
            {
                if (termsUP == whitelist[i])
                {
                    termsUP = matchlist[i];
                }
            }
        }
        // End of Whitelist

        var url_to_open = "http://millap01.na.ten/";                          // 1. The initial url
        var AdvSelection = this.prefManager.getCharPref("Part_Num_type");     // This gets the drop down item selected.
        var termcount = terms.length;                                         // Count number of characters to determine folder group
        var termcode = String(termsUP).substring(0,1);                        // Extract first 1 digit of search term
        var termcode2 = String(termsUP).substring(0,2);                        // Extract first 2 digits of search term
        var termcode2b =  String(termsUP).substring(2,4);                      // Extract third and fourth digits of search term 
        var termcode3 = String(termsUP).substring(0,3);                        // Extract first 3 digits of search term
        var termcode5 = String(termsUP).substring(0,5);                        // Extract first 5 digits of search term
        var termcode6 = String(termsUP).substring(5,6);                        // Extract the sixth character for use when full 11 digit code A series is entered
        var termcode7 = String(termsUP).substring(5,11);                       // Extract non GT part of inputed number when accidental entry for A series
        var termcode4 = String(termsUP).substring(4,5);                        // Extract the character that would indicate if it is a B series number
        var folder = "UNKNOWN";                                                // Sets initial folder value, for error checking

        // Determines if the user is in non-part mode, but should be and switches back
        var label;
        var tooltip;
        var iconloca;
        var iconlocb;
        var thearray;
        var aselect;
        if (AdvSelection != "P" && AdvSelection != "F")
        {
            if (termcode2 != "PS" || termcode2 != "TX" ||termcode2 != "TS" || termcode2 != "MR" || termcode3 != "RFP" || termcode2 != "MS" || termcode2 != "SK" || termcode2 != "MT" || termcode2 != "PT" || termcode2 != "M-" || termcode3 != "EWS")
            {
                label = 'fs_parts'; tooltip = 'fs_partst'; iconloca = '176'; iconlocb = '160'; thearray = thepartarray; aselect = 'fs_parts2';
                AdvSelection = stringBundle.getString(aselect);                        // Needed so folder doesn't get incorrectly defined
            }
        }
        if (AdvSelection == "F")  //EPF
        {
            console.log("EPF Requested");
            label = 'fs_epf'; tooltip = 'fs_epf'; iconloca = '192'; iconlocb = '176'; thearray = thepartarray; aselect = 'fs_epf2';
            AdvSelection = stringBundle.getString(aselect);                        // Needed so folder doesn't get incorrectly defined
        }

        // Determines if user is not searching for a part and changes the mode to the correct type
        if (AdvSelection == "P")
        {
            label = 'fs_parts'; tooltip = 'fs_partst'; iconloca = '176'; iconlocb = '160'; thearray = thepartarray; aselect = 'fs_parts2';
            if (termcode2 == "PS")
            {
                label = 'fs_ps'; tooltip = 'fs_pst'; iconloca = '112'; iconlocb = '96'; thearray = 'PSarray'; aselect = 'fs_ps2';
            }
            if (termcode2 == "TS")
            {
                label = 'fs_ts'; tooltip = 'fs_tst'; iconloca = '64'; iconlocb = '48'; thearray = 'customarray2'; aselect = 'fs_ts2';
            }
            if (termcode2 == "MR" || termcode3 == "RFP")
            {
                label = 'fs_rfp'; tooltip = 'fs_rfpt'; iconloca = '80'; iconlocb = '64'; thearray = 'RFParray'; aselect = 'fs_rfp2';
            }
            if (termcode3 == "EWS")
            {
                label = 'fs_ews'; tooltip = 'fs_ewst'; iconloca = '96'; iconlocb = '80'; thearray = 'thepartarray'; aselect = 'fs_ews2';
            }
            if (termcode2 == "MS" && termcode3 != "MSK")
            {
                label = 'fs_ms'; tooltip = 'fs_mst'; iconloca = '128'; iconlocb = '112'; thearray = 'MSarray'; aselect = 'fs_ms2';
            }
            if (termcode3 == "ECE" || termcode2 == "CE")         //First Cost group
            {
                label = 'fs_ece'; tooltip = 'fs_ecet'; iconloca = '48'; iconlocb = '32'; thearray = 'costarray'; aselect = 'fs_ece2';
            }
            if (termcode == "C" && termcount != 11 && termcount != 15)         //Second Cost group
            {
                label = 'fs_ece'; tooltip = 'fs_ecet'; iconloca = '48'; iconlocb = '32'; thearray = 'costarray'; aselect = 'fs_ece2';
            }
            if (termcode2 == "SK")
            {
                label = 'fs_sk'; tooltip = 'fs_skt'; iconloca = '32'; iconlocb = '16'; thearray = 'sketcharray'; aselect = 'fs_sk2';
            }
            if (termcode2 == "MT" || termcode2 == "PT" || termcode2 == "TX" ||termcode2 == "M-"){         //First Tool group
                label = 'fs_tool'; tooltip = 'fs_toolt'; iconloca = '16'; iconlocb = '0'; thearray = 'Tarray'; aselect = 'fs_tool2';
            }
            if (termcode == "M" && termcount == 6 && termcode2 != "MR")
            {                                    //Second Tool group
                label = 'fs_tool'; tooltip = 'fs_toolt'; iconloca = '16'; iconlocb = '0'; thearray = 'Tarray'; aselect = 'fs_tool2';
            }
            if (termcode3 == "MSK")
            {                                    //Third Tool group
                label = 'fs_tool'; tooltip = 'fs_toolt'; iconloca = '16'; iconlocb = '0'; thearray = 'Tarray'; aselect = 'fs_tool2';
            }
            if (termcode == "M" && termcount == 8)
            {                                    //Fourth Tool group
                label = 'fs_tool'; tooltip = 'fs_toolt'; iconloca = '16'; iconlocb = '0'; thearray = 'Tarray'; aselect = 'fs_tool2';
            }
            if (termcode == "M" && termcount == 9)
            {                                    //Fifth Tool group
                label = 'fs_tool'; tooltip = 'fs_toolt'; iconloca = '16'; iconlocb = '0'; thearray = 'Tarray'; aselect = 'fs_tool2';
            }
            if (termcode == "M" && termcount == 7 && termcode2 != "MR" && termcode2 != "MS")
            {                                    //Sixth Tool group
                label = 'fs_tool'; tooltip = 'fs_toolt'; iconloca = '16'; iconlocb = '0'; thearray = 'Tarray'; aselect = 'fs_tool2';
            }
            if (termsUP == "INDEX_MS")
            {
                label = 'fs_ms'; tooltip = 'fs_mst'; iconloca = '128'; iconlocb = '112'; thearray = 'MSarray'; aselect = 'fs_ms2';
            }
            if (termsUP == "INDEX_PS")
            {
                label = 'fs_ps'; tooltip = 'fs_pst'; iconloca = '112'; iconlocb = '96'; thearray = 'PSarray'; aselect = 'fs_ps2';
            }
            if (termsUP == "INDEX_TS")
            {
                label = 'fs_ts'; tooltip = 'fs_tst'; iconloca = '64'; iconlocb = '48'; thearray = 'customarray2'; aselect = 'fs_ts2';
            }
            AdvSelection = stringBundle.getString(aselect);                        // Needed so folder doesn't get incorrectly defined
            
            // Start Part Code
            if (termcount == 6)
            {
                if (termcode == 0) {folder = "CLEVPRNT/000/";}
                else if (termcode == 1) {folder = "CLEVPRNT/100/";}
                else if (termcode == 2) {folder = "CLEVPRNT/200/";}
                else if (termcode == 3) {folder = "CLEVPRNT/300/";}
                else if (termcode == 4) {folder = "CLEVPRNT/400/";}
                else if (termcode == 5) {folder = "CLEVPRNT/500/";}
                else if (termcode == 6) {folder = "CLEVPRNT/600/";}
                else if (termcode == 7) {folder = "CLEVPRNT/700/";}
                else if (termcode == 8) {folder = "CLEVPRNT/800/";}
                else if (termcode == 9) {folder = "CLEVPRNT/900/";}
                else if (termcode2 == "X0") {folder = "CLEVPRNT/000/";}         // X A Series Drawings
                else if (termcode2 == "X1") {folder = "CLEVPRNT/100/";}
                else if (termcode2 == "X2") {folder = "CLEVPRNT/200/";}
                else if (termcode2 == "X3") {folder = "CLEVPRNT/300/";}
                else if (termcode2 == "X5") {folder = "CLEVPRNT/500/";}
                else if (termcode2 == "X6") {folder = "CLEVPRNT/600/";}
                else if (termcode2 == "X7") {folder = "CLEVPRNT/700/";}
                else if (termcode2 == "X8") {folder = "CLEVPRNT/800/";}
                else if (termcode2 == "X9") {folder = "CLEVPRNT/900/";}
            }
            else if (termcount == 8)
            {
                if (termcode3 == "AM2") {folder = "CLEVPRNT/200/";}
                else if (termcode3 == "AM4") {folder = "CLEVPRNT/400/";}        // AM A Series Drawings
                else if (termcode3 == "AM6") {folder = "CLEVPRNT/600/";}
                else if (termcode3 == "AM8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "AM9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "SD0") {folder = "CLEVPRNT/000/";}        // SD A Series Drawings
                else if (termcode3 == "SD1") {folder = "CLEVPRNT/100/";}
                else if (termcode3 == "SD2") {folder = "CLEVPRNT/200/";}
                else if (termcode3 == "SD3") {folder = "CLEVPRNT/300/";}
                else if (termcode3 == "SD4") {folder = "CLEVPRNT/400/";}
                else if (termcode3 == "SD5") {folder = "CLEVPRNT/500/";}
                else if (termcode3 == "SD6") {folder = "CLEVPRNT/600/";}
                else if (termcode3 == "SD7") {folder = "CLEVPRNT/700/";}
                else if (termcode3 == "SD8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "SD9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "SA0") {folder = "CLEVPRNT/000/";}        // SA A Series Drawings
                else if (termcode3 == "SA1") {folder = "CLEVPRNT/100/";}
                else if (termcode3 == "SA2") {folder = "CLEVPRNT/200/";}
                else if (termcode3 == "SA3") {folder = "CLEVPRNT/300/";}
                else if (termcode3 == "SA4") {folder = "CLEVPRNT/400/";}
                else if (termcode3 == "SA5") {folder = "CLEVPRNT/500/";}
                else if (termcode3 == "SA6") {folder = "CLEVPRNT/600/";}
                else if (termcode3 == "SA7") {folder = "CLEVPRNT/700/";}
                else if (termcode3 == "SA8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "SA9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "AP1") {folder = "CLEVPRNT/100/";}        // AP A Series Drawings
                else if (termcode3 == "AP2") {folder = "CLEVPRNT/200/";}
                else if (termcode3 == "AP5") {folder = "CLEVPRNT/500/";}
                else if (termcode3 == "AP6") {folder = "CLEVPRNT/600/";}
                else if (termcode3 == "AP7") {folder = "CLEVPRNT/700/";}
                else if (termcode3 == "AP8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "AP9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "BA2") {folder = "CLEVPRNT/200/";}        // BA A Series Drawings
                else if (termcode3 == "BA5") {folder = "CLEVPRNT/500/";}
                else if (termcode3 == "BA8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "BA9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "CB0") {folder = "CLEVPRNT/000/";}        // CB A Series Drawings
                else if (termcode3 == "CB4") {folder = "CLEVPRNT/400/";}
                else if (termcode3 == "CB6") {folder = "CLEVPRNT/600/";}
                else if (termcode3 == "CB8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "CB9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "SX1") {folder = "CLEVPRNT/100/";}        // SX A Series Drawings
                else if (termcode3 == "SX5") {folder = "CLEVPRNT/500/";}
                else if (termcode3 == "SX7") {folder = "CLEVPRNT/700/";}
                else if (termcode3 == "SX8") {folder = "CLEVPRNT/800/";}
                else if (termcode3 == "SX9") {folder = "CLEVPRNT/900/";}
                else if (termcode3 == "IM0") {folder = "CLEVPRNT/000/";}        // IM A Series Drawings
                else if (termcode3 == "IM6") {folder = "CLEVPRNT/600/";}
                else if (termcode3 == "IM8") {folder = "CLEVPRNT/800/";}
                else if (termcode == 0) {folder = "CLEVPRNT/000/";}
                else if (termcode == 1) {folder = "CLEVPRNT/100/";}
                else if (termcode == 2) {folder = "CLEVPRNT/200/";}
                else if (termcode == 3) {folder = "CLEVPRNT/300/";}
                else if (termcode == 4) {folder = "CLEVPRNT/400/";}
                else if (termcode == 5) {folder = "CLEVPRNT/500/";}
                else if (termcode == 6) {folder = "CLEVPRNT/600/";}
                else if (termcode == 7) {folder = "CLEVPRNT/700/";}
                else if (termcode == 8) {folder = "CLEVPRNT/800/";}
                else if (termcode == 9) {folder = "CLEVPRNT/900/";}
                else if (termcode == "C") {folder = "COST/";}
            }
            else if (termcount == 11 || termcount == 15 || termcount == 7 || termcount == 13)     // 11&15=Normal B series search, 7=TPT Mode search, 13=TR SDs
            {
                //if (termsUP == "RM01A532460") {folder = "CLEVPRNT/500/";}            
                if (termcode == "B") {folder = "CLEVPRNT/B_Series/";}            // Query is for B Series (TPT Mode)
                if (termcode4 != "B" && termcode != "A")
                {
                    if (termcode2 == "FS") {folder = "CLEVPRNT/TorqueRods/FS/";}
                    else if (termcode2 == "FT") {folder = "CLEVPRNT/TorqueRods/FT/";}
                    else if (termcode2 == "HS") {folder = "CLEVPRNT/TorqueRods/HS/";}
                    else if (termcode2 == "HT") {folder = "CLEVPRNT/TorqueRods/HT/";}
                    else if (termcode2 == "SP") {folder = "CLEVPRNT/TorqueRods/SP/";}
                    else if (termcode2 == "TR") {folder = "CLEVPRNT/TorqueRods/TR/";}
                    else if (termcode2 == "TT") {folder = "CLEVPRNT/TorqueRods/TT/";}
                    else if (termcode2 == "TV") {folder = "CLEVPRNT/TorqueRods/TV/";}
                    else if (termcode2 == "TW") {folder = "CLEVPRNT/TorqueRods/TW/";}
                    else if (termcode2 == "VS") {folder = "CLEVPRNT/TorqueRods/VS/";}
                    else if (termcode2 == "VT") {folder = "CLEVPRNT/TorqueRods/VT/";}
                    else if (termcode2 == "WF") {folder = "CLEVPRNT/TorqueRods/WF/";}
                    else if (termcode2 == "WH") {folder = "CLEVPRNT/TorqueRods/WH/";}
                    else if (termcode2 == "WT") {folder = "CLEVPRNT/TorqueRods/WT/";}
                    else if (termcode2 == "WV") {folder = "CLEVPRNT/TorqueRods/WV/";}
                }
                else if (termcode4 == "B" && termcode2 != "PT") {folder = "CLEVPRNT/B_Series/";}    // Query is for B Series (Normal Mode)

                if (termcode4 == "A" && termcode2 != "SD" && termcode2 != "TX" && termcode2 != "MT" && termcode2 != "AT")
                {
                    if (termsUP == "RM01A532460") {folder = "CLEVPRNT/500/";}                   // Special exemption for material query - RM01A532460
                    else {
                        // Query is for A Series
                        classObj = Cc["@mozilla.org/alerts-service;1"];
                        alertService = classObj.getService(Components.interfaces.nsIAlertsService);
                        alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_note"), stringBundle.getString("fs_a_seriesGT_a") + ' "' + termcode5 + '", ' + stringBundle.getString("fs_a_seriesGT_b"));

                        if (termcode6 == 0) {folder = "CLEVPRNT/000/";termsUP = termcode7;}        // Sets folder and new search term minus GTC
                        else if (termcode6 == 1) {folder = "CLEVPRNT/100/";termsUP = termcode7;}
                        else if (termcode6 == 2) {folder = "CLEVPRNT/200/";termsUP = termcode7;}
                        else if (termcode6 == 3) {folder = "CLEVPRNT/300/";termsUP = termcode7;}
                        else if (termcode6 == 4) {folder = "CLEVPRNT/400/";termsUP = termcode7;}
                        else if (termcode6 == 5) {folder = "CLEVPRNT/500/";termsUP = termcode7;}
                        else if (termcode6 == 6) {folder = "CLEVPRNT/600/";termsUP = termcode7;}
                        else if (termcode6 == 7) {folder = "CLEVPRNT/700/";termsUP = termcode7;}
                        else if (termcode6 == 8) {folder = "CLEVPRNT/800/";termsUP = termcode7;}
                        else if (termcode6 == 9) {folder = "CLEVPRNT/900/";termsUP = termcode7;}
                    }
                }
                if (termcode2 == "SD")
                {
                    if (termcode6 == 0) {folder = "CLEVPRNT/000/";}                        // Sets folder if it's a sales drawing of an A series part
                        else if (termcode6 == 1) {folder = "CLEVPRNT/100/";}
                        else if (termcode6 == 2) {folder = "CLEVPRNT/200/";}
                        else if (termcode6 == 3) {folder = "CLEVPRNT/300/";}
                        else if (termcode6 == 4) {folder = "CLEVPRNT/400/";}
                        else if (termcode6 == 5) {folder = "CLEVPRNT/500/";}
                        else if (termcode6 == 6) {folder = "CLEVPRNT/600/";}
                        else if (termcode6 == 7) {folder = "CLEVPRNT/700/";}
                        else if (termcode6 == 8) {folder = "CLEVPRNT/800/";}
                        else if (termcode6 == 9) {folder = "CLEVPRNT/900/";}
                    if (termcode4 == "B") {folder = "CLEVPRNT/B_Series/";}
                    if (termcode2b == "FS") {folder = "CLEVPRNT/TorqueRods/FS/";}          // Sets folders for torque rod sales drawings
                        else if (termcode2b == "FT") {folder = "CLEVPRNT/TorqueRods/FT/";}
                        else if (termcode2b == "HS") {folder = "CLEVPRNT/TorqueRods/HS/";}
                        else if (termcode2b == "HT") {folder = "CLEVPRNT/TorqueRods/HT/";}
                        else if (termcode2b == "SP") {folder = "CLEVPRNT/TorqueRods/SP/";}
                        else if (termcode2b == "TR") {folder = "CLEVPRNT/TorqueRods/TR/";}
                        else if (termcode2b == "TT") {folder = "CLEVPRNT/TorqueRods/TT/";}
                        else if (termcode2b == "TV") {folder = "CLEVPRNT/TorqueRods/TV/";}
                        else if (termcode2b == "TW") {folder = "CLEVPRNT/TorqueRods/TW/";}
                        else if (termcode2b == "VS") {folder = "CLEVPRNT/TorqueRods/VS/";}
                        else if (termcode2b == "VT") {folder = "CLEVPRNT/TorqueRods/VT/";}
                        else if (termcode2b == "WF") {folder = "CLEVPRNT/TorqueRods/WF/";}
                        else if (termcode2b == "WH") {folder = "CLEVPRNT/TorqueRods/WH/";}
                        else if (termcode2b == "WT") {folder = "CLEVPRNT/TorqueRods/WT/";}
                        else if (termcode2b == "WV") {folder = "CLEVPRNT/TorqueRods/WV/";}
                }
            }

        // End Part Code
        }
        if (AdvSelection == "T") {folder = "TOOLS/";}            // Other non part dwg folders if "parts" is not selected
        if (AdvSelection == "K") {folder = "SKETCH/";}
        if (AdvSelection == "C") {folder = "COST/";}
        if (AdvSelection == "S") {folder = "TESTSPEC/";}
        if (AdvSelection == "D") {folder = "PROD/";}
        if (AdvSelection == "E") {folder = "EWS/";}
        if (AdvSelection == "R") {folder = "PROCSPEC/";}
        if (AdvSelection == "M") {folder = "MATSPEC/";}

        document.getElementById('AdvancedMenu').setAttribute('tooltiptext', stringBundle.getString(tooltip));
        document.getElementById('AdvancedMenu').setAttribute('style', 'list-style-image: url(chrome://partnumbersearch/skin/masterICO.png);-moz-image-region: rect(0px, ' +iconloca + 'px, 16px, ' + iconlocb + 'px);min-width: 2em; max-width: 10em;');
        document.getElementById('search-terms2').setAttribute('autocompletesearchparam', thearray);
        AdvSelection = stringBundle.getString(aselect);
        var GTC_Guess;
        if (AdvSelection == "F")  //EPF
        {
            folder = "EPF";
            if (termcount == 6)
            {                        // If EPF and only six digits then guess GT code enabled
                GTC_Guess = true;
            }
        }

        if(folder=="UNKNOWN")
        {                                                // Unknown search term error
            FSToolBar.Indicator('true');
            classObj = Cc["@mozilla.org/alerts-service;1"];
            alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_unknown_code_a") + ' "' + termsUP + '"!  ' + stringBundle.getString("fs_unknown_code_b"));
            return;
        }
var target;
        if(GTC_Guess === true)
        {                                                // Loop through GT Codes if GTC_Guess is enabled, this is only a partial listing
            var arr = new Array("BP00","CA00","CM00","CM05","CM97","CM99","CT00","FB00","FB01","FS32","FS35","FS99","FS28","FT44","FT57","FT99","KT00","LA00","LA01","LA02","LA03","LA04","LA05","LA06","LA07","LA99","MB00","MB01","MB02","MB03","MB04","MB05","MB07","MB08","MB09","MB96","MB99","MD00","MM00","MM01","MM02","MM03","MM04","MM05","MS00","RT01","RT02","RT03","RT04","RT05","RT06","RT07","RT08","RT09","RT10","RT11","RT12","RT13","RT14","RT15","RT99","SB01","SB02","SB03","SB04","SB05","SB06","SB07","SB08","SB96","SB97","SB98","SB99","SG00","SG01","XM00","XM01","XM02");
            // ****START GTC Guessing***************************************
            if(termcode2 == "SK")
            {                            // SK file so no GTC needed
                termsUP = termsUP;
            }
            else
            {
                var TPTterm;
                for(var h=arr.length-1; h>=0; h--)
                //for (var i = 0, len = arr.length; i < len; i++)  //For some reason this crashes FF
                {
                    var TPTgtterm = arr[h];                                      // Sets current array GT code
                    TPTterm = TPTgtterm + "A" + termsUP;                    // Sets file to search for
                    var target = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
                    target.initWithPath("s:\\" + TPTterm);
                    if(target.exists()){h = 0;}                                    // Check that EPF folder exists
                }
                termsUP = TPTterm;
            }
        // ****END GTC Guessing*****************************************
        }                                                                      // End GTC guessing if statement

url_to_open = url_to_open + folder;                              //2.  Adds folder location of file
// terms = terms.replace(/ /g, "+");                                //3.  Optional to replace some text
url_to_open = url_to_open + termsUP;                            //4.  Add the PN query to the url
var url_to_open2 = url_to_open + ".pdf";                            //5.  Add the file extension to the url
// Load Preferences
    var PDFpref1 = this.prefManager.getBoolPref("PNQ-PDF1");
    var PDFpref2 = this.prefManager.getBoolPref("PNQ-PDF2");
    var PDFpref3 = this.prefManager.getBoolPref("PNQ-PDF3");
    var url_to_open2a;
    var url_to_open2b;
    var url_to_open3;
  //5a1. Checks and disables all variables if all are set to false
    if(PDFpref1 === false && PDFpref2 === false && PDFpref3 === false) {
        url_to_open3 = url_to_open2;
    }
    else
    {
        if(PDFpref1 === false)        //5a.  Add open parameters for PDF - Disable/Enable Thumbnails
        {
            url_to_open2a = url_to_open2 + "#pagemode=thumbs";
        }
        else if (PDFpref1 === true)
        {
            url_to_open2a = url_to_open2 + "#pagemode=none";
        }
        if(PDFpref2 === false)        //5b.  Add open parameters for PDF - Disable/Enable ScrollBars
        {
            url_to_open2b = url_to_open2a + "&scrollbar=1";
        }
        else if (PDFpref2 === true)
        {
            url_to_open2b = url_to_open2a + "&scrollbar=0";
        }
        if(PDFpref3 === false)        //5c.  Add open parameters for PDF - Disable/Enable nav Pane
        {
            url_to_open3 = url_to_open2b + "&navpanes=1";
        }
        else if (PDFpref3 === true)
        {
            url_to_open3 = url_to_open2b + "&navpanes=0";
        }
    }
// ****START EPF***************************************
if(folder=="EPF")
{                                            // Electronic part file selected so change URL format for S drive
    var EPFpref = this.prefManager.getBoolPref("AdvancedEPF");
    if(EPFpref === false)
    {                                    // Advanced EPF not selected so open standard file view
        url_to_open3 = "file:///s:/" + termsUP;
        target = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
        target.initWithPath("s:\\" + termsUP);
        if(target.exists())
        {
            var tabprefs = this.prefManager2.getIntPref("open_newwindow");
            var tabprefs2 = this.prefManager.getBoolPref("TabFocus");
            if(tabprefs == 2) {
                mainwindow.open(url_to_open3);
                FSToolBar.Indicator('true');
            }
            else if (tabprefs == 3) {
                if(tabprefs2 === false) {                // Open tab w/o focus
                    var newTabBrowser1 = gBrowser.getBrowserForTab(gBrowser.addTab(url_to_open3));
                    newTabBrowser1.contentDocument.title = termsUP + ".pdf";
                    FSToolBar.Indicator('true');
                }
                else if (tabprefs2 === true) {            // Open tab and make active
                    var newTabBrowser = gBrowser.getBrowserForTab(gBrowser.selectedTab = gBrowser.addTab(url_to_open3));
                    newTabBrowser.contentDocument.title = termsUP + ".pdf";
                    FSToolBar.Indicator('true');
                }
            }
        }
        else
        {                                                // PF does not exist
            FSToolBar.Indicator('true');
            classObj = Cc["@mozilla.org/alerts-service;1"];
            alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_error2b") + " " + terms + " " + stringBundle.getString(label) + stringBundle.getString("fs_error4b"));
        }
    }
    else if (EPFpref === true)
    {                                // Open advanced EPF view
            target = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
            target.initWithPath("s:\\" + termsUP);
            if(!target.exists())
            {                            // Check that EPF folder exists
                // PF does not exist
                console.log(terms + " does not exist!  Verify six vs eleven digit folder names");
                FSToolBar.Indicator('true');
                classObj = Cc["@mozilla.org/alerts-service;1"];
                alertService = classObj.getService(Components.interfaces.nsIAlertsService);
                alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_error2b") + " " + terms + " " + stringBundle.getString(label) + stringBundle.getString("fs_error4b"));
                return;
            }
            else
            {
                this.prefManager.setCharPref("Part_Number",termsUP);
                gBrowser.selectedTab = gBrowser.addTab("chrome://partnumbersearch/content/EPFViewer.xul#" + "s:\\" + termsUP);
                FSToolBar.Indicator('true');
            }
    }
}
// ****END EPF***************************************
else                                                        // Not EPF so perform normal HTTP get
{
        var xmlHttp = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                    .createInstance(Components.interfaces.nsIXMLHttpRequest);
        //xmlHttp.addEventListener("onloadend", FSToolBar.transferComplete(xmlHttp,url_to_open2,url_to_open3), false);
        //xmlHttp.addEventListener("error", FSToolBar.transferFailed(xmlHttp,aselect), false);
        xmlHttp.open("HEAD", url_to_open3, true);
        xmlHttp.ontimeout = function () {
            console.error("The request for " + url_to_open3 + " timed out.");
            FSToolBar.transferTO();
            xmlHttp.abort();
        };
        xmlHttp.onload = function (e)
        {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200)
                {
                    //console.log("NO ERROR");
                    FSToolBar.transferComplete(termsUP,url_to_open2,url_to_open3);
                } 
                else
                {
                    //Test for archive cost file and redirect
                    if (folder == "COST/"){
                        console.log("COST IS ARCHIVED");
                        xmlHttp.abort();
                        url_to_open2 = url_to_open2.replace(/[C][OST]+/i, "COST/ARCHIVE"); 
                        url_to_open3 = url_to_open3.replace(/[C][OST]+/i, "COST/ARCHIVE"); 
                        FSToolBar.transferComplete(termsUP,url_to_open2,url_to_open3);
                    }
                    else{
                        console.error(xmlHttp.statusText);
                        FSToolBar.transferFailed(label);
                    }
                }
            }
        };
        xmlHttp.onerror = function (e) {
            console.error(xmlHttp.statusText);
            FSToolBar.transferFailed(label);
        };
        xmlHttp.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;    //Sets bypass cache for all HTTP requests
        xmlHttp.timeout = 45000;  //45 sec
        xmlHttp.send(null);
}
},

transferComplete: function(termsUP,url_to_open2,url_to_open3)
    {
// Load preferences
  var tabprefs = this.prefManager2.getIntPref("open_newwindow");
  var tabprefs2 = this.prefManager.getBoolPref("TabFocus");

// Open the window with this url
  var mainwindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
  .getInterface(Components.interfaces.nsIWebNavigation)
  .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
  .rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
  .getInterface(Components.interfaces.nsIDOMWindow);

// Checks tab pref
    this.prefManager.setCharPref("Part_Number_a",url_to_open3);
    var Part_Num_type = this.prefManager.getCharPref("Part_Num_type");
    var FavIcon = this.prefManager.getBoolPref("fav_icon");
    var newTabBrowser1;
    var newTabBrowser;
    if(FavIcon === true) {
        if(tabprefs == 2) {
            mainwindow.open("chrome://partnumbersearch/content/" + Part_Num_type + ".xul#" + url_to_open2);
            FSToolBar.Indicator('true');
        }
        else if (tabprefs == 3) {
            if(tabprefs2 === false) {                // Open tab w/o focus
                newTabBrowser1 = gBrowser.getBrowserForTab(gBrowser.addTab("chrome://partnumbersearch/content/" + Part_Num_type + ".xul#" + url_to_open2));
                FSToolBar.Indicator('true');
            }
            else if (tabprefs2 === true) {
                newTabBrowser = gBrowser.getBrowserForTab(gBrowser.selectedTab = gBrowser.addTab("chrome://partnumbersearch/content/" + Part_Num_type + ".xul#" + url_to_open2));    
                FSToolBar.Indicator('true');
            }
        }
   }
   else if (FavIcon === false) {
        if(tabprefs == 2) {
            mainwindow.open(url_to_open3);
            FSToolBar.Indicator('true');
        }
        else if (tabprefs == 3) {
            if(tabprefs2 === false) {                // Open tab w/o focus
                newTabBrowser1 = gBrowser.getBrowserForTab(gBrowser.addTab(url_to_open3));
                newTabBrowser1.contentDocument.title = termsUP + ".pdf";
                FSToolBar.Indicator('true');
            }
            else if (tabprefs2 === true) {            // Open tab and make active
                newTabBrowser = gBrowser.getBrowserForTab(gBrowser.selectedTab = gBrowser.addTab(url_to_open3));
                newTabBrowser.contentDocument.title = termsUP + ".pdf";
                FSToolBar.Indicator('true');
            }
        }
   }
           
   // Hide toolbar if auto-hide is enabled
   var hide = this.prefManager.getBoolPref("auto_hide");
       if(hide === true)
       {
           var toolbar = document.getElementById("FileSearchBar");
           if(!toolbar.collapsed)
           {
               toolbar.collapsed = !toolbar.collapsed;
               document.persist("FileSearchBar", "collapsed");
           }
       }
    },
    
transferFailed: function(type)
    {
            // No files found error
            var terms = document.getElementById("search-terms2").value;
            var stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
            var type_note = stringBundle.getString(type);
            FSToolBar.Indicator('true');
            var classObj = Cc["@mozilla.org/alerts-service;1"];
            var alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("fs_error2") + terms + stringBundle.getString("fs_error3") + type_note + stringBundle.getString("fs_error4"));
    },
searchType: function(s)
    {
    this.prefManager.setCharPref("Part_Num_type",s);
    console.log("Search type set to '" + s + "'");
    },
    
phaseType: function(r)
    {
    this.prefManager.setCharPref("phase",r);
    },
transferTO: function()
    {
            // Time out error
            var terms = document.getElementById("search-terms2").value;
            var stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
            FSToolBar.Indicator('true');
            var classObj = Cc["@mozilla.org/alerts-service;1"];
            var alertService = classObj.getService(Components.interfaces.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error5"), stringBundle.getString("fs_error6") + " " + terms + ".");
    },
    
Indicator: function(hide)
    {
        var Fstatus=document.getElementById('downloadstatus');
        Fstatus.setAttribute('hidden', hide);
    },
    
FSEnter: function(e)
    {  
        if(e == 13)  // If user hits 'enter' then run the FSdisplay function
        {
            FSToolBar.FSdisplay('one');
        }
        return true;
    },
    
FSPaste: function(e)
    {   // If user pastes then remove spaces - Broken since you cannot cut.paste w/o losing data
        //e.preventDefault();
        //var pastetext = '';
        //if (e.clipboardData && e.clipboardData.getData)
        //{
        //    pastetext = e.clipboardData.getData('text/plain');
        //}
        //this.value = pastetext.replace(/\s+/g, '');
        //document.getElementById("search-terms2").value = this.value ;
    },
    
FSHome: function(e)  
    {  
        if(e === 0)  // If user left mouse clicks then run
        {
            // Load preferences
            var tabprefs = this.prefManager2.getIntPref("open_newwindow");
            var tabprefs2 = this.prefManager.getBoolPref("TabFocus");
  
            // Open the window with this url
            var mainwindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIWebNavigation)
            .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
            .rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIDOMWindow);
   
            // Checks tab pref
            if(tabprefs == 2)
            {
                mainwindow.open("http://millap01.na.ten/");
            }
            else if (tabprefs == 3)
            {
                if(tabprefs2 === false)
                {                                                        // Open tab w/o focus
                    mainwindow.getBrowser().addTab("http://millap01.na.ten/");
                }
                else if (tabprefs2 === true)
                {                                                // Open tab and make active
                    gBrowser.selectedTab = gBrowser.addTab("http://millap01.na.ten/");
                }
            }
        }
    },
    
ENG_display: function()
    { 
        var stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
        var terms = document.getElementById("engsearch").value;
        if(terms === "")        // Error for search without a name
        {
              var classObj = Cc["@mozilla.org/alerts-service;1"];
              var alertService = classObj.getService(Components.interfaces.nsIAlertsService);
              alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("ss_error"));
              return true;
        }
        terms = terms.toUpperCase();                                                // Change case to all uppercase
        //var phase = document.getElementById("phase").value;                         
        var phase = this.prefManager.getCharPref("phase");                              // Get phase
        var emp_id;
        if (terms == "ANAYA, FERNANDO") {emp_id = "6884";}                           // Determine user ID from search name
        else if (terms == "ARENDOSKI, CHRIS") {emp_id = "6137";}
        else if (terms == "BELAK, ZACH") {emp_id = "6497";}
        else if (terms == "BELAUSTEGI, LUKEN") {emp_id = "6130";}
        else if (terms == "BILLERMAN, TOM") {emp_id = "4851";}
        else if (terms == "BIXLER, MICHAEL") {emp_id = "7858";}
        else if (terms == "BOST, ROBERT") {emp_id = "5316";}
        else if (terms == "BRADDOCK, BRUCE") {emp_id = "4627";}
        else if (terms == "BRADDOCK, SCOTT") {emp_id = "5233";}
        else if (terms == "BRANT, CAMERON") {emp_id = "7396";}
        else if (terms == "BRANT, JR. VERNON") {emp_id = "4630";}
        else if (terms == "BROWN, JEREMY") {emp_id = "4977";}
        else if (terms == "BUTLER, RUSSELL") {emp_id = "6126";}
        else if (terms == "CARROLL, ANDY") {emp_id = "5641";}
        else if (terms == "CASSIDY, NICHOLAS") {emp_id = "7499";}
        else if (terms == "CERRI, JOE") {emp_id = "5317";}
        else if (terms == "CHEN, XIAOBO") {emp_id = "7379";}
        else if (terms == "CLINE, DAVID") {emp_id = "4757";}
        else if (terms == "CONANT, MATT") {emp_id = "6227";}
        else if (terms == "CULVER, ERIN") {emp_id = "7909";}
        else if (terms == "DAUGHERTY, RYAN") {emp_id = "6981";}
        else if (terms == "DILLENDER, ROB") {emp_id = "4644";}
        else if (terms == "EMIN, DIDIER") {emp_id = "6789";}
        else if (terms == "FEUERSTEIN, KATHY") {emp_id = "4741";}
        else if (terms == "FISCHER, JEREMY") {emp_id = "6241";}
        else if (terms == "ROX, ROD") {emp_id = "140";}
        else if (terms == "FRANZEN, ANDREW") {emp_id = "4747";}
        else if (terms == "FRIES, VINCE") {emp_id = "5658";}
        else if (terms == "GASPAR, ZOREN") {emp_id = "6464";}
        else if (terms == "GIBSON, DAVID") {emp_id = "6492";}
        else if (terms == "GOOSSENS, JOSH") {emp_id = "5627";}
        else if (terms == "GOUDIE, ROB") {emp_id = "6057";}
        else if (terms == "HEDRICK, DAVE") {emp_id = "4931";}
        else if (terms == "HEIL, PAUL") {emp_id = "5812";}
        else if (terms == "HENRY, HAL") {emp_id = "4659";}
        else if (terms == "HIRE, MATT") {emp_id = "6136";}
        else if (terms == "HOLLAND, KEVIN") {emp_id = "4664";}
        else if (terms == "JAMES, MATT") {emp_id = "6229";}
        else if (terms == "JANIK, RAFAL") {emp_id = "7541";}
        else if (terms == "JASKO, RYAN") {emp_id = "6048";}
        else if (terms == "JAWORSKI, KEVIN") {emp_id = "4671";}
        else if (terms == "JENNINGS, DONNY") {emp_id = "4631";}
        else if (terms == "JOHNSTON, BRENT") {emp_id = "5118";}
        else if (terms == "KE, CHEN") {emp_id = "7101";}
        else if (terms == "KINNER, BOB") {emp_id = "6458";}
        else if (terms == "KEYSER, BRIAN") {emp_id = "7003";}
        else if (terms == "KRAINE, ED") {emp_id = "5126";}
        else if (terms == "LASALLE, JAMES") {emp_id = "7798";}
        else if (terms == "KUHLMAN, JAMIE") {emp_id = "6423";}
        else if (terms == "LIU, QI") {emp_id = "7274";}
        else if (terms == "MAKULINSKI, ROB") {emp_id = "6836";}
        else if (terms == "MARACIC, ROB") {emp_id = "7045";}
        else if (terms == "MARACZI, ERIC") {emp_id = "7051";}
        else if (terms == "MCCALL, PATRICK") {emp_id = "6588";}
        else if (terms == "MCCARTHY, FRANK") {emp_id = "4682";}
        else if (terms == "MCDONAGH, JUANITA") {emp_id = "4684";}
        else if (terms == "MCILRATH, TODD") {emp_id = "6929";}
        else if (terms == "MCLAUGHLIN, RON") {emp_id = "4686";}
        else if (terms == "MCMULLEN, BRYAN") {emp_id = "5657";}
        else if (terms == "MESENBURG, SCOTT") {emp_id = "5428";}
        else if (terms == "MILLARD, BRIAN") {emp_id = "7559";}
        else if (terms == "MISSIG, BOB") {emp_id = "4629";}
        else if (terms == "MOORE, KRISTI") {emp_id = "6410";}
        else if (terms == "NORMAN, AMY") {emp_id = "6009";}
        else if (terms == "ONEAL, TADD") {emp_id = "6377";}
        else if (terms == "ORTMAN, BOB") {emp_id = "4645";}
        else if (terms == "PALECEK, BRIAN") {emp_id = "6416";}
        else if (terms == "PILARSKI, JEANETTE") {emp_id = "7652";}
        else if (terms == "POST, BRANDON") {emp_id = "6795";}
        else if (terms == "PRIEBE, LOREN") {emp_id = "6751";}
        else if (terms == "PU, ALLEN") {emp_id = "7100";}
        else if (terms == "PULS, KEVIN") {emp_id = "6134";}
        else if (terms == "QIAN, MO") {emp_id = "6682";}
        else if (terms == "RADDEN, DANIEL") {emp_id = "5837";}
        else if (terms == "RAGER, CHRIS") {emp_id = "6456";}
        else if (terms == "RAWLINGS, SCOTT") {emp_id = "7107";}
        else if (terms == "RAYMOND, JEFF") {emp_id = "5676";}
        else if (terms == "REDDAWAY, JOHN") {emp_id = "4698";}
        else if (terms == "ROCKWELL, FRED") {emp_id = "4703";}
        else if (terms == "RODECKER, TROY") {emp_id = "4759";}
        else if (terms == "ROTH, DENNIS") {emp_id = "5653";}
        else if (terms == "SCHANK, DON") {emp_id = "4945";}
        else if (terms == "SCHEUFLER, DON") {emp_id = "4742";}
        else if (terms == "SCHNITTKER, DALE") {emp_id = "2423";}
        else if (terms == "SMITH, GUY") {emp_id = "4663";}
        else if (terms == "STOLL, KURT") {emp_id = "4717";}
        else if (terms == "STRICKFADEN, CHAD") {emp_id = "6230";}
        else if (terms == "TAYLOR, MARY") {emp_id = "4949";}
        else if (terms == "THORNHILL, JAY") {emp_id = "4722";}
        else if (terms == "URBAN, HENRY") {emp_id = "6192";}
        else if (terms == "WAGNER, JOHN") {emp_id = "4729";}
        else if (terms == "WEILNAU, JEREMY") {emp_id = "5100";}
        else if (terms == "WEISENBERGER, KEVIN") {emp_id = "6346";}
        else if (terms == "WEISS, DAVID") {emp_id = "6060";}
        else if (terms == "WEN, EVAN") {emp_id = "7380";}
        else if (terms == "WIECZOREK, MATT") {emp_id = "4892";}
        else if (terms == "WILLETT, JON") {emp_id = "6231";}

        // Sets parameters
        var url_to_open = "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_engineer_report?";
        var p_author_id = "p_author_id=All";
        var p_engr_id = "p_engr_id=" + emp_id;
        var p_ewo_no = "p_ewo_no=";
        var p_pso_no = "p_pso_no=";
        var p_pso_line_no = "p_pso_line_no=";
        var p_pso_info_flag = "p_pso_info_flag=Yes";
        var p_sales_id = "p_sales_id=All";
        var p_sales_flag = "p_sales_flag=Yes";
        var p_customer_id = "p_customer_id=All";
        var p_ta_part_id = "p_ta_part_id=All";
        var p_project_no = "p_project_no=";
        var p_wo_phase = "p_wo_phase=" + phase;
        var p_phase_flag = "p_phase_flag=Yes";
        var p_ddstart_date = "p_ddstart_date=";
        var p_ddend_date = "p_ddend_date=";
        var p_dsstart_date = "p_dsstart_date=";
        var p_dsend_date = "p_dsend_date=";
        var p_sub_date_flag = "p_sub_date_flag=Yes";

        // Combines parameters into URL
        url_to_open = url_to_open + p_author_id + "&" + p_engr_id + "&" + p_ewo_no + "&" + p_pso_no + "&" + p_pso_line_no + "&" + p_pso_info_flag + "&" + p_sales_id + "&" + p_sales_flag + "&" + p_customer_id + "&" + p_ta_part_id + "&" + p_project_no + "&" + p_wo_phase + "&" + p_phase_flag + "&" + p_ddstart_date + "&" + p_ddend_date + "&" + p_dsstart_date + "&" + p_dsend_date + "&" + p_sub_date_flag;

        // Open search page based off variables
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url_to_open, true);  
        xmlHttp.onreadystatechange = function (aEvt)
        {  
             if (xmlHttp.readyState == 4)
            {  
                if(xmlHttp.status == 200)  
                dump(xmlHttp.responseText);  
             else  
                 console.error("Error loading page");
                //alert(stringBundle.getString("ss_no_open"));  //Errors before page loads
            } 
        };
        xmlHttp.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
        xmlHttp.send(null);

        // Load preferences
        var tabprefs = this.prefManager2.getIntPref("open_newwindow");
        var tabprefs2 = this.prefManager.getBoolPref("TabFocus");

        // Open the window with this url
        var mainwindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIWebNavigation)
        .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
        .rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIDOMWindow);
   
        // Checks tab pref
        if(tabprefs == 2)
        {
            mainwindow.open(url_to_open);
        }
        else if(tabprefs == 3)
        {
            if(tabprefs2 === false) // Open tab w/o focus
            {
                mainwindow.getBrowser().addTab(url_to_open);
            }
            else if (tabprefs2 === true) // Open tab and make active
            {
                gBrowser.selectedTab = gBrowser.addTab(url_to_open);
            }
        }
    },
    
ENG_enter: function(e)
    {
      if(e == 13)
      {
          FSToolBar.ENG_display();
      }
          return true;
    },
};

// Install load and unload handlers
window.addEventListener("load", function(e) { FSToolBar.startup(e); }, false);
window.addEventListener("unload", function(e) { FSToolBar.shutdown(); });