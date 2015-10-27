/*声明控件必须实现的接口*/
var IfModule = new Interface("IfModule", ["add","remove","getChild","setClass","getClass"]);
//----------------------------------------------------some test motd
/*div工厂类
 * 负责生产div
 * */
function getEleByArg() {
		var arg=arguments;
    switch (arg.length) {
        case 1: {
            return $$("div", arg[0]);
            break;
        }
        case 2:  {
            return $$("div", arg[0], arg[1]);
            break;
        }
        case 3:  {
            return $$("div", arg[0], arg[1], arg[2]);
            break;
        }
        default: {
            return $$("div");
            break;
        }}
}
/*
 * 节点帮助类
 * 用来 提供对mode节点进行控制的相关方法
 * 此类可以集成到mode的对象中（由于实例对象的个数不定，这里是为了优化内存而进行的抽取）
 * */
var NodeHelper = {
    getFirstNode:function(/*$$module*/module) { /*获取对象中的第一个子对象*/
        for (var i in module.components) {
            return module.components[i];
        }
    },
    SortMode:function(/*$$module*/module) {/*更换字典中的顺序，将最后一个防到最前面*/
        var temp;
        var temparr = [];
        for (var i in module.components) {
            temparr.push({id:i,dat:module.components[i]});
        }
        module.components = {};
        var last = temparr[temparr.length - 1];
        module.components[last.id] = last.dat;
        for (var _i = 0; _i < temparr.length - 1; _i++) {
            module.components[temparr[_i].id] = temparr[_i].dat;
        }
    }};
/*基础模块控件*/
var $$module = function() {
    this.components = {};
    this.x = 0;
    this.y = 0;
    this.parent = null;
    this.element = getEleByArg.apply(this,arguments);
    HW.dom.unSelectable(this.element);
}
$$module.prototype.add = function(child, f) {
   // Interface.ensureImplements($$module, IfModule); 为节省开销而注释
    if (f && NodeHelper.getFirstNode(this)) {
        this.element.insertBefore(child.getElement(), NodeHelper.getFirstNode(this).getElement());
        this.components[child.getElement().id] = child;
        NodeHelper.SortMode(this);
    } else {
        this.components[child.getElement().id] = child;
        this.element.appendChild(child.getElement());
    }
    child.setParent(this);
};
$$module.prototype.remove = function() {
    if (this.parent) this.parent.removeComponents(this.getElement().id);
};
$$module.prototype.Delete = function() {
    HW.dom.removeNode(this.getElement());
    if (this.parent) this.parent.removeComponents(this.getElement().id);
};
$$module.prototype.destroy= function() {
    HW.dom.removeNode(this.getElement());
	this.data.destroy();
    if (this.parent) this.parent.removeComponents(this.getElement().id);
};
$$module.prototype.removeComponents = function(id) {
    delete this.components[id];
};
$$module.prototype.getChild = function(id) {
    return this.components[id];
};
$$module.prototype.getChildNodes = function() {
    return this.components;
};
$$module.prototype.setClass = function(className) {
    this.element.className = className;
};
$$module.prototype.getClass = function() {
    return this.element.className;
};
$$module.prototype.getT = function() {
    return this.element.innerHTML;
};
$$module.prototype.setT = function(t) {
    purge(this.element);
    HW.util.GC();
    if (typeof t === "object") {
        this.element.innerHTML = "";
        this.element.appendChild(t);
    } else {
        this.element.innerHTML = t;
    }

};
$$module.prototype.setParent = function(mode) {
    this.parent = mode;
};
$$module.prototype.getParent = function() {
    return this.parent;
};
$$module.prototype.getTipParent = function(id) {
    var that = this;
    while ((that.getParent() != null) && ((id != null) ? ((that.getElement().id == id) ? false : true) : true)) {
        that = that.getParent();
    }
    return that;
};
$$module.prototype.getElement = function() {
    return this.element;
};
$$module.prototype.each = function(f) {
    for (var Item in this.components) {
        f(this.components[Item], Item, this)
    }
}
$$module.prototype.addEvent = function(type, fn) {
    addEvent(this.element, type, fn);
};