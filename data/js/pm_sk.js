var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHwSURBVDjLpZM9a1RBFIafM%2FfevfcmC7uQjWEjUZKAYBHEVEb%2FgIWFjVVSWEj6gI0%2Fwt8gprPQykIsTP5BQLAIhBVBzRf52Gw22bk7c8YiZslugggZppuZ55z3nfdICIHrrBhg%2BePaa1WZPyk0s%2B6KWwM1khiyhDcvns4uxQAaZOHJo4nRLMtEJPpnxY6Cd10%2BfNl4DpwBTqymaZrJ8uoBHfZoyTqTYzvkSRMXlP2jnG8bFYbCXWJGePlsEq8iPQmFA2MijEBhtpis7ZCWftC0LZx3xGnK1ESd741hqqUaqgMeAChgjGDDLqXkgMPTJtZ3KJzDhTZpmtK2OSO5IRB6xvQDRAhOsb5Lx1lOu5ZCHV4B6RLUExvh4s%2BZntHhDJAxSqs9TCDBqsc6j0iJdqtMuTROFBkIcllCCGcSytFNfm1tU8k2GRo2pOI43h9ie6tOvTJFbORyDsJFQHKD8fw%2BP9dWqJZ%2FI96TdEa5Nb1AOavjVfti0dfB%2Bt4iXhWvyh27y9zEbRRobG7z6fgVeqSoKvB5oIMQEODx7FLvIJo55KS9R7b5ldrDReajpC%2BZ5z7GAHJFXn1exedVbG36ijwOmJgl0kS7lXtjD0DkLyqc70uPnSuIIwk9QCmWd%2B9XGnOFDzP%2FM5xxBInhLYBcd5z%2FAAZv2pOvFcS%2FAAAAAElFTkSuQmCC");
link.setAttribute("height", "16px");
link.setAttribute("width", "16px");
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);

var embed = document.getElementsByTagName("embed").item(0);
if (embed != null) {
    var src = embed.getAttribute("src"),
        fpath = src.replace(/\\/g, "/"),
        src2 = fpath.substring(fpath.lastIndexOf("/")+1, fpath.lastIndexOf("."));
    if (src2 != null) {
        document.title = src2;
    }
} else {
var src = document.title,
    fpath = src.replace(/\\\\/g, "/"),
    src2 = fpath.substring(fpath.lastIndexOf("/")+1, fpath.lastIndexOf("."));
document.title = src2;
}