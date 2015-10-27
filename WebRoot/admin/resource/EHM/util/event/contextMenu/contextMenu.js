
EHM.ImportCss("/resource/EHM/css/contextMenu/contextMenu.css");
var ContextMenu = function () {
	this.tagCache={};
	this.MenuItem = {};
	this.MenuFun = {};
	this.css = "";
	this.Relate = [];
	this.tempAction={};	
};
ContextMenu.prototype.createConditions = function (ev, el) {
	var cond = {};
	cond["all"] = true;
	cond["clo"] = true;
	cond["max"] = true;
	cond["min"] = true;
	return cond;
};

ContextMenu.prototype.mouseOut = function (ev) {
	ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	var c = $(target.id).parentNode;
	c.className = this.MenuFun[target.id].mouseout;
};
ContextMenu.prototype.mouseOver = function (ev) {
	ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	
	for (var __i in this.MenuFun) {
		var menufunItem=this.MenuFun[__i];
		if(menufunItem.title){
			var c = $(__i).parentNode;
			if (this.MenuItem[target.tId][__i] && (c.className != menufunItem.undo)) {
				c.className = ($(__i) == target) ? menufunItem.mouseover : menufunItem.mouseout;
			}	
			}
		
	}
};
/*生成菜单项*/
ContextMenu.prototype.createMenu = function(container,ev,tag,menu,acName){
	var cnd = this.createConditions(ev, tag);
	//for(var j in cnd){console.log(j+">>"+cnd[j])}
	var self=this;
	/*event poxy */
	var _mouseOut=function(ev){ev = ev || window.event;return self.mouseOut(ev);};
	var _mouseOver=function(ev){ev = ev || window.event;return self.mouseOver(ev);};
	var _clearMenu = function(ev){ev = ev || window.event;return self.clearMenu(ev);};
	var _click = function(ev){
		var ac={};
		this.setAction=function(a){ac=a};
		this.Do=function(ev){ev = ev || window.event;self.clearMenu(ev);ac(ev,self);};
		};
	var c = $$("div",acName,"",menu.title);
		c.style.width = "100%";
		c.style.cursor = "pointer";
		c.unselectable = "on";
		c.tId = tag.id;
		if(menu.icon){
			c.style.backgroundImage ="url("+EHM.rootPath+menu.icon+")";
			c.style.backgroundRepeat ="no-repeat";
			c.style.backgroundPositionX  ="2px";
			c.style.backgroundPositionY  ="2px";
			}
		for (var k = 0; k < this.Relate.length; k++) {	var _k = this.Relate[k];c[_k] = tag[_k];}
		if (this.MenuItem[tag.id][acName] && cnd[menu["if"]] == true) {
			container.className = menu.mouseout;
			var ac = menu.action;
			var __click=new _click();
				__click.setAction(ac);
			addEvent(c, "click",__click.Do);
			addEvent(c, "mouseover", _mouseOver);
			addEvent(c, "mouseout", _mouseOut);
		} else {
			container.className = menu.undo;
			addEvent(c, "click", _clearMenu);
		}
		container.appendChild(c);
		
}
/*生成分隔符*/
ContextMenu.prototype.createSeparator = function(container,ev,tag,menu){
	var c = $$("div","","menu_TextMenu_separator");
	c.style.height="0px"
	container.appendChild(c);//.className="menu_TextMenu_separator";
	}
