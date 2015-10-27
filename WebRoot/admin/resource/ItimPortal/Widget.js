// JavaScript Document
/*模块头控件*/
var $$modulebar = function() {
    this.components = {};
    this.x = 0;
    this.y = 0;
    this.IsD = false;
    this.parent = null;
    this.element = getEleByArg.apply(this, arguments);
    HW.dom.unSelectable(this.element);
    return this;
};
EHM.extend($$modulebar, $$module);
/*模块头标题控件*/
var $$moduleTitle = function() {
    this.components = {};
    this.x = 0;
    this.y = 0;
    this.IsD = false;
    this.parent = null;
    this.element = getEleByArg.apply(this, arguments);
    HW.dom.unSelectable(this.element);
    return this;
};

EHM.extend($$moduleTitle, $$module);
$$moduleTitle.prototype.setT = function(t) {
    purge(this.element);
    HW.util.GC();
    if (typeof t === "object") {
        this.element.innerHTML = "";
        this.element.appendChild(t);
    }
    else {
        this.element.innerHTML = t;
        this.element.title = t;
    }

};
/*ToolBar Button*/
var $$modulebarButton = function() {

    this.components = {};
    this.x = 0;
    this.y = 0;
    this.parent = null;
    this.element = getEleByArg.apply(this, arguments);
    ;
    HW.dom.unSelectable(this.element);
    var self = this;
    this.addEvent("mouseover", function(ev) {
        self.mouseOver(ev);
    });
    this.addEvent("mouseout", function(ev) {
        self.mouseOut(ev);
    });
    this.addEvent("click", function(ev) {
        self.click(ev);
    });
    return this;
};
EHM.extend($$modulebarButton, $$modulebar);
$$modulebarButton.prototype.setEventClass = function(obj) {
    this.cssObj = obj;
}
$$modulebarButton.prototype.mouseOver = function(ev) {
    if (!!this.cssObj)this.setClass(this.cssObj["mouseover"])
}

$$modulebarButton.prototype.mouseOut = function(ev) {
    if (!!this.cssObj)this.setClass(this.cssObj["mouseout"])
}
$$modulebarButton.prototype.click = function(ev) {
    if (!!this.cssObj)this.setClass(this.cssObj["mouseon"])
}
$$modulebarButton.prototype.setTitle = function(t) {
    this.element.title = t;
}
/*模块内容控件*/
var $$moduleContent = function _$$moduleContent() {
    this.components = {};
    this.parent = null;
    this.element = getEleByArg.apply(this, arguments);
    ;
    this.action = null;
    var sel = this;
};
EHM.extend($$moduleContent, $$module);
/*外展load数据方法*/
$$moduleContent.prototype.setLoadAction = function(lo) {
    var meth = EHM.using(lo);
    this.action = this.action || {};
    this.action.LoadMethod = meth;
    return this;
};
$$moduleContent.prototype.Load = function(obj) {
    this.action.LoadMethod.load(obj);
};
$$moduleContent.prototype.Edit = function(obj) {
    this.action.LoadMethod.edit(obj);
};
$$moduleContent.prototype.setExtendFunAction = function(lo) {
    var meth = EHM.using(lo);
    this.action = this.action || {};
    this.action[lo] = meth;
    return this;
};
$$moduleContent.prototype.setT = function(t) {
    purge(this.element);
    HW.util.GC();
    this.element.style.height="";
    if (typeof t === "object") {
        this.element.innerHTML = "";
        this.element.appendChild(t);
    }
    else {
        this.element.innerHTML = t;
        this.element.title = t;
    }

};
/*--------------------------------------*/
/*模块工厂
 * 组合模块
 * */

