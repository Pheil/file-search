var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAB3RJTUUH2gkUDTUwISpWGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAHzSURBVHjaY2SAg40il83FJH8yv3%2BkdDDmG0yUEUItFPtY8zqW%2FfhnWYmvf5jey8jM1Ou1%2BQJXsMXg4CaJo8J3f63le8X36rP1e7MPnr%2F5Lb1dnjMwMDEwHJU%2Ft0L0qsjWhBrRb%2Bxmn%2FxYr2V0cW1l%2FnpmxXFusAkTl7%2BKcBb9%2Fe5N3dV8sU%2FfBX690inl2cigv%2FO8Tk1SK9NO7Xemymm%2FON%2Blvar%2FKcCwnPXQN5XXk%2F%2Fa%2FeKSL3mccEKE6a3TL1Hes39f32h9wcDMwMzKwvyP4Y7M%2BUbfYyIfvipf1WG6pcVz9RcXowG3EMi5HJ8ZPv4DOoxX7RA%2Fx3fGr%2FxqTD%2B5mT7%2F%2FszIwcjwHyjxVkf0KjeIxfKPkfcdM8N%2FLialy2%2BsmGT%2Bnn73%2Fj%2FQxe%2BDH4oqP%2FjN8PGuw4fHxr94ft9k4jzI85qJ%2BReferX0v98M%2FxjeZVyX1%2F2u3b7d8P8b7icSF5hiTnHevDrvwa%2BE6YK9DH%2BkGETY%2Fr1lTgrY9E30xgzBpU7PgeGwxfDkqj87tI%2FErJxuLiTzk4HzXOj9OZ1vdb9JGXoEvAAH9TqPM5tF5vBfY9nP%2F0ro%2FcegD1LPG9589vR2vAiPrE26Z1u%2B%2B4md%2Fy3O%2BvmHwid2ycXClXFPkWITBCYaszg%2FVWNk5D8ueizxGkwUALQ6zuPndEmLAAAAAElFTkSuQmCC");
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