/*右键生成菜单*/
ContextMenu.prototype.showContextMenu = function (ev) {
	
	ev = ev || window.event;
	var self=this;
	var target = ev.target || ev.srcElement
	var width = 150, height = 0, lefter = ev.clientX, topper = ev.clientY, objson = this.MenuFun, bd = document.body;
	var w = bd.clientWidth;
	var h = (bd.clientHeight || document.documentElement.clientHeight);
	var th = $$("DIV","TextMenu",this.css);
	th.oncontextmenu = new Function("return false;");
	th.style.zIndex = 60000;

	
	for (var i in objson) {
		var menuData=objson[i];
		var mH = $$("DIV",i + "_mh","");
		if(menuData.title){this.createMenu(mH,ev,target,menuData,i);}
		else {this.createSeparator(mH,ev,target,menuData,i);}
		th.appendChild(mH);	
	}
	bd.appendChild(th);
	height = th.clientHeight;

	if (lefter + width > w) {
		lefter = w - width;
	}
	if ((topper + height) > h) {
		topper = h - height;
	} else {
		topper = topper;
	}
	topper = topper + bd.scrollTop;//  Math.max(,h)+'px';
	lefter = lefter + bd.scrollLeft;//  Math.max(,h)+'px';/**/
	th.style.top = Math.abs(topper-5)  + "px";
	th.style.left = Math.abs(lefter) + "px";
	return false;
};
ContextMenu.prototype.clearMenu = function (ev) {
	ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	if ($("TextMenu")) {
		if (!(ev.button == 1 && this.MenuFun["" + target.id])) {
			HW.dom.removeNode($("TextMenu"));
		}
	}
};
ContextMenu.prototype.invalid = function (obj, key) {
	var o = $(obj);
	this.MenuItem["" + o.id][key] = false;
};
/*初始化菜单项*/
ContextMenu.prototype.initMenuItem=function(mI){
	for (var _i = 0; _i < mI.length; _i++) {this.addContextTitle(mI[_i]);}
	};
/*初始化句柄*/
ContextMenu.prototype.initMenuFun=function(Arrays){
	for (var __i = 0; __i < Arrays.item.length; __i++) {
				this.addContextAction(Arrays.item[__i]);
			}
	};
/*组装并添加菜单至缓存中*/
ContextMenu.prototype.addContextTitle = function (it) {
	if(it.nodeName=="item"){
		var key=it.getAtt("action")
		this.MenuFun[key] = {};
		this.MenuFun[key]["action"] = null;
		for(var k in it.attributes){
			this.MenuFun[key][k]=it.getAtt(k);
			}
		}
	else{
		var key=(new Date()).valueOf()+parseInt(Math.random()*100);
		this.MenuFun[key] = {};
		}
};
/*组装并添加句柄方法至缓存中*/
ContextMenu.prototype.addContextAction = function (it) {

	this.MenuFun[it.getAtt("as")].action = EHM.eval(it.value);
	for (var _c in this.MenuItem) {
		this.MenuItem["" + _c][it.getAtt("as")] = true;
	}
};
ContextMenu.prototype.init = function (Xml) {
	var self = this;
	var cB = {success:function (responseText, responseXML) {
		try {
			var datas = new XmlDataStroe(responseXML);
			var roots=datas.root;
			var contextMenu = roots.contextMenu[0];
			
			var Arrays = roots.Array[0];
			self.initMenuItem(contextMenu.children);
			self.initMenuFun(Arrays);
			
			self.css = contextMenu.getAtt("css");
		}
		catch (e) {
		}
		responseXML = null;
		responseText = null;
	}, failure:function (status) {
		alert(status);
	}};
	var postFlag = "GET", postBody = null, serverAddress = Xml, psNum = 0;
	var exh = new SuperHandler();
	try{exh.request(postFlag, serverAddress, cB, psNum, postBody);}catch(e){}finally{exh = null;}

	var _clearMenu = function(ev){ev = ev || window.event;self.clearMenu(ev);	}
	addEvent(window.document, "mousedown", _clearMenu);
};
ContextMenu.prototype.setRelate = function (o) {
	this.Relate.push(o);
};
ContextMenu.prototype.register = function (obj) {
	if (obj.id) {
		this.MenuItem["" + obj.id] = {};
		this.tagCache["" + obj.id] =obj;
	} else {
		obj.id = EHM.randData;
		this.MenuItem["" + obj.id] = {};
	}
	for (var _c in this.MenuFun) {
		this.MenuItem["" + obj.id][_c] = true;
	}
};
ContextMenu.prototype.getTag=function(id){
        return this.tagCache[id];
    }
ContextMenu.prototype.draw = function (ev) {
	ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	if (this.MenuItem["" + target.id]) {
		this.showContextMenu(ev);
		return false;
	}
	return false;
};
ContextMenu.prototype.setBound = function (O) {
	var self=this;
	var _draw = function(ev){
		ev = ev || window.event;
		     
		return self.draw(ev);
	}
	addEvent(O, "contextmenu", _draw);
};

