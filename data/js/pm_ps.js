var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAB3RJTUUH2gkUDTsCd34qFwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAF3SURBVHjaNZHNK0RRGMZ%2F594zja%2BJyUSZJEuJjbJAJCwsZCMrFlYWNv4CG6Ws%2FAOSkshSSaGklIVQslCKEuNbvr%2FuzPDMuTmn%2B95z3ud5n%2FfjmIXW1bn7mOUX8DCkZcMVkHjtHjT9F4lknIwjhCurs9Xf8MT9pb2KleqAIxinUCj6C3lO8U7amVsignNgQDFtVPJJihV87SBj02L7Ylt%2BKKOTHinAmUhrfEjLfgsIy0PxzbpNUsEwdSzxJr%2BX4Vn7SV%2BKalFOmWJGUClx7pTUBjJGglDDFgPUM005RZxw5KoSwVemDqKMsimVEvrU6A7z6iPXmTXq4ZsqxrlihGXRapXumgPFR3MKRrwG%2BjmnlwlaWGdRwBcF0vGEeVlJncudZIwmDtkV%2FEtMbVs3H%2BuJ%2B84NG7Szx7GDc2AgBSvEZv2Eaj5WZCf7PGhMBRg32TT5PPqm6yKWjOjia0ThuP6Xlfc1Zabbtmc%2FiiNq1bhI3KOFNvrcOPQHgdN9kiK%2FAroAAAAASUVORK5CYII%3D");
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