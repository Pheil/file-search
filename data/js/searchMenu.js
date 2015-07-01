self.port.on("show", function onShow() {
    $('#searchx').focus();
    $('#searchx').select();
});

//twitter typeahead - works basic
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    var substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
 
    cb(matches);
  };
};

  $(function() {

    self.port.emit("data_load");
    self.port.once("rtn_data",
        function datasmash(theArray) {
            console.log("Search suggestions received.");
            var data = theArray.split(', ');
            
            $('#the-basics .typeahead').typeahead({
              hint: true,
              highlight: true,
              minLength: 1
            },
            {
              name: 'theArray',
              limit: 500,
              source: substringMatcher(data),
              templates: {
                //header: '<h3 class="league-name">TEST</h3>',
                empty: [
                  '<div class="empty-message">',
                    'Unable to find matches with current query',
                  '</div>'
                ].join('\n')
              }
            });
    });
  }); 
  
//twitter typeahead - multiple sources - not working
/* var nbaTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Part'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nba.json'
});
 
var nhlTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Tool'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nhl.json'
}); */
/* var data_A;
var data_B;
    self.port.emit("data_load_A");
    self.port.once("rtn_data_A",
        function datasmash(theArray) {
            console.log("Panel received data A");
            data_A = theArray.split(', ');
            
             var data_Ax = new Bloodhound({
              datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Part'),
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              local: data_A
            });
    });
    self.port.emit("data_load_B");
    self.port.once("rtn_data_B",
        function datasmash(theArray) {
            console.log("Panel received data B");
            data_B = theArray.split(', ');
            
            var data_Bx = new Bloodhound({
              datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Tool'),
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              local: data_B
            });
    }); */
    
//3
/*     self.port.emit("data_load_A");
    self.port.once("rtn_data_A",
        function datasmash(theArray) {
            console.log("Panel received data A");
            var data_A = theArray;
            
            var data_Ax = new Bloodhound({
              datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Part'),
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              local: data_A
            });
            
            $('#the-basics .typeahead').typeahead(null, {
              name: 'best-pictures',
              display: 'Part',
              source: data_Ax
            });
    });  */
    


$('#searchx').keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $('#search-button').click();//Trigger search button click event
    }
});

