// JavaScript Document
var $$frame = function(d) {
    this.data = d;
    this.components = {};
    this.x = 0;
    this.y = 0;
    this.isLock = false;
    this.parent = null;
    this.element = getEleByArg(d.getAtt("id"),d.getAtt("className"));
};
EHM.extend($$frame, $$module);

$$frame.prototype.changeLayout=function(o){
	var _id=o["id"];
	var _class=o["className"];
	this.data.setAtt("id",_id);
	this.element.id=_id;
	this.data.setAtt("className",_class);
	this.setClass(_class);
	};
	
$$frame.prototype.create=function(){
	var items=this.data.item;
	if(items)
		for(var i=0;i<items.length;i++){
			var it=items[i];
			this.addWidget(it,true)
			}
	}
$$frame.prototype.addWidget=function(it,isFrist){
	var widget=new $$widget(it);
	if(!!isFrist){
		this.add(widget,isFrist);
		}else{
		this.add(widget);
		}
	//
	}
$$frame.prototype.setData = function(d) {
    this.data = d;
    return this;
};
$$frame.prototype.getData = function(id) {
   return (!!id)?this.data[id]:this.data;
};
	//widget.Load(widget);
$$frame.prototype.Load = function() {
    for(var j in this.components){
		var wd=this.components[j];
		wd.Load(wd)
		}
};
$$frame.prototype.deleteWidget = function(wg) {
	var it=wg.getData()
	var arr=[];
	for(var j in this.components){
		if(j!=wg.getData().getAtt("id")){
			arr.push(this.components[j]);
			}
		}
	this.components={};
	for(var j=0;j<arr.length;j++){
		this.components[arr[j].getElement().id]=arr[j];
		}
	if(wg.parent.getData().getAtt("id")==this.getData().getAtt("id"))wg.parent=null;
   	HW.dom.removeNode(wg.getElement());
	var p=it.parent;
	p.Remove(it);
	return ;	
};
$$frame.prototype.removeWidget = function(wg) {
	
	var it=wg.getData();
	var arr=[];
	for(var j in this.components){
		if(j!=wg.getData().getAtt("id")){
			arr.push(this.components[j]);
			}
		}
	this.components={};
	for(var j=0;j<arr.length;j++){
		this.components[arr[j].getElement().id]=arr[j];
		}
	if(wg.parent.getData().getAtt("id")==this.getData().getAtt("id"))wg.parent=null;
	//this.removeComponents(wg.getElement().id);
	var p=it.parent;
	p.Remove(it);
	return ;	
};