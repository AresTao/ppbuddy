Array.prototype.each = function(f) {
    for (var i = 0; i < this.length; i++)f(this[i], i, this)
};

Array.prototype.remove = function(ob) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == ob) {
            var st = (i == 0) ? [] : this.slice(0, i);
            var ed = (i >= this.length) ? [] : this.slice(i + 1);
            var ss = st.concat(ed);
            return ss;
        }
    }
    return this;
};
Array.prototype.insert = function(i, ob) {
    i = i - 1;
    if (i < 0)i = 0;
    if (i > this.length)i = this.length;
    var st = (i == 0) ? [] : this.slice(0, i);
    st.push(ob);
    var ed = (i >= this.length) ? [] : this.slice(i);
    return st.concat(ed);
};

Array.prototype.sortTop = function(i) {
    /*Խ���ų�*/
    i = (i < 0) ? 0 : i;
    i = (i > this.length) ? (this.length - 1) : (i);
    var topAy = this[i];
    /*�ϲ�����*/
    var _i = i;
    var st = (_i < 0) ? [] : this.slice(0, _i);
    /*�ϲ�����*/
    var __i = i + 1;
    var ed = (__i >= this.length) ? [] : this.slice(__i);
    this.length = 0;
    this.push(topAy);
    return this.concat(st).concat(ed)//this.concat();
};// JavaScript Document