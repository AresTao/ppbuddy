// JavaScript Document
//ehm的历史纪录堆栈
//在这里 并没有劫持浏览器的返回等按扭，若有需要自行添加。
//zowell@20090105
var Stack = function(limt_length) {
    this.stack = new Array();
    this.limt = (limt_length) ? limt_length : 8;
}
Stack.prototype.push = function(o) {
    if (this.exist(o)) {
        this.remove(o);
        this.stack.unshift(o);
    } else {
        this.stack.unshift(o);
    }
    while (this.stack.length > this.limt) {
        this.stack = this.stack.reverse();
        this.stack.shift();
        this.stack = this.stack.reverse();
    }
};
Stack.prototype.pop = function() {
    return this.stack.shift();
};
Stack.prototype.exist = function(o) {
    return (this.getIndex(o) > -1);
};
Stack.prototype.getIndex = function(o) {
    var ret = -1;
    for (var i = 0,len = this.stack.length; i < len; i++) {
        if (this.stack[i] == o) {
            return i;
        }
    }
    return ret;
};
Stack.prototype.remove = function(o) {
    var _i = this.getIndex(o);
    if (_i > -1) {
        var fArray = this.stack.slice(0, _i);

        var bArray = this.stack.slice(_i + 1, this.stack.length);

        this.stack = fArray.concat(bArray);
    } else {
        //throw new Erro("栈中不包含此对象");
    }
};
Stack.prototype.getCurrent = function() {
    return this.stack[0];
};

