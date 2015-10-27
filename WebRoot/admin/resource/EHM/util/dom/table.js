// JavaScript Document
//这里封装了对表格table的操作
//zowell@ehm 20090115
window.EHM=window.EHM||{};
EHM.util=EHM.util||{};
EHM.util.dom=EHM.util.dom||{};
EHM.util.dom.table=EHM.util.dom.table||{
getParentObject:function (object, tag){
	var obj=object;
	while(obj!=null && obj.tagName!=tag){obj=obj.parentElement;}
	return obj;
},// 得到表格列数
getColCount:function (oTable) {
		var intCount = 0;
	if (oTable != null) {
		for(var i = 0; i < oTable.rows.length; i++){
			if (oTable.rows[i].cells.length > intCount) intCount = oTable.rows[i].cells.length;
		}
	}
	return intCount;
},// 得到所在第几列
getCellnum:function (otd){
	var rows=this.getParentObject(otd,"TR");
	for(var i=0,len=rows.cells.length;i<len;i++){
		if (rows.cells[i]==otd)return i;
		}
	return 0;
	},// 得到所在第几行
getRownum:function (otd){
	var table=this.getParentObject(otd,"TABLE");
	var row=otd.parentElement;
	for(var i=0,len=table.rows.length;i<len;i++){
		if (table.rows[i]==row)return i;
		}
	return 0;
	},
InsertCols:function ( obj ) {
	if(obj==null||typeof(obj)!="object"){return;}
	var otd=obj.otd;//td
	var oTable=this.getParentObject(otd,"TABLE");
	var flag=(obj.oflag==true);//left or right
	var cellcout=this.getCellnum(otd);
	if ( oTable ) {
		for(var i=0; i<oTable.rows.length; i++){
			var thisIndex=(flag)?((cellcout>0)?(cellcout):0):((cellcout<oTable.rows[i].cells.length)?(cellcout+1):-1)
			var elCell = oTable.rows[i].insertCell(thisIndex);
			elCell.innerHTML = "&nbsp;"
		}
	}
},// 设置样式
setCss:function ( obj,css ) {
	var s=EHM.util.dom.style;
		s.setCss(obj,css);
},//给本td所在列设置样式
setCellCss:function (obj) {
	var otd=obj.otd;
	var ocss=obj.ocss;
	var oTable=this.getParentObject(otd,"TABLE");
	var cellcout=this.getCellnum(otd);
	if ( oTable ) {
		for(var i=0; i<oTable.rows.length; i++){
			this.setCss(oTable.rows[i].cells[cellcout],ocss);
		}
	}
},//给本td所在行设置样式
setRowCss:function (obj) {
	var otd=obj.otd;
	var ocss=obj.ocss;
	var oTable=this.getParentObject(otd,"TABLE");
	var row=this.getRownum(otd);
	this.setCss(oTable.rows[row],ocss);
	if ( ocss.textAlign ) {
		var ocssV={"textAlign":ocss.textAlign};
		for(var i=0; i<oTable.rows[row].cells.length; i++){
		this.setCss(oTable.rows[row].cells[i],ocssV);
		}
	}
},// 删除行
DeleteRows:function ( oTable ) {
	if ( oTable ) {	oTable.deleteRow();	}
},// 删除列
DeleteCols:function ( oTable ) {
	if ( oTable ) {
		for(var i=0;i<oTable.rows.length;i++){
			oTable.rows[i].deleteCell();
		}
	}
}
};
