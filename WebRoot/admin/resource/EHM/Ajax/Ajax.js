// JavaScript Document
//EHM��ajax�������г���SuperHandler�ͼ̳�������ҵ��С��
//zowell@EHM 20081230
/* AjaxHandler interface. ����ajax�ӿ� Ϊ�Ժ��ajax��������*/
var ajaxErroLoc={
	"100":"�ͻ����������������","101":"�ͻ�Ҫ���������������ת��HTTPЭ��汾",
"200":"���׳ɹ�","201":"��ʾ֪�����ļ���URL","202":"���ܺʹ���������δ���",
"203":"������Ϣ��ȷ��������","204":"�����յ�����������ϢΪ��","205":"����������������û�������븴λ��ǰ�Ѿ���������ļ�","206":"�������Ѿ�����˲����û���GET����","300":"�������Դ���ڶദ�õ�","301":"ɾ����������","302":"��������ַ��������������","303":"����ͻ���������URL����ʷ�ʽ","304":"�ͻ����Ѿ�ִ����GET�����ļ�δ�仯","305":"�������Դ����ӷ�����ָ���ĵ�ַ�õ�","306":"ǰһ�汾HTTP��ʹ�õĴ��룬���а汾�в���ʹ��","307":"�����������Դ��ʱ��ɾ��","400":"���������﷨����","401":"������Ȩʧ��","402":"������ЧChargeToͷ��Ӧ","403":"��������","404":"û�з����ļ�����ѯ��URl","405":"�û���Request-Line�ֶζ���ķ���������","406":"������Դ���ɷ���","407":"�û����������ڴ���������ϵõ���Ȩ","408":"�ͻ���û�����û�ָ���Ķ�ʱ�����������","409":"�Ե�ǰ��Դ״̬�����������","410":"�������ϲ����д���Դ���޽�һ���Ĳο���ַ","411":"�������ܾ��û������Content-Length��������","412":"һ����������ͷ�ֶ��ڵ�ǰ�����д���","413":"�������Դ���ڷ���������Ĵ�С","414":"�������ԴURL���ڷ���������ĳ���","415":"������Դ��֧��������Ŀ��ʽ","416":"�����а���Range����ͷ�ֶΣ��ڵ�ǰ������Դ��Χ��û��rangeָʾֵ������","417":"����������������Expectͷ�ֶ�ָ��������ֵ������Ǵ������������������һ��������������������","500":"�����������ڲ�����","501":"��������֧������ĺ���","502":"��������ʱ������","503":"���������ػ���ͣά��","504":"�ؿڹ���","505":"��������֧�ֻ�ܾ�֧����ͷ��ָ����HTTP�汾"};

var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXhrObject']);
/* SuperHandler class. ajax���ӳ���*/
var SuperHandler = function() {}; // implements AjaxHandler ʵ��AjaxHandler
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
	switch (action){//����ģʽ 0 ���ύ return string 
		case 0:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}//����ģʽ 1 ���ؾ�̬xml doc return xml 
		case 1:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');break;}//����ģʽ 1 ��ȡ��̬doc return ?? 
		case 2:{xhr.setRequestHeader("Content-Type","text/xml"); break;}//����ģʽ 2 ��ȡ��̬doc return  
		case 3:{break;}//����ģʽ 2 ��ȡ��̬doc return ?? 
		default:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}
		}
    if(method !== 'POST') postVars = '';
	postVars=(postVars==null)?"":postVars;
    xhr.send(postVars);
  },
  createXhrObject: function() { // Factory method.
  /*����¼�ķ�������ǰ���ò�֪����ô���¾Ͳ�������
    var methods = [
      function() { return new XMLHttpRequest(); },
      function() { return new ActiveXObject('Msxml2.XMLHTTP'); },
      function() { return new ActiveXObject('Microsoft.XMLHTTP'); }
    ];
    for(var i = 0, len = methods.length; i < len; i++) {
      try { methods[i]();}catch(e) {continue;}
      // If we reach this point, method[i] worked.
	  alert(typeof methods[i])
      this.createXhrObject = methods[i]; // Memoize the method.����˼��
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
//����̳���
/* QueuedHandler class. �̳���ajax���࣬�����������Ӳ�����ajax������*/

var QueuedHandler = function() { // implements AjaxHandler
  this.queue = [];
  this.maxParallel = 4;//��󲢷���,max Parallel num
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
	switch (action){//����ģʽ 0 ���ύ return string 
		case 0:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}//����ģʽ 1 ���ؾ�̬xml doc return xml 
		case 1:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');break;}//����ģʽ 1 ��ȡ��̬doc return ?? 
		case 2:{xhr.setRequestHeader("Content-Type","text/xml"); break;}//����ģʽ 2 ��ȡ��̬doc return  
		case 3:{break;}//����ģʽ 2 ��ȡ��̬doc return ?? 
		default:{xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');break;}
		}
    xhr.open(method, url, true);
    if(method !== 'POST') postVars = null;
    xhr.send(postVars);    
  }
}; 
QueuedHandler.prototype.advanceQueue = function() {
  if(this.queue.length === 0) {//���������ݾͰ�ֹͣ
    this.requestInProgress = false;    
    return;
  }
  var req = this.queue.shift();
  this.request(req.method, req.url, req.callback, req.action, req.postVars, true);
};


/* OfflineHandler class. ���������� ������û��ȫ����*/

var OfflineHandler = function() { // implements AjaxHandler
  this.storedRequests = [];
};
EHM.extend(OfflineHandler, SuperHandler);
