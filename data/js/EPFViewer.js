var togglelist = function(list) {
    
    if (document.getElementById(list).getAttribute("hidden") == 'true'){
        //Show clicked list
        document.getElementById(list).setAttribute('hidden', 'false');
    }
    else if (document.getElementById(list).getAttribute("hidden") == 'false'){
        //Hide clicked list
        document.getElementById(list).setAttribute('hidden', 'true');
    }
};
self.port.emit("EPFViewer:get_pn");
self.port.on("EPFViewer:thePN", function(msg) {
    // Setup for display of EPF
    var PN_saved = msg;
    if (PN_saved[0] === "") {
        //SOME ERROR
    }
    document.getElementById("PN_saved").setAttribute("value", PN_saved);
    document.title = PN_saved + ' EPF';
    
    var nofolder = "";                //Error varaible 
    var dir;
    var dir_var;
    var i;
    //Builds (1-4)
    var list_b = document.getElementById("Builds");
    
        //REQUESTS
        dir = 'S:\\' + PN_saved + '\\Builds\\Checklists';
        dir_var = new Array(dir, "1");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Builds\\Development';
        dir_var = new Array(dir, "2");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Builds\\Production';
        dir_var = new Array(dir, "3");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Builds\\Quality';
        dir_var = new Array(dir, "4");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        //RETURNS
        self.port.on("EPFViewer:thefiles" + "1", function(msg) {
            var b_list1 = msg;
            var x = +document.getElementById("Tree_b_v").getAttribute("value") + +b_list1.length;
            document.getElementById("Tree_b_v").setAttribute("value", x);
            for(i=b_list1.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Checklists";
                opt.textContent = b_list1[i];
                list_b.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "2", function(msg) {
            var b_list2 = msg;
            var x = +document.getElementById("Tree_b_v").getAttribute("value") + +b_list2.length;
            document.getElementById("Tree_b_v").setAttribute("value", x);
            for(i=b_list2.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Development";
                opt.textContent = b_list2[i];
                list_b.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "3", function(msg) {
            var b_list3 = msg;
            var x = +document.getElementById("Tree_b_v").getAttribute("value") + +b_list3.length;
            document.getElementById("Tree_b_v").setAttribute("value", x);
            for(i=b_list3.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Production";
                opt.textContent = b_list3[i];
                list_b.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "4", function(msg) {
            var b_list4 = msg;
            var x = +document.getElementById("Tree_b_v").getAttribute("value") + +b_list4.length;
            document.getElementById("Tree_b_v").setAttribute("value", x);
            for(i=b_list4.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Quality"; 
                opt.textContent = b_list4[i];
                list_b.appendChild(opt);
            }
        });
        
    //Correspondence and Presentations (5-6)
    var list_cp = document.getElementById("Correspondence_and_Presentations");
    
        //REQUESTS
        dir = 'S:\\' + PN_saved + '\\Correspondence_and_Presentations\\Miscellaneous';
        dir_var = new Array(dir, "5");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Correspondence_and_Presentations\\Presentations';
        dir_var = new Array(dir, "6");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        //RETURNS
        self.port.on("EPFViewer:thefiles" + "5", function(msg) {
            var cp_list1 = msg;
            var x = +document.getElementById("Tree_cp_v").getAttribute("value") + +cp_list1.length;
            document.getElementById("Tree_cp_v").setAttribute("value", x);
            for(i=cp_list1.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Miscellaneous";
                opt.textContent = cp_list1[i];
                list_cp.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "6", function(msg) {
            var cp_list2 = msg;
            var x = +document.getElementById("Tree_cp_v").getAttribute("value") + +cp_list2.length;
            document.getElementById("Tree_cp_v").setAttribute("value", x);
            for(i=cp_list2.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Presentations"; 
                opt.textContent = cp_list2[i];
                list_cp.appendChild(opt);
            }
        });
        
    //Costs (7-8)
    var list_c = document.getElementById("Costs");
    
        //REQUESTS
        dir = 'S:\\' + PN_saved + '\\Costs\\Production';
        dir_var = new Array(dir, "7");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Costs\\Prototype';
        dir_var = new Array(dir, "8");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        //RETURNS
        self.port.on("EPFViewer:thefiles" + "7", function(msg) {
            var c_list1 = msg;
            var x = +document.getElementById("Tree_c_v").getAttribute("value") + +c_list1.length;
            document.getElementById("Tree_c_v").setAttribute("value", x);
            for(i=c_list1.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Production";
                opt.textContent = c_list1[i];
                list_c.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "8", function(msg) {
            var c_list2 = msg;
            var x = +document.getElementById("Tree_c_v").getAttribute("value") + +c_list2.length;
            document.getElementById("Tree_c_v").setAttribute("value", x);
            for(i=c_list2.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Prototype";
                opt.textContent = c_list2[i];
                list_c.appendChild(opt);
            }
        });
        
    //Design & Engineering (9-17)
    var list_de = document.getElementById("Design_and_Engineering");
    
        //REQUESTS
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\Action_Register';
        dir_var = new Array(dir, "9");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\Design_Information';
        dir_var = new Array(dir, "10");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\DFMEA_(Closed)';
        dir_var = new Array(dir, "11");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\DVPR';
        dir_var = new Array(dir, "12");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\Engineering_Workbook';
        dir_var = new Array(dir, "13");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\FEA';
        dir_var = new Array(dir, "14");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\Gate_6';
        dir_var = new Array(dir, "15");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\Milestones';
        dir_var = new Array(dir, "16");
        self.port.emit('EPFViewer:dir_check', dir_var);     
        
        dir = 'S:\\' + PN_saved + '\\Design_and_Engineering\\Timing';
        dir_var = new Array(dir, "17");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        //RETURNS
        self.port.on("EPFViewer:thefiles" + "9", function(msg) {
            var de_list1 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list1.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list1.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Action_Register";
                opt.textContent = de_list1[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "10", function(msg) {
            var de_list2 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list2.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list2.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Design_Information";
                opt.textContent = de_list2[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "11", function(msg) {
            var de_list3 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list3.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list3.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "DFMEA_(Closed)";
                opt.textContent = de_list3[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "12", function(msg) {
            var de_list4 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list4.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list4.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "DVPR";
                opt.textContent = de_list4[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "13", function(msg) {
            var de_list5 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list5.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list5.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Engineering_Workbook";
                opt.textContent = de_list5[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "14", function(msg) {
            var de_list6 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list6.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list6.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "FEA";
                opt.textContent = de_list6[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "15", function(msg) {
            var de_list7 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list7.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list7.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Gate_6";
                opt.textContent = de_list7[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "16", function(msg) {
            var de_list8 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list8.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list8.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Milestones";
                opt.textContent = de_list8[i];
                list_de.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "17", function(msg) {
            var de_list9 = msg;
            var x = +document.getElementById("Tree_de_v").getAttribute("value") + +de_list9.length;
            document.getElementById("Tree_de_v").setAttribute("value", x);
            for(i=de_list9.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Timing";
                opt.textContent = de_list9[i];
                list_de.appendChild(opt);
            }
        });
        
    //Dimension Checks (18-21)
    var list_dc = document.getElementById("Dimension_Checks");
    
        //REQUESTS
        dir = 'S:\\' + PN_saved + '\\Dimension_Checks\\Componenets';
        dir_var = new Array(dir, "18");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Dimension_Checks\\End_Product';
        dir_var = new Array(dir, "19");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Dimension_Checks\\Mold';
        dir_var = new Array(dir, "20");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Dimension_Checks\\Tools';
        dir_var = new Array(dir, "21");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        //RETURNS
        self.port.on("EPFViewer:thefiles" + "18", function(msg) {
            var dc_list1 = msg;
            var x = +document.getElementById("Tree_dc_v").getAttribute("value") + +dc_list1.length;
            document.getElementById("Tree_dc_v").setAttribute("value", x);
            for(i=dc_list1.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Componenets";
                opt.textContent = dc_list1[i];
                list_dc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "19", function(msg) {
            var dc_list2 = msg;
            var x = +document.getElementById("Tree_dc_v").getAttribute("value") + +dc_list2.length;
            document.getElementById("Tree_dc_v").setAttribute("value", x);
            for(i=dc_list2.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "End_Product";
                opt.textContent = dc_list2[i];
                list_dc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "20", function(msg) {
            var dc_list3 = msg;
            var x = +document.getElementById("Tree_dc_v").getAttribute("value") + +dc_list3.length;
            document.getElementById("Tree_dc_v").setAttribute("value", x);
            for(i=dc_list3.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Mold";
                opt.textContent = dc_list3[i];
                list_dc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "21", function(msg) {
            var dc_list4 = msg;
            var x = +document.getElementById("Tree_dc_v").getAttribute("value") + +dc_list4.length;
            document.getElementById("Tree_dc_v").setAttribute("value", x);
            for(i=dc_list4.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Tools";
                opt.textContent = dc_list4[i];
                list_dc.appendChild(opt);
            }
        });
        
    //Prints & CAD (22-26)
    var list_pc = document.getElementById("Prints_and_CAD");
    
        //REQUESTS
        dir = 'S:\\' + PN_saved + '\\Prints_and_CAD\\Competitive';
        dir_var = new Array(dir, "22");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Prints_and_CAD\\Customer\\Application';
        dir_var = new Array(dir, "23");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Prints_and_CAD\\Customer\\Product';
        dir_var = new Array(dir, "24");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Prints_and_CAD\\Internal';
        dir_var = new Array(dir, "25");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        dir = 'S:\\' + PN_saved + '\\Prints_and_CAD\\Supplier';
        dir_var = new Array(dir, "26");
        self.port.emit('EPFViewer:dir_check', dir_var);
        
        //RETURNS
        self.port.on("EPFViewer:thefiles" + "22", function(msg) {
            var pc_list1 = msg;
            var x = +document.getElementById("Tree_pc_v").getAttribute("value") + +pc_list1.length;
            document.getElementById("Tree_pc_v").setAttribute("value", x);
            for(i=pc_list1.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Competitive";
                opt.textContent = pc_list1[i];
                list_pc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "23", function(msg) {
            var pc_list2 = msg;
            var x = +document.getElementById("Tree_pc_v").getAttribute("value") + +pc_list2.length;
            document.getElementById("Tree_pc_v").setAttribute("value", x);
            for(i=pc_list2.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Customer\\Application";
                opt.textContent = pc_list2[i];
                list_pc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "24", function(msg) {
            var pc_list3 = msg;
            var x = +document.getElementById("Tree_pc_v").getAttribute("value") + +pc_list3.length;
            document.getElementById("Tree_pc_v").setAttribute("value", x);
            for(i=pc_list3.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Customer\\Product";
                opt.textContent = pc_list3[i];
                list_pc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "25", function(msg) {
            var pc_list4 = msg;
            var x = +document.getElementById("Tree_pc_v").getAttribute("value") + +pc_list4.length;
            document.getElementById("Tree_pc_v").setAttribute("value", x);
            for(i=pc_list4.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Internal";
                opt.textContent = pc_list4[i];
                list_pc.appendChild(opt);
            }
        });
        self.port.on("EPFViewer:thefiles" + "26", function(msg) {
            var pc_list5 = msg;
            var x = +document.getElementById("Tree_pc_v").getAttribute("value") + +pc_list5.length;
            document.getElementById("Tree_pc_v").setAttribute("value", x);
            for(i=pc_list5.length-1; i>=0; i--) {
                var opt = document.createElement('option');
                opt.value = "Supplier";
                opt.textContent = pc_list5[i];
                list_pc.appendChild(opt);
            }
        });
        
    // Check for folder error
//    if(undefined === nofolder)
//        {
//            alert('These folders are missing!\n\n ' + nofolder + '\n\n  Please report this error immediately.');
//        }
//    else if(undefined !== nofolder)
//        {   // No error so sum folder file count totals
            //var b_length = b_list1.length + b_list2.length + b_list3.length + b_list4.length;
            //var cp_length = cp_list1.length + cp_list2.length;
            //var c_length = c_list1.length + c_list2.length;
            //var de_length = de_list1.length + de_list2.length + de_list3.length + de_list4.length + de_list5.length + de_list6.length + de_list7.length + de_list8.length + de_list9.length;
            //var dc_length = dc_list1.length + dc_list2.length + dc_list3.length + dc_list4.length;
            //var pc_length = pc_list1.length + pc_list2.length + pc_list3.length + pc_list4.length + pc_list5.length;
//        }

});