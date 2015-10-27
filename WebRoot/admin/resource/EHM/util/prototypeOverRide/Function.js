/*
 版本：2009-2-10
 作用：扩展function 的 method 方法，实现Function的扩展方法，
 并且使其能够在链式调用中使用
 必填参数：name, fn
 */
Function.prototype.bind = function(obj) {
    var method = this, temp = function() {
        return method.apply(obj, arguments);
    };
    return temp;
};

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};// JavaScript Document