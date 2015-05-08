var { ActionButton } = require('sdk/ui/button/action');
var { Toolbar } = require("sdk/ui/toolbar");
var { Frame } = require("sdk/ui/frame");
var notifications = require("sdk/notifications");
var self = require("sdk/self");
var _ = require("sdk/l10n").get;
var myIconURL = self.data.url("./images/icon.png");


//Example for localization
//console.log(_("hello_id!"));

var TennecoLogo = new Frame({
  id: "TennecoLogo",
  url: "./TennecoLogo.html"
});

var email = ActionButton({
  id: "email-button",
  label: "Email",
  icon: "./images/email.png"
});

var download = ActionButton({
  id: "DL-button",
  label: "Download",
  icon: "./images/DL.png"
});

var AdvancedMenu = new Frame({
  id: "AdvancedMenu",
  url: "./AdvancedMenu.html",
  onMessage: (e) => {
      var parsede = JSON.parse(e.data);
      var type = parsede.type;
      var title = parsede.title;
        console.log(title);
      var msg = parsede.msg;
        console.log(msg);
      if (type == "error"){
        notifications.notify({
            title: _(title),
            text: _(msg),
            iconURL: myIconURL
        });
      } else {
        console.log("Search Item: " + e.data);
      }
  }
});

var toolbar = Toolbar({
  title: "File Search Toolbar",
  hidden: false,
  items: [TennecoLogo, download, email, AdvancedMenu]
});

toolbar.on("show", showing);
toolbar.on("hide", hiding);

function showing(e) {
  console.log("showing: " + e.title);
}

function hiding(e) {
  console.log("hiding: " + e.title);
}


