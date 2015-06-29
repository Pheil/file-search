var { ActionButton } = require('sdk/ui/button/action');
const pageMod = require("sdk/page-mod");
var { Toolbar } = require("sdk/ui/toolbar");
var { Frame } = require("sdk/ui/frame");
var notifications = require("sdk/notifications");
var self = require("sdk/self");
var _ = require("sdk/l10n").get;
const tabs = require("sdk/tabs");
const panels = require("sdk/panel");
var preferences = require("sdk/simple-prefs").prefs;
var clipboard = require("sdk/clipboard");
var Request = require("sdk/request").Request;
const {Cc,Ci,Cm,Cu,components} = require("chrome");
const { ToggleButton } = require("sdk/ui/button/toggle");
const utils = require('sdk/window/utils');
const { defer } = require('sdk/core/promise');
const { OS, TextEncoder, TextDecoder } = Cu.import("resource://gre/modules/osfile.jsm", {});
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);
Cu.import("resource://gre/modules/Services.jsm", this);
Cu.import("resource://gre/modules/Downloads.jsm");
Cu.import("resource://gre/modules/Task.jsm");
Cu.import("resource://gre/modules/Downloads.jsm");

var myIconURL = self.data.url("./images/icon.png");
var fileURL = require("./data/lib/fileURL.js");

//Page Icons
var TSIcon = self.data.url("./images/TS.png");
var MSIcon = self.data.url("./images/MS.png");
var SKIcon = self.data.url("./images/sketch.png");
var RFPIcon = self.data.url("./images/RFP.png");
var toolIcon = self.data.url("./images/tools.png");
var PSIcon = self.data.url("./images/PS.png");
var ECEIcon = self.data.url("./images/ece.png");
var EWSIcon = self.data.url("./images/EWS.png");
var PartIcon = self.data.url("./images/part.png");

Cu.import("resource://gre/modules/RemotePageManager.jsm");
let DualViewmanager = new RemotePages("about:dualview");

// Create a page mod for EPF page
pageMod.PageMod({
    include: "about:epfviewer",
    contentScriptWhen: 'end',
    contentScriptFile: './EPFViewer.js'
});

