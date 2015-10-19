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
var privateBrowsing = require("sdk/private-browsing");
var Request = require("sdk/request").Request;
const cm = require("sdk/context-menu");
const { Cc,Ci,Cm,Cu,components } = require("chrome");
const { ToggleButton } = require("sdk/ui/button/toggle");
const utils = require('sdk/window/utils');
const { defer } = require('sdk/core/promise');
const { OS, TextEncoder, TextDecoder } = Cu.import("resource://gre/modules/osfile.jsm", {});
//var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);
Cu.import("resource://gre/modules/Services.jsm", this);
Cu.import("resource://gre/modules/Downloads.jsm");
Cu.import("resource://gre/modules/Task.jsm");
Cu.import("resource://gre/modules/Downloads.jsm");
Cu.import("resource://gre/modules/Promise.jsm");

var myIconURL = self.data.url("./images/icon.png");
var fileURL = require("./data/lib/fileURL.js");
//var fileLocal = require("./data/lib/fileLocal.js");
var wl = require("./data/lib/whitelist.js");

Cu.import("resource://gre/modules/RemotePageManager.jsm");
let DualViewmanager = new RemotePages("about:dualview");
let EPFViewmanager = new RemotePages("about:epfviewer");

// Create a page mod for EPF page
pageMod.PageMod({
    include: "about:epfviewer",
    onAttach: function(worker) {
        var epf_menuItem = cm.Item({
            label: "Launch File",
            context: [cm.SelectorContext("option"), cm.URLContext("about:epfviewer")],
            image: self.data.url("./images/launch.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  var folder1 = node.parentNode.id;' +
                         '  var folder2 = node.value;' +
                         '  var file = node.textContent;' +
                         '  var upChange = JSON.stringify({' +
                         '  folder1: folder1,' +
                         '  folder2: folder2,' +
                         '  file: file' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '});',
            onMessage: function (upChange) {
                launch(upChange);
            }
        });
        
        // var epf_menuItem2 = cm.Item({
            // label: "Launch File Location",
            // context: [cm.SelectorContext("option"), cm.URLContext("about:epfviewer")],
            // image: self.data.url("./images/launch2.png"),
            // contentScript: 'self.on("click", function (node) {' +
                         // '  var folder1 = node.parentNode.id;' +
                         // '  var folder2 = node.value;' +
                         // '  var file = node.textContent;' +
                         // '  var upChange = JSON.stringify({' +
                         // '  folder1: folder1,' +
                         // '  folder2: folder2,' +
                         // '  file: file' +
                         // '  });' +
                         // '  self.postMessage(upChange);' +
                         // '});',
            // onMessage: function (upChange) {
                // launch2(upChange);
            // }
        // });
        
        worker.on('detach', function () {
            epf_menuItem.destroy();
            //epf_menuItem2.destroy();
        });

        function launch(upChange) {
            var parsedupChange = JSON.parse(upChange),
                folder1 = parsedupChange.folder1,
                folder2 = parsedupChange.folder2,
                file = parsedupChange.file,
                PN = preferences.Part_Number;
            console.log("Attempting to launch: S:\\" + PN + "\\" + folder1 + "\\" + folder2 + "\\" + file);
            tabs.open({
                url: "S:\\" + PN + "\\" + folder1 + "\\" + folder2 + "\\" + file,
                isPinned: false,
                inNewWindow: false,
                inBackground: false
            });
        }
    }
  });
//The following pagemods add fav icons and change page titles to PDF name
pageMod.PageMod({
    include: "http://millap01.na.ten/TESTSPEC*",
    contentScriptFile: './js/pm_ts.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/CLEVPRNT*",
    contentScriptFile: './js/pm_parts.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/MATSPEC*",
    contentScriptFile: './js/pm_ms.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/SKETCH*",
    contentScriptFile: './js/pm_sk.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/PROD*",
    contentScriptFile: './js/pm_rfp.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/TOOLS*",
    contentScriptFile: './js/pm_tools.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/PROCSPEC*",
    contentScriptFile: './js/pm_ps.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/COST*",
    contentScriptFile: './js/pm_cost.js'
});
pageMod.PageMod({
    include: "http://millap01.na.ten/EWS*",
    contentScriptFile: './js/pm_ews.js'
});

//Page mod for worksheet links (in_ewr_id=XXXXX & in_ewr_no=XXXXX)
pageMod.PageMod({
  include: "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_*",
  contentScriptWhen: 'end',
  contentScriptFile: './js/directPart.js',
  onAttach: function(worker) {
    worker.on('message', function(message) {
        if (preferences.EWSDirectPrint) {
            var url = message.url,
                part = message.element,
                urlCHK = "";
            if (url.includes("p_part_id")) {
                //console.log('URL: ' + message.url);
                //console.log('Target: ' + /[^\s]+/.exec(part));
                urlCHK = fileURL.FSdisplay(String(/[^\s]+/.exec(part)));

                if (urlCHK == "unknown") {
                    //Do nothing
                } else {
                    //Replace old href with new urlCHK
                    var URLs = JSON.stringify({
                        url_new: urlCHK,
                        url_old: url
                    });
                    worker.postMessage(URLs);
                }
            } else {
                //Do nothing
            }
        }
    });
  }
});


var fs_button = ToggleButton({
  id: "fs-search",
  label: "File Search",
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
    height: 275,
    focus: true,
    contentURL: "./searchMenu.html",
    onHide: handleHide,
    //onShow: handleShow,
    contentScriptWhen: 'end',
    contentScriptFile: ["./lib/jquery-2.1.4.min.js",
                      "./lib/typeahead.bundle.js",
                      "./js/searchMenu.js"]
});

fs_panel.on("show", function() {
    fs_panel.port.emit("show");
});

// fs_panel.port.on("data_load", function () {
    // //For single file
    // var httpRequest = Request({
        // url: "http://170.64.172.81/scripts/FileSearch/superarray.json",
        // headers: {
            // 'Cache-control': 'no-cache'
        // },
        // onComplete: function (response) {
            // fs_panel.port.emit("rtn_data", response.text);
        // }
    // });
    // httpRequest.get();
// });

fs_panel.port.on("data_load_mul", function () {
    //THIS DOES WORK
    function get(url) {
        var requestPromise = new Promise(function(resolve, reject) {
            var httpRequest = Request({
                url: url,
                headers: {
                    'Cache-control': 'no-cache'
                },
                onComplete: function (response) {
                    resolve(response.text);
                }
            });
            httpRequest.get();
        });

        return Promise.all([requestPromise, ]).then(function(results) {
            return results;
        });
    }
    
    function getJSON(url) {
        return get(url).then(JSON.parse);
    }
    function getJSON2(url) {
        return get(url);
    }
    var arr = [];
    
    getJSON('http://170.64.172.81/scripts/FileSearch/dataFiles.json').then(function(data) {
        //console.log(data);
        //Take an array of promises and wait on them all
        return Promise.all(
            // Map our array of chapter urls to
            // an array of chapter json promises
            data.fileUrls.map(getJSON2)
        );
    }).then(function(chapters) {
        //console.log(chapters);
        // Now we have the chapters jsons in order! Loop through…
        chapters.forEach(function(chapter) {
            //console.log(chapter);
            arr.push(chapter);
        });
        console.log("Done downloading search suggestions.");
    }).catch(function(err) {
        // catch any error that happened so far
        console.log("Argh, broken: " + err.message);
    }).then(function() {
        fs_panel.port.emit("rtn_data_mul", arr);
    }); 
//fs_panel.port.emit("rtn_data_mul");  
});

fs_panel.port.on("empty", function () {
    notifications.notify({
        title: "File Search Error",
        text: "You must enter a search value!" ,
        iconURL: myIconURL
    });
});

function onPrefChange(prefName) {
    //console.log("The preference " + prefName + " value has changed!");
    if (prefName == "Part_Number") {
        if (preferences.Part_Number == "EPF_error") {
             notifications.notify({
                title: "File Search Error",
                text: "EPF search directory does not exist!" ,
                iconURL: myIconURL
             });
        }
    }
}
require("sdk/simple-prefs").on(preferences.Part_Number, onPrefChange);

fs_panel.port.on("EPF", function (search) {
    preferences.Part_Number = "";
    var pnSearch = search,
        pnCount = pnSearch.length,
        epfFile = "",
        TPTterm = "";
    //var promises = [];
    if (pnCount == 6) { // If only six digits then guess GT code
        var arr = new Array("BP00", "CA00", "CM00", "CM05", "CM97", "CM99", "CT00", "FB00", "FB01", "FS32", "FS35", "FS99", "FS28", "FT44", "FT57", "FT99", "KT00", "LA00", "LA01", "LA02", "LA03", "LA04", "LA05", "LA06", "LA07", "LA99", "MB00", "MB01", "MB02", "MB03", "MB04", "MB05", "MB07", "MB08", "MB09", "MB96", "MB99", "MD00", "MM00", "MM01", "MM02", "MM03", "MM04", "MM05", "MS00", "RT01", "RT02", "RT03", "RT04", "RT05", "RT06", "RT07", "RT08", "RT09", "RT10", "RT11", "RT12", "RT13", "RT14", "RT15", "RT99", "SB01", "SB02", "SB03", "SB04", "SB05", "SB06", "SB07", "SB08", "SB96", "SB97", "SB98", "SB99", "SG00", "SG01", "XM00", "XM01", "XM02");
        //var arr = new Array("MB96", "XM01", "XM02");
        if (String(pnSearch).substring(0, 2) != "SK") {            // SKs do not have GTC
            for (var h = arr.length - 1; h >= 0; h--) {
                var TPTgtterm = arr[h]; // Sets current array GT code
                TPTterm = TPTgtterm + "A" + pnSearch; // Sets file to check
                epfFile = "S://" + TPTterm;
                getPN(epfFile);
            }
        } else {
            epfFile = "S://" + String(pnSearch);
            getPN(epfFile);
        }
    } else {
        epfFile = "S://" + String(pnSearch);
        getPN(epfFile);
    }
    
    function getPN(partnum) {
        var promise3 = OS.File.exists(partnum);
        promise3.then(
            function (existsValue) {
                if (existsValue === true) {
                    preferences.Part_Number = partnum.substring(4, 15);
                    fs_panel.hide();
                    tabs.open({
                        url: "about:epfviewer",
                        isPinned: false,
                        inNewWindow: false,
                        inBackground: false
                    });
                    return;
                } else if (existsValue === false) {
                    //This does not work due to looping through some that will be false AND some true
                    //preferences.Part_Number = "EPF_error";
                    return;
                }
            },
            function (aRejectReason) {
                 console.log(aRejectReason);
                 notifications.notify({
                        title: "File Search Error",
                        text: "Unknown EPF search error!" ,
                        iconURL: myIconURL
                    });
            }
        ); 
    }
});

EPFViewmanager.addMessageListener("get_pn", function() {
    // Send saved PN to content script when requested
    var PN_saved = preferences.Part_Number;
    EPFViewmanager.sendAsyncMessage("thePN", PN_saved);
});

EPFViewmanager.addMessageListener("dir_check", function(directory) {
    var epfDir = directory.data[0],
        dir_int = directory.data[1],
        file = Cc["@mozilla.org/file/local;1"].  
                  createInstance(Ci.nsIFile);
    file.initWithPath(epfDir);
    children = file.directoryEntries;
    dirList = [];
    while (children.hasMoreElements()) {
        child = children.getNext().QueryInterface(Ci.nsIFile);
        dirList.push(child.leafName);
    }
    EPFViewmanager.sendAsyncMessage("thefiles" + dir_int, dirList);
});


fs_panel.port.on("unknown", function (search) {
    notifications.notify({
        title: "File Search Error",
        text: "Cannot determine path for '" + search + "'." ,
        iconURL: myIconURL
    });
});

fs_panel.port.on("go_search", function (array) {
    var folder = array[0],
        url = array[1],
        term = array[2],
    wm = Cc["@mozilla.org/appshell/window-mediator;1"]
        .getService(Ci.nsIWindowMediator),
    browserEnumerator = wm.getEnumerator("navigator:browser"),
        found = false;
        
    // Check each browser instance for our URL
    while (!found && browserEnumerator.hasMoreElements()) {
        var browserWin = browserEnumerator.getNext();
        var tabbrowser = browserWin.gBrowser;

        // Check each tab of this browser instance
        var numTabs = tabbrowser.browsers.length;
        for (var index = 0; index < numTabs; index++) {
          var currentBrowser = tabbrowser.getBrowserAtIndex(index);
          if (url == currentBrowser.currentURI.spec) {

            // The URL is already opened. Select this tab.
            fs_panel.hide();
            tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];
            console.log(term + " is alrady open.");

            // Focus *this* browser-window
            browserWin.focus();

            found = true;
            break;
          }
        }
    }

  // Our URL isn't open. Open it now.
  if (!found) {
    console.log("URL: " + url + ", Term: " + term);
    var fileRequest = Request({
      url: url,
      headers: {
        'Cache-control': 'must-revalidate,max-age=3600'
      },
      onComplete: function (response) {
        if (response.status = "200") {
            transferComplete(term, url);
        } else {
            notifications.notify({
                title: "File Search Error",
                text: "The server returned error code: \n\n" + ' ' + response.statusText,
                iconURL: myIconURL
            });
            console.error("Server Status: " + response.status);
        }
      }
    });
    fileRequest.get();
  }
});

