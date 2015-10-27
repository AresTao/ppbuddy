// JavaScript Document
EHM.Import("/resource/flash/chart/swfobject.js");
EHM.Import("EHM/util/event/DragDrop.js");
EHM.Import("EHM/util/event/event.js");
EHM.Import("/resource/ItimPortal/App/FlashOut.js");

EHM.Import("/resource/ItimPortal/App/ImageOut.js");
EHM.Import("/resource/ItimPortal/App/IframeOut.js");

EHM.Import("/resource/ItimPortal/Module.js");
EHM.Import("/resource/ItimPortal/Widget.js");
EHM.Import("/resource/ItimPortal/Frames.js");
EHM.Import("/resource/ItimPortal/Frame.js");
EHM.ImportMessageBox();
/*
 *	PortalManager
 *	portal管理类，用于portal页面的构造初始化和分发portal任务。
 *	zhangc 20100811
 */
var PortalManager = new function() {
    var self = this;
    this.frames = {};
    this.dissociateNode = null;
    this.removeable = true;
    this.saveOnChange = false;
    this.saveUrl = "";
    this.aopFun = {after:{},before:{}};
    this.afterLoad = function(k, f) {
        self.aopFun.after[k] = f;
    };
    this.beforeLoad = function(k, f) {
        self.aopFun.before[k] = f;
    };
    this.setSaveUrl = function(u) {
        self.saveUrl = u;
    };
    this.create = function(c, u) {
        self.loadLayOut();
        self.frames = new $$frames(c);
        /*代理切入到frames对象内部*/
        for (var j in self.aopFun.after) {
            self.frames.afterLoad(j, self.aopFun.after[j])
        }

        self.frames.load(u);
        if (self.saveOnChange) {
            var fun = $$widget.prototype.destory;
            $$widget.prototype.destory = function() {
                fun.call(this);
                /*方法切入*/
                self.save();
            }

        }
        EHMDragDrop.affixAction("mouseDown", self.setDissociateNode);
        EHMDragDrop.affixAction("mouseUp", self.insertAfter);
    };
    this.insertAfter = function(NewS, obj) {
        var after = (obj) ? self.frames.getWidget(obj.id) : null;
        var insert = self.frames.getWidget(self.dissociateNode.id);
        var newFrame = self.frames.getChild(NewS.id);
        self.frames.insertAfter(newFrame, insert, after);
        if (self.saveOnChange)self.save();
    };
    this.setTitle = function() {
        var d = self.frames.getData();
        var tit = d.title[0].value;
        if ($("bar_title")) $("bar_title").innerHTML = tit;
        if (d.getAtt("isUpdate") == "true") {
            var up_div = $("status_update");
            if (up_div) {

                up_div.style.display = "block";
                var U_D_T = $$("div", "", "line_innerleft", "模板已更新,<a href='javascript:' onclick='portalTempManager.reloadPortal()'>应用新模板?</a>");
                var U_D_R = $$("div", "", "line_innerright");
                var U_D_B = $$("img");
                U_D_B.src = "../resource/style/global/images/portal/pic_button_close.jpg";
                U_D_B.style.height = "10px";
                U_D_B.style.width = "11px";
                U_D_B.style.cursor = "pointer";
                addEvent(U_D_B, "click", function() {
                    HW.dom.removeNode(up_div)
                });
                U_D_R.appendChild(U_D_B);
                up_div.appendChild(U_D_T);
                up_div.appendChild(U_D_R);
            }
        }
    };
    this.addWidget = function(node) {
        /*代理frames生成widget*/
        var n = self.frames.addWidget(node);
        if (self.saveOnChange)self.save();
        return n;
    };
    this.removeWidgetByCode = function(code) {
        /*代理frames删除widget*/
        var w = this.getWidgetByCode(code);
        if (w) {
            w.destory();
        }
        if (self.saveOnChange)self.save();
        return null;
    };
    this.changeLayout = function(k) {
		if(self.frames.data.getAtt("layout")==k)return;

        self.frames.changeLayout(self.layout[k]);
        if (self.saveOnChange)self.save();
    };
    this.setDissociateNode = function (ac) {
        self.dissociateNode = ac.actionMo
    };
    this.getData = function() {
        return self.frames.getData();
    };
    this.getWidgetByCode = function(c) {
        return self.frames.getWidgetByCode(c);
    };
    this.getWidgetById = function(c) {
        return self.frames.getWidget(c);
    };
    this.getLayOutList = function() {
        return self.layout;
    };
    this.usedLayOut = function() {
        return self.frames.getData().getAtt("layout")
    };
    this.afterSave = function(n, fn) {
        self.afterSaveAction = self.afterSaveAction || {};
        self.afterSaveAction[n] = fn;
    };
    this.loadLayOut = function() {
        self.layout = {};
        self.layout["40282ef12a797cb6012a7980c97b0002"] = {layout:"40282ef12a797cb6012a7980c97b0002",icon:"/resource/style/global/images/portal/tab_layout_1column_1.gif",columns:
                [
                    {id:"1column_1_mid",className:"main_module_column_all"}
                ]};

        self.layout["40282ef12a8545d4012a855580dc0001"] = {layout:"40282ef12a8545d4012a855580dc0001",icon:"/resource/style/global/images/portal/tab_layout_2column_1.gif",columns:
                [
                    {id:"2column_1_left",className:"main_module_column_50"},
                    {id:"2column_1_right",className:"main_module_column_50"}
                ]};

        self.layout["40282ef12a8545d4012a8556eafb0002"] = {layout:"40282ef12a8545d4012a8556eafb0002",icon:"/resource/style/global/images/portal/tab_layout_2column_2.gif",columns:
                [
                    {id:"2column_2_left",className:"main_module_column_30"},
                    {id:"2column_2_right",className:"main_module_column_70"}
                ]};

        self.layout["40282ef12a8545d4012a855775690003"] = {layout:"40282ef12a8545d4012a855775690003",icon:"/resource/style/global/images/portal/tab_layout_2column_3.gif",columns:
                [
                    {id:"2column_3_left",className:"main_module_column_70"},
                    {id:"2column_3_right",className:"main_module_column_30"}
                ]};

        self.layout["40282ef12a8545d4012a8559634e0004"] = {layout:"40282ef12a8545d4012a8559634e0004",icon:"/resource/style/global/images/portal/tab_layout_3column_1.gif",columns:
                [
                    {id:"3column_1_left",className:"main_module_column"},
                    {id:"3column_1_mid",className:"main_module_column"},
                    {id:"3column_1_right",className:"main_module_column"}
                ]};

        self.layout["40282ef12a8545d4012a8559ab050005"] = {layout:"40282ef12a8545d4012a8559ab050005",icon:"/resource/style/global/images/portal/tab_layout_3column_2.gif",columns:
                [
                    {id:"3column_2_left",className:"main_module_column_25"},
                    {id:"3column_2_mid",className:"main_module_column_50"},
                    {id:"3column_2_right",className:"main_module_column_25"}
                ]}
    };
    this.save = function() {
        var callBack = {
            success:function (responseText, responseXML) {
                for (var j in self.afterSaveAction) {
   
                    var f = self.afterSaveAction[j];

                    f(responseText, responseXML);
                }

            },
            failure:function(status) {
                alert(status);
            }
        };
		
        var path = self.saveUrl;
        var postFlag = "POST";
        var xml = self.getXml();
        xml = xml.replace(/&/gi, "_*_");
		var xmls=encodeURI(encodeURI(xml))
        var postBody = "portalXml=" + xmls;

        var psNum = 1;
        var exh = new SuperHandler();
        try {

            exh.request(postFlag, path, callBack, psNum, postBody);
        }
        catch(e) {
            alert("exh.request(" + postFlag + ", " + path + ",callBack," + psNum + " ," + postBody + " )");
        }
        finally {
            exh = null;
        }
    };
    this.getXml = function() {
        return (self.frames.getXml());
    };
    this.getForm = function (par) {
        var _fId = (new Date()).valueOf();
        var form = $$("form",_fId+ "wiget_temp_form");
        form.style.display ="none";
        for (var k in par) {
            var iput = $$("input");
            iput.type = "text";
            iput.name = k;
            iput.value = par[k];
            form.appendChild(iput);
        }
        var iput = $$("input");
        iput.type = "submit";

        iput.value = "submit";
        form.appendChild(iput);
        return form;
    };
    this.widgetEdit = function(M) {
        var ifWin = document.createElement("iframe");
        var path = M.getData().edit[0].path[0].value;
        var rand = (new Date()).valueOf()

        var widgetCode = M.getData().getAtt("id");
        path = (path.indexOf("?") >= 0) ? (path + "&widgetCode=" + widgetCode + "&randDate=" + rand) : (path + "?randDate=" + rand + "&widgetCode=" + widgetCode);

        var ret = /http:\/\//gi;
        var newwin_index = path.indexOf("window:");

        if (newwin_index != -1) {
            path = path.substring(newwin_index + 7);
        }

        var src = (ret.test(path)) ? (path) : (EHM.rootPath + path);

        if (newwin_index != -1) {
            showPopWin('设置', "", 600, 420, null, true, true);
            src=src.split("?")[0];
           var parMap=M.getLoadParameters();
              parMap["widgetCode"]= M.getData().getAtt("id");
            var form = self.getForm(parMap)
            document.body.appendChild(form);
            form.method = "post";
            form.target = "popupFrame";
            form.action = src;
            form.submit()
            HW.dom.removeNode(form);
        }
        else {
            ifWin.src = src;
            if (HW.IsMoz()) {
                ifWin.setAttribute("frameborder", 0);
                ifWin.setAttribute("width", "100%");
                ifWin.setAttribute("height", "300px");
            }
            else {
                ifWin.frameBorder = 0;
                ifWin.width = "100%";
                ifWin.height = "300px";
            }
            M.setT(ifWin);
        }


    }

};
