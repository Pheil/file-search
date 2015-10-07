var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAB3RJTUUH2gkUDTgl%2BVnMvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAFySURBVHjaY2BAAftUNwQy4ANTNxf%2Bn7J4gxIO6el95f%2Bl%2Fgf%2F73y2JmcNE0SMGSE9c%2Frb3M8MrxiuMDzjZffitwm4uuE5AwMjTHrBtBuZzxjUGf4znGU4D%2BQ7Mhh9YV%2Bo0g41YVXz9eJTDN8YXjLwMGgyKDC8Y%2BBi%2BMn21%2BylLNiEZakPZu1j%2BAMU%2FM7wj8GSQZrhN8MbIOvzHx0zoAlzzF%2BtP874D6jwNwMb0E5GhqcMkgzcDI8ZVOLzdzEtFH63%2FgrTD4ZfQPeyA5X8ZXjG8JWBCehYjaaSJQwMTC%2BX%2FJZ8AzSej4EDKMzBIABU6g7Er9YV1YOsZ5J%2F%2BJ3BgkEe6MDfQGFOoDODgMqu3raIhDgf6Mit%2BRe7mVg%2FMRwDGivOYMpgx7D5u5t28H24AgaGg%2FaX539T5GQ4DgyFBIbDDPJhqath4QMNqGNidye9ChdiYAV67tqsjnSsMbG1fNLPpf%2FLzh1hZMAFdttN3b9VGlUMAMfyfvb5dibtAAAAAElFTkSuQmCC");
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