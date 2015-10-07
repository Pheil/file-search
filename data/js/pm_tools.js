var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X%2FxbjBpjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7ZAF%2FeRe%2FM73%2FnOzXUAcEwaqVTKmUgkGqIoWoIgWP%2FfTYSTyaSTgAfdbhemaSIej%2BNcAgRudDod9Pt95PN5RKPR8wnwPG%2FZ1XVdB8dxin0WDofBsiyCwaA1UYBY%2FtdqtVAqlRCJRN6FQiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM%2Fna5wKzq%2F%2B4ALprzqxbFUqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS%2BT74jR7Y5c8wDAO5XA4MwxzalklVy%2BPxNCiKcp4IkbbhzR4K%2Bh9IH02wax3MiAYCgcBfv99%2F4TS3xxtfepcTCPyKgGl5gCevfyJb%2FQ3q6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N%2FfqbAHIEXsj1saQR%2BM8BCdg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pYIfA9Al%2BZ3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR%2B267GwAAAABJRU5ErkJggg%3D%3D");
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