var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH2gkUDTsp28LTVwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAJQSURBVHjaxZNLTxNxFMXPzNDO0Ham0w5YEGkLgpYaHxA1EHQjSzS%2BAi74AuJG1OBSE%2BKncK3EoNGNCQmGFVGCYqQgjzo0UGeghU7b6YM%2BBvqv1cSFRuPKcJY3955zFr8L7Leo3wdPrRLd1NPVzlodl7FbsGZpLNKETEfnVkJ9q4vGHw0Cgzc7tOXgRanN32lkdzw0yzS19FyoZr1eUDSDVDhc1AKf5ayqyPno9iTLczOJsBrs%2FfA%2BQ328MyQY6uaMr%2F%2B6TzxxErBwKOsppORVpJWvPxJMrjo43I1gJQmFTAZ7yga%2BjI0FE4T0MyPXrnbvpfV7dNGASVWAygJtMoFrbYF4zA9bTQ32dB3p9XXEZmdBEYKMosBIpmpIdFusyuXzoc3Qmk5bbaKeTMCVzYKsrIARBIg%2BH5hKsrPzLIygjIW5OchTU6BZDnQsiXK53FClBuWu%2BpZW0VLnwk4uh9CnefCSA2aBR1ZRwR9qQLLSYL1yXCoR7G5poKgqWJ0izByboo140lcsFGE3m2Fk0kjEYrC3d6Da7Ua8YqhHIlCWl1CM6ygpEXAOCdb6AyCEPLEfbhqkJm700cVQ%2BIrT7nhE2S1t35t4jxwFVzEwOR1YfP4C8vgkJE8jKFFATtM2eJtw%2F9z469FfOHjXe0nIF%2FK3LBZ%2BuPmU30kYBmYbj9B8AHFNg4WiUUqkx3iP%2B%2B6ZZ6MbfwVpaei2e%2FXtzANXw8GBxuN%2BbiEwj3xYjdY2ex92v3r5%2BJ8k%2FtT0wMDprdnASG2zJ0dKxvD5iTdr%2B%2F02%2F0nfACNq%2B6Z3ZPc3AAAAAElFTkSuQmCC");
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