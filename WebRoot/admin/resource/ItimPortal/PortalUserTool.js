// JavaScript Document

/*
	选择wiget应用
	类别：插件
*/
var MakeWidget=new function(){
	var self=this;
	this.container;
	this.data={};
	this.button={};
	this.showTypeCode="";
	this.makeList=function(){
		var callBack = {
        success:function (responseText, responseXML) {
			//console.log(responseText);
            var datas = new XmlDataStroe(responseXML);
            var type=self.data=datas.root;
            self.createPart(type);
        },
        failure:function(status) {
            alert(status);
            return;
        }
    }
    var path = "getWidgets.do";
    var postFlag = "GET"
    var postBody = "";
    var serverAddress = path;
    var psNum = 1;
    var exh = new SuperHandler();
    try {
        exh.request(postFlag, serverAddress, callBack, psNum, postBody);
    } catch(e) {
        alert("exh.request(" + postFlag + ", " + serverAddress + ",callBack," + psNum + " ," + postBody + " )");
    }
	finally{
		exh = null;
		}	
	}
    
	this.setData=function(d){
	self.data=d;	
	};
	this.getItem=function(id){
		var widgetType=self.data.widgetType;
		
		if(widgetType){
			for(var i=0;i<widgetType.length;i++){
				var its=widgetType[i].item;
				if(its)
				for(var k=0;k<its.length;k++){
					var it=its[k];
					if(it.getAtt("id")==id)return it;
					}
				}
			}
		return null;
	}
	this.removeWidget=function(id){
		PortalManager.removeWidgetByCode(id);
        //console.log("remove===="+id);
		}
	this.addWidget=function(id){
        var it=self.getItem(id);
		if(it)
		PortalManager.addWidget(it)
		}
	this.getTypeByCode=function(code){
		var widgetType=self.data.widgetType;
		if(widgetType){
			for(var i=0;i<widgetType.length;i++){
			var tpe=widgetType[i];
			if(tpe.getAtt("code")==code)return tpe;
				}
			}
		return null;
		}
     this.createPart =function (root){
		 	self.showTypeCode="";
            var leftPart = $$("div","widget_main_win","widget_main_win");
            var ul = $$("ul","widget_title_container","widget_title_container");
			var rightPart = $$("div","widget_container","widget_container");
            	leftPart.appendChild(ul);
			this.container.appendChild(leftPart);
			this.container.appendChild(rightPart);


			var showWidget=function(ev){
				ev=ev||window.event;
				var target = ev.target || ev.srcElement;
				var types=self.data.widgetType;
				var widType=target.id.replace(/T#TYPE_/gi,"");
				var c=$("widget_container");
				var tpe=self.getTypeByCode(widType);
				
				for (i = 0; i < self.data.widgetType.length; i++){
					var tpe=self.data.widgetType[i];
					var code=tpe.getAtt("code");
					if(("T#TYPE_"+code)==target.id){
								
								self.data.widgetType[i].setAtt("checked",true);
								self.createWidget(c,tpe)
								$("T#TYPE_"+code).className="li_title";
						}else{
								
								self.data.widgetType[i].setAtt("checked",false);
								$("T#TYPE_"+code).className="li_title_current";
						}
			   }
			}
			 var mouseover=function(ev){
				ev=ev||window.event;
				var h = ev.target || ev.srcElement;
               		h.className="li_title"
				}
				
			   var mouseout=function(ev){
					ev=ev||window.event;
				var h = ev.target || ev.srcElement;
				var types=self.data.widgetType;
				
               	for (i = 0; i < types.length; i++){
						var tpe=types[i];
						var code=tpe.getAtt("code");
						if(!!!tpe.getAtt("checked")){$("T#TYPE_"+code).className="li_title_current";}
					}
				} 	
		if(root.widgetType){
			var types=root.widgetType;
			for(var i=0;i<types.length;i++){
				var tpe=types[i];
				var code=tpe.getAtt("code");
				var typeTit=tpe.title[0].value;
				var li = $$("li","T#TYPE_"+code,"li_title_current",typeTit);

				ul.appendChild(li);
 				
				addEvent(li,"mouseover",mouseover);
				addEvent(li,"mouseout",mouseout);
				addEvent(li,"click",showWidget);
				if(i==0){
					li.className="li_title";
					tpe.setAtt("checked",true);
					self.createWidget(rightPart,tpe)
					}else{tpe.setAtt("checked",false);}
				}
			}
     }
    //新增
    this.createWidget=function(c,tpe){
		var code=tpe.getAtt("code");
		if(self.showTypeCode==code)return ;
         var items = tpe.item;
		 c.innerHTML="";
		if(items)
        for(var i=0;i<items.length;i++){
		 var it=items[i];
		 c.appendChild(self.createItem(it));
        }
        self.showTypeCode=code;
    }
    this.createItem=function(item){
        self.container.style.display="block";
		if(self.data)
		{
			var it=item;
            var id= it.getAtt("widgetId");
            it.setAtt("id",id)
			var A=$$("div","A_"+id,"widget_select_mod")
			var B=$$("div","B_"+id,"widget_select_img");
				B.style.backgroundImage="url("+EHM.rootPath+it.logo[0].value+")";
				var s=new RegExp("/resource/style/global/images/portal","ig");
				if(B.style.backgroundImage.toString().match(s)==null){
					B.style.backgroundImage="url("+EHM.rootPath+"/resource/style/global/images/portal/icon_er.gif)";
				}
            	B.style.backgroundPosition='center';
				B.style.backgroundRepeat='no-repeat';
				B.onmouseover = function(){
					B.title=it.getAtt("widgetName");
				}
			var C=$$("div","C_"+id,"widget_select_bottom")
			var R=$$("div","R_"+id,"widget_select_radio")
			var T=$$("div","T_"+id,"widget_select_title",it.title[0].value.left(6))
            T.onmouseover = function(){
                T.title=it.getAtt("widgetName");
            }
			var rid=$$("input","r_"+id)
				rid.type="button";
				rid.className="btn10"
				rid.value="添加组件";
			var w=PortalManager.getWidgetByCode	(id);

			addEvent(rid,"click",function(ev){ev=ev||window.event;
        	var target = ev.target || ev.srcElement;
			var id=target.id.replace(/r_/gi,"")
			if(target.click)
			self.addWidget(id)
			//else
			//self.removeWidget(id)
			})

				C.appendChild(R)
				R.appendChild(rid)
				//C.appendChild(T)
				A.appendChild(B);
				A.appendChild(T)
				A.appendChild(C);
				self.container.appendChild(A);

				rid.checked=(!!w)?"checked":""
	    }

        return A;

    };
	this.show=function(url){
		self.container.style.display="block";
		self.container.innerHTML="";
		self.makeList();
    };
	this.hidden=function(){
        self.container.style.display="none";
    };
	this.setContainer=function(o){self.container=o;}
}





	/*
	布局管理插件
	类别：插件
	*/
	var LayOutManager=new function(){
		var self=this;
		this.container=null;
		this.checks={};
		
		this.changeLayout=function(t){
				PortalManager.changeLayout(t.id.replace(/C_D_/gi,""));
				for(var y in self.checks){
					self.checks[y].style.backgroundImage=self.checks[y].style.backgroundImage.replace("_highlight","");
					}
				t.style.backgroundImage=t.style.backgroundImage.replace(".gif","_highlight.gif");
			}
		this.create=function(){

			var lut=PortalManager.getLayOutList();
			var L=[{name:"1列",d:[]},{name:"2列",d:[]},{name:"3列",d:[]}]
			for(var j in lut){
				var v=lut[j].columns[0].id
				var k=parseInt(v.split("column_")[0]);
				L[k-1].d.push(lut[j]);
				}
			var used=PortalManager.usedLayOut();
			
			for(var h=0;h<L.length;h++){
				var _L=L[h].d
				var C=$$("div","C_C_"+h,"layout_mo");
				var V=$$("div","C_B_"+h,"layout_mo_title",L[h].name);
					C.appendChild(V);
				for(var t=0;t<_L.length;t++){
					var __L=_L[t];
					var _C=self.checks[__L.layout]=$$("div","C_D_"+__L.layout,"layout_sl","<br/>");
					var pic=__L.icon;
					if(used==__L.layout)pic=pic.replace(".gif","_highlight.gif");
					_C.style.backgroundImage='url('+EHM.rootPath+pic+')';
					_C.style.backgroundPosition='center right';
					_C.style.backgroundRepeat='no-repeat';
					_C.style.cursor ='pointer';
					addEvent(_C,"click",function(ev){ev=ev||window.event;
						var target = ev.target || ev.srcElement;
						self.changeLayout(target);})
						C.appendChild(_C);
					}
				self.container.appendChild(C);
				}
			}
		this.show=function(){
			self.container.innerHTML="";
			self.create();
			self.container.style.display="block"
			}
		this.setContainer=function(o){
			self.container=o;
			}
		this.hidden=function(){
			self.container.style.display="none"
			}
		}
/*
	属性管理插件
	类别：插件
	
var portalProperties=new function(){
	var self=this;
	this.container=null;
	this.setContainer=function(o){self.container=o}
	this.create=function(){
		var update_fun=function(){
			data.title[0].value=_name.value;
			data.ico[0].value=_icon.value;
			data.description[0].value=_desc.value;
            PortalManager.setTitle();
			}
		
		var data=PortalManager.getData();
		var A=$$("div","","portal_form");
		var A_1=$$("div","","portal_form01","<b>名称 </b>");

		var A_2=$$("div","","portal_form02");
			A.appendChild(A_1);
			A.appendChild(A_2);
		var _name=$$("input");
			_name.type="text";
			_name.className="input80";
			_name.value=data.title[0].value;
			_name.style.styleFloat="left"
			A_2.appendChild(_name);
		self.container.appendChild(A);
		
		var B=$$("div","","portal_form");
		var B_1=$$("div","","portal_form01","<b>预览图 </b>");

		var B_2=$$("div","","portal_form02");
			B.appendChild(B_1);
			B.appendChild(B_2);
		var _icon=$$("input");
			_icon.type="text";
			_icon.className="input80";
			_icon.value=data.ico[0].value;
			_icon.style.styleFloat="left"
			B_2.appendChild(_icon);
		self.container.appendChild(B);
		
		var C=$$("div","","portal_form");
		var C_1=$$("div","","portal_form01","<b>描述 </b>");

		var C_2=$$("div","","portal_form02");
			C.appendChild(C_1);
			C.appendChild(C_2);
		var _desc=$$("textarea");
			_desc.className="textarea80";
			_desc.value=data.description[0].value;
			_desc.style.styleFloat="left"
			C_2.appendChild(_desc);
		self.container.appendChild(C);
		
		var D=$$("div","","portal_form");

		var _update=$$("input");
			_update.type="button";
			_update.className="btn10";
			_update.value="更新";
			addEvent(_update,"click",update_fun)
			
			D.appendChild(_update);
		self.container.appendChild(D);
		}
	this.show=function(){
		
		self.container.innerHTML="";
		self.create();
		};
	this.hidden=function(){};
	}
	*/	
		
	/*	
	外展框架方法管理器
	类别：主程序
	*/	
var portalTempManager=new function(){
	var self=this;
	this.plugs={}
	this.plugs.layout={title:"选择布局",selected:false,plug:LayOutManager}
	this.plugs.widget={title:"添加部件",selected:false,plug:MakeWidget}
	/*this.plugs.properties={title:"portal属性",selected:false,plug:portalProperties}*/		
	this.isInit=false;
    this.portalCode=EHM.request.getParameter("portalCode");
	this.reloadPortal=function(){
		var callBack = {
        success:function (responseText, responseXML) {
			window.location.href="portal.do?portalCode="+self.portalCode;
             },
        failure:function(status) {
            alert(status);
            return;
        }
    	}
	var path = "reloadDefaultPortalInstance.do";
    var postFlag = "POST"
    var postBody = "code="+self.portalCode;
    var serverAddress = path;
    var psNum = 1;
    var exh = new SuperHandler();
    try {
        exh.request(postFlag, serverAddress, callBack, psNum, postBody);
    } catch(e) {
        alert("exh.request(" + postFlag + ", " + serverAddress + ",callBack," + psNum + " ," + postBody + " )");
    }
	finally{
		exh = null;
		}	
		}
	this.clickPoxy=function(ev){
			ev=ev||window.event;
			HW.util.GC();
        	var target = ev.target || ev.srcElement;
			var pulbId=target.id.replace(/_Bt/gi,"")
			if(self.plugs[pulbId].selected)return ;
			self.showView(pulbId)
		}
	this.showView=function(pulbId){
			for(var k in self.plugs){
				self.plugs[k].selected=false;
				self.plugs[k].button.className=self.plugs[k].button.className.replace("portal_set_left_bt_unselected","portal_set_left_bt_selected");
				}
			self.plugs[pulbId].selected=true;
			self.plugs[pulbId].plug.show();
			self.plugs[pulbId].button.className=self.plugs[pulbId].button.className.replace("portal_set_left_bt_selected","portal_set_left_bt_unselected");
		}
	this.hiddenSet=function(){HW.dom.removeLockScreen();}
    this.showSet=function(f){
		var setM=$$("div","","portal_set");
		var setL=$$("div","","portal_set_left");
		var setR=$$("div","","portal_set_right");

		
		for(var j in self.plugs){
			var plugObj=self.plugs[j]
			var plugBt=$$("div",j+"_Bt","portal_set_left_bt portal_set_left_bt_selected",plugObj.title);
				 setL.appendChild(plugBt)
				 HW.dom.unSelectable(plugBt);
				plugObj.plug.setContainer(setR);
				plugObj.button=plugBt;
				if(plugObj.selected){
					plugBt.className=plugBt.className.replace("portal_set_left_bt_unselected","portal_set_left_bt_selected");
					plugObj.plug.show();
					}
				addEvent(plugBt,"click",self.clickPoxy);
			}
			

	
		setM.appendChild(setL);
		setM.appendChild(setR);
        var o={title:"首页定制",el:setM}
        HW.dom.createFirm(o,f);
		if(!!!self.isInit){
			self.isInit=true;
			self.plugs.layout.selected=true;
		self.plugs.layout.button.className=self.plugs.layout.button.className.replace("portal_set_left_bt_selected","portal_set_left_bt_unselected")	
		self.plugs.layout.plug.show();	
			}
    }
}
addEvent(window,"load",function(){top.PortalSet.register(portalTempManager)});
addEvent(window,"beforeunload",function(){top.PortalSet.clean()});