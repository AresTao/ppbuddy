/*ehm脚本库ehmbase zowell 2009211*/
window["undefined"]=window["undefined"];
Object.prototype.toString =function(){if(typeof this.constructor=="function") {return get_func_name_f(this);}};
function get_func_name_f(func_f)
{/* shawl.qiu code, return string, func: none */
  var r_ = /^function\s+([^()]+)[\s\S]*/;    
  var result_s = func_f.constructor.toString().replace(r_, "$1");
  return result_s;
}/* function get_func_fname_f(func_f) */
/*  
    版本：2009-2-10 
    作用：扩展function 的 method 方法，实现Function的扩展方法，
	并且使其能够在链式调用中使用
必填参数：name, fn
*/
Function.prototype.bind = function(obj) { var method = this, temp = function() { return method.apply(obj,arguments); }; return temp; } ;

Function.prototype.method = function(name, fn) { this.prototype[name] = fn; return this;};
Number.prototype.NaN0=function(){return isNaN(this)?0:this;};
Array.prototype.each=function(f){for(var i=0;i<this.length;i++)f(this[i],i,this)};
Array.prototype.remove=function(ob){
	for(var i=0;i<this.length;i++){
		if(this[i]==ob){
			var st=(i==0)?[]:this.slice(0,i);
			var ed=(i>=this.length)?[]:this.slice(i+1);
			var ss=st.concat(ed);
			return ss;
			}
		}
	return this;
	};
Array.prototype.insert=function(i,ob){
		i=i-1;
	if (i<0)i=0;
	if (i>this.length)i=this.length;
	var st=(i==0)?[]:this.slice(0,i);
		st.push(ob);
	var ed=(i>=this.length)?[]:this.slice(i);
	return st.concat(ed);
	};
	
