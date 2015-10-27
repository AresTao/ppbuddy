/*
	配置型 右键菜单
	zowell 20100421 @sureKam
*/
var contextMenu= function(){
	this.MenuItem={};
	this.MenuFun={};
	this.css="";
	};
	
	contextMenu.prototype.addContextTitle=function (it){
		this.MenuFun[it.getAtt("action")]={title:it.getAtt("title"), mouseover: it.getAtt("mouseover"),mouseout:it.getAtt("mouseout"),undo:it.getAtt("undo"),action:null};
		};
		
	contextMenu.prototype.addContextAction=function (it){
		this.MenuFun[it.getAtt("as")].action=EHM.eval(it.value);
		for(var _c in this.MenuItem){this.MenuItem[""+_c][it.getAtt("as")]=true;}
		};
		
	contextMenu.prototype.mouseOut=function (ev){
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
			$(target.id).className=this.MenuFun[target.id].mouseout;
		};
		
	contextMenu.prototype.mouseOver=function (ev){
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		for(var __i in this.MenuFun){
			if(this.MenuItem[target.tId][__i])
			$(__i).className=($(__i)==target)?this.MenuFun[__i].mouseover:this.MenuFun[__i].mouseout;
			}		
		};
		
	contextMenu.prototype.showContextMenu=function (ev){/*右键生成彩旦*/
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		var width = 150,height = 0,lefter = ev.clientX,topper = ev.clientY,objson=this.MenuFun,bd=document.body;
		var th = $$('DIV');
			th.id="TextMenu"
			th.className=css;
			th.oncontextmenu=new Function("return false;")
			th.style.zIndex=60000		
			bd.appendChild(th)

		for(var i in objson){
		var menuHelper = $$('DIV');
			menuHelper.id=i+"_mh";
			menuHelper.title=objson[i].title
			var c=$$("div");
			c.style.width="100%";
			c.style.height="100%";
			c.style.cursor="hand";
			c.unselectable="on";
			c.innerHTML=objson[i].title;
			c.id=i;
			c.tId=target.id;
			if(MenuItem[target.id][i]){
			c.className=objson[i].mouseout;
			addEvent(c,"click",objson[i].action);
			addEvent(c,"mouseover",this.mouseOver);
			addEvent(c,"mouseout",this.mouseOut);				
				}else{
			c.className=objson[i].undo;
			addEvent(c,"click",this.clearMenu);					
			}
			menuHelper.appendChild(c);
			th.appendChild(menuHelper)	
					
		}
		height=th.clientHeight;	
	var w=document.body.clientWidth;
	var h=(document.body.clientHeight||document.documentElement.clientHeight);
	if(lefter+width > w) lefter=w-width;
	if((topper+height)>h){
		topper=h-height;
		}else{
			topper=topper;
			}

		topper=topper+bd.scrollTop;//  Math.max(,h)+'px';
		lefter=lefter+bd.scrollLeft;//  Math.max(,h)+'px';
		th.style.top=topper;
		th.style.left=lefter;

		return false;
	}
	
	contextMenu.prototype.clearMenu=function(ev){
			ev=ev||window.event;
			var target = ev.target || ev.srcElement;
			if($("TextMenu"))
			{
			if(!(ev.button==1&&this.MenuFun[""+target.id])){
			HW.dom.removeNode($("TextMenu"));
				}
			}
		};	
		/*使某个按钮失效*/
	contextMenu.prototype.invalid=function(obj,key){
		var o=$(obj);
		MenuItem[""+o.id][key]=false;
		};
		
	contextMenu.prototype.init=function(xml){
		var self=this;
		var cB={
			success:function (responseText, responseXML){
			try{
				var datas=new XmlDataStroe(responseXML);
				var contextMenu=datas.root.contextMenu[0];
				css=contextMenu.getAtt("css");
				var SKContextMenu=datas.root.SKContextMenu[0];
				for(var _i=0;_i<contextMenu.item.length;_i++){
					self.addContextTitle(contextMenu.item[_i]);
				}
				for(var __i=0;__i<SKContextMenu.item.length;__i++){
					self.addContextAction(SKContextMenu.item[__i]);
				}
				}catch(e){}	
			responseXML=null;
			responseText=null;
			},
			failure:function(status){
				load("/web/resource/EHM/util/event/conf/SKContextMenu.xml");
			}};
			function load(X){
				var postFlag="GET";
				var postBody=null;
				var serverAddress =X;
				var psNum=0;
				var exh=new SuperHandler();
				exh.request(postFlag, serverAddress,cB, psNum, postBody);
				exh=null;	
				}
			load(xml);
			addEvent(window.document,"mousedown",self.clearMenu);
			addEvent(window.document,"contextmenu",self.draw);
		};
		
	contextMenu.prototype.add=function(obj){
		if(obj.id){
			this.MenuItem[""+obj.id]={};}
			else {
				obj.id=EHM.randData;
				this.MenuItem[""+obj.id]={};
				}
			for(var _c in this.MenuFun){this.MenuItem[""+obj.id][_c]=true;}
			}
			
	contextMenu.prototype.draw=function(ev){
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		alert(this.MenuItem+""+target.id)
		if(this.MenuItem[""+target.id]){
			this.showContextMenu(ev);
			return false;
			}
			return false;
		}
