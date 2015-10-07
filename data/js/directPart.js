var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
    var url = links[i].href;
    var txt = links[i].textContent;
    self.postMessage({
        url: url,
        element: txt
    });
}

self.on("message", function(addonMessage) {
    var parsedURL = JSON.parse(addonMessage);
    var url_new = parsedURL.url_new;
    var url_old = parsedURL.url_old;
    var links,thisLink;
    links = document.evaluate("//a[@href]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i=0;i<links.snapshotLength;i++) {
        thisLink = links.snapshotItem(i);
        if (thisLink.href == url_old) {
            thisLink.href = thisLink.href.replace(url_old, url_new);
            //console.log("REPLACED");
        }

    }
});