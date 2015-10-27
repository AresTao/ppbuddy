// JavaScript Document

var $$frames = function(container) {
    this.data = null;
    this.components = {};
    this.x = 0;
    this.y = 0;
    this.IsD = false;
    this.parent = null;
    this.element = $(container);
    this.Data = null;
	this.aopFun={after:{},before:{}};
};
EHM.extend($$frames, $$module);

	
$$frames.prototype.afterLoad=function(k,f){
		this.aopFun.after[k]=f;
		}
$$frames.prototype.load=function(url){
	var self=this;
	//console.log("beforeStart")
    var callBack = {
        success:function (responseText, responseXML) {
			if(""==responseText){alert("�����ʵ�portalҳ�治���ڡ�");return;}
            var datas = new XmlDataStroe(responseXML);
            self.setData(datas.root);
			//console.log("start")
			self.create();
            PortalManager.setTitle();
			/*��������*/
			for(var j in self.aopFun.after){self.aopFun.after[j](self);}
			//console.log("end")
        },
        failure:function(status) {
            alert("");
            return;
        }
    }
    var path = url;
    var postFlag = "GET"
    var postBody = "";
    var serverAddress = path;
    var psNum = 0;
    var exh = new SuperHandler();
    try {
        exh.request(postFlag, serverAddress, callBack, psNum, postBody);
    } catch(e) {
        alert("exh.request(" + postFlag + ", " + serverAddress + ",callBack," + psNum + " ," + postBody + " )");
    }
	finally{
		exh = null;
		}
};

$$frames.prototype.setContianer = function(container) {
    this.element = $(container);
}
$$frames.prototype.setData = function(d) {
    this.data = d;
};
$$frames.prototype.getData = function(){
	return this.data;
	}
$$frames.prototype.addWidget=function(obj){
	var frm=this.getMinFrame();
	frm.getData().Insert(obj)
	frm.addWidget(obj,true);
	}
$$frames.prototype.removeWidget=function(c){
	var w=this.getWidget(c);
	w.destory();
	}
$$frames.prototype.changeLayout =function(cls){
	this.data.setAtt("layout",cls.layout);		
	var c=cls,fms_L=this.getFrameDataList().length;
	if(c.columns.length>fms_L){this.changeLayout_(c.columns);}
	if(c.columns.length==fms_L){this._changeLayout_(c.columns);}
	if(c.columns.length<fms_L){this._changeLayout(c.columns);}

	}
$$frames.prototype.changeLayout_=function(columns){
		var i=0,F_C=[],C_C=[],fms=this.getChildNodes();
		EHMDragDrop.unRegisterF();
		for(var k in fms){C_C.push(k)}
		for(var l=0;l<C_C.length;l++){
				var F_M=this.getChild(C_C[l])
				var column=columns[i++]
				F_M.changeLayout(column);
				EHMDragDrop.RegisterF(F_M.getElement())
				this.components[F_M.getElement().id]=F_M;
				delete this.components[C_C[l]]
			}
		for(var j=i;j<columns.length;j++){
			var CLO=columns[j]
			var F_D=new HWNode();
				F_D.nodeName="frame";
				F_D.setAtt("id",CLO.id)
				F_D.setAtt("className",CLO.className);
				this.data.frames[0].add(F_D);
				this.createFrame(F_D);
				// id="mid" className="main_module_column"
			}
	}
$$frames.prototype._changeLayout_=function(columns){
		var i=0,F_C=[],C_C=[],fms=this.getChildNodes();
		EHMDragDrop.unRegisterF();
		
		for(var k in fms){C_C.push(k)}
		for(var l=0;l<C_C.length;l++){
				var F_M=this.getChild(C_C[l])
				var column=columns[l]
				F_M.changeLayout(column);
				EHMDragDrop.RegisterF(F_M.getElement())
				this.components[F_M.getElement().id]=F_M;
				delete this.components[C_C[l]]
			}
	}
$$frames.prototype._changeLayout=function(columns){
	var i=0,F_C=[],C_C=[],fms=this.getChildNodes(),_FL=this.getFrameDataList().length;
	for(var k in fms){C_C.push(k)}
	EHMDragDrop.unRegisterF()
		for(var l=0;l<C_C.length;l++){
			
			var F_M=this.getChild(C_C[l])
			if(i>=columns.length){F_C.push(F_M);F_M.isLock=true;}
			else{
				var column=columns[i++]
				F_M.changeLayout(column);
				EHMDragDrop.RegisterF(F_M.getElement())
				this.components[F_M.getElement().id]=F_M;
				delete this.components[C_C[l]]
				}
			}
		for(var j=0;j<F_C.length;j++){
			var o_f=F_C[j];
			var widgets=o_f.getChildNodes();
			for(var w in widgets){
				
				var _widget=widgets[w];
				var new_f=this.getMinFrame();
				var _widget_element=_widget.getElement();
				new_f.getElement().appendChild(_widget_element);
				this.insertAfter(new_f,_widget,null);
				}
			o_f.destroy()
			}
	}
