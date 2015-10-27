/**
 * Title: 图形报表页面调用js函数
 * 
 * Description: 图形报表
 * 
 * Copyright: Copyright (c) surekam 2008
 * 
 * Company: www.sureKam.com
 * 
 * Create Date: 2008-3-20
 * 
 * @author lixy
 * @version 1.0
 */

// 默认标题
var _CHART_DEFAULT_TITLE = "";
// 默认宽度640
var _CHART_DEFAULT_WIDTH = 640;
// 默认高度400
var _CHART_DEFAULT_HEIGHT = 400;
// 默认横坐标轴标题
var _CHART_DEFAULT_XLABEL = "";
// 默认纵坐标轴标题
var _CHART_DEFAULT_YLABEL = "";

var _CHART_DEFAULT_BORDER_COLOR = "ABC7EC";


function _Chart(baseURI,chartType){
	// 发布应用的根目录
	this.baseURI = baseURI;
	// 标题
	this.title = _CHART_DEFAULT_TITLE;
	// 宽度
	this.width = _CHART_DEFAULT_WIDTH;
	// 高度
	this.height = _CHART_DEFAULT_HEIGHT;
	// 横坐标轴标题
	this.xLabel = _CHART_DEFAULT_XLABEL;
	// 纵坐标轴标题
	this.yLabel = _CHART_DEFAULT_YLABEL;
    this.border_color = _CHART_DEFAULT_BORDER_COLOR;
	// 折线：straight，曲线：curve
	this.lineType = "straight";
	// 图表类型 饼图：piechart...
	this.chartType = chartType;
	// 生成数据源的业务接口 spring + 方法名 小数点分割
	this.dataset = "";
	// 业务参数
	this.bizparam = [];
    this.chartparam = [];

	// 时间精度(时间序列图专用):year,month,day,hour,minute,second
	this.timeBasis = "";
	// 时间轴类型(时间序列图专用):year,month,day,hour,minute,second
	this.timeType = "";
	// 时间轴最小值(时间序列图专用)
	this.timeMin = "";
	// 时间轴最大值(时间序列图专用)
	this.timeMax = "";
	// 横坐标轴时间格式化格式(时间序列图专用):yyyy-MM-dd HH:mm:ss
	this.timeFormat = "";
	// 坐标值上限
	this.upperBound = "";


	// 页面用来显示图表的div的id
	this.field = "";
	// 最后生成的url(后台使用,非接口)
	this._url = "";
}

// 饼图
function PieChart(baseURI){
	return new _Chart(baseURI,"pieChart");
}
// 柱状图
function CategoryChart(baseURI){
	return new _Chart(baseURI,"categoryChart");
}
// 线图
function LineChart(baseURI){
	return new _Chart(baseURI,"lineChart");
}
// XY线图
function XYLineChart(baseURI){
	return new _Chart(baseURI,"xyLineChart");
}
// 时间序列图
function TimeSeriesChart(baseURI){
	return new _Chart(baseURI,"timeSeriesChart");
}
// 时序叠加图
function SuperposedChart(baseURI){
	return new _Chart(baseURI,"superposedChart");
}
// 叠加图
function StackedAreaChart(baseURI){
	return new _Chart(baseURI,"stackedAreaChart");
}
// 甘特图
function GanttChart(baseURI){
	return new _Chart(baseURI,"ganttChart");
}

// 生成图片
_Chart.prototype.image = function(){
	var error = this._generUrl();

	if(error !== ""){
		this._error(error);
	}else{
		this._url += "&out=image";
		var field = document.all(this.field);
		field.innerHTML = "";
		var img = document.createElement("img");
		img.src = this._url;
		img.width = this.width;
		img.height = this.height;
		field.appendChild(img);
	}
};

// 生成pdf
_Chart.prototype.pdf = function(){
	var error = this._generUrl();
	if(error !== ""){
		this._error(error);
	}else{
		this._url += "&out=pdf";
		document.location = this._url;
	}
};

// 生成excel
_Chart.prototype.excel = function(){
	var error = this._generUrl();
	if(error !== ""){
		this._error(error);
	}else{
		this._url += "&out=excel";
        document.location = this._url;
	}
};

//构造url
_Chart.prototype._generUrl = function(){
	var error = "";
	if(this.chartType == ""|| this.chartType == undefined)
		error = "未定义图表类型";
	else if(this.dataset == "")
		error = "未定义数据源接口";
	else if(this.field == "" || !document.all(this.field))
		error = "未定义显示图表的区域";
	else if(this.baseURI == "" || this.baseURI == undefined)
		error = "未定义根路径";
	if(error == ""){
		var url = this.baseURI+"/servlet/chart?dataset="+this.dataset;

        var chartparam = "";
		for(var i=0;i<this.chartparam.length;i++){
			chartparam += ",," + this.chartparam[i][0] + "::" + encodeURI(encodeURI(this.chartparam[i][1]));
		}
        if(bizparam != "")
            chartparam +=",,";
		chartparam += "title::"+encodeURI(encodeURI(this.title));
		chartparam += ",,xLabel::"+encodeURI(encodeURI(this.xLabel));
		chartparam += ",,yLabel::"+encodeURI(encodeURI(this.yLabel));
        chartparam += ",,width::"+this.width;
        chartparam += ",,height::"+this.height;
		chartparam += ",,lineType::"+this.lineType;
		chartparam += ",,chartType::"+this.chartType;
        chartparam += ",,border_color::"+this.border_color;
		chartparam += ",,upperBound::"+this.upperBound;
		chartparam += ",,timeBasis::"+this.timeBasis;
		chartparam += ",,timeFormat::"+encodeURI(encodeURI(this.timeFormat));
		chartparam += ",,timeType::"+this.timeType;
		chartparam += ",,timeMin::"+encodeURI(encodeURI(this.timeMin));
		chartparam += ",,timeMax::"+encodeURI(encodeURI(this.timeMax));
		url += "&chartparam="+chartparam;
		
		var bizparam = "";
		for(var i=0;i<this.bizparam.length;i++){
			bizparam += ",," + this.bizparam[i][0] + "::" + encodeURI(encodeURI(this.bizparam[i][1]));
		}
		if(bizparam != "")
			url += "&bizparam="+bizparam.substring(2);
		this._url = url;
	}
	return error;
};

// 输出出错信息
_Chart.prototype._error = function(error){
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