fs_panel.port.on("go_DV_search", function (array) {
    preferences.Part_Number_a = array[0];
    preferences.Part_Number_b = array[1];
    fs_panel.hide();
    console.log("Private: " + privateBrowsing.isPrivate(windows));
    tabs.open({
        url: "about:dualview",
        isPinned: false,
        inNewWindow: false,
        inBackground: false
    });
});

DualViewmanager.addMessageListener("ready", function() {
    var a = preferences.Part_Number_a,
        b = preferences.Part_Number_b,
        array = new Array(a, b);
    DualViewmanager.sendAsyncMessage("search", array);
});

fs_panel.port.on("text-entered", function (text) {
    console.log(text);
    fs_panel.hide();
});

function handleChange(state) {
  if (state.checked) {
    fs_panel.show({
      position: fs_button
    });
  }
  else {
  }
}

function handleHide() {
  fs_button.state('window', {checked: false});
  fs_panel.hide();
}

// function readhttp(thename){
    // var httpRequest = Request({
        // url: thename,
        // headers: {
            // 'Cache-control': 'no-cache'
        // },
        // onComplete: function (response) {
            // //console.log(response.text);
            // return response.text;
        // }
    // });
    // httpRequest.get();
// }

var PasteGo = ActionButton({
    id: "PasteGo-button",
    label: "Auto File Search",
    icon: {
      "16": "./images/PG16.png",
      "32": "./images/PG32.png",
      "64": "./images/PG64.png",
    },
    onClick: function(state) {
        var pastetext = clipboard.get(),
            wltext,
            urlCHK = "";

        if (pastetext) {
            console.log("Original paste & go value: '" + pastetext + "'");
            pastetext = pastetext.replace(/^[\r\n]+|[\r\n]+$/g, '');//Remove leading / trailing carriage returns / line feeds
        }
        //Replace search text if matches found in whitelist
        wltext = wl.wlCompare(pastetext);
        urlCHK = fileURL.FSdisplay(wltext);
        if (urlCHK == "unknown") {
            notifications.notify({
                title: "File Search Error",
                text: "Your search for '" + pastetext + "' was unsucessful.",
                iconURL: myIconURL
            });
        } else if (urlCHK == "blank") {
            notifications.notify({
                title: "File Search Error",
                text: "Your clipboard contains no data.",
                iconURL: myIconURL
            });
        } else {
            var url = urlCHK;
            wm = Cc["@mozilla.org/appshell/window-mediator;1"]
                .getService(Ci.nsIWindowMediator),
            browserEnumerator = wm.getEnumerator("navigator:browser"),
                found = false;
            
            while (!found && browserEnumerator.hasMoreElements()) {
                var browserWin = browserEnumerator.getNext();
                var tabbrowser = browserWin.gBrowser;

                // Check each tab of this browser instance
                var numTabs = tabbrowser.browsers.length;
                for (var index = 0; index < numTabs; index++) {
                  var currentBrowser = tabbrowser.getBrowserAtIndex(index);
                  if (url == currentBrowser.currentURI.spec) {

                    // The URL is already opened. Select this tab.
                    fs_panel.hide();
                    tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];
                    console.log("File is alrady open.");

                    // Focus *this* browser-window
                    browserWin.focus();

                    found = true;
                    break;
                  }
                }
            }

          // Our URL isn't open. Open it now.
          if (!found) {
            console.log("URL: " + url + ", Term: " + pastetext);
            var fileRequest = Request({
              url: url,
              headers: {
                'Cache-control': 'must-revalidate,max-age=3600'
              },
              onComplete: function (response) {
                    if (response.status = "200") {
                        transferComplete(pastetext, url);
                    } else {
                        notifications.notify({
                            title: "File Search Error",
                            text: "The server returned error code: \n\n" + ' ' + response.statusText,
                            iconURL: myIconURL
                        });
                        console.error("Server Status: " + response.status);
                    }
              }
            });
            fileRequest.get();
          }
        }
    }
});