$('#search-button').click(function(){
    //window.parent.postMessage("E1", "*");
    var terms = window.document.getElementById("searchx").value;

    if (terms === "" || terms === void(0) || terms === null) //Search without a search term
    {
        //Empty search error
        self.port.emit("empty");
        return;
    }

    var termsUP = terms.toUpperCase(); // Change case to all uppercase

    if (termsUP.indexOf('!') !== -1) {
        DVdisplay();
    } else {
        var url_to_open = "http://millap01.na.ten/"; // 1. The initial url
        var termcount = terms.length; // Count number of characters to determine folder group
        var termcode = String(termsUP).substring(0, 1); // Extract first 1 digit of search term
        var termcode2 = String(termsUP).substring(0, 2); // Extract first 2 digits of search term
        var termcode2b = String(termsUP).substring(2, 4); // Extract third and fourth digits of search term 
        var termcode3 = String(termsUP).substring(0, 3); // Extract first 3 digits of search term
        var termcode4 = String(termsUP).substring(4, 5); // Extract the character that would indicate if it is a B series number
        var termcode4b = String(termsUP).substring(0, 4); // Extract first 4 digits of search term
        var termcode6 = String(termsUP).substring(5, 6); // Extract the sixth character for use when full 11 digit code A series is entered
        var termcode7 = String(termsUP).substring(5, 11); // Extract non GT part of inputed number when accidental entry for A series

        var folder = "UNKNOWN"; // Sets initial folder value, for error checking
        var aselect = 'P';

        // Determines if user is not searching for a part and changes the mode to the correct type
        if (termcode2 == "PS") {
            label = 'fs_ps';
            aselect = 'R';
        }
        if (termcode2 == "TS") {
            label = 'fs_ts';
            aselect = 'S';
        }
        if (termcode2 == "MR" || termcode3 == "RFP") {
            label = 'fs_rfp';
            aselect = 'D';
        }
        if (termcode3 == "EWS") {
            label = 'fs_ews';
            aselect = 'E';
        }
        if (termcode2 == "MS" && termcode3 != "MSK") {
            label = 'fs_ms';
            aselect = 'M';
        }
        if (termcode3 == "ECE" || termcode2 == "CE") //First Cost group
        {
            label = 'fs_ece';
            aselect = 'C';
        }
        if (termcode == "C" && termcount != 11 && termcount != 15) //Second Cost group
        {
            label = 'fs_ece';
            aselect = 'C';
        }
        if (termcode2 == "SK") {
            label = 'fs_sk';
            aselect = 'K';
        }
        if (termcode2 == "MT" || termcode2 == "PT" || termcode2 == "TX" || termcode2 == "M-") { //First Tool group
            label = 'Tools';
            aselect = 'T';
        }
        if (termcode == "M" && termcount == 6 && termcode2 != "MR") { //Second Tool group
            label = 'Tools';
            aselect = 'T';
        }
        if (termcode3 == "MSK") { //Third Tool group
            label = 'Tools';
            aselect = 'T';
        }
        if (termcode == "M" && termcount == 8) { //Fourth Tool group
            label = 'Tools';
            aselect = 'T';
        }
        if (termcode == "M" && termcount == 9) { //Fifth Tool group
            label = 'Tools';
            aselect = 'T';
        }
        if (termcode == "M" && termcount == 7 && termcode2 != "MR" && termcode2 != "MS") { //Sixth Tool group
            label = 'Tools';
            aselect = 'T';
        }
        if (termsUP == "INDEX_MS") {
            label = 'fs_ms';
            aselect = 'M';
        }
        if (termsUP == "INDEX_PS") {
            label = 'fs_ps';
            aselect = 'R';
        }
        if (termsUP == "INDEX_TS") {
            label = 'fs_ts';
            aselect = 'S';
        }

        // Start Part Code
        if (termcount == 5) {
           if (termcode == 0) {
                folder = "CLEVPRNT/000/";
            } else if (termcode == 1) {
                folder = "CLEVPRNT/100/";
            } 
        } else if (termcount == 6) {
            if (termcode == 0) {
                folder = "CLEVPRNT/000/";
            } else if (termcode == 1) {
                folder = "CLEVPRNT/100/";
            } else if (termcode == 2) {
                folder = "CLEVPRNT/200/";
            } else if (termcode == 3) {
                folder = "CLEVPRNT/300/";
            } else if (termcode == 4) {
                folder = "CLEVPRNT/400/";
            } else if (termcode == 5) {
                folder = "CLEVPRNT/500/";
            } else if (termcode == 6) {
                folder = "CLEVPRNT/600/";
            } else if (termcode == 7) {
                folder = "CLEVPRNT/700/";
            } else if (termcode == 8) {
                folder = "CLEVPRNT/800/";
            } else if (termcode == 9) {
                folder = "CLEVPRNT/900/";
            } else if (termcode2 == "X0") {
                folder = "CLEVPRNT/000/";
            } else if (termcode2 == "X1") {// X A Series Drawings
                folder = "CLEVPRNT/100/";
            } else if (termcode2 == "X2") {
                folder = "CLEVPRNT/200/";
            } else if (termcode2 == "X3") {
                folder = "CLEVPRNT/300/";
            } else if (termcode2 == "X5") {
                folder = "CLEVPRNT/500/";
            } else if (termcode2 == "X6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode2 == "X7") {
                folder = "CLEVPRNT/700/";
            } else if (termcode2 == "X8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode2 == "X9") {
                folder = "CLEVPRNT/900/";
            }
        } else if (termcount == 7) {
            if (termcode3 == "AP1") {// AP A Series Drawings
                folder = "CLEVPRNT/100/";
            } else if (termcode3 == "AP2") {
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "AP5") {
                folder = "CLEVPRNT/500/";
            } else if (termcode3 == "AP7") {
                folder = "CLEVPRNT/700/";
            }
        } else if (termcount == 8) {
            if (termcode3 == "AM2") {// AM A Series Drawings
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "AM4") {
                folder = "CLEVPRNT/400/";
            } else if (termcode3 == "AM6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "AM8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "AP2") {// AP A Series Drawings
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "AP6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "AP7") {
                folder = "CLEVPRNT/700/";
            } else if (termcode3 == "AP8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode4b == "APX1") {// APX A Series Drawings
                folder = "CLEVPRNT/100/";
            } else if (termcode3 == "AM9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "SD0") {
                folder = "CLEVPRNT/000/";
            } else if (termcode3 == "SD1") {// SD A Series Drawings
                folder = "CLEVPRNT/100/";
            } else if (termcode3 == "SD2") {
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "SD3") {
                folder = "CLEVPRNT/300/";
            } else if (termcode3 == "SD4") {
                folder = "CLEVPRNT/400/";
            } else if (termcode3 == "SD5") {
                folder = "CLEVPRNT/500/";
            } else if (termcode3 == "SD6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "SD7") {
                folder = "CLEVPRNT/700/";
            } else if (termcode3 == "SD8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "SD9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "SA0") {
                folder = "CLEVPRNT/000/";
            } else if (termcode3 == "SA1") {// SA A Series Drawings
                folder = "CLEVPRNT/100/";
            } else if (termcode3 == "SA2") {
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "SA3") {
                folder = "CLEVPRNT/300/";
            } else if (termcode3 == "SA4") {
                folder = "CLEVPRNT/400/";
            } else if (termcode3 == "SA5") {
                folder = "CLEVPRNT/500/";
            } else if (termcode3 == "SA6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "SA7") {
                folder = "CLEVPRNT/700/";
            } else if (termcode3 == "SA8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "SA9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "AP1") {
                folder = "CLEVPRNT/100/";
            } else if (termcode3 == "AP2") {// AP A Series Drawings
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "AP5") {
                folder = "CLEVPRNT/500/";
            } else if (termcode3 == "AP6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "AP7") {
                folder = "CLEVPRNT/700/";
            } else if (termcode3 == "AP8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "AP9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "BA2") {
                folder = "CLEVPRNT/200/";
            } else if (termcode4b == "BA-2") {// BA- A Series Drawings
                folder = "CLEVPRNT/200/";
            } else if (termcode3 == "BA5") {// BA A Series Drawings
                folder = "CLEVPRNT/500/";
            } else if (termcode3 == "BA6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "BA8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "BA9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "CB0") {
                folder = "CLEVPRNT/000/";
            } else if (termcode3 == "CB4") {// CB A Series Drawings
                folder = "CLEVPRNT/400/";
            } else if (termcode3 == "CB6") {
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "CB8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "CB9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "SX1") {
                folder = "CLEVPRNT/100/";
            } else if (termcode3 == "SX5") {// SX A Series Drawings
                folder = "CLEVPRNT/500/";
            } else if (termcode3 == "SX7") {
                folder = "CLEVPRNT/700/";
            } else if (termcode3 == "SX8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode3 == "SX9") {
                folder = "CLEVPRNT/900/";
            } else if (termcode3 == "IM0") {
                folder = "CLEVPRNT/000/";
            } else if (termcode3 == "IM6") {// IM A Series Drawings
                folder = "CLEVPRNT/600/";
            } else if (termcode3 == "IM8") {
                folder = "CLEVPRNT/800/";
            } else if (termcode == 0) {
                folder = "CLEVPRNT/000/";
            } else if (termcode == 1) {
                folder = "CLEVPRNT/100/";
            } else if (termcode == 2) {
                folder = "CLEVPRNT/200/";
            } else if (termcode == 3) {
                folder = "CLEVPRNT/300/";
            } else if (termcode == 4) {
                folder = "CLEVPRNT/400/";
            } else if (termcode == 5) {
                folder = "CLEVPRNT/500/";
            } else if (termcode == 6) {
                folder = "CLEVPRNT/600/";
            } else if (termcode == 7) {
                folder = "CLEVPRNT/700/";
            } else if (termcode == 8) {
                folder = "CLEVPRNT/800/";
            } else if (termcode == 9) {
                folder = "CLEVPRNT/900/";
            } else if (termcode == "C") {
                folder = "COST/";
            }
        } else if (termcount == 11 || termcount == 15 || termcount == 7 || termcount == 13) // 11&15=Normal B series search, 7=TPT Mode search, 13=TR SDs
        {
            //if (termsUP == "RM01A532460") {folder = "CLEVPRNT/500/";}            
            if (termcode == "B") {
                folder = "CLEVPRNT/B_Series/";
            } // Query is for B Series (TPT Mode)
            if (termcode4 != "B" && termcode != "A") {
                if (termcode2 == "FS") {
                    folder = "CLEVPRNT/TorqueRods/FS/";
                } else if (termcode2 == "FT") {
                    folder = "CLEVPRNT/TorqueRods/FT/";
                } else if (termcode2 == "HS") {
                    folder = "CLEVPRNT/TorqueRods/HS/";
                } else if (termcode2 == "HT") {
                    folder = "CLEVPRNT/TorqueRods/HT/";
                } else if (termcode2 == "SP") {
                    folder = "CLEVPRNT/TorqueRods/SP/";
                } else if (termcode2 == "TR") {
                    folder = "CLEVPRNT/TorqueRods/TR/";
                } else if (termcode2 == "TT") {
                    folder = "CLEVPRNT/TorqueRods/TT/";
                } else if (termcode2 == "TV") {
                    folder = "CLEVPRNT/TorqueRods/TV/";
                } else if (termcode2 == "TW") {
                    folder = "CLEVPRNT/TorqueRods/TW/";
                } else if (termcode2 == "VS") {
                    folder = "CLEVPRNT/TorqueRods/VS/";
                } else if (termcode2 == "VT") {
                    folder = "CLEVPRNT/TorqueRods/VT/";
                } else if (termcode2 == "WF") {
                    folder = "CLEVPRNT/TorqueRods/WF/";
                } else if (termcode2 == "WH") {
                    folder = "CLEVPRNT/TorqueRods/WH/";
                } else if (termcode2 == "WT") {
                    folder = "CLEVPRNT/TorqueRods/WT/";
                } else if (termcode2 == "WV") {
                    folder = "CLEVPRNT/TorqueRods/WV/";
                }
            } else if (termcode4 == "B" && termcode2 != "PT") {
                folder = "CLEVPRNT/B_Series/";
            } // Query is for B Series (Normal Mode)

            if (termcode4 == "A" && termcode2 != "SD" && termcode2 != "TX" && termcode2 != "MT" && termcode2 != "AT") {
                if (termsUP == "RM01A532460") {
                    folder = "CLEVPRNT/500/";
                } // Special exemption for material query - RM01A532460
                else {
                    // Query is for A Series
                    self.port.emit("aGTC");
                    // window.parent.postMessage({
                        // "type": "error",
                        // "title": "fs_error",
                        // "msg": "fs_seriesGT_code"
                    // }, "*");
                    if (termcode6 == 0) {
                        folder = "CLEVPRNT/000/";
                        termsUP = termcode7;
                    } // Sets folder and new search term minus GTC
                    else if (termcode6 == 1) {
                        folder = "CLEVPRNT/100/";
                        termsUP = termcode7;
                    } else if (termcode6 == 2) {
                        folder = "CLEVPRNT/200/";
                        termsUP = termcode7;
                    } else if (termcode6 == 3) {
                        folder = "CLEVPRNT/300/";
                        termsUP = termcode7;
                    } else if (termcode6 == 4) {
                        folder = "CLEVPRNT/400/";
                        termsUP = termcode7;
                    } else if (termcode6 == 5) {
                        folder = "CLEVPRNT/500/";
                        termsUP = termcode7;
                    } else if (termcode6 == 6) {
                        folder = "CLEVPRNT/600/";
                        termsUP = termcode7;
                    } else if (termcode6 == 7) {
                        folder = "CLEVPRNT/700/";
                        termsUP = termcode7;
                    } else if (termcode6 == 8) {
                        folder = "CLEVPRNT/800/";
                        termsUP = termcode7;
                    } else if (termcode6 == 9) {
                        folder = "CLEVPRNT/900/";
                        termsUP = termcode7;
                    }
                }
            }
            if (termcode2 == "SD") {
                if (termcode6 == 0) {
                    folder = "CLEVPRNT/000/";
                } // Sets folder if it's a sales drawing of an A series part
                else if (termcode6 == 1) {
                    folder = "CLEVPRNT/100/";
                } else if (termcode6 == 2) {
                    folder = "CLEVPRNT/200/";
                } else if (termcode6 == 3) {
                    folder = "CLEVPRNT/300/";
                } else if (termcode6 == 4) {
                    folder = "CLEVPRNT/400/";
                } else if (termcode6 == 5) {
                    folder = "CLEVPRNT/500/";
                } else if (termcode6 == 6) {
                    folder = "CLEVPRNT/600/";
                } else if (termcode6 == 7) {
                    folder = "CLEVPRNT/700/";
                } else if (termcode6 == 8) {
                    folder = "CLEVPRNT/800/";
                } else if (termcode6 == 9) {
                    folder = "CLEVPRNT/900/";
                }
                if (termcode4 == "B") {
                    folder = "CLEVPRNT/B_Series/";
                }
                if (termcode2b == "FS") {
                    folder = "CLEVPRNT/TorqueRods/FS/";
                } // Sets folders for torque rod sales drawings
                else if (termcode2b == "FT") {
                    folder = "CLEVPRNT/TorqueRods/FT/";
                } else if (termcode2b == "HS") {
                    folder = "CLEVPRNT/TorqueRods/HS/";
                } else if (termcode2b == "HT") {
                    folder = "CLEVPRNT/TorqueRods/HT/";
                } else if (termcode2b == "SP") {
                    folder = "CLEVPRNT/TorqueRods/SP/";
                } else if (termcode2b == "TR") {
                    folder = "CLEVPRNT/TorqueRods/TR/";
                } else if (termcode2b == "TT") {
                    folder = "CLEVPRNT/TorqueRods/TT/";
                } else if (termcode2b == "TV") {
                    folder = "CLEVPRNT/TorqueRods/TV/";
                } else if (termcode2b == "TW") {
                    folder = "CLEVPRNT/TorqueRods/TW/";
                } else if (termcode2b == "VS") {
                    folder = "CLEVPRNT/TorqueRods/VS/";
                } else if (termcode2b == "VT") {
                    folder = "CLEVPRNT/TorqueRods/VT/";
                } else if (termcode2b == "WF") {
                    folder = "CLEVPRNT/TorqueRods/WF/";
                } else if (termcode2b == "WH") {
                    folder = "CLEVPRNT/TorqueRods/WH/";
                } else if (termcode2b == "WT") {
                    folder = "CLEVPRNT/TorqueRods/WT/";
                } else if (termcode2b == "WV") {
                    folder = "CLEVPRNT/TorqueRods/WV/";
                }
            }
        }
        // End Part Code

        if (aselect == "T") {
            folder = "TOOLS/";
        } // Other non part dwg folders if "parts" is not selected
        if (aselect == "K") {
            folder = "SKETCH/";
        }
        if (aselect == "C") {
            folder = "COST/";
        }
        if (aselect == "S") {
            folder = "TESTSPEC/";
        }
        if (aselect == "D") {
            folder = "PROD/";
        }
        if (aselect == "E") {
            folder = "EWS/";
        }
        if (aselect == "R") {
            folder = "PROCSPEC/";
        }
        if (aselect == "M") {
            folder = "MATSPEC/";
        }

        if (folder == "UNKNOWN") { // Unknown search term error
            console.log("File Search: Unknown folder");
            self.port.emit("unknown", termsUP);
            return;
        }
        url_to_open = url_to_open + folder; //2.  Adds folder location of file
        url_to_open = url_to_open + termsUP; //4.  Add the PN query to the url
        var url_to_open2 = url_to_open + ".pdf"; //5.  Add the file extension to the url

        //Send request to main process
        var array = new Array(folder, url_to_open2, termsUP);
        self.port.emit("go_search", array);
    }

    function DVdisplay() {
        // dual view
        var darray = termsUP.split('!');
        var a = darray[0],
            b = darray[1];
        console.log("Dual View: Requesting '" + a + "' & '" + b + "'");
        var array = new Array(a, b);
        self.port.emit("go_DV_search", array);
        return;
    }
}); 