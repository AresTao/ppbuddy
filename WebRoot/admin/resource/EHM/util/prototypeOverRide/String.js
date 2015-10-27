String.prototype.trim = function() {
    return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
};
String.prototype.format = function()
{
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};
String.prototype.left = function(i)
{
    if (this.length > i) return this.substr(0, i) + "...";
    return this;
};// JavaScript Document