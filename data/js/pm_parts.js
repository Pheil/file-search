var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH3wYaDyYGvrknLQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAM5SURBVHjaZVNbaFRHGP5mzsw5s5fsZpN0N9m4W6ES1ytuIU1MQ6FgSqlWX3wSUu1DaFGKFB8qovjgBRGkILXEW8CWRkqlVovY6oPEuKINQkVRpGqTdE2aVXJxN7sn55w90zmrkab9B2YG5vv%2B%2Bf9vviH4T5y%2Fm2%2BPBNiGkGDNQYMm%2FRwQmhwWjA5whl5G6bV%2F48nsZu%2Flp5H6sL4npJMuQW1dkDICOkGsJozqKg4uXQQEtTTguGmaO30%2B3%2BSrBJ%2BeGY1E%2FeTb6cGB1aN3M7jVdxHjz3JwXReLlizH7gOHsLJlGXJPchh7MgTHti5zxj5pbW39s5Lg49PZr8JC2%2BJHCaWR%2ByiOj2B86B5%2BOPFlpbqGxnlY9f4HuHLpF2T%2FGkZHRwd6enpOJRKJTeS9o4MrwwbtCwmNh30MkaCBhlgY1uhDbFu7DKWSOUejeYkkfjz3M5rTy2cA%2BS6bnnE7KQgnRIIygJcZHj94gNvnj%2F6P3BBvxHc%2F%2FYrF6RQKM65hMNLJipZsIcQTw4aTzyHb34%2Ffzx7Gs5Eh1DUkUFUVQvbRfdhlF5OTE7hxPYOmVApMSi9nC1m4%2F4%2BxWjoZ1QpjGOs%2FheLfD5Fevw3JN1KorYkgWhPCb2e70Xt4NxyV5LVoDBeu30E8WgeDujlWtF1QHkQw5EOibT0CjYtQHUtCMgeW8kBJCyDV%2FiHEiYMo5PNoWpoG0atQMB24nICVbGQZZNRfyGKqejFcVgM5NYWyoJBKD0M4uHr66wo5nngdXTsOwZQMxLQhJc2ymbK86ZPmm0VRD4kgSFEJZyhZ1WA6x%2BDtDPrOHEM0nkTXvm8QiC%2FERL6Isoeh5KbG2jaPW0T%2FyCJco3Bf%2BZMoZRkXyN06B65cuW77SdQ3pWGXpkEr57ApIZ9rduZIVmvbHFPXvzXrbCI9hIR0yxD%2BEJpWdcJf1wjHLHrECltBu9csCR1jL594l1WW8wF3NSrFexivDQcksgB5VRh5Pg1XaC%2B5uKA8sMsjat7kZI6Y%2FO0tF11PBGCFQmgvOlFQVYWaXuwJLLV2G4x%2BtvWd2ok5v3E2gl%2Fca1dqbBAczX5OkwGdIijocFCnAxGf1vv9xsSc7%2FwPqA8lSJERK6sAAAAASUVORK5CYII%3D");
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