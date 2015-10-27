/*ehm脚本库ehmbase zowell 2009211*/
window["undefined"] = window["undefined"];
//Object.prototype.toString = function() {
//    if (typeof this.constructor == "function") {
//        return get_func_name_f(this);
//    }
//};


String.prototype.trim = function() {
    return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
};
String.prototype.format = function()
{
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};
String.prototype.left = function(i)
{
    if (this.length > i) return this.substr(0, i) + "...";
    return this;
};
/*内存优化*/
var purge = function (d) {
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = (parseInt(HW.IEV) > 7) ? a.getNamedItem("name") : a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
};
function gc() {
    CollectGarbage();
}
/*日志显示*/
var EHM = {
    iscache:true,
    randData:(new Date()).valueOf(),
    Cache:{},
    rootPath:(function(){
	var L = window.location;
	var SR=L.pathname
	return "/"+SR.split("\/")[1];
	})(),
    appPath:"/resource/",
    Import:function(url) {
        var sE = document.getElementsByTagName("script");
        if (url.indexOf(EHM.rootPath) < 0 && url.indexOf("jsp") < 0 && url.indexOf("php") < 0) {
            url = EHM.rootPath + ((url.indexOf("EHM") == 0) ? EHM.appPath : "") + url;
        }
        if (!!EHM.iscache)
            if (url.indexOf("?") < 0) {
                url += "?" + EHM.randData;
            } else {
                url += "&" + EHM.randData;
            }
        if (sE && sE.length > 0) {
            for (var i = 0,len = sE.length; i < len; i++) {
                if (sE[i].src === url)return;
            }
        }
        try {
            document.write("<scr" + "ipt type='text/javascript' src='" + url + "'></scr" + "ipt>");
        } catch(e) {
            var script = document.createElement("script");
            script.src = tmps[x];
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
        }
        return EHM;
    },
    addCss:function (str) {
        try {
            document.write("<style type='text/css'>" + str + "</style>");
        } catch(e) {
            var style = document.createElement("style");
            style.innerHTML = str;
            style.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(style);
        }
        return EHM;
    },
    ImportCss:function (url) {

        if (url.indexOf(EHM.rootPath) < 0) {
            url = EHM.rootPath + ((url.indexOf("EHM") == 0) ? EHM.appPath : "") + url;
        }
        var urlArr = url.split("/");
        var id = urlArr[urlArr.length - 1].replace(/\./gi, "_");
        var olink = $(id);

        if (olink) {
            olink.href = url
        } else {
            try {
                document.write("<link href=\"" + url + "\" rel=\"stylesheet\" id=\"" + id + "\" type=\"text/css\" />");
            } catch(e) {
                var links = document.createElement("link");
                links.href = url;
                links.rel = "stylesheet";
                links.id = id;
                links.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(links);
            }
        }

        return EHM;
    },
    request:new function() {
        var L = window.location;
        var _h = L.hash;
        /*“#”后面的分段。*/
        var _hn = L.hostname;
        /* 主机名称部分。*/
        var _pn = L.pathname;
        /* 对象指定的文件名或路径。*/
        var _p = L.port;
        /*与 URL 关联的端口号码*/
        var _pt = L.protocol;
        /*URL 的协议部分。*/
        var _s = L.search;
        /*href 属性中跟在问号后面的部分*/
        var _PArr = _s.replace(/\?/gi, "").split("&");
        var _Pdic = {};
        for (var i = 0; i < _PArr.length; i++) {
            var K = _PArr[i].split("=");
            _Pdic[K[0]] = K[1];
        }
        this.getParameter = function(Str) {
            if (_Pdic[Str])
                return _Pdic[Str];
            else
                return null;
        }
        this.getHostName = function() {
            return _hn;
        };
        this.getPathName = function() {
            return _pn;
        };
        this.Port = function() {
            return _p;
        };
        this.getProtocol = function() {
            return _pt;
        };
        this.getMap = function() {
            return _h;
        };
    },
    extend:function(subClass, superClass) {/* Extend function. */
        var F = function() {
        };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    },
    using:function(p) {
        p = p.split(/\s*\.\s*/g);
        var m = window, d;
        p.each(function(n) {
            if (d) d += '.' + n;
            else d = n;
            if (!m[n]) m[n] = { $name : d };
            m = m[n];
        });
        return m;
    },
    eval:function(expr)
    {
        var result = null;
        if (expr.indexOf('function') >= 0 && (false || false || true || false))
        {
            try
            {
                eval('var _jexp=' + expr);
                result = _jexp;
                delete _jexp;
            }
            catch(e)
            {
                alert(e.message + ' while evaluating ' + expr);
            }
        }
        else
        {
            result = eval("(" + expr + ")");
        }
        return result;
    },
    SuperFunction:{
        getFixID:function(/*String Boolean Number Object*/Str) {
            if (isNaN(Str)) {
                return 0;
            }
            else {
                return parseInt(Str);
            }
        },
        escapeAt:function(s) {
            return s.replace(/&/gi, "---");
        },
        unescapeAt:function(s) {
            return s.replace(/---/gi, "&");
        }
    }
};

var Interface = function(name, methods) {/*Interface Constructor.*/
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length
                + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be "
                    + "passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};

/*Static class method.*/

Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " +
                arguments.length + "arguments, but expected at least 2.");
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments "
                    + "two and above to be instances of Interface.");
        }

        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object.prototype[method] || typeof object.prototype[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object '" +
                        arguments[0] + "' does not implement the " + interface.name
                        + " interface. Method " + method + " was not found.");
            }
        }
    }
};
var Ext_BLANK_IMAGE_URL = EHM.rootPath+"/resource/ext/resources/images/default/s.gif";


EHM.ImportDwrBase = function() {
    EHM.Import("/dwr/util.js").Import("/dwr/engine.js");
};
EHM.ImportExtBase = function() {
    EHM.Import("/resource/ext/ext-base.js").Import("/resource/ext/ext-all.js");
};
EHM.ImportMessageBox = function() {
    EHM.ImportCss("/resource/messagebox/css/subModal.css").Import("/resource/messagebox/js/common.js").Import("/resource/messagebox/js/subModal.js");
};
EHM.ImportCalendar =function(){
	EHM.ImportCss("/resource/calendar/skins/calendar-win2k-1.css").Import("/resource/calendar/calendar_zip.js");;
	};
EHM.ImportXTree = function() {
    EHM.ImportCss("/resource/xtree/xtree.css").Import("/resource/xtree/xtree.js").Import("/resource/xtree/xmlextras.js").Import("/resource/xtree/xloadtree.js");
};

EHM.Import("/resource/js/formValidate.js")
EHM.Import("/resource/js/common_validate.js")
EHM.Import("EHM/HWPackage.js");
EHM.Import("EHM/Ajax/Ajax.js").Import("EHM/data/DataStore.js").Import("EHM/util/cookie/cookie.js").Import("EHM/util/dom/ChangeSkin.js");