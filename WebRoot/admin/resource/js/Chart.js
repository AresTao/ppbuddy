/**
 * Title: ͼ�α���ҳ�����js����
 * 
 * Description: ͼ�α���
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

// Ĭ�ϱ���
var _CHART_DEFAULT_TITLE = "";
// Ĭ�Ͽ��640
var _CHART_DEFAULT_WIDTH = 640;
// Ĭ�ϸ߶�400
var _CHART_DEFAULT_HEIGHT = 400;
// Ĭ�Ϻ����������
var _CHART_DEFAULT_XLABEL = "";
// Ĭ�������������
var _CHART_DEFAULT_YLABEL = "";

var _CHART_DEFAULT_BORDER_COLOR = "ABC7EC";


function _Chart(baseURI,chartType){
	// ����Ӧ�õĸ�Ŀ¼
	this.baseURI = baseURI;
	// ����
	this.title = _CHART_DEFAULT_TITLE;
	// ���
	this.width = _CHART_DEFAULT_WIDTH;
	// �߶�
	this.height = _CHART_DEFAULT_HEIGHT;
	// �����������
	this.xLabel = _CHART_DEFAULT_XLABEL;
	// �����������
	this.yLabel = _CHART_DEFAULT_YLABEL;
    this.border_color = _CHART_DEFAULT_BORDER_COLOR;
	// ���ߣ�straight�����ߣ�curve
	this.lineType = "straight";
	// ͼ������ ��ͼ��piechart...
	this.chartType = chartType;
	// ��������Դ��ҵ��ӿ� spring + ������ С����ָ�
	this.dataset = "";
	// ҵ�����
	this.bizparam = [];
    this.chartparam = [];

	// ʱ�侫��(ʱ������ͼר��):year,month,day,hour,minute,second
	this.timeBasis = "";
	// ʱ��������(ʱ������ͼר��):year,month,day,hour,minute,second
	this.timeType = "";
	// ʱ������Сֵ(ʱ������ͼר��)
	this.timeMin = "";
	// ʱ�������ֵ(ʱ������ͼר��)
	this.timeMax = "";
	// ��������ʱ���ʽ����ʽ(ʱ������ͼר��):yyyy-MM-dd HH:mm:ss
	this.timeFormat = "";
	// ����ֵ����
	this.upperBound = "";


	// ҳ��������ʾͼ���div��id
	this.field = "";
	// ������ɵ�url(��̨ʹ��,�ǽӿ�)
	this._url = "";
}

// ��ͼ
function PieChart(baseURI){
	return new _Chart(baseURI,"pieChart");
}
// ��״ͼ
function CategoryChart(baseURI){
	return new _Chart(baseURI,"categoryChart");
}
// ��ͼ
function LineChart(baseURI){
	return new _Chart(baseURI,"lineChart");
}
// XY��ͼ
function XYLineChart(baseURI){
	return new _Chart(baseURI,"xyLineChart");
}
// ʱ������ͼ
function TimeSeriesChart(baseURI){
	return new _Chart(baseURI,"timeSeriesChart");
}
// ʱ�����ͼ
function SuperposedChart(baseURI){
	return new _Chart(baseURI,"superposedChart");
}
// ����ͼ
function StackedAreaChart(baseURI){
	return new _Chart(baseURI,"stackedAreaChart");
}
// ����ͼ
function GanttChart(baseURI){
	return new _Chart(baseURI,"ganttChart");
}

// ����ͼƬ
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

// ����pdf
_Chart.prototype.pdf = function(){
	var error = this._generUrl();
	if(error !== ""){
		this._error(error);
	}else{
		this._url += "&out=pdf";
		document.location = this._url;
	}
};

// ����excel
_Chart.prototype.excel = function(){
	var error = this._generUrl();
	if(error !== ""){
		this._error(error);
	}else{
		this._url += "&out=excel";
        document.location = this._url;
	}
};

//����url
_Chart.prototype._generUrl = function(){
	var error = "";
	if(this.chartType == ""|| this.chartType == undefined)
		error = "δ����ͼ������";
	else if(this.dataset == "")
		error = "δ��������Դ�ӿ�";
	else if(this.field == "" || !document.all(this.field))
		error = "δ������ʾͼ�������";
	else if(this.baseURI == "" || this.baseURI == undefined)
		error = "δ�����·��";
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

// ���������Ϣ
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


