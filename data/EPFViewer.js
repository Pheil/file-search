// Setup for display of EPF
var PN_saved = preferences.Part_Number;
   document.getElementById("PN_saved").setAttribute("value", PN_saved);
   document.title = PN_saved + ' EPF';

var file = Cc["@mozilla.org/file/local;1"].  
              createInstance(Ci.nsIFile);

//Check for main dir note file
    file.initWithPath('S:\\' + PN_saved);
    var children = file.directoryEntries;
    var child;
    var counter = 0;
    var epf_note = [];
    while (children.hasMoreElements())
        {
            child = children.getNext().QueryInterface(Ci.nsIFile);
            if (child.isFile() === true)
                {
                    counter = counter + 1;
                    epf_note.push(child.leafName); 
                }
        }
    //Try to strip out only part number
    if (counter == 1)
    {
        var str = String(epf_note);
        var strl = str.length-4;
        epf_note = str.substring(0,strl);
    }
    else if (counter > 1)
    {
        epf_note = "See S: EPF for multiple notes";
    }
    //Save name and display
    if (epf_note !== null )
    {
        document.getElementById("EPF_note").setAttribute("value", epf_note);
        document.getElementById("EPF_note").setAttribute("hidden", "false");
    }

var nofolder = "";                //Error varaible
var b_list1;
var b_list2;
var b_list3;
var b_list4;
var cp_list1;
var cp_list2;
var c_list1;
var c_list2;
var de_list1;
var de_list2;
var de_list3;
var de_list4;
var de_list5;
var de_list6;
var de_list7;
var de_list8;
var de_list9;
var dc_list1;
var dc_list2;
var dc_list3;
var dc_list4;
var pc_list1;
var pc_list2;
var pc_list3;
var pc_list4;
var pc_list5;
//Builds Total
    file.initWithPath('S:\\' + PN_saved + '\\Builds\\Checklists');
    if (!file.exists()) {nofolder = "Builds\\Checklists\n";}
    else if (file.exists())
        {
            children = file.directoryEntries;
            b_list1 = [];
            while (children.hasMoreElements())
                {
                child = children.getNext().QueryInterface(Ci.nsIFile);
                b_list1.push(child.leafName);
                }
        }
    file.initWithPath('S:\\' + PN_saved + '\\Builds\\Development');
    if (!file.exists()) {nofolder = nofolder + "Builds\\Development\n";}
    else if (file.exists())
        {
            children = file.directoryEntries;
            b_list2 = [];
            while (children.hasMoreElements())
                {
                    child = children.getNext().QueryInterface(Ci.nsIFile);
                    b_list2.push(child.leafName);
                }
        }
    file.initWithPath('S:\\' + PN_saved + '\\Builds\\Production');
    if (!file.exists()) {nofolder = nofolder + "Builds\\Production\n";}
    else if (file.exists())
        {
            children = file.directoryEntries;
            b_list3 = [];
            while (children.hasMoreElements())
                {
                    child = children.getNext().QueryInterface(Ci.nsIFile);
                    b_list3.push(child.leafName);
                }
        }
    file.initWithPath('S:\\' + PN_saved + '\\Builds\\Quality');
    if (!file.exists()) {nofolder = nofolder + "Builds\\Quality\n";}
    else if (file.exists())
        {
            children = file.directoryEntries;
            b_list4 = [];
            while (children.hasMoreElements())
                {
                child = children.getNext().QueryInterface(Ci.nsIFile);
                b_list4.push(child.leafName);
                }
        }
    
//Correspondence and Presentations Total
    file.initWithPath('S:\\' + PN_saved + '\\Correspondence_and_Presentations\\Miscellaneous');
    if (!file.exists()) {nofolder = nofolder + "C&P\\Miscellaneous\n";}
    else if (file.exists()) {
    children = file.directoryEntries;
    cp_list1 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      cp_list1.push(child.leafName);
    }
     }
    file.initWithPath('S:\\' + PN_saved + '\\Correspondence_and_Presentations\\Presentations');
    if (!file.exists()) {nofolder = nofolder + "C&P\\Presentations\n";}
    else if (file.exists()) {
    children = file.directoryEntries;
    cp_list2 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      cp_list2.push(child.leafName);
    }
     }
     
