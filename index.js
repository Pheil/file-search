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
const cm = require("sdk/context-menu");
const {Cc,Ci,Cm,Cu,components} = require("chrome");
const { ToggleButton } = require("sdk/ui/button/toggle");
const utils = require('sdk/window/utils');
const { defer } = require('sdk/core/promise');
const { OS, TextEncoder, TextDecoder } = Cu.import("resource://gre/modules/osfile.jsm", {});
var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
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
            var parsedupChange = JSON.parse(upChange);
            var folder1 = parsedupChange.folder1;
            var folder2 = parsedupChange.folder2;
            var file = parsedupChange.file;
            var PN = preferences.Part_Number;
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

// Page mod for test specs
pageMod.PageMod({
    include: "http://millap01.na.ten/TESTSPEC*",
    contentScript: 'var link = document.createElement("link");' +
                 '  link.setAttribute("rel", "shortcut icon");' +
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH2gkUDTQqxVOeIgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAKrSURBVHjajVNLTxNRFP7uzJ3SBxTtUMCoJLRA8AHBRNHozrCSlbBS18SNcaG4kz%2FgwjbG6F%2FA4JakK6PEROJCQtCKRDAVLKWlAfqedmau5w4UykpP5%2FTOfZx7vu87Z5hhGAr5EwAPGGM%2BGmHbNoQQqL9Lk1O5wpgCy7IKtB71er0Rls%2FnZfAzj8cDVVXxL7PpllKpjEqlIi9%2FhFwut2GapqjVamJtbU3Qhmg0OuS4tO3sjvg0%2F1n8XP0lKkZVbKbS65xgt9Qzx2IxjI%2BPo729%2FQD2Po2lpSXMzLxFcjNF2UuYejoFzjW55Vfoz6rD0zSNOLJDuMzhzBAOhyk4iUQige7uboR6QlIHecTidZGcGS02zikaRq2Kl69fIdim41SwAxeHBsFdGmyLztHD6zClSSoy4%2FSbaRQKBYzdHsPzSASKwjBycwSmaeHKjeuoUhJNUZzS8GMK00Y0GkWZVK5Wqph7N4eBgQFM3J%2FAwsIivnxbRFdvH%2Fr8fgkOgtEFB1wc29vbcxDcuXsPuzu7SKfTaG09gdnZGM6Gwhi8fA1f48s43xtyekLQT2lEEAgEMHprFPEfyzAJ9qWrw8gZJbQGdZQpUdEwoXHXocA2IVAaVeeco1DM40xXPwyFI5nNoMXbAWarqHEFG8UqKkeAYVLoMQQuKqPb7cZ8royspcLd5MP7ooGkyw2F1hdJm7x2FMKs%2FSo4XZTJZBD%2FHnfGD%2BkC%2Bj1%2BVPWT%2BLiewG5bAOd8zYivrsITaEZ2eAi6HgC3hcpIqA1d109vbW1hZWXFEZExN8GjD8o24RJNRMFETbFh8yZQeXChrwd6ZxCJVPKPVHoym80e9vt%2FmSXEZjotfm%2BnHjNqGOmTlPkhMfHJ8lA%2BuEwXFGJXVspQaWTkFW5Q86kQpsirlvVC72yL%2FAUwN48eLMjZngAAAABJRU5ErkJggg%3D%3D");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH3wYaDyYGvrknLQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAM5SURBVHjaZVNbaFRHGP5mzsw5s5fsZpN0N9m4W6ES1ytuIU1MQ6FgSqlWX3wSUu1DaFGKFB8qovjgBRGkILXEW8CWRkqlVovY6oPEuKINQkVRpGqTdE2aVXJxN7sn55w90zmrkab9B2YG5vv%2B%2Bf9vviH4T5y%2Fm2%2BPBNiGkGDNQYMm%2FRwQmhwWjA5whl5G6bV%2F48nsZu%2Flp5H6sL4npJMuQW1dkDICOkGsJozqKg4uXQQEtTTguGmaO30%2B3%2BSrBJ%2BeGY1E%2FeTb6cGB1aN3M7jVdxHjz3JwXReLlizH7gOHsLJlGXJPchh7MgTHti5zxj5pbW39s5Lg49PZr8JC2%2BJHCaWR%2ByiOj2B86B5%2BOPFlpbqGxnlY9f4HuHLpF2T%2FGkZHRwd6enpOJRKJTeS9o4MrwwbtCwmNh30MkaCBhlgY1uhDbFu7DKWSOUejeYkkfjz3M5rTy2cA%2BS6bnnE7KQgnRIIygJcZHj94gNvnj%2F6P3BBvxHc%2F%2FYrF6RQKM65hMNLJipZsIcQTw4aTzyHb34%2Ffzx7Gs5Eh1DUkUFUVQvbRfdhlF5OTE7hxPYOmVApMSi9nC1m4%2F4%2BxWjoZ1QpjGOs%2FheLfD5Fevw3JN1KorYkgWhPCb2e70Xt4NxyV5LVoDBeu30E8WgeDujlWtF1QHkQw5EOibT0CjYtQHUtCMgeW8kBJCyDV%2FiHEiYMo5PNoWpoG0atQMB24nICVbGQZZNRfyGKqejFcVgM5NYWyoJBKD0M4uHr66wo5nngdXTsOwZQMxLQhJc2ymbK86ZPmm0VRD4kgSFEJZyhZ1WA6x%2BDtDPrOHEM0nkTXvm8QiC%2FERL6Isoeh5KbG2jaPW0T%2FyCJco3Bf%2BZMoZRkXyN06B65cuW77SdQ3pWGXpkEr57ApIZ9rduZIVmvbHFPXvzXrbCI9hIR0yxD%2BEJpWdcJf1wjHLHrECltBu9csCR1jL594l1WW8wF3NSrFexivDQcksgB5VRh5Pg1XaC%2B5uKA8sMsjat7kZI6Y%2FO0tF11PBGCFQmgvOlFQVYWaXuwJLLV2G4x%2BtvWd2ok5v3E2gl%2Fca1dqbBAczX5OkwGdIijocFCnAxGf1vv9xsSc7%2FwPqA8lSJERK6sAAAAASUVORK5CYII%3D");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH2gkUDTsp28LTVwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAJQSURBVHjaxZNLTxNxFMXPzNDO0Ham0w5YEGkLgpYaHxA1EHQjSzS%2BAi74AuJG1OBSE%2BKncK3EoNGNCQmGFVGCYqQgjzo0UGeghU7b6YM%2BBvqv1cSFRuPKcJY3955zFr8L7Leo3wdPrRLd1NPVzlodl7FbsGZpLNKETEfnVkJ9q4vGHw0Cgzc7tOXgRanN32lkdzw0yzS19FyoZr1eUDSDVDhc1AKf5ayqyPno9iTLczOJsBrs%2FfA%2BQ328MyQY6uaMr%2F%2B6TzxxErBwKOsppORVpJWvPxJMrjo43I1gJQmFTAZ7yga%2BjI0FE4T0MyPXrnbvpfV7dNGASVWAygJtMoFrbYF4zA9bTQ32dB3p9XXEZmdBEYKMosBIpmpIdFusyuXzoc3Qmk5bbaKeTMCVzYKsrIARBIg%2BH5hKsrPzLIygjIW5OchTU6BZDnQsiXK53FClBuWu%2BpZW0VLnwk4uh9CnefCSA2aBR1ZRwR9qQLLSYL1yXCoR7G5poKgqWJ0izByboo140lcsFGE3m2Fk0kjEYrC3d6Da7Ua8YqhHIlCWl1CM6ygpEXAOCdb6AyCEPLEfbhqkJm700cVQ%2BIrT7nhE2S1t35t4jxwFVzEwOR1YfP4C8vgkJE8jKFFATtM2eJtw%2F9z469FfOHjXe0nIF%2FK3LBZ%2BuPmU30kYBmYbj9B8AHFNg4WiUUqkx3iP%2B%2B6ZZ6MbfwVpaei2e%2FXtzANXw8GBxuN%2BbiEwj3xYjdY2ex92v3r5%2BJ8k%2FtT0wMDprdnASG2zJ0dKxvD5iTdr%2B%2F02%2F0nfACNq%2B6Z3ZPc3AAAAAElFTkSuQmCC");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHwSURBVDjLpZM9a1RBFIafM%2FfevfcmC7uQjWEjUZKAYBHEVEb%2FgIWFjVVSWEj6gI0%2Fwt8gprPQykIsTP5BQLAIhBVBzRf52Gw22bk7c8YiZslugggZppuZ55z3nfdICIHrrBhg%2BePaa1WZPyk0s%2B6KWwM1khiyhDcvns4uxQAaZOHJo4nRLMtEJPpnxY6Cd10%2BfNl4DpwBTqymaZrJ8uoBHfZoyTqTYzvkSRMXlP2jnG8bFYbCXWJGePlsEq8iPQmFA2MijEBhtpis7ZCWftC0LZx3xGnK1ESd741hqqUaqgMeAChgjGDDLqXkgMPTJtZ3KJzDhTZpmtK2OSO5IRB6xvQDRAhOsb5Lx1lOu5ZCHV4B6RLUExvh4s%2BZntHhDJAxSqs9TCDBqsc6j0iJdqtMuTROFBkIcllCCGcSytFNfm1tU8k2GRo2pOI43h9ie6tOvTJFbORyDsJFQHKD8fw%2BP9dWqJZ%2FI96TdEa5Nb1AOavjVfti0dfB%2Bt4iXhWvyh27y9zEbRRobG7z6fgVeqSoKvB5oIMQEODx7FLvIJo55KS9R7b5ldrDReajpC%2BZ5z7GAHJFXn1exedVbG36ijwOmJgl0kS7lXtjD0DkLyqc70uPnSuIIwk9QCmWd%2B9XGnOFDzP%2FM5xxBInhLYBcd5z%2FAAZv2pOvFcS%2FAAAAAElFTkSuQmCC");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAB3RJTUUH2gkUDTUwISpWGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAHzSURBVHjaY2SAg40il83FJH8yv3%2BkdDDmG0yUEUItFPtY8zqW%2FfhnWYmvf5jey8jM1Ou1%2BQJXsMXg4CaJo8J3f63le8X36rP1e7MPnr%2F5Lb1dnjMwMDEwHJU%2Ft0L0qsjWhBrRb%2Bxmn%2FxYr2V0cW1l%2FnpmxXFusAkTl7%2BKcBb9%2Fe5N3dV8sU%2FfBX690inl2cigv%2FO8Tk1SK9NO7Xemymm%2FON%2Blvar%2FKcCwnPXQN5XXk%2F%2Fa%2FeKSL3mccEKE6a3TL1Hes39f32h9wcDMwMzKwvyP4Y7M%2BUbfYyIfvipf1WG6pcVz9RcXowG3EMi5HJ8ZPv4DOoxX7RA%2Fx3fGr%2FxqTD%2B5mT7%2F%2FszIwcjwHyjxVkf0KjeIxfKPkfcdM8N%2FLialy2%2BsmGT%2Bnn73%2Fj%2FQxe%2BDH4oqP%2FjN8PGuw4fHxr94ft9k4jzI85qJ%2BReferX0v98M%2FxjeZVyX1%2F2u3b7d8P8b7icSF5hiTnHevDrvwa%2BE6YK9DH%2BkGETY%2Fr1lTgrY9E30xgzBpU7PgeGwxfDkqj87tI%2FErJxuLiTzk4HzXOj9OZ1vdb9JGXoEvAAH9TqPM5tF5vBfY9nP%2F0ro%2FcegD1LPG9589vR2vAiPrE26Z1u%2B%2B4md%2Fy3O%2BvmHwid2ycXClXFPkWITBCYaszg%2FVWNk5D8ueizxGkwUALQ6zuPndEmLAAAAAElFTkSuQmCC");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X%2FxbjBpjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7ZAF%2FeRe%2FM73%2FnOzXUAcEwaqVTKmUgkGqIoWoIgWP%2FfTYSTyaSTgAfdbhemaSIej%2BNcAgRudDod9Pt95PN5RKPR8wnwPG%2FZ1XVdB8dxin0WDofBsiyCwaA1UYBY%2FtdqtVAqlRCJRN6FQiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM%2Fna5wKzq%2F%2B4ALprzqxbFUqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS%2BT74jR7Y5c8wDAO5XA4MwxzalklVy%2BPxNCiKcp4IkbbhzR4K%2Bh9IH02wax3MiAYCgcBfv99%2F4TS3xxtfepcTCPyKgGl5gCevfyJb%2FQ3q6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N%2FfqbAHIEXsj1saQR%2BM8BCdg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pYIfA9Al%2BZ3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR%2B267GwAAAABJRU5ErkJggg%3D%3D");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAB3RJTUUH2gkUDTsCd34qFwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAF3SURBVHjaNZHNK0RRGMZ%2F594zja%2BJyUSZJEuJjbJAJCwsZCMrFlYWNv4CG6Ws%2FAOSkshSSaGklIVQslCKEuNbvr%2FuzPDMuTmn%2B95z3ud5n%2FfjmIXW1bn7mOUX8DCkZcMVkHjtHjT9F4lknIwjhCurs9Xf8MT9pb2KleqAIxinUCj6C3lO8U7amVsignNgQDFtVPJJihV87SBj02L7Ylt%2BKKOTHinAmUhrfEjLfgsIy0PxzbpNUsEwdSzxJr%2BX4Vn7SV%2BKalFOmWJGUClx7pTUBjJGglDDFgPUM005RZxw5KoSwVemDqKMsimVEvrU6A7z6iPXmTXq4ZsqxrlihGXRapXumgPFR3MKRrwG%2BjmnlwlaWGdRwBcF0vGEeVlJncudZIwmDtkV%2FEtMbVs3H%2BuJ%2B84NG7Szx7GDc2AgBSvEZv2Eaj5WZCf7PGhMBRg32TT5PPqm6yKWjOjia0ThuP6Xlfc1Zabbtmc%2FiiNq1bhI3KOFNvrcOPQHgdN9kiK%2FAroAAAAASUVORK5CYII%3D");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAB3RJTUUH2gkUDTgl%2BVnMvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAFySURBVHjaY2BAAftUNwQy4ANTNxf%2Bn7J4gxIO6el95f%2Bl%2Fgf%2F73y2JmcNE0SMGSE9c%2Frb3M8MrxiuMDzjZffitwm4uuE5AwMjTHrBtBuZzxjUGf4znGU4D%2BQ7Mhh9YV%2Bo0g41YVXz9eJTDN8YXjLwMGgyKDC8Y%2BBi%2BMn21%2BylLNiEZakPZu1j%2BAMU%2FM7wj8GSQZrhN8MbIOvzHx0zoAlzzF%2BtP874D6jwNwMb0E5GhqcMkgzcDI8ZVOLzdzEtFH63%2FgrTD4ZfQPeyA5X8ZXjG8JWBCehYjaaSJQwMTC%2BX%2FJZ8AzSej4EDKMzBIABU6g7Er9YV1YOsZ5J%2F%2BJ3BgkEe6MDfQGFOoDODgMqu3raIhDgf6Mit%2BRe7mVg%2FMRwDGivOYMpgx7D5u5t28H24AgaGg%2FaX539T5GQ4DgyFBIbDDPJhqath4QMNqGNidye9ChdiYAV67tqsjnSsMbG1fNLPpf%2FLzh1hZMAFdttN3b9VGlUMAMfyfvb5dibtAAAAAElFTkSuQmCC");' +
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
                 '  link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH3gMEEjU5zrQH2AAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAMXSURBVHjafZNfaFtlGMZ%2F38nnSVOzrE3bdWmbxmZj2SgdkdVZRISuMlA7x9iwCIMtt1tx2Ct3o%2BvQC9GBFwORTSh2MHtVGK0o9U8LprR1Xec2o063Q1NC0hhWg%2F2TZMk5%2B07CdIrshcM57%2BF5n%2B857%2FMcwWMqnU6%2FmUql3JZl5ZLJ5JFMJrPXft%2Fa2jrS0tIyFgwGL8mH4I2NjfDq6upmdScajQ4kEomGEydOPmsY17RAYAdSOirAImRX1vt6Xn7pKdVdkgsLC5Hx8S%2BOnzrV%2F1w6HZdzcxMcPBjB7w8QibxOY%2BOHOJ1V5POgq%2BOMGskv346S%2Fe2OZfNJJTE4PPzxC%2BfOXVbSdmKapgLXUyppZDKQy1EeXl6GGjcU6sCs9SCxrHze8mhFVUePHqe9%2FXmSyXoMYwvF4jJC%2FInHA7t2ocjUcA1YAhoUqVYy%2BTkmWqNR3tDUgnDqLmrrlUQnJBLznD%2FfxA%2Fz39DRgdoH3L8P3d2w70XwhVWvxCsuy%2BGgWCZ4osrN5lKWJ7VZGrZ0lgcPiz%2FwmnH0aujpgdnZ%2F3eqosCpE5uaxvi9iz3PgHf1bZo62stHCVEBdnXB9Xml8r8EXm9taW7mOm9dfp%2FuA3DhYi2hcCepq1fVxxf%2FBX66E%2BI%2Fgks%2BQpBMZoJ3737ChY%2BmKOQ1pLXC51Ov4hsYoOhrQpT%2BAX%2F9pXLEr5x5hFfr6zscOX1abUQtxuUyefc9CDTD2NhXSIerDJqchCtXIHYLQl57yg6VVSHo7z8ZP3t2Hz5fCzMzcOMGDA%2FvJRRqU44ssnWrwbZthrJ5iYufFohN5vh1%2FjuEjmazCJXEM0NDn71z%2B%2FaQGlzh2DHUUnvRtJ1GLJZzhMNeFXOTuroqFecQxbyHTZtuCiED2d7eIyOiUCh4x8cnBnX9lf6lJVhbGxlra%2BtOejwN8fV101Fdrdk%2B2GY9LKGcsXuhQiulruv3BgcH9%2BzeDYuLH%2Fy0f%2F9r024396Sk0Nys%2FeX3M62S%2BPfeNY1SNksglaLdDpKsUCIOHYLR0Z6J7dv5vrGRa7ou1h7zpyfUNW0%2FPADjgjmV1XQ8pgAAAABJRU5ErkJggg%3D%3D");' +
                 '  link.setAttribute("height", "16px");' +
                 '  link.setAttribute("width", "16px");' +
                 '  var head = document.getElementsByTagName("head")[0];' +
                 '  head.appendChild(link);'
});