// Page mod for test specs
pageMod.PageMod({
    include: "http://millap01.na.ten/TESTSPEC*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + TSIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for parts
pageMod.PageMod({
    include: "http://millap01.na.ten/CLEVPRNT*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + PartIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for material specs
pageMod.PageMod({
    include: "http://millap01.na.ten/MATSPEC*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + MSIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for sketches
pageMod.PageMod({
    include: "http://millap01.na.ten/SKETCH*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + SKIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for rfp
pageMod.PageMod({
    include: "http://millap01.na.ten/PROD*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + RFPIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for tools
pageMod.PageMod({
    include: "http://millap01.na.ten/TOOLS*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + toolIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for process specs
pageMod.PageMod({
    include: "http://millap01.na.ten/PROCSPEC*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + PSIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for costs
pageMod.PageMod({
    include: "http://millap01.na.ten/COST*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + ECEIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});
// Page mod for worksheets
pageMod.PageMod({
    include: "http://millap01.na.ten/EWS*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","' + EWSIcon + '");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});


var fs_button = ToggleButton({
  id: "fs-search",
  label: "File Search",
  badge: "",
  badgeColor: "#00AAAA",
  icon: {
    "16": "./images/search16.png",
    "32": "./images/search32.png",
    "64": "./images/search64.png"
  },
  //onClick: handleClick,
  onChange: handleChange
});

//function handleClick(button) {
//    console.log(button);
//}

var fs_panel = panels.Panel({
    width: 275,
    height: 410,
    contentURL: "./searchMenu.html",
    onHide: handleHide,
    contentScriptWhen: 'end',
    contentScriptFile: ["./js/jquery-1.10.2.js",
                      "./js/typeahead.bundle.js",
                      "./js/searchMenu.js"],
//START
    onMessage: (e) => {
        var type = e.data.type;
        var title = e.data.title;
        var msg = e.data.msg;
        var termsUP = e.data.termsUP;
        if (type == "error"){
            notifications.notify({
                title: _(title),
                text: _(msg),
                iconURL: myIconURL
            });
        } else if (type == "open") {
            console.log("URL: " + msg + ", Term: " + termsUP);
            var url_to_open3 = msg;
            // ****START EPF***************************************
            /*if (title == "EPF") { // Electronic part file selected so change URL format for S drive
                //First check for six digit for GTC guessing
                var termcount = termsUP.length;
                var GTC_Guess;
                if (termcount == 6) { // If only six digits then guess GT code enabled
                    GTC_Guess = true;
                }
                var target;
                if (GTC_Guess === true) { // Loop through GT Codes if GTC_Guess is enabled, this is only a partial listing
                    var arr = new Array("BP00", "CA00", "CM00", "CM05", "CM97", "CM99", "CT00", "FB00", "FB01", "FS32", "FS35", "FS99", "FS28", "FT44", "FT57", "FT99", "KT00", "LA00", "LA01", "LA02", "LA03", "LA04", "LA05", "LA06", "LA07", "LA99", "MB00", "MB01", "MB02", "MB03", "MB04", "MB05", "MB07", "MB08", "MB09", "MB96", "MB99", "MD00", "MM00", "MM01", "MM02", "MM03", "MM04", "MM05", "MS00", "RT01", "RT02", "RT03", "RT04", "RT05", "RT06", "RT07", "RT08", "RT09", "RT10", "RT11", "RT12", "RT13", "RT14", "RT15", "RT99", "SB01", "SB02", "SB03", "SB04", "SB05", "SB06", "SB07", "SB08", "SB96", "SB97", "SB98", "SB99", "SG00", "SG01", "XM00", "XM01", "XM02");
                    // ****START GTC Guessing***************************************
                    if (String(termsUP).substring(0, 2) == "SK") { // SK file so no GTC needed
                        termsUP = termsUP;
                    } else {
                        var TPTterm;
                        for (var h = arr.length - 1; h >= 0; h--)
                        {
                            var TPTgtterm = arr[h]; // Sets current array GT code
                            TPTterm = TPTgtterm + "A" + termsUP; // Sets file to search for
                            var target = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
                            target.initWithPath("s:\\" + TPTterm);
                            if (target.exists()) {
                                h = 0;
                            } // Check that EPF folder exists
                        }
                        termsUP = TPTterm;
                    }
                    // ****END GTC Guessing*****************************************
                } // End GTC guessing if statement
            
            
                // Open advanced EPF view
                target = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
                target.initWithPath("s:\\" + termsUP);
                if (!target.exists()) { // Check that EPF folder exists
                    // PF does not exist
                    console.log(terms + " does not exist!  Verify six vs eleven digit folder names");
                    //Indicator('true');
                        notifications.notify({
                            title: _(fs_error),
                            text: _(fs_epf_code),
                            iconURL: myIconURL
                        });
                    return;
                } else {
                    preferences.Part_Number = termsUP;
                    tabs.open({
                        url: "resource://FileSearch-at-tenneco-dot-com/data/EPFViewer.html",
                        isPinned: false,
                        inNewWindow: false,
                        inBackground: false
                    });
                    //gBrowser.selectedTab = gBrowser.addTab("./EPFViewer.html#" + "s:\\" + termsUP);
                }
            } */
            // ****END EPF***************************************
            //else // Not EPF so perform normal HTTP get
            //{
                var fileRequest = Request({
                  url: url_to_open3,
                  onComplete: function (response) {
                    transferComplete(termsUP, msg, url_to_open3);
                  }
                });
                fileRequest.get();
            //}
        } else if (type == "open_dv") {//Dual view
            //console.log("File A: " + title + ", File B: " + msg);
            
            tabs.open({
                url: "about:dualview",
                isPinned: false,
                inNewWindow: false,
                inBackground: false
            });
            
            DualViewmanager.addMessageListener("ready", function() {
                var array = new Array(title, msg);
                DualViewmanager.sendAsyncMessage("search", array);
            });
            //var array = new Array(title, msg);
            //DualViewmanager.sendAsyncMessage("search", array);
            
        } else {
            console.log("Error with search data: " + e.data);
        }
    }
//END
});

fs_panel.port.on("data_load", function () {
    //console.log("Panel requested data");
    var httpRequest = Request({
        url: "http://170.64.172.81/scripts/FileSearch/superarray.json",
        headers: {
            'Cache-control': 'no-cache'
        },
        onComplete: function (response) {
            //console.log(response.text);
            //return response.text;
            fs_panel.port.emit("rtn_data", response.text);
        }
    });
    httpRequest.get();
});

fs_panel.port.on("text-entered", function (text) {
    console.log(text);
    fs_panel.hide();
});





function handleChange(state) {
  //cae_button.badge = state.badge + 1;
  if (state.checked) {
    fs_button.badgeColor = "#00AAAA";
    fs_panel.show({
      position: fs_button
    });
  }
  else {
    fs_button.badgeColor = "#AA00AA";
  }
}

function handleHide() {
  fs_button.state('window', {checked: false});
  fs_panel.hide();
}

function readhttp(thename){
    var httpRequest = Request({
        url: thename,
        headers: {
            'Cache-control': 'no-cache'
        },
        onComplete: function (response) {
            //console.log(response.text);
            return response.text;
        }
    });
    httpRequest.get();
}


var PasteGo = ActionButton({
    id: "PasteGo-button",
    label: "File Search: Auto",
    icon: {
      "16": "./images/PG16.png",
      "32": "./images/PG32.png",
      "32": "./images/PG64.png",
    },
    onClick: function(state) {
        var pastetext = clipboard.get();

        if (pastetext)
        {
            pastetext = pastetext.replace(/\s+/g, '');
            console.log("Original paste & go value: '" + pastetext + "'");
        }
        
        var urlCHK = fileURL.FSdisplay(pastetext);
        if (urlCHK == "unknown") {
            notifications.notify({
                title: "File Search Error",
                text: "Your search for '" + pastetext + "' was unsucessful.",
                iconURL: myIconURL
            });
        } else {
            tabs.open({
                url: urlCHK,
                isPinned: false,
                inNewWindow: false,
                inBackground: false
            }); 
        }


    }
});

var email = ActionButton({
    id: "email-button",
    label: "File Search: Email current PDF",
    icon: {
      "16": "./images/email.png",
      "32": "./images/email32.png"
    },
    onClick: function(state) {  
     
        function DownloadFile(sLocalFileName, sRemoteFileName){
            var oIOService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
            var oLocalFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
            oLocalFile.initWithPath(sLocalFileName);

            var oDownloadObserver = {onDownloadComplete: function(nsIDownloader, nsresult, oFile) {console.log('PDF downloaded, ready for email.')}};
            var oDownloader = Cc["@mozilla.org/network/downloader;1"].createInstance();
            oDownloader.QueryInterface(Ci.nsIDownloader);
            oDownloader.init(oDownloadObserver, oLocalFile);

            var oHttpChannel = oIOService.newChannel(sRemoteFileName, "", null);
            oHttpChannel.QueryInterface(Ci.nsIHttpChannel);
            oHttpChannel.asyncOpen(oDownloader, oLocalFile);   
        }
    
        // Get URL and file name from active window PDF
        var recentWindow = utils.getMostRecentBrowserWindow();
        var window = recentWindow.content;
        var data_URL = recentWindow ? recentWindow.content.document.location : null;
        var n = occurrences(String(data_URL), ".pdf");
        if (n == 1) {
            //console.log(data_URL);  //Additional data available from var
            var open_PDF_name = data_URL.href.match(/[a-zA-Z0-9-_]+\.pdf/i); //With .pdf
            var open_PDF_name2 = String(open_PDF_name).replace(/.pdf/i, ""); //Without .pdf

            // Sets dir to desktop.
            pdf_dir = Cc["@mozilla.org/file/directory_service;1"].
            getService(Ci.nsIProperties).
            get("Desk", Ci.nsIFile);
            preferences.PDF_DIR = pdf_dir.path;
   
            var email_pdf = pdf_dir.path + "\\" + open_PDF_name;
            DownloadFile(email_pdf,data_URL.href);

            const myurl = "mailto://?subject=" + open_PDF_name2 + "%20Print&body=%0AAttached%20is%20the%20Tenneco%20" + open_PDF_name2 + "%20print.%0A%0A&attach=" + email_pdf + "";
            
            //Open in hidden frame to not leave behind a blank tab
            var hiddenFrames = require("sdk/frame/hidden-frame");
            let hiddenFrame = hiddenFrames.add(hiddenFrames.HiddenFrame({
              onReady: function() {
                this.element.contentWindow.location = myurl;
                let self = this;
                this.element.addEventListener("DOMContentLoaded", function() {
                    hiddenFrames.remove(hiddenFrame);
                }, true, true);
              }
            })); 
        } else {
            notifications.notify({
                title: "File Search Error",
                text: "Cannot save PDF from URL: \n\n" + ' ' + data_URL,
                iconURL: myIconURL
            });
            console.error("Cannot verify page URL contains PDF");
        }
        
        function occurrences(string, subString, allowOverlapping) {
            string+=""; subString+="";
            if(subString.length<=0) return string.length+1;

            var n=0, pos=0;
            var step=(allowOverlapping)?(1):(subString.length);

            while(true){
                pos=string.indexOf(subString,pos);
            if(pos>=0){ n++; pos+=step; } else break;
            }
            return(n);
        }
    }
});

function Write_data(name, data){
    var deferred = defer();
    let encoder = new TextEncoder();                                // This encoder can be reused for several writes
    if (data.length !== 0) {
        let array = encoder.encode(data);
        OS.File.writeAtomic(name, array, {tmpPath: name + ".tmp"});      // Write the array atomically to "file.txt", using as temporary buffer "file.txt.tmp".
    } else {
        OS.File.writeAtomic(name, "", {tmpPath: name + ".tmp"});      // Write the array atomically to "file.txt", using as temporary buffer "file.txt.tmp".
    }
    return deferred.promise;
}

//Download button not enabled since it should not needed any more
// var download = ActionButton({
    // id: "DL-button",
    // label: "File Search: Download current PDF",
    // icon: {
      // "16": "./images/DL.png",
      // "32": "./images/DL32.png"
    // },
    // onClick: function(state) {
        // console.log("button '" + state.label + "' was clicked");
    // }
// });

function transferFailed(type) {
    window.parent.postMessage({
        "type" : "error",
        "title" : "fs_error",
        "msg" : "fs_file_code"
    }, "*");
}

function transferComplete(termsUP, url_to_open2, url_to_open3) {
    var tabprefs = preferences.TabFocus;

    preferences.Part_Number_a = url_to_open3;
    var Part_Num_type = preferences.Part_Num_type;
        if (tabprefs === false) { // Open tab w/o focus
            tabs.open({
                url: url_to_open3,
                isPinned: false,
                inNewWindow: false,
                inBackground: true
            });
        } else if (tabprefs === true) { // Open tab and make active
            tabs.open({
                url: url_to_open3,
                isPinned: false,
                inNewWindow: false,
                inBackground: false
            });
        }
}

// var AdvancedMenu = new Frame({
  // id: "AdvancedMenu",
  // url: "./AdvancedMenu.html",
  // onMessage: (e) => {
        // var type = e.data.type;
        // var title = e.data.title;
        // var msg = e.data.msg;
        // var termsUP = e.data.termsUP;
        // if (type == "error"){
            // notifications.notify({
                // title: _(title),
                // text: _(msg),
                // iconURL: myIconURL
            // });
        // } else if (type == "open") {
            // console.log("URL: " + msg + ", Term: " + termsUP);
            // var url_to_open3 = msg;
            // // ****START EPF***************************************
            // /*if (title == "EPF") { // Electronic part file selected so change URL format for S drive
                // //First check for six digit for GTC guessing
                // var termcount = termsUP.length;
                // var GTC_Guess;
                // if (termcount == 6) { // If only six digits then guess GT code enabled
                    // GTC_Guess = true;
                // }
                // var target;
                // if (GTC_Guess === true) { // Loop through GT Codes if GTC_Guess is enabled, this is only a partial listing
                    // var arr = new Array("BP00", "CA00", "CM00", "CM05", "CM97", "CM99", "CT00", "FB00", "FB01", "FS32", "FS35", "FS99", "FS28", "FT44", "FT57", "FT99", "KT00", "LA00", "LA01", "LA02", "LA03", "LA04", "LA05", "LA06", "LA07", "LA99", "MB00", "MB01", "MB02", "MB03", "MB04", "MB05", "MB07", "MB08", "MB09", "MB96", "MB99", "MD00", "MM00", "MM01", "MM02", "MM03", "MM04", "MM05", "MS00", "RT01", "RT02", "RT03", "RT04", "RT05", "RT06", "RT07", "RT08", "RT09", "RT10", "RT11", "RT12", "RT13", "RT14", "RT15", "RT99", "SB01", "SB02", "SB03", "SB04", "SB05", "SB06", "SB07", "SB08", "SB96", "SB97", "SB98", "SB99", "SG00", "SG01", "XM00", "XM01", "XM02");
                    // // ****START GTC Guessing***************************************
                    // if (String(termsUP).substring(0, 2) == "SK") { // SK file so no GTC needed
                        // termsUP = termsUP;
                    // } else {
                        // var TPTterm;
                        // for (var h = arr.length - 1; h >= 0; h--)
                        // {
                            // var TPTgtterm = arr[h]; // Sets current array GT code
                            // TPTterm = TPTgtterm + "A" + termsUP; // Sets file to search for
                            // var target = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
                            // target.initWithPath("s:\\" + TPTterm);
                            // if (target.exists()) {
                                // h = 0;
                            // } // Check that EPF folder exists
                        // }
                        // termsUP = TPTterm;
                    // }
                    // // ****END GTC Guessing*****************************************
                // } // End GTC guessing if statement
            
            
                // // Open advanced EPF view
                // target = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
                // target.initWithPath("s:\\" + termsUP);
                // if (!target.exists()) { // Check that EPF folder exists
                    // // PF does not exist
                    // console.log(terms + " does not exist!  Verify six vs eleven digit folder names");
                    // //Indicator('true');
                        // notifications.notify({
                            // title: _(fs_error),
                            // text: _(fs_epf_code),
                            // iconURL: myIconURL
                        // });
                    // return;
                // } else {
                    // preferences.Part_Number = termsUP;
                    // tabs.open({
                        // url: "resource://FileSearch-at-tenneco-dot-com/data/EPFViewer.html",
                        // isPinned: false,
                        // inNewWindow: false,
                        // inBackground: false
                    // });
                    // //gBrowser.selectedTab = gBrowser.addTab("./EPFViewer.html#" + "s:\\" + termsUP);
                // }
            // } */
            // // ****END EPF***************************************
            // //else // Not EPF so perform normal HTTP get
            // //{
                // var fileRequest = Request({
                  // url: url_to_open3,
                  // onComplete: function (response) {
                    // transferComplete(termsUP, msg, url_to_open3);
                  // }
                // });
                // fileRequest.get();
            // //}
        // } else if (type == "open_dv") {//Dual view
            // //console.log("File A: " + title + ", File B: " + msg);
            
            // tabs.open({
                // url: "about:dualview",
                // isPinned: false,
                // inNewWindow: false,
                // inBackground: false
            // });
            
            // DualViewmanager.addMessageListener("ready", function() {
                // var array = new Array(title, msg);
                // DualViewmanager.sendAsyncMessage("search", array);
            // });
            // //var array = new Array(title, msg);
            // //DualViewmanager.sendAsyncMessage("search", array);
            
        // } else {
            // console.log("Error with search data: " + e.data);
        // }
    // }
// });

//Example sending info too toolbar
//AdvancedMenu.postMessage("Super_array", preferences.Super_array);

/* var toolbar = Toolbar({
  title: "File Search Toolbar",
  hidden: false,
  items: [TennecoLogo, download, email, fs_button]
});

toolbar.on("show", showing);
toolbar.on("hide", hiding); 

function showing(e) {
  console.log("showing: " + e.title);
}

function hiding(e) {
  console.log("hiding: " + e.title);
}*/

//DualViewmanager.addMessageListener("loaded", function(parts) {
//    var a = parts.data[0];
//    var b = parts.data[1];
    
//    DualViewmanager.sendAsyncMessage("unassignNum", owner);
//});

// using remove page manager instead?
// Page mod for dual view
// pageMod.PageMod({
    // include: "about:dualview",
    // contentScriptWhen: 'end',
    // contentScriptFile: './js/viewer.js',
    // onAttach: function(worker) {
        // worker.on('detach', function () {
            // //Nothing
        // });
    // }
// });

// 7ad46da2-15c9-11e5-b939-0800200c9a66 - open
// 7ad46da3-15c9-11e5-b939-0800200c9a66 - open



const aboutDualViewContract = "@mozilla.org/network/protocol/about;1?what=dualview";
const aboutDualViewDescription = "About Dual View";
const aboutDualViewUUID = components.ID("7ad46da0-15c9-11e5-b939-0800200c9a66");

const aboutEPFViewerContract = "@mozilla.org/network/protocol/about;1?what=epfviewer";
const aboutEPFViewerDescription = "About EPF Viewer";
const aboutEPFViewerUUID = components.ID("7ad46da1-15c9-11e5-b939-0800200c9a66");

// about:dualview factory
let aboutDualViewFactory = {
    createInstance: function(outer, iid) {
        if (outer !== null)
            throw Cr.NS_ERROR_NO_AGGREGATION;

        return aboutDualView.QueryInterface(iid);
    }
};

// about:dualview
let aboutDualView = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:dualview")
            return;

        let uri = Services.io.newURI("resource://FileSearch-at-tenneco-dot-com/data/viewer.html", null, null);
        return Services.io.newChannelFromURI(uri);
    }
};
Cm.QueryInterface(Ci.nsIComponentRegistrar).
registerFactory(aboutDualViewUUID, aboutDualViewDescription, aboutDualViewContract, aboutDualViewFactory);

// about:epfviewer factory
let aboutEPFViewerFactory = {
    createInstance: function(outer, iid) {
        if (outer !== null)
            throw Cr.NS_ERROR_NO_AGGREGATION;

        return aboutEPFViewer.QueryInterface(iid);
    }
};

// about:epfviewer
let aboutEPFViewer = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:epfviewer")
            return;

        let uri = Services.io.newURI("resource://FileSearch-at-tenneco-dot-com/data/EPFViewer.html", null, null);
        return Services.io.newChannelFromURI(uri);
    }
};
Cm.QueryInterface(Ci.nsIComponentRegistrar).
registerFactory(aboutEPFViewerUUID, aboutEPFViewerDescription, aboutEPFViewerContract, aboutEPFViewerFactory);
