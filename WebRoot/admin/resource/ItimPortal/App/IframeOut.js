// JavaScript Document

var IframeOut = new function() {
    var self=this;
    var createElement = function (type, name) {
        var element = null;
        try {
            element = document.createElement('<' + type + ' name="' + name + '">');
        } catch (e) { }
        if (!element) {
            element = document.createElement(type);
            element.name = name;
        }
        return element;
    }

    var getform = function (par) {
        var _fId = (new Date()).valueOf();
        var form = $$("form", _fId + "wiget_temp_form");
        form.style.display = "none";
        for (var k in par) {

            var iput = createElement("input", k);
            iput.type = "text";
            iput.value = par[k];
            form.appendChild(iput);
        }
        return form;
    }
    var getframe = function(name) {
        try {
            var iframe = document.createElement('<iframe name="' + name + '"></iframe>');
        } catch(e) {
            var iframe = document.createElement('iframe');
            iframe.name = name;
        }
        return  iframe;
    }
    this.load = function(M) {
        var C = $$("div");
        C.style.padding = "0px";
        C.style.margin = "0px";
        C.style.width = "100%";
        var _fId = (new Date()).valueOf();
        var ifWin = getframe(_fId);
        ifWin.id = _fId;
        var path = M.getData().load[0].path[0].value;

        var unset = (path.indexOf("@@@") != -1);
        if (unset) {//todo 搞该搞的地方
            path = "/portal/unset.jsp?widgetCode=" + M.getData().getAtt("id");
        }


        var rand = (new Date()).valueOf()
        path = (path.indexOf("?") >= 0) ? (path + "&randDate=" + rand) : (path + "?randDate=" + rand)
        path = path.replace(/_\*_/gi, "&");
        var ret = /^(http)/i;


        var height = M.getLoadPar("widget_height");//获取widgate指定的高度
        if (HW.IsMoz()) {
            ifWin.setAttribute("frameborder", 0);
            ifWin.setAttribute("scrolling", "no");
            ifWin.setAttribute("width", "98%");
            ifWin.setAttribute("height", (height ? height : "230px"));
        }
        else {
            ifWin.frameBorder = "0	";
            ifWin.scrolling = "no"
            ifWin.width = "98%";
            ifWin.height = (height ? height : "220px");
        }
        ifWin.style.border = "0px none"
        ifWin.style.padding = "0px"
        ifWin.style.margin = "0px"
        ifWin.style.overflow = "hidden"
        C.appendChild(ifWin)
        M.setT(C);
        var _path = (ret.exec(path)) ? (path) : (EHM.rootPath + path.split("?")[0]);
        var parMap = M.getLoadParameters();
        parMap["widgetCode"] = M.getData().getAtt("id");
      //  console.log(path)
        if (ret.exec(path))ifWin.src = _path;
        else if(path.length<300){
            self.Get(_path,parMap,ifWin)
        }else{
            self.Post(_path,parMap,ifWin)
        }

    };
    this.Post = function(url, par, frame) {
        frame.src = "";

        var form = getform(par)
        document.body.appendChild(form);
        form.method = "post";
        form.target = frame.name;
        form.action = url;
        form.submit()

        HW.dom.removeNode(form);
    }
    this.Get = function(url, par, frame) {
        var arr = [];
        for (var i in par) {
            arr.push(i + "=" + par[i]);
        }
        var path = url + "?" + arr.join("&");
        frame.src = path;
    }
    this.edit = PortalManager.widgetEdit;

};
