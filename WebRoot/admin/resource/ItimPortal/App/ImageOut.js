// JavaScript Document

var ImageOut = new function() {
    this.load = function(M) {
        var imge = $$("img");
        var path = M.getData().load[0].path[0].value;
        var rand = (new Date()).valueOf()
        path = (path.indexOf("?") >= 0) ? (path + "&randDate=" + rand) : (path + "?randDate=" + rand)

        if (path.indexOf("@@@") != -1) {//todo 搞到该去的地方
            path = "/portal/unset.jsp";
        }

        var ret = /http:\/\//gi;
        path = path.replace(/_\*_/gi, "&");
        imge.src = (ret.test(path)) ? (path) : (EHM.rootPath + path);
        imge.style.width = "100%"
        M.setT(imge);
    };
    this.edit = PortalManager.widgetEdit;

};