var $$widget = function (d) {
    if (!(d instanceof HWNode)) {
        throw new Error("widget 构造失败，没有指定正确的数据格式");
    }

    var self = this;

    this.id = d.getAtt("id");
    this.widgetId = d.getAtt("widgetId");
    this.create();

    this.components = {};
    this.extendsObj = {};
    this.x = 0;
    this.y = 0;
    this.IsD = false;
    this.parent = null;
    this.element = this.Mo.getElement();
    this.data = d;
    this.EventListener = {};
    this.init();

};
EHM.extend($$widget, $$module);
/*获取已经注册的扩展事件*/
$$widget.prototype.getExtendsObj = function(id) {
    return this.extendsObj[id];
}
/*注册扩展事件*/
$$widget.prototype.addExtendsObj = function(key, value) {
    return this.extendsObj[key] = value;
}

/*构造框架模型*/
$$widget.prototype.createMo = function(id) {
    id = id || this.id;
    return new $$module(id, "module_wrapper");
}
/*获取框架模型*/
$$widget.prototype.getMo = function() {
    return this.Mo;
}

/*构造头部模型*/
$$widget.prototype.createMoBar = function(id) {
    id = id || this.id;
    var mb = new $$modulebar(id + "mobar", "module_wrapper_mobar");

    return mb;
}
$$widget.prototype.createTop = function(id) {
    id = id || this.id;
    var mb = new $$modulebar(id + "mobar", "module_wrapper_top");

    return mb;
}
/*获取头部模型*/
$$widget.prototype.getMoBar = function() {
    return this.MoBar;
}

/*构造标题模型*/
$$widget.prototype.createTitle = function(id) {
    id = id || this.id;
    return new $$moduleTitle(id + "mobartitle", "module_top_titlelefts");
}
/*获取标题模型*/
$$widget.prototype.getTitle = function() {
    return this.Title;
}

/*构造工具栏*/
$$widget.prototype.createToolBar = function(id) {
    id = id || this.id;
    return new $$module(id + "mobartool", "module_top_toolbar");
}
/*获取工具栏*/
$$widget.prototype.getToolBar = function() {
    return this.ToolBar;
}

/*构造内容框架*/
$$widget.prototype.createMoWin = function(id) {
    id = id || this.id;
    return new $$moduleContent(id + "mowin", "module_wrapper_middle");
}
$$widget.prototype.getMoWin = function() {
    return this.MoWin;
}
/**/
$$widget.prototype.createIcon = function(id) {
    id = id || this.id;
    return new $$module(id + "mowin", "module_top_ico");
}

/*构造底*/
$$widget.prototype.createMoBottom = function(id) {
    id = id || this.id;
    return new $$modulebar(id + "mobottom", "module_wrapper_bottom");
}
$$widget.prototype.getMoBottom = function() {
    return this.MoBottom;
}
/*
 公布接口
 设置标题
 */
$$widget.prototype.setName = function(t) {
    this.data.title[0].value = t
    this.setTitle(t);
    return this;
};
/*
 公布接口
 获取标题
 */
$$widget.prototype.getName = function(t) {
    return this.data.title[0].value;
};
/*
 公布接口
 设置标题
 */
$$widget.prototype.setTitle = function(t) {

    this.Title.setT(t);
    return this;
};
/*
 公布接口
 是否应用标题
 */
$$widget.prototype.useTitle = function(s) {
    return this;
};

/*
 接口依赖
 设置内容显示
 */
$$widget.prototype.setT = function(t) {
    this.MoWin.setT(t);
};
/*
 公布接口
 设置数据
 */
$$widget.prototype.setData = function(d) {
    this.data = d;
    return this;
};

/*获取数据*/
$$widget.prototype.getData = function(/*Dataname String*/dataname) {
    return (dataname) ? this.data[dataname] : this.data;
};

/*设置样式*/
$$widget.prototype.setStyle = function(sty) {
    return this;
};

