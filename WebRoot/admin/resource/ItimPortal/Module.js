/*�����ؼ�����ʵ�ֵĽӿ�*/
var IfModule = new Interface("IfModule", ["add","remove","getChild","setClass","getClass"]);
//----------------------------------------------------some test motd
/*div������
 * ��������div
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
 * �ڵ������
 * ���� �ṩ��mode�ڵ���п��Ƶ���ط���
 * ������Լ��ɵ�mode�Ķ����У�����ʵ������ĸ���������������Ϊ���Ż��ڴ�����еĳ�ȡ��
 * */
var NodeHelper = {
    getFirstNode:function(/*$$module*/module) { /*��ȡ�����еĵ�һ���Ӷ���*/
        for (var i in module.components) {
            return module.components[i];
        }
    },
    SortMode:function(/*$$module*/module) {/*�����ֵ��е�˳�򣬽����һ��������ǰ��*/
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
/*����ģ��ؼ�*/
var $$module = function() {
    this.components = {};
    this.x = 0;
    this.y = 0;
    this.parent = null;
    this.element = getEleByArg.apply(this,arguments);
    HW.dom.unSelectable(this.element);
}
$$module.prototype.add = function(child, f) {
   // Interface.ensureImplements($$module, IfModule); Ϊ��ʡ������ע��
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