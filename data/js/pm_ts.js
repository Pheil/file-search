var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH2gkUDTQqxVOeIgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAKrSURBVHjajVNLTxNRFP7uzJ3SBxTtUMCoJLRA8AHBRNHozrCSlbBS18SNcaG4kz%2FgwjbG6F%2FA4JakK6PEROJCQtCKRDAVLKWlAfqedmau5w4UykpP5%2FTOfZx7vu87Z5hhGAr5EwAPGGM%2BGmHbNoQQqL9Lk1O5wpgCy7IKtB71er0Rls%2FnZfAzj8cDVVXxL7PpllKpjEqlIi9%2FhFwut2GapqjVamJtbU3Qhmg0OuS4tO3sjvg0%2F1n8XP0lKkZVbKbS65xgt9Qzx2IxjI%2BPo729%2FQD2Po2lpSXMzLxFcjNF2UuYejoFzjW55Vfoz6rD0zSNOLJDuMzhzBAOhyk4iUQige7uboR6QlIHecTidZGcGS02zikaRq2Kl69fIdim41SwAxeHBsFdGmyLztHD6zClSSoy4%2FSbaRQKBYzdHsPzSASKwjBycwSmaeHKjeuoUhJNUZzS8GMK00Y0GkWZVK5Wqph7N4eBgQFM3J%2FAwsIivnxbRFdvH%2Fr8fgkOgtEFB1wc29vbcxDcuXsPuzu7SKfTaG09gdnZGM6Gwhi8fA1f48s43xtyekLQT2lEEAgEMHprFPEfyzAJ9qWrw8gZJbQGdZQpUdEwoXHXocA2IVAaVeeco1DM40xXPwyFI5nNoMXbAWarqHEFG8UqKkeAYVLoMQQuKqPb7cZ8royspcLd5MP7ooGkyw2F1hdJm7x2FMKs%2FSo4XZTJZBD%2FHnfGD%2BkC%2Bj1%2BVPWT%2BLiewG5bAOd8zYivrsITaEZ2eAi6HgC3hcpIqA1d109vbW1hZWXFEZExN8GjD8o24RJNRMFETbFh8yZQeXChrwd6ZxCJVPKPVHoym80e9vt%2FmSXEZjotfm%2BnHjNqGOmTlPkhMfHJ8lA%2BuEwXFGJXVspQaWTkFW5Q86kQpsirlvVC72yL%2FAUwN48eLMjZngAAAABJRU5ErkJggg%3D%3D");
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