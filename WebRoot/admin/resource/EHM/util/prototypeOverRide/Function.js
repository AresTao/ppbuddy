/*
 �汾��2009-2-10
 ���ã���չfunction �� method ������ʵ��Function����չ������
 ����ʹ���ܹ�����ʽ������ʹ��
 ���������name, fn
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