//Page mod for worksheet links (in_ewr_id=XXXXX & in_ewr_no=XXXXX)
pageMod.PageMod({
  include: "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_*",
  contentScriptWhen: 'end',
  contentScriptFile: './js/directPart.js',
  onAttach: function(worker) {
    worker.on('message', function(message) {
        if (preferences.EWSDirectPrint) {
            var url = message.url;
            var part = message.element;
            if (url.contains("p_part_id")) {
                //console.log('URL: ' + message.url);
                //console.log('Target: ' + /[^\s]+/.exec(part));
                var urlCHK = fileURL.FSdisplay(String(/[^\s]+/.exec(part)));

                if (urlCHK == "unknown") {
                    //Do nothing
                } else {
                    //Replace old href with new urlCHK
                    var URLs = JSON.stringify({
                        url_new: urlCHK,
                        url_old: url
                    });
                    worker.postMessage(URLs);
                    //console.log(urlCHK); 
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
    contentScriptFile: ["./js/jquery-2.1.4.js",
                      "./js/typeahead.bundle.js",
                      "./js/searchMenu.js"]
});

fs_panel.on("show", function() {
    fs_panel.port.emit("show");
});

fs_panel.port.on("data_load", function () {
    //Need to figure out how to use promises to load multiple files at once
    var httpRequest = Request({
        url: "http://170.64.172.81/scripts/FileSearch/superarray.json",
        headers: {
            'Cache-control': 'no-cache'
        },
        onComplete: function (response) {
            fs_panel.port.emit("rtn_data", response.text);
        }
    });
    httpRequest.get();
});

fs_panel.port.on("data_load_test", function () {
    //START TEST - THIS DOES WORK, but not needed
/*     function get(url) {
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
      //addHtmlToPage(data.heading);
        //console.log(data);
      // Take an array of promises and wait on them all
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
        // …and add to the page
        //addHtmlToPage(chapter.html);
        arr.push(chapter);
        //arr.property = chapter;
      });
      //addTextToPage("All done");
      console.log("Done");
    }).catch(function(err) {
      // catch any error that happened so far
      //addTextToPage("Argh, broken: " + err.message);
      console.log("Argh, broken: " + err.message);
    }).then(function() {
      //document.querySelector('.spinner').style.display = 'none';
      fs_panel.port.emit("rtn_data_test", arr);
    }); */
//END TEST -    
fs_panel.port.emit("rtn_data_test");  
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
    var pnSearch = search;
    var epfPN;
    var pnCount = pnSearch.length;
    var epfFile;
    var TPTterm;
    //var promises = [];
    if (pnCount == 6) { // If only six digits then guess GT code
        var arr = new Array("BP00", "CA00", "CM00", "CM05", "CM97", "CM99", "CT00", "FB00", "FB01", "FS32", "FS35", "FS99", "FS28", "FT44", "FT57", "FT99", "KT00", "LA00", "LA01", "LA02", "LA03", "LA04", "LA05", "LA06", "LA07", "LA99", "MB00", "MB01", "MB02", "MB03", "MB04", "MB05", "MB07", "MB08", "MB09", "MB96", "MB99", "MD00", "MM00", "MM01", "MM02", "MM03", "MM04", "MM05", "MS00", "RT01", "RT02", "RT03", "RT04", "RT05", "RT06", "RT07", "RT08", "RT09", "RT10", "RT11", "RT12", "RT13", "RT14", "RT15", "RT99", "SB01", "SB02", "SB03", "SB04", "SB05", "SB06", "SB07", "SB08", "SB96", "SB97", "SB98", "SB99", "SG00", "SG01", "XM00", "XM01", "XM02");
        //var arr = new Array("MB96", "XM01", "XM02");
        if (String(pnSearch).substring(0, 2) != "SK") {            // SKs do not have GTC
            for (var h = arr.length - 1; h >= 0; h--) {
                var TPTgtterm = arr[h]; // Sets current array GT code
                TPTterm = TPTgtterm + "A" + pnSearch; // Sets file to check
                epfFile = "S://" + TPTterm;
                //epfPN = epfFile;
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
                if (existsValue == true) {
                    preferences.Part_Number = partnum.substring(4, 15);
                    fs_panel.hide();
                    tabs.open({
                        url: "about:epfviewer",
                        isPinned: false,
                        inNewWindow: false,
                        inBackground: false
                    });
                    return;
                } else if (existsValue == false) {
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
    var epfDir = directory.data[0];
    var dir_int = directory.data[1];
    var file = Cc["@mozilla.org/file/local;1"].  
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
    var folder = array[0];
    var url = array[1];
    var term = array[2];
    
    console.log("URL: " + url + ", Term: " + term);
    var fileRequest = Request({
      url: url,
      onComplete: function (response) {
        transferComplete(term, url, "NA");
      }
    });
    fileRequest.get();
});

fs_panel.port.on("go_DV_search", function (array) {
    preferences.Part_Number_a = array[0];
    preferences.Part_Number_b = array[1];
            
    tabs.open({
        url: "about:dualview",
        isPinned: false,
        inNewWindow: false,
        inBackground: false
    });
});

DualViewmanager.addMessageListener("ready", function() {
    var a = preferences.Part_Number_a;
    var b = preferences.Part_Number_b;
    var array = new Array(a, b);
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
    label: "Auto File Search",
    icon: {
      "16": "./images/PG16.png",
      "32": "./images/PG32.png",
      "64": "./images/PG64.png",
    },
    onClick: function(state) {
        var pastetext = clipboard.get();

        if (pastetext)
        {
            console.log("Original paste & go value: '" + pastetext + "'");
            pastetext = pastetext.replace(/^[\r\n]+|[\r\n]+$/g, '');//Remove leading / trailing carriage returns / line feeds
        }
        //Replace search text if matches found in whitelist
        var wltext = wl.wlCompare(pastetext);
        var urlCHK = fileURL.FSdisplay(wltext);
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
        }
        else {
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
    label: "Email current PDF",
    icon: {
      "16": "./images/email.png",
      "32": "./images/email32.png",
      "64": "./images/email64.png"
    },
    onClick: logContentAsync
});

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
                        
function logContent(message) {
    var n = occurrences(String(message.data.href), ".pdf");
    if (n == 1) {
        //console.log(data_URL);  //Additional data available from var
        var open_PDF_name = message.data.href.match(/[a-zA-Z0-9-_]+\.pdf/i); //With .pdf
        var open_PDF_name2 = String(open_PDF_name).replace(/.pdf/i, ""); //Without .pdf

        // Sets dir to desktop.
        var pdf_dir = require('sdk/system').pathFor('Desk');

        var d = new Date();
        var df = "" + (d.getMonth() + 1) + d.getDate() + d.getFullYear();
        var email_pdf = pdf_dir + "\\" + open_PDF_name2 + "_" + df + ".pdf";
        DownloadFile(email_pdf,message.data.href);

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
            text: "Cannot save PDF from URL: \n\n" + ' ' + message.data,
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

function transferComplete(termsUP, url_to_open, url_to_open2) {
    var tabprefs = preferences.TabFocus;
    var panelprefs = preferences.PanelClose;
    
    if (panelprefs === true) {
        fs_panel.hide();
    }

    preferences.Part_Number_a = url_to_open;
    var Part_Num_type = preferences.Part_Num_type;
        if (tabprefs === false) { // Open tab w/o focus
            tabs.open({
                url: url_to_open,
                isPinned: false,
                inNewWindow: false,
                inBackground: true
            });
        } else if (tabprefs === true) { // Open tab and make active
            tabs.open({
                url: url_to_open,
                isPinned: false,
                inNewWindow: false,
                inBackground: false
            });
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
