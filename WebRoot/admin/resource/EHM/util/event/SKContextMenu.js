var SKContextMenu=new function(){
	var MenuItem={}, MenuFun={},css="";
	var self=this;
	function addContextTitle(it){MenuFun[it.getAtt("action")]={title:it.getAtt("title"), mouseover: it.getAtt("mouseover"),mouseout:it.getAtt("mouseout"),undo:it.getAtt("undo"),action:null};}
	function addContextAction(it){
		MenuFun[it.getAtt("as")].action=EHM.eval(it.value);
		for(var _c in MenuItem){MenuItem[""+_c][it.getAtt("as")]=true;}
		}
	function mouseOut(ev){
				ev=ev||window.event;
		var target = ev.target || ev.srcElement;
			$(target.id).className=MenuFun[target.id].mouseout;
		}
		
	function mouseOver(ev){
		
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		for(var __i in MenuFun){
			if(MenuItem[target.tId][__i])
			$(__i).className=($(__i)==target)?MenuFun[__i].mouseover:MenuFun[__i].mouseout;
			}		
		}
	/*ÓÒ¼üÉú³É²Êµ©*/	
	function showContextMenu(ev){
	ev=ev||window.event;
	var target = ev.target || ev.srcElement;
	var width = 150,height = 0,lefter = ev.clientX,topper = ev.clientY,objson=MenuFun,bd=document.body;
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
			addEvent(c,"mouseover",mouseOver);
			addEvent(c,"mouseout",mouseOut);				
				}else{
			c.className=objson[i].undo;
			addEvent(c,"click",self.clearMenu);
			//addEvent(c,"mouseover",this.clearMenu);
			//addEvent(c,"mouseout",mouseOut);					
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
	
	this.clearMenu=function(ev){
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		if($("TextMenu"))
		{
		if(!(ev.button==1&&MenuFun[""+target.id])){
		HW.dom.removeNode($("TextMenu"));
			}
		}
		};	
	
	this.invalid=function(obj,key){
		var o=$(obj);
		MenuItem[""+o.id][key]=false;
		};
	
	(function(){
		var cB={
			success:function (responseText, responseXML){
			try{
				var datas=new XmlDataStroe(responseXML);
				var contextMenu=datas.root.contextMenu[0];
				css=contextMenu.getAtt("css");
				var SKContextMenu=datas.root.SKContextMenu[0];
				for(var _i=0;_i<contextMenu.item.length;_i++){
					addContextTitle(contextMenu.item[_i]);
				}
				for(var __i=0;__i<SKContextMenu.item.length;__i++){
					addContextAction(SKContextMenu.item[__i]);
				}
				}catch(e){}	
			responseXML=null;
			responseText=null;
			},
			failure:function(status){
			alert(status);
			}};
			var postFlag="GET";
			var postBody=null;
			var serverAddress =EHM.rootPath+"/resource/EHM/util/event/conf/SKContextMenu.xml";
			var psNum=0;
			var exh=new SuperHandler();
			exh.request(postFlag, serverAddress,cB, psNum, postBody);
			exh=null;	
			addEvent(window.document,"mousedown",self.clearMenu);
			  })()//init

	this.add=function(obj){
		if(obj.id){
			MenuItem[""+obj.id]={};}
			else {
				obj.id=EHM.randData;
				MenuItem[""+obj.id]={};
				}
						//console.print(it.getAtt("as"));
			for(var _c in MenuFun){MenuItem[""+obj.id][_c]=true;}
			}

    this.draw=function(ev){
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		if(MenuItem[""+target.id]){
			showContextMenu(ev);
			return false;
			}
			return false;
		}
	};

addEvent(window.document,"contextmenu",SKContextMenu.draw)