var email = ActionButton({
    id: "email-button",
    label: "Email current PDF",
    icon: {
      "16": "./images/email.png",
      "32": "./images/email32.png",
      "64": "./images/email64.png"
    },
    onClick: logContentAsync
});

function DownloadFile(sLocalFileName, sRemoteFileName) {
    var oIOService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService),
        oLocalFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    oLocalFile.initWithPath(sLocalFileName);

    var oDownloadObserver = {
        onDownloadComplete: function(nsIDownloader, nsresult, oFile) {
            console.log('PDF downloaded, ready for email.');
        }
    };
    var oDownloader = Cc["@mozilla.org/network/downloader;1"].createInstance();
    oDownloader.QueryInterface(Ci.nsIDownloader);
    oDownloader.init(oDownloadObserver, oLocalFile);

    var oHttpChannel = oIOService.newChannel(sRemoteFileName, "", null);
    oHttpChannel.QueryInterface(Ci.nsIHttpChannel);
    oHttpChannel.asyncOpen(oDownloader, oLocalFile);
}
                        
function logContent(message) {
    var n = occurrences(String(message.data.url.href), ".pdf"),
        open_PDF_name = "",
        open_PDF_name2 = "",
        pdf_dir,
        d,
        df,
        email_pdf = "";
    
    if (n == 1) {
        //console.log(data_URL);  //Additional data available from var
        open_PDF_name = message.data.url.href.match(/[a-zA-Z0-9-_]+\.pdf/i); //With .pdf
        open_PDF_name2 = String(open_PDF_name).replace(/.pdf/i, ""); //Without .pdf

        // Sets dir to desktop.
        pdf_dir = require('sdk/system').pathFor('Desk');

        d = new Date();
        df = "" + (d.getMonth() + 1) + d.getDate() + d.getFullYear();
        email_pdf = pdf_dir + "\\" + open_PDF_name2 + "_" + df + ".pdf";
        DownloadFile(email_pdf,message.data.url.href);

        const myurl = "mailto://?subject=" + open_PDF_name2 + "%20Print&body=%0AAttached%20is%20the%20Tenneco%20" + open_PDF_name2 + "%20print.%20%20If%20you%20have%20any%20issues%20opening%20the%20file%20let%20me%20know%0A%0A&attach=" + email_pdf + "";
        
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
            text: "Cannot save PDF from URL: \n\n" + ' ' + message.data.url.href,
            iconURL: myIconURL
        });
        console.error("Cannot verify page URL contains PDF");
    }
}

