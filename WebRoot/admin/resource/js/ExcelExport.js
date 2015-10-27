/**
 * Title: Excel导出页面调用js函数
 * 
 * Description: Excel导出
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
	// 发布应用的根目录
	this.baseURI = baseURI;
	// 报表名称及路径
	this.report = "";
	// 接口名称
	this.bean = "";
	// 方法名
	this.method = "";
	// 方法参数
	this.param = [];
	// 开始页
	this.startPage = "";
	// 结束页
	this.endPage = "";
	// 每页条数
	this.pageSize = "";
	// 最后生成的url(后台使用,非接口)
	this._url = "";
}

// 生成Excel
ExcelExport.prototype.excel = function(){
	var error = this._generUrl();
	if(error !== ""){
		this._error(error);
	}else{
		window.location=this._url;
	}
};

// 生成url
ExcelExport.prototype._generUrl = function(){
	var error = "";
	if(this.report == ""|| this.report == undefined)
		error = "未定义报表名称";
	else if(this.bean == "")
		error = "未定义数据源接口";
	else if(this.method == "")
		error = "未定义数据源接口方法";
	else if(this.baseURI == "" || this.baseURI == undefined)
		error = "未定义根路径";
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
		// 加随机数防止缓存
		url += "&random=" + Math.random();
		this._url = url;
	}
	return error;
};

// 输出出错信息
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