/*缓存load方法*/
$$widget.prototype.setLoad = function(lo) {
    this.MoWin.setLoadAction(lo);
};
/*load方法*/
$$widget.prototype.Load = function(lo) {
    for(var k in PortalManager.aopFun.before){
        PortalManager.aopFun.before[k](this);
    }
    this.MoWin.Load(lo || this);
	
};
/*load方法*/
$$widget.prototype.Edit = function(lo) {
    this.MoWin.Edit(lo || this);
};
/*缓存其他外展方法*/
$$widget.prototype.setExtendFun = function(lo) {
    this.MoWin.setExtendFunAction(lo);
    return this;
};
$$widget.prototype.setClose = function(lo) {
    this.MoWin.setCloseAction(lo);
    return this;
};
$$widget.prototype.destory = function() {
    this.parent.deleteWidget(this);
    return null;
};
/*
 结构构造
 包含基本结构
 未设置显示数据
 */
$$widget.prototype.create = function() {
    /*构造*/
    this.Mo = this.createMo();
    this.Top = this.createTop();
    this.MoBar = this.createMoBar();
    this.icon = this.createIcon();
    this.Title = this.createTitle();
    this.ToolBar = this.createToolBar();
    this.MoWin = this.createMoWin();
    this.MoBottom = this.createMoBottom();

    /*组合*/

    //new $$moduleborder("mobd");
    var bd = new $$modulebar(this.id + "rnd_modtitle", "rnd_modtitle")
    bd.getElement().appendChild($$("b", "", "rnd1"))
    bd.getElement().appendChild($$("b", "", "rnd2"))
    bd.getElement().appendChild($$("b", "", "rnd3"))
    this.Top.add(bd)

    this.MoBar.add(this.icon);
    this.MoBar.add(this.Title);
    this.MoBar.add(this.ToolBar);
    //alert(this.id)
    this.Top.add(this.MoBar)

    this.Mo.add(this.Top);
    this.Mo.add(this.MoWin);
    this.Mo.add(this.MoBottom);
    return this;
};
$$widget.prototype.getLoadParameters = function() {
    /*href 属性中跟在问号后面的部分*/
    var p = this.getData().load[0].path[0].value
    var _s = (p.indexOf("?") >= 0) ? p.split("?")[1] : "";
    var _PArr = _s.replace(/\?/gi, "").split("&");
    var _Pdic = {};
    for (var i = 0; i < _PArr.length; i++) {
        var K = _PArr[i].split("=");
        _Pdic[K[0]] = K[1];
    }
    return _Pdic;
}
$$widget.prototype.getEditParameters = function() {
    /*href 属性中跟在问号后面的部分*/
    var p = this.data.edit[0].path[0].value;
    var _s = (p.indexOf("?") >= 0) ? p.split("?")[1] : "";
    var _PArr = _s.replace(/\?/gi, "").split("&");
    var _Pdic = {};
    for (var i = 0; i < _PArr.length; i++) {
        var K = _PArr[i].split("=");
        _Pdic[K[0]] = K[1];
    }
    return _Pdic;
}
$$widget.prototype.getLoadPar = function(pa) {
    var _Pdic = this.getLoadParameters()
    return _Pdic[pa];
}
$$widget.prototype.setLoadPar = function(key, value) {
    /*href 属性中跟在问号后面的部分*/
    var p = this.data.load[0].path[0].value;
    var _s = (p.indexOf("?") >= 0) ? p.split("?")[1] : "";
    var _PArr = (_s == "") ? [] : _s.replace(/\?/gi, "").split("&");
    var _Pdic = {};
    if (_PArr.length != 0) {
        for (var i = 0; i < _PArr.length; i++) {
            var K = _PArr[i].split("=");
            _Pdic[K[0]] = K[1];
        }
    }

    _Pdic[key] = value;
    var arrs = [];
    for (var k in _Pdic)arrs.push(k + "=" + _Pdic[k]);
    this.data.load[0].path[0].value = p.split("?")[0] + "?" + arrs.join("&");

}
$$widget.prototype.setEditorButton=function(show){
	var slef = this;
	 var editEvent = this.EventListener["edit"] = function(ev) {slef.Edit(slef);};
    if (show) {
        var editBt = new $$modulebarButton(this.id + "bt", "module_tools_edit_off");
        editBt.setTitle("编辑");
        editBt.setEventClass({mouseover:"module_tools_edit_over",mouseout:"module_tools_edit_off",mouseon:"module_tools_edit_on"});
        this.ToolBar.add(editBt);
        editBt.addEvent("click", editEvent);
    }
	}
