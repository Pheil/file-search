var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH3wkXDjsZvSVj%2FwAAAAlwSFlzAAAOwwAADsMBx2%2BoZAAAAARnQU1BAACxjwv8YQUAAACwSURBVHjaY2QAgqKiov8MJIK%2Bvj5GEM0CE%2Bjt7SVac3FxMZzNRKrN6ADFAEZGRjAGAVdXVxQaWQ6nASDw%2Fz%2Fu4MAmh2EANlvwybGgC8BsSUhIAGtYsmQJXJwoL8AUHT9%2BHKwJRONzGYoLkP04ZcoUFBpX2FAcjYxQ01GMvx5mjKFQc9VZdK%2BC9TJeCzX6j64QZACyBhgf3WCt1ecYB94LYADKjaQA5NwLj0bkHEYKAADXR3XPoPTm%2BQAAAABJRU5ErkJggg%3D%3D");
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