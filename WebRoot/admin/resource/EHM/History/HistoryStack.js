// JavaScript Document
//ehm的历史纪录堆栈
//在这里 并没有劫持浏览器的返回等按扭，若有需要自行添加。
//zowell@20090105
function HistoryStack()
{
    this.stack = new Array();
    this.current = -1;
    //指针
    this.stack_limit = 8;//栈深
}
//入栈从当前指针开始
HistoryStack.prototype.push = function(resource)
{
    if (this.stack.length > 0) {
        this.stack = this.stack.slice(0, this.current + 1);
    }
    this.stack.push(resource);
    while (this.stack.length > this.stack_limit) {
        this.stack.shift();
    }
    this.current = this.stack.length - 1;
};
HistoryStack.prototype.getCurrent = function () {
    return this.stack[this.current];
};
HistoryStack.prototype.Prev = function () {
    if (this.hasPrev()) {
        this.current--;
    }
};
HistoryStack.prototype.hasPrev = function() {
    return (this.current > 0);
};
HistoryStack.prototype.Next = function () {
    if (this.hasNext()) {
        this.current++;
    }
};
HistoryStack.prototype.hasNext = function() {
    return (this.current < this.stack.length - 1 && this.current > -1);
};
HistoryStack.prototype.show = function() {//测试用
    var divs = document.getElementById("showhis");
    divs.innerHTML = "";
    for (var i = 0,len = this.stack.length; i < len; i++) {
        var d = document.createElement("DIV");
        d.innerHTML = this.stack[i];
        divs.appendChild(d);
    }
};