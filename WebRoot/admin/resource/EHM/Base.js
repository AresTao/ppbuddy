/*ehm�ű���ehmbase zowell 2009211*/
window["undefined"] = window["undefined"];




/*Array.prototype.some = function(fn, thisObj) {
 var scope = thisObj || window;
 for (var i = 0, j = this.length; i < j; ++i) {
 if (fn.call(scope, this[i], i, this)) {
 return true;
 }
 }
 return false;
 };
 */

/*�ڴ��Ż�*/
var purge = function (d) {
    if (!!!d)return;
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


/*��־��ʾ*/
var EHM_b = navigator.userAgent.toLowerCase();
var EHM = {
    iscache:true,
    randData:(new Date()).valueOf(),
    Cache:{},
    rootPath:(function(){
    var webName ="ppbuddy/admin";
	var L = window.location;
	var SR=L.pathname;
        if(SR.indexOf("/")>0) SR="/"+SR;
	//���й�����ʱ ��ȡ�������·����ƴ��url ����css ��js�ļ�
	var p = SR.split("\/");
	 //alert(p);
	//if(webName==p[1]) {
	//	return "/"+p[1];
	//} else {
		//��tomcat�����ع�����ʱ  ƴ��url ����css ��js�ļ� 
	//    return "";
	//}
	return "/"+webName;
	})(),
    appPath:"/resource/",
	browser :{
		safari: /webkit/.test(EHM_b),
		opera: /opera/.test(EHM_b),
		msie: /msie/.test(EHM_b) && !/opera/.test(EHM_b),
		mozilla: /mozilla/.test(EHM_b) && !/(compatible|webkit)/.test(EHM_b)
	},
    Import:function(url) {
        var sE = document.getElementsByTagName("script");
        //���й�����ʱ ��ȡ�������·����ƴ��url ����css ��js�ļ�
        if (url.indexOf(EHM.rootPath) < 0 && url.indexOf("jsp") < 0 && url.indexOf("php") < 0) {
        	 url = EHM.rootPath + ((url.indexOf("EHM") == 0) ? EHM.appPath : "") + url;
        } else if(EHM.rootPath=="" && url.indexOf("jsp") < 0 && url.indexOf("php") < 0){
        	//��tomcat�����ع�����ʱ  ƴ��url ����css ��js�ļ� 
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
        } else if (EHM.rootPath =="") {
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
	ImportWebIcon:function (url) {

        if (url.indexOf(EHM.rootPath) < 0) {
            url = EHM.rootPath + ((url.indexOf("EHM") == 0) ? EHM.appPath : "") + url;
        } else if (EHM.rootPath =="") {
        	url = EHM.rootPath + ((url.indexOf("EHM") == 0) ? EHM.appPath : "") + url;
        }

            try {
                document.write("<link href=\"" + url + "\" rel=\"Bookmark\" />");
				document.write("<link href=\"" + url + "\" rel=\"Shortcut Icon\" />");
            } catch(e) {
                var linksBookmark = document.createElement("link");
                linksBookmark.href = url;
                linksBookmark.rel = "Bookmark";
				
				var linksShortcut = document.createElement("link");
                linksShortcut.href = url;
                linksShortcut.rel = "Shortcut Icon";
				
                document.getElementsByTagName("head")[0].appendChild(links);
            }

        return EHM;
    },
    request:new function() {
        var L = window.location;
        var _h = L.hash;
        /*��#������ķֶΡ�*/
        var _hn = L.hostname;
        /* ������Ʋ��֡�*/
        var _pn = L.pathname;
        /* ����ָ�����ļ����·����*/
        var _p = L.port;
        /*�� URL �����Ķ˿ں���*/
        var _pt = L.protocol;
        /*URL ��Э�鲿�֡�*/
        var _s = L.search;
        /*href �����и����ʺź���Ĳ���*/
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

EHM.ImportXYTree = function(){
	EHM.ImportCss("/resource/xyTree/xtree.css").Import("/resource/xyTree/DivTree.js").Import("/resource/xyTree/Tree.js").Import("/resource/xyTree/Node.js");
};
/*ϵͳԲ�η�����չ*/
EHM.Import("EHM/util/prototypeOverRide/Date.js").Import("EHM/util/prototypeOverRide/Function.js").Import("EHM/util/prototypeOverRide/Number.js").Import("EHM/util/prototypeOverRide/Array.js").Import("EHM/util/prototypeOverRide/String.js");

EHM.Import("/resource/js/formValidate.js")
EHM.Import("/resource/js/common_validate.js")
EHM.Import("EHM/util/dom/domBase.js");

EHM.Import("EHM/Ajax/Ajax.js").Import("EHM/data/DataStore.js").Import("EHM/util/cookie/cookie.js").Import("EHM/util/dom/ChangeSkin.js");

/*�?Ч��*/
EHM.Import("EHM/Toolkit/tagEvent.js");

EHM.ImportWebIcon("EHM/css/favicon.ico");