/*
 初始化
 显示初始化
 功能挂接初始化
 外展方法初始化

 内容显示方法依赖于外展方法的反转
 */
$$widget.prototype.init = function() {
    this.data.load[0].path[0].value = this.data.load[0].path[0].value.replace(/_\*_/gi, "&");
    this.setLoad(this.data.load[0].action[0].value);
    var slef = this;
    this.Title.setT(this.data.title[0].value);

    var refreshEvent = this.EventListener["refresh"] = function(ev) {
        slef.Load(slef);
    };
    var editEvent = this.EventListener["edit"] = function(ev) {
        slef.Edit(slef);
    };
    var destoryEvent = this.EventListener["destory"] = function(ev) {
        if (window.confirm("是否要在本页面中移除 【" + slef.getName() + "】 挂件？"))slef.destory();
    }
	/*设置ICON*/
    var icon_path = this.data.ico[0].value;

    if (this.data.ico[0].value == "")
        icon_path="resource/style/global/images/desktop/a1.gif";

    var ti_style = this.icon.getElement().style;

    if (icon_path.toLowerCase().indexOf(".png") > 0 && !HW.IsMoz()) {

        ti_style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src='" + EHM.rootPath + "/" + icon_path + "')";
    }
    else {
        ti_style.backgroundImage = "url(" + EHM.rootPath + "/" + icon_path + ")"
    }


	
	
	/*设置删除按钮*/
    if (!!!this.data.getAtt("closeenable") || PortalManager.removeable) {
        var destoryBt = new $$modulebarButton(this.id + "bt", "module_tools_close_off");
        destoryBt.setEventClass({mouseover:"module_tools_close_over",mouseout:"module_tools_close_off",mouseon:"module_tools_close_on"})
        destoryBt.addEvent("click", destoryEvent);
        this.ToolBar.add(destoryBt);
    }
	
	/*设置编辑按钮*/
	var editCode = this.getData().edit;
	this.setEditorButton(editCode && editCode[0].path[0].value != "");

    var refreshBt = new $$modulebarButton(this.id + "bt", "module_tools_refresh_off");
    refreshBt.setEventClass({mouseover:"module_tools_refresh_over",mouseout:"module_tools_refresh_off",mouseon:"module_tools_refresh_on"});
    this.ToolBar.add(refreshBt);
    refreshBt.addEvent("click", refreshEvent);


    var bd2 = new $$modulebar(this.id + "rnd_modbt", "rnd_modtitle")
    bd2.getElement().appendChild($$("b", "", "rnd3"))
    bd2.getElement().appendChild($$("b", "", "rnd2"))
    bd2.getElement().appendChild($$("b", "", "rnd1"))
    this.MoBottom.add(bd2)

    var bootomBt = new $$modulebarButton(this.id + "bbt", "module_wrapper_bottom_on", "");
    this.ToolBar.add(bootomBt);
    HW.EventManager.module.PuPu.Register(bootomBt.getElement(), this.getMoWin().getElement())


    EHMDragDrop.Register(this.Title.getElement(), this.getElement());

	var hit=cookie.get(slef.getElement().id)
	slef.MoWin.getElement().style.height=((!!hit)?hit:200)+"px";
	
	window.setTimeout( function(){slef.Load(slef);cookie.set(slef.getElement().id,slef.MoWin.getElement().clientHeight)},1);
    //this.Load(this);
}