//Costs Total 
     file.initWithPath('S:\\' + PN_saved + '\\Costs\\Production');
     if (!file.exists()) {nofolder = nofolder + "Costs\\Production\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    c_list1 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      c_list1.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Costs\\Prototype');
     if (!file.exists()) {nofolder = nofolder + "Costs\\Prototype\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    c_list2 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      c_list2.push(child.leafName);
    }
     }

// Design & Engineering Total
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\Action_Register');
     if (!file.exists()) {nofolder = nofolder + "D&E\\Action_Register\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list1 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list1.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\Design_Information');
     if (!file.exists()) {nofolder = nofolder + "D&E\\Design_Information\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list2 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list2.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\DFMEA_(Closed)');
     if (!file.exists()) {nofolder = nofolder + "D&E\\DFMEA_(Closed)\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list3 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list3.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\DVPR');
     if (!file.exists()) {nofolder = nofolder + "D&E\\DVPR\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list4 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list4.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\Engineering_Workbook');
     if (!file.exists()) {nofolder = nofolder + "D&E\\Engineering_Workbook\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list5 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list5.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\FEA');
     if (!file.exists()) {nofolder = nofolder + "D&E\\FEA\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list6 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list6.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\Gate_6');
     if (!file.exists()) {nofolder = nofolder + "D&E\\Gate_6\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list7 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list7.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\Milestones');
     if (!file.exists()) {nofolder = nofolder + "D&E\\Milestones\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list8 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list8.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Design_and_Engineering\\Timing');
     if (!file.exists()) {nofolder = nofolder + "D&E\\Timing\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    de_list9 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      de_list9.push(child.leafName);
    }
     }

// Dimension Checks Total
     file.initWithPath('S:\\' + PN_saved + '\\Dimension_Checks\\Componenets');
     if (!file.exists()) {nofolder = nofolder + "Dimension Checks\\Componenets\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    dc_list1 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      dc_list1.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Dimension_Checks\\End_Product');
     if (!file.exists()) {nofolder = nofolder + "Dimension Checks\\End_Product\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    dc_list2 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      dc_list2.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Dimension_Checks\\Mold');
     if (!file.exists()) {nofolder = nofolder + "Dimension Checks\\Mold\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    dc_list3 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      dc_list3.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Dimension_Checks\\Tools');
     if (!file.exists()) {nofolder = nofolder + "Dimension Checks\\Tools\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    dc_list4 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      dc_list4.push(child.leafName);
    }
     }

// Prints & CAD Total
     file.initWithPath('S:\\' + PN_saved + '\\Prints_and_CAD\\Competitive');
     if (!file.exists()) {nofolder = nofolder + "Prints and CAD\\Competitive\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    pc_list1 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      pc_list1.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Prints_and_CAD\\Customer\\Application');
     if (!file.exists()) {nofolder = nofolder + "CAD\\Customer\\Application\n";}
     else if (file.exists()) {
    children = file.directoryEntries;
    pc_list2 = [];
    while (children.hasMoreElements()) {
      child = children.getNext().QueryInterface(Ci.nsIFile);
      pc_list2.push(child.leafName);
    }
     }
     file.initWithPath('S:\\' + PN_saved + '\\Prints_and_CAD\\Customer\\Product');
     if (!file.exists()) {nofolder = nofolder + "CAD\\Customer\\Product\n";}
     else if (file.exists())
        {
            children = file.directoryEntries;
            pc_list3 = [];
            while (children.hasMoreElements())
                {
                    child = children.getNext().QueryInterface(Ci.nsIFile);
                    pc_list3.push(child.leafName);
                }
        }
     file.initWithPath('S:\\' + PN_saved + '\\Prints_and_CAD\\Internal');
     if (!file.exists()) {nofolder = nofolder + "CAD\\Internal\n";}
     else if (file.exists())
    {
        children = file.directoryEntries;
        pc_list4 = [];
        while (children.hasMoreElements())
        {
            child = children.getNext().QueryInterface(Ci.nsIFile);
            pc_list4.push(child.leafName);
        }
    }
    file.initWithPath('S:\\' + PN_saved + '\\Prints_and_CAD\\Supplier');
    if (!file.exists()) {nofolder = nofolder + "CAD\\Supplier\n";}
    else if (file.exists())
        {
            children = file.directoryEntries;
            pc_list5 = [];
            while (children.hasMoreElements())
            {
                child = children.getNext().QueryInterface(Ci.nsIFile);
                pc_list5.push(child.leafName);
            }
        }

// Check for folder error
var b_length;
var cp_length;
var c_length;
var de_length;
var dc_length;
var pc_length;
if(undefined === nofolder)
    {
        alert('These folders are missing!\n\n ' + nofolder + '\n\n  Please report this error immediately.');
    }
else if(undefined !== nofolder)
    {   // No error so sum folder file count totals
        b_length = b_list1.length + b_list2.length + b_list3.length + b_list4.length;
        cp_length = cp_list1.length + cp_list2.length;
        c_length = c_list1.length + c_list2.length;
        de_length = de_list1.length + de_list2.length + de_list3.length + de_list4.length + de_list5.length + de_list6.length + de_list7.length + de_list8.length + de_list9.length;
        dc_length = dc_list1.length + dc_list2.length + dc_list3.length + dc_list4.length;
        pc_length = pc_list1.length + pc_list2.length + pc_list3.length + pc_list4.length + pc_list5.length;
    }
    
//Save file counts
    document.getElementById("Tree_b_v").setAttribute("value", '(' + b_length + ')');
    document.getElementById("Tree_cp_v").setAttribute("value", '(' + cp_length + ')');
    document.getElementById("Tree_c_v").setAttribute("value", '(' + c_length + ')');
    document.getElementById("Tree_de_v").setAttribute("value", '(' + de_length + ')');
    document.getElementById("Tree_dc_v").setAttribute("value", '(' + dc_length + ')');
    document.getElementById("Tree_pc_v").setAttribute("value", '(' + pc_length + ')');
   
//Save file names
    var i;
    var j;
    var k;
    var l;
    var m;
    var n;
    var o;
    var p;
    var q;
    var list_b = document.getElementById("List_b");
    if (b_length === 0){list_b.insertItemAt(1,"None","");}
    else if (b_length > 0)
        {
           for(i=b_list1.length-1; i>=0; i--) {list_b.insertItemAt(i,b_list1[i],"Checklists");}
           for(j=b_list2.length-1; j>=0; j--) {list_b.insertItemAt(i,b_list2[j],"Development");}
           for(k=b_list3.length-1; k>=0; k--) {list_b.insertItemAt(j,b_list3[k],"Production");}
           for(l=b_list4.length-1; l>=0; l--) {list_b.insertItemAt(k,b_list4[l],"Quality");}
        }
    var list_cp = document.getElementById("List_cp");
    if (cp_length === 0){list_cp.insertItemAt(1,"None","");}
    else if (cp_length > 0)
        {
            for(i=cp_list1.length-1; i>=0; i--) {list_cp.insertItemAt(i,cp_list1[i],"Miscellaneous");}
            for(j=cp_list2.length-1; j>=0; j--) {list_cp.insertItemAt(i,cp_list2[j],"Presentations");}
        }
    var list_c = document.getElementById("List_c");
    if (c_length === 0){list_c.insertItemAt(1,"None","");}
    else if (c_length > 0)
        {
            for(i=c_list1.length-1; i>=0; i--) {list_c.insertItemAt(i,c_list1[i],"Production");}
            for(j=c_list2.length-1; j>=0; j--) {list_c.insertItemAt(i,c_list2[j],"Prototype");}
        }
    var list_de = document.getElementById("List_de");
    if (de_length === 0){list_de.insertItemAt(1,"None","");}
    else if (de_length > 0)
        {
            for(i=de_list1.length-1; i>=0; i--) {list_de.insertItemAt(i,de_list1[i],"Action_Register");}
            for(j=de_list2.length-1; j>=0; j--) {list_de.insertItemAt(i,de_list2[j],"Design_Information");}
            for(k=de_list3.length-1; k>=0; k--) {list_de.insertItemAt(j,de_list3[k],"DFMEA_(Closed)");}
            for(l=de_list4.length-1; l>=0; l--) {list_de.insertItemAt(k,de_list4[l],"DVPR");}
            for(m=de_list5.length-1; m>=0; m--) {list_de.insertItemAt(l,de_list5[m],"Engineering_Workbook");}
            for(n=de_list6.length-1; n>=0; n--) {list_de.insertItemAt(m,de_list6[n],"FEA");}
            for(o=de_list7.length-1; o>=0; o--) {list_de.insertItemAt(n,de_list7[o],"Gate_6");}
            for(p=de_list8.length-1; p>=0; p--) {list_de.insertItemAt(o,de_list8[p],"Milestones");}
            for(q=de_list9.length-1; q>=0; q--) {list_de.insertItemAt(p,de_list9[q],"Timing");}
        }
       
    var list_dc = document.getElementById("List_dc");
    if (dc_length === 0){list_dc.insertItemAt(1,"None","");}
    else if (dc_length > 0)
        {
            for(i=dc_list1.length-1; i>=0; i--) {list_dc.insertItemAt(i,dc_list1[i],"Componenets");}
            for(j=dc_list2.length-1; j>=0; j--) {list_dc.insertItemAt(i,dc_list2[j],"End_Product");}
            for(k=dc_list3.length-1; k>=0; k--) {list_dc.insertItemAt(j,dc_list3[k],"Mold");}
            for(l=dc_list4.length-1; l>=0; l--) {list_dc.insertItemAt(k,dc_list4[l],"Tools");}
        }
          
    var list_pc = document.getElementById("List_pc");
    if (pc_length === 0){list_pc.insertItemAt(1,"None","");}
    else if (pc_length > 0)
        {
            for(i=pc_list1.length-1; i>=0; i--) {list_pc.insertItemAt(i,pc_list1[i],"Competitive");}
            for(j=pc_list2.length-1; j>=0; j--) {list_pc.insertItemAt(i,pc_list2[j],"Customer/Application");}
            for(k=pc_list3.length-1; k>=0; k--) {list_pc.insertItemAt(j,pc_list3[k],"Customer/Product");}
            for(l=pc_list4.length-1; l>=0; l--) {list_pc.insertItemAt(k,pc_list4[l],"Internal");}
            for(m=pc_list5.length-1; m>=0; m--) {list_pc.insertItemAt(l,pc_list5[m],"Supplier");}
       }

 
function setText(listID,dirFolder)
    {
        var parnum = document.getElementById("PN_saved").getAttribute("value");
        var listBox = document.getElementById(listID);
        var selectedItem = listBox.getSelectedItem(0);
        var newText = selectedItem.getAttribute("label");
        var folder = selectedItem.getAttribute("value");

        if (folder === "")
            { 
                document.getElementById("addy").setAttribute("value", "");}
        else
            {
                document.getElementById("addy").setAttribute("value", "file:///S:/" + parnum + "/" + dirFolder + "/" + folder + "/" + newText);
                document.getElementById("fname").setAttribute("value", newText);
                document.getElementById("fldrname").setAttribute("value", "file:///S:/" + parnum + "/" + dirFolder + "/" + folder + "/");
            }
    }

function setPrev(thetab)
    {
        document.getElementById("addy").setAttribute("value", "");
    }

function openFile()
    {
        var file = document.getElementById("addy").getAttribute("value");
        if (file === "")
            {
                var stringBundle = document.getElementById("EPF-string-bundle");
                var classObj = Cc["@mozilla.org/alerts-service;1"];
                var alertService = classObj.getService(Ci.nsIAlertsService);
                alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("EPF_error"), stringBundle.getString("EPF_error2"));
            }
        else
            {
                file = db_getLocalFileFromNativePathOrUrl(file);
                if(!file.exists())
                    {
                        alert("File not found!");
                        return;
                    }
                try
                    {
                        file.launch();
                    } catch (ex)
                    {
                        // if launch fails, try sending it through the system's external
                        // file: URL handler
                        db_openExternal(file);
                    }
            }
    }

function openFilel()
    {
        var fldrname = document.getElementById("fldrname").getAttribute("value");
        if (!fldrname){
            var stringBundle = document.getElementById("EPF-string-bundle");
            var classObj = Cc["@mozilla.org/alerts-service;1"];
            var alertService = classObj.getService(Ci.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("EPF_error"), stringBundle.getString("EPF_error2"));}
        else
            {
                fldrname = db_getLocalFileFromNativePathOrUrl(fldrname);
                if(!fldrname.exists()) {
                alert("Folder not found!");
                return;
            }
        try {
            fldrname.launch();
        } catch (ex)
            {
                // if launch fails, try sending it through the system's external
                // file: URL handler
                db_openExternal(fldrname);
            }
        }
    }

function copyFilel()
{
    var file = document.getElementById("addy").getAttribute("value");
    if (!file){
        var stringBundle = document.getElementById("EPF-string-bundle");
        var classObj = Cc["@mozilla.org/alerts-service;1"];
        var alertService = classObj.getService(Ci.nsIAlertsService);
        alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("EPF_error"), stringBundle.getString("EPF_error2"));}
    else {
        const gClipboardHelper = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper);
        gClipboardHelper.copyString(file);
    }

}

function copyFilen()
{
    var filename = document.getElementById("fname").getAttribute("value");
        if (!filename){
            var stringBundle = document.getElementById("EPF-string-bundle");
            var classObj = Cc["@mozilla.org/alerts-service;1"];
            var alertService = classObj.getService(Ci.nsIAlertsService);
            alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("EPF_error"), stringBundle.getString("EPF_error2"));}
        else {
            const gClipboardHelper = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper);
            gClipboardHelper.copyString(filename);
    }
}

function db_getLocalFileFromNativePathOrUrl(aPathOrUrl) {
  if (aPathOrUrl.substring(0,7) == "file://") {

    // if this is a URL, get the file from that
    var ioSvc = Cc["@mozilla.org/network/io-service;1"]
      .getService(Ci.nsIIOService);

    // XXX it's possible that using a null char-set here is bad
    const fileUrl = ioSvc.newURI(aPathOrUrl, null, null).
      QueryInterface(Ci.nsIFileURL);
    return fileUrl.file.clone().
      QueryInterface(Ci.nsIFile);

  } else {

    // if it's a pathname, create the nsIFile directly
    var f = Cc["@mozilla.org/file/local;1"].
      createInstance(Ci.nsIFile);
    f.initWithPath(aPathOrUrl);

    return f;
  }
}

function enter(e)
// If user hits 'enter' in the textbox run the setup above
{
  if(e == 13)
  {
    epfsetup();
  }
  return true;
}

var togglelist = function(list) {

    if (document.getElementById(list).getAttribute("hidden") == 'true'){                    //Show clicked list
    document.getElementById(list).setAttribute('hidden', 'false');
    }
    else if (document.getElementById(list).getAttribute("hidden") == 'false'){                //Hide clicked list
    document.getElementById(list).setAttribute('hidden', 'true');
    }
};
 function reset()
 {
    document.getElementById("PN_saved").setAttribute("hidden", "true");
    document.getElementById("PN_saved").setAttribute("value", "");
    document.getElementById("search").setAttribute("hidden", "false");
    document.getElementById("partnumber").setAttribute("hidden", "false");
    document.getElementById("partnumber").setAttribute("value", "");
    document.getElementById("but_reset").setAttribute("hidden", "true");
    document.getElementById("but_launch").setAttribute("hidden", "true");

   // Builds
    document.getElementById("Tree_b").setAttribute("hidden", "true");
    document.getElementById("List_b").setAttribute("hidden", "true");
    document.getElementById("Tree_b_v").setAttribute("hidden", "true");
      
   // Correspondence & Presentations
    document.getElementById("Tree_cp").setAttribute("hidden", "true");
    document.getElementById("List_cp").setAttribute("hidden", "true");
    document.getElementById("Tree_cp_v").setAttribute("hidden", "true");
      
   // Costs
    document.getElementById("Tree_c").setAttribute("hidden", "true");
    document.getElementById("List_c").setAttribute("hidden", "true");
    document.getElementById("Tree_c_v").setAttribute("hidden", "true");
      
   // Design & Engineering
    document.getElementById("Tree_de").setAttribute("hidden", "true");
    document.getElementById("List_de").setAttribute("hidden", "true");
    document.getElementById("Tree_de_v").setAttribute("hidden", "true");
      
   // Dimension Checks
    document.getElementById("Tree_dc").setAttribute("hidden", "true");
    document.getElementById("List_dc").setAttribute("hidden", "true");
    document.getElementById("Tree_dc_v").setAttribute("hidden", "true");
      
   // Prints & CAD
    document.getElementById("Tree_pc_v").setAttribute("hidden", "true");
    document.getElementById("List_pc").setAttribute("hidden", "true");
    document.getElementById("Tree_pc").setAttribute("hidden", "true");
}