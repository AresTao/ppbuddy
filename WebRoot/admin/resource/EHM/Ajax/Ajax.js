// JavaScript Document
//EHM的ajax包，含有超类SuperHandler和继承于他的业务小雷
//zowell@EHM 20081230
/* AjaxHandler interface. 定义ajax接口 为以后的ajax工厂做尊备*/
var ajaxErroLoc={
	"100":"客户必须继续发出请求","101":"客户要求服务器根据请求转换HTTP协议版本",
"200":"交易成功","201":"提示知道新文件的URL","202":"接受和处理、但处理未完成",
"203":"返回信息不确定或不完整","204":"请求收到，但返回信息为空","205":"服务器完成了请求，用户代理必须复位当前已经浏览过的文件","206":"服务器已经完成了部分用户的GET请求","300":"请求的资源可在多处得到","301":"删除请求数据","302":"在其他地址发现了请求数据","303":"建议客户访问其他URL或访问方式","304":"客户端已经执行了GET，但文件未变化","305":"请求的资源必须从服务器指定的地址得到","306":"前一版本HTTP中使用的代码，现行版本中不再使用","307":"申明请求的资源临时性删除","400":"错误请求，语法错误","401":"请求授权失败","402":"保留有效ChargeTo头响应","403":"请求不允许","404":"没有发现文件、查询或URl","405":"用户在Request-Line字段定义的方法不允许","406":"请求资源不可访问","407":"用户必须首先在代理服务器上得到授权","408":"客户端没有在用户指定的饿时间内完成请求","409":"对当前资源状态，请求不能完成","410":"服务器上不再有此资源且无进一步的参考地址","411":"服务器拒绝用户定义的Content-Length属性请求","412":"一个或多个请求头字段在当前请求中错误","413":"请求的资源大于服务器允许的大小","414":"请求的资源URL长于服务器允许的长度","415":"请求资源不支持请求项目格式","416":"请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求","417":"服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求","500":"服务器产生内部错误","501":"服务器不支持请求的函数","502":"服务器暂时不可用","503":"服务器过载或暂停维修","504":"关口过载","505":"服务器不支持或拒绝支请求头中指定的HTTP版本"};

var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXhrObject']);
/* SuperHandler class. ajax连接超类*/
var SuperHandler = function() {}; // implements AjaxHandler 实现AjaxHandler
SuperHandler.prototype = {
  request: function(method, url, callback, action, postVars) {
    var xhr = this.createXhrObject();
	var da=(new Date()).getTime();
	url=(url.indexOf("?")>=0)?(url+"&_data="+da):(url+"?_data="+da);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4){
		 (xhr.status == 200) ?  callback.success(xhr.responseText, xhr.responseXML) : callback.failure(xhr.status);  
		  }else{ return; }
     
    };
    xhr.open(method, url, true);
	switch (action){//发送模式 0 简单提交 return string 
		case 0:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}//发送模式 1 返回静态xml doc return xml 
		case 1:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');break;}//发送模式 1 获取静态doc return ?? 
		case 2:{xhr.setRequestHeader("Content-Type","text/xml"); break;}//发送模式 2 获取静态doc return  
		case 3:{break;}//发送模式 2 获取静态doc return ?? 
		default:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}
		}
    if(method !== 'POST') postVars = '';
	postVars=(postVars==null)?"":postVars;
    xhr.send(postVars);
  },
  createXhrObject: function() { // Factory method.
  /*备忘录的方法，以前好用不知道怎么回事就不好用了
    var methods = [
      function() { return new XMLHttpRequest(); },
      function() { return new ActiveXObject('Msxml2.XMLHTTP'); },
      function() { return new ActiveXObject('Microsoft.XMLHTTP'); }
    ];
    for(var i = 0, len = methods.length; i < len; i++) {
      try { methods[i]();}catch(e) {continue;}
      // If we reach this point, method[i] worked.
	  alert(typeof methods[i])
      this.createXhrObject = methods[i]; // Memoize the method.有意思的
      return methods[i];
    }*/
	
	if(window.XMLHttpRequest){var objXMLHttp = new XMLHttpRequest();}else{ 
var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP']; 
for(var n = 0;n < MSXML.length;n++){try{ var objXMLHttp = new ActiveXObject(MSXML[n]); break; }catch(e1){}} }
    // If we reach this point, none of the methods worked.
	if(objXMLHttp){
		
		return objXMLHttp;
		}else{
	throw new Error('SuperHandler: Could not create an XHR object.');	
		}
    
  } 
};
//特殊继承类
/* QueuedHandler class. 继承自ajax超类，用来缓存连接并发的ajax操作类*/

var QueuedHandler = function() { // implements AjaxHandler
  this.queue = [];
  this.maxParallel = 4;//最大并发数,max Parallel num
  this.requestInProgress = false;
  this.retryDelay = 5; // In seconds.
};
EHM.extend(QueuedHandler, SuperHandler);
QueuedHandler.prototype.request = function(method, url, callback, action, postVars, 
  override) {
  if(this.requestInProgress && !override ) {
    this.queue.push({ 
      method: method, 
	  action:action,
      url: url, 
      callback: callback, 
      postVars: postVars 
    });
  }
  else {
    this.requestInProgress = true;
    var xhr = this.createXhrObject();
    var that = this;
    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) return;
      if(xhr.status === 200) {
        callback.success(xhr.responseText, xhr.responseXML);
        that.advanceQueue();
      }
      else {
        callback.failure(xhr.status);
        setTimeout(function() { that.request(method, url, callback, action, postVars); }, 
          that.retryDelay * 1000);
      }
    };
	switch (action){//发送模式 0 简单提交 return string 
		case 0:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}//发送模式 1 返回静态xml doc return xml 
		case 1:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');break;}//发送模式 1 获取静态doc return ?? 
		case 2:{xhr.setRequestHeader("Content-Type","text/xml"); break;}//发送模式 2 获取静态doc return  
		case 3:{break;}//发送模式 2 获取静态doc return ?? 
		default:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}
		}
    xhr.open(method, url, true);
    if(method !== 'POST') postVars = null;
    xhr.send(postVars);    
  }
}; 
QueuedHandler.prototype.advanceQueue = function() {
  if(this.queue.length === 0) {//缓存务数据就澳停止
    this.requestInProgress = false;    
    return;
  }
  var req = this.queue.shift();
  this.request(req.method, req.url, req.callback, req.action, req.postVars, true);
};


/* OfflineHandler class. 离线连接类 。。还没完全做好*/

var OfflineHandler = function() { // implements AjaxHandler
  this.storedRequests = [];
};
EHM.extend(OfflineHandler, SuperHandler);
