function ENG_display()
{
var stringBundle = document.getElementById("filesearchtoolbar-string-bundle");
var Fstatus=document.getElementById('downloadstatus');
	Fstatus.setAttribute('hidden', 'false');

// Get the search term
	var terms = document.getElementById("engsearch").value;
	
// Error for search without a name
	if(terms==""){
	Fstatus.setAttribute('hidden', 'true');
  	var classObj = Cc["@mozilla.org/alerts-service;1"];
  	var alertService = classObj.getService(Components.interfaces.nsIAlertsService);
  	alertService.showAlertNotification('chrome://partnumbersearch/skin/Tenneco_fs.png', stringBundle.getString("fs_error"), stringBundle.getString("ss_error"));
	//alert('You need to enter a name.');
	return true;
	}
// Change case to all uppercase
	var termsUP = terms.toUpperCase();
// Get phase
	var phase = document.getElementById("phase").value;
// Determine user ID from search name
	if (terms == "ANAYA, FERNANDO") {var emp_id = "6884"}
	else if (terms == "ARENDOSKI, CHRIS") {var emp_id = "6137"}
	else if (terms == "BELAK, ZACH") {var emp_id = "6497"}
	else if (terms == "BELAUSTEGI, LUKEN") {var emp_id = "6130"}
	else if (terms == "BILLERMAN, TOM") {var emp_id = "4851"}
	else if (terms == "BIXLER, MIKE") {var emp_id = "7858   "}
	else if (terms == "BOST, ROBERT") {var emp_id = "5316"}
	else if (terms == "BRADDOCK, BRUCE") {var emp_id = "4627"}
	else if (terms == "BRADDOCK, SCOTT") {var emp_id = "5233"}
	else if (terms == "BRANT, CAMERON") {var emp_id = "7396"}
	else if (terms == "BRANT, JR. VERNON") {var emp_id = "4630"}
	else if (terms == "BROWN, JEREMY") {var emp_id = "4977"}
	else if (terms == "BUTLER, RUSSELL") {var emp_id = "6126"}
	else if (terms == "CARROLL, ANDY") {var emp_id = "5641"}
	else if (terms == "CASSIDY, NICHOLAS") {var emp_id = "7499"}
	else if (terms == "CERRI, JOE") {var emp_id = "5317"}
	else if (terms == "CHEN, XIAOBO") {var emp_id = "7379"}
	else if (terms == "CLINE, DAVID") {var emp_id = "4757"}
	else if (terms == "CONANT, MATT") {var emp_id = "6227"}
	else if (terms == "CULVER, ERIN") {var emp_id = "7909"}
	else if (terms == "DAUGHERTY, RYAN") {var emp_id = "6981"}
	else if (terms == "DILLENDER, ROB") {var emp_id = "4644"}
	else if (terms == "EMIN, DIDIER") {var emp_id = "6789"}
	else if (terms == "FEUERSTEIN, KATHY") {var emp_id = "4741"}
	else if (terms == "FISCHER, JEREMY") {var emp_id = "6241"}
	else if (terms == "ROX, ROD") {var emp_id = "140"}
	else if (terms == "FRANZEN, ANDREW") {var emp_id = "4747"}
	else if (terms == "FRIES, VINCE") {var emp_id = "5658"}
	else if (terms == "GASPAR, ZOREN") {var emp_id = "6464"}
	else if (terms == "GIBSON, DAVID") {var emp_id = "6492"}
	else if (terms == "GOOSSENS, JOSH") {var emp_id = "5627"}
	else if (terms == "GOUDIE, ROB") {var emp_id = "6057"}
	else if (terms == "HEDRICK, DAVE") {var emp_id = "4931"}
	else if (terms == "HEIL, PAUL") {var emp_id = "5812"}
	else if (terms == "HENRY, HAL") {var emp_id = "4659"}
	else if (terms == "HIRE, MATT") {var emp_id = "6136"}
	else if (terms == "HOLLAND, KEVIN") {var emp_id = "4664"}
	else if (terms == "JAMES, MATT") {var emp_id = "6229"}
	else if (terms == "JANIK, RAFAL") {var emp_id = "7541"}
	else if (terms == "JASKO, RYAN") {var emp_id = "6048"}
	else if (terms == "JAWORSKI, KEVIN") {var emp_id = "4671"}
	else if (terms == "JENNINGS, DONNY") {var emp_id = "4631"}
	else if (terms == "JOHNSTON, BRENT") {var emp_id = "5118"}
	else if (terms == "KE, CHEN") {var emp_id = "7101"}
	else if (terms == "KINNER, BOB") {var emp_id = "6458"}
	else if (terms == "KEYSER, BRIAN") {var emp_id = "7003"}
	else if (terms == "KRAINE, ED") {var emp_id = "5126"}
	else if (terms == "KUHLMAN, JAMIE") {var emp_id = "6423"}
	else if (terms == "LASALLE, JAMES") {var emp_id = "7798"}
	else if (terms == "LIU, QI") {var emp_id = "7274"}
	else if (terms == "MAKULINSKI, ROB") {var emp_id = "6836"}
	else if (terms == "MARACIC, ROB") {var emp_id = "7045"}
	else if (terms == "MARACZI, ERIC") {var emp_id = "7051"}
	else if (terms == "MCCALL, PATRICK") {var emp_id = "6588"}
	else if (terms == "MCCARTHY, FRANK") {var emp_id = "4682"}
	else if (terms == "MCDONAGH, JUANITA") {var emp_id = "4684"}
	else if (terms == "MCILRATH, TODD") {var emp_id = "6929"}
	else if (terms == "MCLAUGHLIN, RON") {var emp_id = "4686"}
	else if (terms == "MCMULLEN, BRYAN") {var emp_id = "5657"}
	else if (terms == "MESENBURG, SCOTT") {var emp_id = "5428"}
	else if (terms == "MILLARD, BRIAN") {var emp_id = "7559"}
	else if (terms == "MISSIG, BOB") {var emp_id = "4629"}
	else if (terms == "MOORE, KRISTI") {var emp_id = "6410"}
	else if (terms == "NORMAN, AMY") {var emp_id = "6009"}
	else if (terms == "ONEAL, TADD") {var emp_id = "6377"}
	else if (terms == "ORTMAN, BOB") {var emp_id = "4645"}
	else if (terms == "PALECEK, BRIAN") {var emp_id = "6416"}
	else if (terms == "PILARSKI, JEANETTE") {var emp_id = "7652"}
	else if (terms == "POST, BRANDON") {var emp_id = "6795"}
	else if (terms == "PRIEBE, LOREN") {var emp_id = "6751"}
	else if (terms == "PU, ALLEN") {var emp_id = "7100"}
	else if (terms == "PULS, KEVIN") {var emp_id = "6134"}
	else if (terms == "QIAN, MO") {var emp_id = "6682"}
	else if (terms == "RADDEN, DANIEL") {var emp_id = "5837"}
	else if (terms == "RAGER, CHRIS") {var emp_id = "6456"}
	else if (terms == "RAWLINGS, SCOTT") {var emp_id = "7107"}
	else if (terms == "RAYMOND, JEFF") {var emp_id = "5676"}
	else if (terms == "REDDAWAY, JOHN") {var emp_id = "4698"}
	else if (terms == "ROCKWELL, FRED") {var emp_id = "4703"}
	else if (terms == "RODECKER, TROY") {var emp_id = "4759"}
	else if (terms == "ROTH, DENNIS") {var emp_id = "5653"}
	else if (terms == "SCHANK, DON") {var emp_id = "4945"}
	else if (terms == "SCHEUFLER, DON") {var emp_id = "4742"}
	else if (terms == "SCHNITTKER, DALE") {var emp_id = "2423"}
	else if (terms == "SMITH, GUY") {var emp_id = "4663"}
	else if (terms == "STOLL, KURT") {var emp_id = "4717"}
	else if (terms == "STRICKFADEN, CHAD") {var emp_id = "6230"}
	else if (terms == "TAYLOR, MARY") {var emp_id = "4949"}
	else if (terms == "THORNHILL, JAY") {var emp_id = "4722"}
	else if (terms == "URBAN, HENRY") {var emp_id = "6192"}
	else if (terms == "WAGNER, JOHN") {var emp_id = "4729"}
	else if (terms == "WEILNAU, JEREMY") {var emp_id = "5100"}
	else if (terms == "WEISENBERGER, KEVIN") {var emp_id = "6346"}
	else if (terms == "WEISS, DAVID") {var emp_id = "6060"}
	else if (terms == "WEN, EVAN") {var emp_id = "7380"}
	else if (terms == "WIECZOREK, MATT") {var emp_id = "4892"}
	else if (terms == "WILLETT, JON") {var emp_id = "6231"}

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
	var url_to_open = url_to_open + p_author_id + "&" + p_engr_id + "&" + p_ewo_no + "&" + p_pso_no + "&" + p_pso_line_no + "&" + p_pso_info_flag + "&" + p_sales_id + "&" + p_sales_flag + "&" + p_customer_id + "&" + p_ta_part_id + "&" + p_project_no + "&" + p_wo_phase + "&" + p_phase_flag + "&" + p_ddstart_date + "&" + p_ddend_date + "&" + p_dsstart_date + "&" + p_dsend_date + "&" + p_sub_date_flag;

// Open search page based off variables
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url_to_open, true);  
	xmlHttp.onreadystatechange = function (aEvt) {  
	  if (xmlHttp.readyState == 4) {  
	     if(xmlHttp.status == 200)  
	      dump(xmlHttp.responseText);  
	     else  
	      dump("Error loading page\n");
	      //alert(stringBundle.getString("ss_no_open"));  //Errors before page loads
	  } 
	};
	xmlHttp.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
	xmlHttp.send(null);