function logContentAsync() {   
     // Get URL and file name from active window PDF
    var tab = require("sdk/tabs").activeTab;
    var xulTab = require("sdk/view/core").viewFor(tab);
    var xulBrowser = require("sdk/tabs/utils").getBrowserForTab(xulTab);

    var browserMM = xulBrowser.messageManager;
    browserMM.loadFrameScript(self.data.url("js/frame-script.js"), false);
    browserMM.addMessageListener("FileSearch-at-tenneco-dot-com:got-content",
                           logContent);
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

//Download button not enabled since it should not be needed any more
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

function transferComplete(termsUP, url_to_open) {
    //Does not work correctly with "always private" mode. - Bug 1026614
    var windows = require("sdk/windows").browserWindows;
    
    var tabprefs = preferences.TabFocus;
    var panelprefs = preferences.PanelClose;

    if (panelprefs === true) {
        fs_panel.hide();
    }

    preferences.Part_Number_a = url_to_open;
    var Part_Num_type = preferences.Part_Num_type;
    //console.log("Private: " + privateBrowsing.isPrivate(windows));
    //console.log(privateBrowsing.isPrivate(windows.activeWindow));
    var privateStatus = privateBrowsing.isPrivate(windows.activeWindow);
    if (privateStatus === false) {
        if (tabprefs === false) { // Open tab w/o focus
            tabs.open({
                url: url_to_open,
                isPinned: false,
                isPrivate: false,
                inNewWindow: false,
                inBackground: true
            });
        } else { // Open active tab
            tabs.open({
                url: url_to_open,
                isPinned: false,
                isPrivate: false,
                inNewWindow: false,
                inBackground: false
            });
        }
    } else { //Use private window
        if (tabprefs === false) { // Open tab w/o focus
            tabs.open({
                url: url_to_open,
                isPinned: false,
                isPrivate: true,
                inNewWindow: false,
                inBackground: true
            });
        } else { // Open active tab
            tabs.open({
                url: url_to_open,
                isPinned: false,
                isPrivate: true,
                inNewWindow: false,
                inBackground: false
            });
        }
    }
}

//Example sending info too toolbar
//AdvancedMenu.postMessage("Super_array", preferences.Super_array);

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