$$frames.prototype.getMinFrame=function(){
	var ret=null,ind=99;
	var fms=this.getChildNodes();
		for(var k in fms){
			if(!fms[k].isLock){
				var wgt=fms[k].getData();
					if(!!!wgt.item)return fms[k];
					if(wgt.item.length<ind)
					{
						ret=fms[k];
						ind=wgt.item.length;
					}
				}
		
		}
	return ret;
	}
$$frames.prototype.getWidget = function(id){
	var fms=this.getChildNodes();
	for(var k in fms){
	var wgt=fms[k].getChild(id);
	if(!!wgt)return wgt;
	}
	return null;
	}
$$frames.prototype.getWidgetByCode = function(code){
	var fms=this.getChildNodes();
	for(var k in fms){
	var wgts=fms[k].getChildNodes();
	for(var l in wgts){
		if(wgts[l].widgetId==code)return wgts[l];
		}
	}
	return null;
	}
$$frames.prototype.getElement = function() {
    return this.element;
};
$$frames.prototype.getFrameDataList = function() {
    return this.data.frames[0].frame;
};
/*��ȡĳ���������ڿ�ܵ�λ��*/
$$frames.prototype.getIndex=function (Pobj,obj){/*�����������*/
	if(!obj)return null;
	for(var __i__=0,__le_=Pobj.item.length;__i__<__le_;__i__++)
	{if(Pobj.item[__i__]==obj)return __i__;}
	return null;
}
/*��ĳһ��widgt�ŵ��µ�frame��indxλ��*/
$$frames.prototype.insertWidget=function(Fm,/*$$module*/module,index) {
        var temparr = [];
        for (var _i in Fm.components) {temparr.push(Fm.components[_i]);}
		
		if(Fm.getData().item&&index>=Fm.getData().item.length){
			temparr=temparr.insert(index,module);
			}
		else{
		    temparr.push(module);
		}
        Fm.components = {};
        for (var _i = temparr.length-1; _i >=0; _i--) {
			Fm.components[temparr[_i].getData().getAtt("id")] = temparr[_i];}
		module.setParent(Fm);
	}
/*��insert�����ƶ���newFrame��ܵ�after����֮��*/
$$frames.prototype.insertAfter=function(newFrame,_widget,after){

	//�ҵ���Ҫ����Ŀ�ܵ�����ģ��
	var newFrameData=(!!after)?after.getData().parent:newFrame.getData();
	//���뵽after����ǰ���ҵ�after��������ڴ˿�ܵ�λ��
	var ind=(!!after)?(this.getIndex(newFrameData,after.getData())+1):(newFrame.getData().children.length+1);
	//��Ҫ������Ķ��������ģ��
	var d=_widget.getData();
	//�ҵ���Ҫ�����������ǰ�Ŀ��
	var oFrame=_widget.getParent();
	//����ǰ�Ŀ���� �Ȱѽ�Ҫ������Ķ����Ƴ�������ģ�ͺͶ���ģ�Ͳ���ʧ��
	oFrame.removeWidget(_widget)

	//���������Ķ����ǲ��뵽��ܵ����һ��
	this.insertWidget(newFrame,_widget,ind)
	if(newFrame.getData().item&&ind>newFrame.getData().item.length)	{
		newFrameData.add(d)
		}else{
		newFrame.setData(newFrameData.Insert(d,ind));	
		}
	
	
	//for(var k=0;k<newFrame.getData().item.length;k++)
	//console.log(newFrame.getData().item[k].title[0].value)
	//console.log("####################################")
//	console.log(">>>>>>>>>>>"+this.getWidget(insert.getData().getAtt("id")))
	};
/*�����ܽṹ*/	
$$frames.prototype.create = function() {
    var C = this.getElement();
    var frames = this.getFrameDataList();
    try{
		for (var __i = 0,__len = frames.length; __i < __len; __i++) {
			var _f = frames[__i];
			this.createFrame(_f)
 	   	}
    }catch(e){alert(e.description)}
	//console.log("beend")
	//this.Load();
};
/*�����ܽṹ*/	
$$frames.prototype.Load = function() {
    var fms=this.getChildNodes();
		for(var k in fms){	fms[k].Load();}

};
//
$$frames.prototype.createFrame=function(d){
		var FM = new $$frame(d);
			this.add(FM);
			FM.create();
           
			EHMDragDrop.RegisterF(FM.getElement());

            
	}
/*���������ܵ�����*/
$$frames.prototype.getXml=function(){
	//var frames = this.getFrameDataList();
	XMLDomStroe.setData(this.getData());
    return   XMLDomStroe.getXml();
}