String.prototype.trim = function(){	return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");};
String.prototype.format = function()
{
	if (arguments.length == 0) return this;
	for (var s = this, i = 0; i < arguments.length; i++)
		s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return s;
};
String.prototype.left = function(i)
{
	if (this.length > i) return this.substr(0,i)+"...";	
	return this;
};
/*内存优化*/
var purge= function (d) {    var a = d.attributes, i, l, n;    if (a) { l = a.length;for (i = 0; i < l; i += 1) {n = (parseInt(HW.IEV)>7)?a.getNamedItem("name"):a[i].name;if (typeof d[n] === 'function') {d[n] = null;} }}a = d.childNodes;if (a) {l = a.length;for (i = 0; i < l; i += 1) { purge(d.childNodes[i]);}}};
function gc(){CollectGarbage();}

/*日志显示*/
var EHM={
	randData:(new Date()).valueOf(),
	rootPath:(function(){
	var L = window.location;
	var SR=L.pathname
        if(SR.indexOf("/")>0) SR="/"+SR;
	return "/"+SR.split("\/")[1]+"resource/";
	})(),
	Cache:{},
	isRoot:(function(){ 
		var loc=location;
		var ro=loc.href.replace(loc.hostname,"").replace(loc.hash,"").replace(/http\:|\/|index.*?\.ml|\#hwtop|\#|shtml|html|\./gi,"");
		return (ro.trim().length==0);})(),
	isClass:(function(){var loc=location;var l=loc.href.replace(loc.hostname,"").replace(/http\:\/\/|index.*?\.ml|index|\#hwtop|\#|shtml|html|\./gi,"");var a=l.split("\/");return (l.indexOf("pd")>=0 && (!a[2]||a[2]==""))})(),
	isMode:(function(){
					 var a=["membercenter","memberscore","search","sytk","gywm","lxwm","liuyan","subsite"];
					 for(var i=0;i<a.length;i++){
						 if(location.href.indexOf(a[i])>=0)							{return true;}  }
					 return false;
					 })(),
	Import:function(url){
var sE=document.getElementsByTagName("script");
if(url.indexOf(EHM.rootPath)<0 && url.indexOf("jsp")<0 && url.indexOf("php")<0 && url.indexOf("\/")!=0){url=EHM.rootPath+url;}

if(url.indexOf("?")<0){url+="?"+EHM.randData;}else{url+="&"+EHM.randData;}		

if(sE && sE.length>0){for(var i=0,len=sE.length;i<len;i++){if(sE[i].src===url)return;}}
try{document.write("<scr"+"ipt type='text/javascript' src='"+url+"'></scr"+"ipt>");}catch(e){																										var script = document.createElement("script");
script.src = tmps[x];	script.type = "text/javascript";document.getElementsByTagName("head")[0].appendChild(script);	
}
return EHM;
},
	addCss:function (str){
	try{document.write("<style type='text/css'>"+str+"</style>");}catch(e){																							
	var style = document.createElement("style");
	style.innerHTML = str;	script.type = "text/css";	
	document.getElementsByTagName("head")[0].appendChild(script);																									}
	},
	ImportCss:function (url){
	if(url.indexOf(EHM.rootPath)<0){url=EHM.rootPath+url;}
	try{document.write("<link href=\""+url+"\" rel=\"stylesheet\" type=\"text/css\" />");}catch(e){																							
	var links = document.createElement("link");
	links.href = str;	links.rel = "stylesheet";	links.type = "text/css";
	document.getElementsByTagName("head")[0].appendChild(script);																									}
	},
	extend:function(subClass, superClass) {/* Extend function. */
	  var F = function() {};
	  F.prototype = superClass.prototype;
	  subClass.prototype = new F();
	  subClass.prototype.constructor = subClass;
	  subClass.superclass = superClass.prototype;
	  if(superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
  }
},
  request:new function(){
	  var L=window.location;
	  var _h=L.hash;/*“#”后面的分段。*/
	  var _hn=L.hostname;/* 主机名称部分。*/
	  var _pn=L.pathname;/* 对象指定的文件名或路径。*/
	  var _p=L.port;/*与 URL 关联的端口号码*/
	  var _pt=L.protocol;/*URL 的协议部分。*/
	  var _s=L.search;/*href 属性中跟在问号后面的部分*/
	  var _PArr=_s.replace(/\?/gi,"").split("&");
	  var _Pdic={};
	  for(var i=0;i<_PArr.length;i++){var K=_PArr[i].split("=");_Pdic[K[0]]=K[1];}
	  	this.getParameter=function(Str){
		  if(_Pdic[Str])
		  return _Pdic[Str];
		  else 
		  return null;
		  }
		 this.getHostName=function(){return _hn;};
		 this.getPathName=function(){return _pn;};
		 this.Port=function(){return _p;};
		 this.getProtocol=function(){return _pt;};
		 this.getMap=function(){return _h;};
	  },
using:function(p){ 
	p = p.split(/\s*\.\s*/g); 
	var m = window, d; 
	p.each(function(n){ 
	if(d) d += '.' + n; 
	  else d = n; 
	if(!m[n]) m[n] = { $name : d }; 
	m = m[n]; 
	}); 
	return m; 
	},
	eval:function(expr)
{
	var result=null;
	if(expr.indexOf('function')>=0&&(false||false||true||false))
	{
		try
		{
		eval('var _mxJavaScriptExpression='+expr);
		result=_mxJavaScriptExpression;
		delete _mxJavaScriptExpression;
		}
		catch(e)
		{
		mxLog.warn(e.message+' while evaluating '+expr);
		}
	}
	else
	{
	result=eval("("+expr+")");
	}
return result;
},
SuperFunction:{
	getFixID:function(/*String Boolean Number Object*/Str){
		if(isNaN(Str)) {return 0;}
		else{return parseInt(Str);}
		},
	getCharIn:function(char,a,b){
		
		var re=new RegExp(a+"([^-]*)"+b,"ig");
		var arr = re.exec(char);
alert(RegExp.$1);
		},
	escapeAt:function(s){return s.replace(/&/gi,"---");},
	unescapeAt:function(s){return s.replace(/---/gi,"&");}
	}	
	};
var Interface = function(name, methods) {/*Interface Constructor.*/
    if(arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length
          + "arguments, but expected exactly 2.");
    }
    
    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++) {
        if(typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " 
              + "passed in as a string.");
        }
        this.methods.push(methods[i]);        
    }    
};    

/*Static class method.*/ 

Interface.ensureImplements = function(object) {
    if(arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " + 
          arguments.length  + "arguments, but expected at least 2.");
    }

    for(var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if(interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments "   
              + "two and above to be instances of Interface.");
        }
        
        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if(!object.prototype[method] || typeof object.prototype[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object '" +
                arguments[0] + "' does not implement the " + interface.name 
                 + " interface. Method " + method + " was not found.");
            }
        }
    } 
};
EHM.Import("EHM/HWPackage.js");
EHM.Import("EHM/Ajax/Ajax.js").Import("EHM/data/DataStore.js").Import("EHM/util/event/DragDrop.js");//.Import("EHM/util/event/SKContextMenu.js");

/*
 - 加载相关类库 zowell@2009313

EHM.Import("EHM/util/cookie/cookie.js").Import("EHM/struts/Manager.js").Import("/webAjax/chklogin.jsp").Import("EHM/util/event/DragDrop.js").Import("EHM/util/event/event.js").Import("EHM/Toolkit/HWElements.js")

if (EHM.isRoot){
	EHM.Import("EHM/struts/ModeLoad.js").Import("EHM/HUIWEN/defaultSet.js").Import("EHM/Toolkit/Imglib.js").Import("EHM/Toolkit/Favorites.js");
	}
if (EHM.isClass){
	
	}

EHM.Import("EHM/Rss/Rss.js").Import("EHM/Toolkit/Weather.js").Import("EHM/Toolkit/chklogin.js");
*/
/* 搜索
EHM.Import("EHM/HUIWEN/search.js");
 *//*列表页

if (!EHM.isRoot&&!EHM.isClass&&!EHM.isMode){EHM.Import("EHM/HUIWEN/channel/page_meiti.js");}
*/
