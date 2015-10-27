/**
 * Title: Excel����ҳ�����js����
 * 
 * Description: Excel����
 * 
 * Copyright: Copyright (c) surekam 2008
 * 
 * Company: www.sureKam.com
 * 
 * Create Date: 2008-3-20
 * 
 * @author huangwei
 * @version 1.0
 */

function ExcelExport(baseURI){
	// ����Ӧ�õĸ�Ŀ¼
	this.baseURI = baseURI;
	// �������Ƽ�·��
	this.report = "";
	// �ӿ�����
	this.bean = "";
	// ������
	this.method = "";
	// ��������
	this.param = [];
	// ��ʼҳ
	this.startPage = "";
	// ����ҳ
	this.endPage = "";
	// ÿҳ����
	this.pageSize = "";
	// ������ɵ�url(��̨ʹ��,�ǽӿ�)
	this._url = "";
}

// ����Excel
ExcelExport.prototype.excel = function(){
	var error = this._generUrl();
	if(error !== ""){
		this._error(error);
	}else{
		window.location=this._url;
	}
};

// ����url
ExcelExport.prototype._generUrl = function(){
	var error = "";
	if(this.report == ""|| this.report == undefined)
		error = "δ���屨������";
	else if(this.bean == "")
		error = "δ��������Դ�ӿ�";
	else if(this.method == "")
		error = "δ��������Դ�ӿڷ���";
	else if(this.baseURI == "" || this.baseURI == undefined)
		error = "δ�����·��";
	if(error == ""){
		var url = this.baseURI+"/servlet/excelExport?report="+encodeURI(encodeURI(this.report))+"&bean="+this.bean+"&method="+this.method;
		if(this.startPage != ""&& this.startPage != undefined){
			url +="&startPage="+this.startPage;
		}
		if(this.endPage != ""&& this.endPage != undefined){
			url +="&endPage="+this.endPage;
		}
		if(this.pageSize != ""&& this.pageSize != undefined){
			url +="&pageSize="+this.pageSize;
		}
		var param = "";
		for(var i=0;i<this.param.length;i++){
			param += ",," + this.param[i][0] + "::" + encodeURI(encodeURI(this.param[i][1]));
		}
		if(param != ""){
			url += "&param="+param.substring(2);
		}
		// ���������ֹ����
		url += "&random=" + Math.random();
		this._url = url;
	}
	return error;
};

// ���������Ϣ
ExcelExport.prototype._error = function(error){
	if(this.field != ""){
		var field = document.all(this.field);
		field.innerHTML = "<font color='red'>"+error+"</font>";
	}else{
		var field = document.createElement("div");
		field.style.position = "absolute";
		field.innerHTML = "<font color='red'>"+error+"</font>";
		field.style.top="5px";
		field.style.left="5px";
		document.body.appendChild(field);
	}
};