// Load preferences
	var tabprefs = PNQBar.prefManager.getIntPref("browser.link.open_newwindow");
	var tabprefs2 = PNQBar.prefManager.getBoolPref("extensions.partnumbersearch.TabFocus");

// Open the window with this url	var mainwindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	.getInterface(Components.interfaces.nsIWebNavigation)
	.QueryInterface(Components.interfaces.nsIDocShellTreeItem)
	.rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	.getInterface(Components.interfaces.nsIDOMWindow);   
// Checks tab pref
	if(tabprefs == 2)
		{mainwindow.open(url_to_open);
		Fstatus.setAttribute('hidden', 'true');}
	else if (tabprefs == 3)
		{if(tabprefs2 == false) // Open tab w/o focus
			{mainwindow.getBrowser().addTab(url_to_open);}
		else if (tabprefs2 == true) // Open tab and make active
			{gBrowser.selectedTab = gBrowser.addTab(url_to_open);
			Fstatus.setAttribute('hidden', 'true');
			}
		}
}
// If user hits enter then run the search above
	var ENG_enter = function(e)
	{
	  if(e == 13)
	  {
	    ENG_display();
	  }
	  return true;
	}


// Sets options enabled or disabled
function init() {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var engsearch=document.getElementById('engsearch');
	var AdvancedMenu2=document.getElementById('AdvancedMenu2');
	var searchbutton2=document.getElementById('search-button2');
	var archivebox=document.getElementById('archivebox');
if (PNQBar.prefManager.getBoolPref("extensions.partnumbersearch.EngSearch") == false) {
	engsearch.setAttribute('hidden', 'true');
	AdvancedMenu2.setAttribute('hidden', 'true');
	searchbutton2.setAttribute('hidden', 'true');
	}
else {
	engsearch.setAttribute('hidden', 'false');
	AdvancedMenu2.setAttribute('hidden', 'false');
	searchbutton2.setAttribute('hidden', 'false');
	engsearch.value = prefManager.getCharPref("extensions.partnumbersearch.EngSearch2");
	}
}