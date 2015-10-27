// JavaScript Document
/*ģ��ͷ�ؼ�*/
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
/*ģ��ͷ����ؼ�*/
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
/*ģ�����ݿؼ�*/
var $$moduleContent = function _$$moduleContent() {
    this.components = {};
    this.parent = null;
    this.element = getEleByArg.apply(this, arguments);
    ;
    this.action = null;
    var sel = this;
};
EHM.extend($$moduleContent, $$module);
/*��չload���ݷ���*/
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
/*ģ�鹤��
 * ���ģ��
 * */

var $$widget = function (d) {
    if (!(d instanceof HWNode)) {
        throw new Error("widget ����ʧ�ܣ�û��ָ����ȷ�����ݸ�ʽ");
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
/*��ȡ�Ѿ�ע�����չ�¼�*/
$$widget.prototype.getExtendsObj = function(id) {
    return this.extendsObj[id];
}
/*ע����չ�¼�*/
$$widget.prototype.addExtendsObj = function(key, value) {
    return this.extendsObj[key] = value;
}

/*������ģ��*/
$$widget.prototype.createMo = function(id) {
    id = id || this.id;
    return new $$module(id, "module_wrapper");
}
/*��ȡ���ģ��*/
$$widget.prototype.getMo = function() {
    return this.Mo;
}

/*����ͷ��ģ��*/
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
/*��ȡͷ��ģ��*/
$$widget.prototype.getMoBar = function() {
    return this.MoBar;
}

/*�������ģ��*/
$$widget.prototype.createTitle = function(id) {
    id = id || this.id;
    return new $$moduleTitle(id + "mobartitle", "module_top_titlelefts");
}
/*��ȡ����ģ��*/
$$widget.prototype.getTitle = function() {
    return this.Title;
}

/*���칤����*/
$$widget.prototype.createToolBar = function(id) {
    id = id || this.id;
    return new $$module(id + "mobartool", "module_top_toolbar");
}
/*��ȡ������*/
$$widget.prototype.getToolBar = function() {
    return this.ToolBar;
}

/*�������ݿ��*/
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

/*�����*/
$$widget.prototype.createMoBottom = function(id) {
    id = id || this.id;
    return new $$modulebar(id + "mobottom", "module_wrapper_bottom");
}
$$widget.prototype.getMoBottom = function() {
    return this.MoBottom;
}
/*
 �����ӿ�
 ���ñ���
 */
$$widget.prototype.setName = function(t) {
    this.data.title[0].value = t
    this.setTitle(t);
    return this;
};
/*
 �����ӿ�
 ��ȡ����
 */
$$widget.prototype.getName = function(t) {
    return this.data.title[0].value;
};
/*
 �����ӿ�
 ���ñ���
 */
$$widget.prototype.setTitle = function(t) {

    this.Title.setT(t);
    return this;
};
/*
 �����ӿ�
 �Ƿ�Ӧ�ñ���
 */
$$widget.prototype.useTitle = function(s) {
    return this;
};

/*
 �ӿ�����
 ����������ʾ
 */
$$widget.prototype.setT = function(t) {
    this.MoWin.setT(t);
};
/*
 �����ӿ�
 ��������
 */
$$widget.prototype.setData = function(d) {
    this.data = d;
    return this;
};

/*��ȡ����*/
$$widget.prototype.getData = function(/*Dataname String*/dataname) {
    return (dataname) ? this.data[dataname] : this.data;
};

/*������ʽ*/
$$widget.prototype.setStyle = function(sty) {
    return this;
};

/*����load����*/
$$widget.prototype.setLoad = function(lo) {
    this.MoWin.setLoadAction(lo);
};
/*load����*/
$$widget.prototype.Load = function(lo) {
    for(var k in PortalManager.aopFun.before){
        PortalManager.aopFun.before[k](this);
    }
    this.MoWin.Load(lo || this);
	
};
/*load����*/
$$widget.prototype.Edit = function(lo) {
    this.MoWin.Edit(lo || this);
};
/*����������չ����*/
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
 �ṹ����
 ���������ṹ
 δ������ʾ����
 */
$$widget.prototype.create = function() {
    /*����*/
    this.Mo = this.createMo();
    this.Top = this.createTop();
    this.MoBar = this.createMoBar();
    this.icon = this.createIcon();
    this.Title = this.createTitle();
    this.ToolBar = this.createToolBar();
    this.MoWin = this.createMoWin();
    this.MoBottom = this.createMoBottom();

    /*���*/

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
    /*href �����и����ʺź���Ĳ���*/
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
    /*href �����и����ʺź���Ĳ���*/
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
    /*href �����и����ʺź���Ĳ���*/
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
        editBt.setTitle("�༭");
        editBt.setEventClass({mouseover:"module_tools_edit_over",mouseout:"module_tools_edit_off",mouseon:"module_tools_edit_on"});
        this.ToolBar.add(editBt);
        editBt.addEvent("click", editEvent);
    }
	}
/*
 ��ʼ��
 ��ʾ��ʼ��
 ���ܹҽӳ�ʼ��
 ��չ������ʼ��

 ������ʾ������������չ�����ķ�ת
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
        if (window.confirm("�Ƿ�Ҫ�ڱ�ҳ�����Ƴ� ��" + slef.getName() + "�� �Ҽ���"))slef.destory();
    }
	/*����ICON*/
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


	
	
	/*����ɾ����ť*/
    if (!!!this.data.getAtt("closeenable") || PortalManager.removeable) {
        var destoryBt = new $$modulebarButton(this.id + "bt", "module_tools_close_off");
        destoryBt.setEventClass({mouseover:"module_tools_close_over",mouseout:"module_tools_close_off",mouseon:"module_tools_close_on"})
        destoryBt.addEvent("click", destoryEvent);
        this.ToolBar.add(destoryBt);
    }
	
	/*���ñ༭��ť*/
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