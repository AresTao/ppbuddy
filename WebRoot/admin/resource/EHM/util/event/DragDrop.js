/*EHMDragDrop��קģ�飬
�����һ�汾���ִ����Ż�����ģ�鵥�廰��������ע����ơ�
װ�ش�ģ���ʱ����װ������ק���ܡ�ʵ������קģ�������ҵ��ģ���Ķ�����
��Ҫʵ��һ���ؼ�����ק��ֻ��Ҫ������ؼ�������Ӧ�ؼ�ע�ᵽ��ģ���С�
���巽����
EHMDragDrop.Register(handleMod,actionMod);
--handleMod--  ����ؼ���dom div..��
--actionMod--  ����Ӧ�ؼ���dom div..������
var 
�����¼�������
EHMDragDrop.affixAction(actionName,actionMethod);
ex:EHMDragDrop.affixAction("mouseDown",function(){alert('1');});��mouseDown�¼���Ӧ���ʱ����
zowell 2009-2-16
*/

var EHMDragDrop={
	ParentFrame:{},//���
	FrameHeight:0,//��ܸ߶�
	curTarget:null,//��ǰ����ק�Ķ���
	dragHelper:{w:0,h:0,element:null},//ʢ�ű���ק�����div����
	rootParent:null,//������
	cloneParent:null,//������
	rootSibling:null,/*�����ٵĶ���*/
	containerHelper:{w:0,h:0,element:null},/*��Ч�ޱ�ǩ*/
	Positions:{x:0,y:0},/*����Ƿ��ס*/
	RectifyPositions:{x:0,y:0},/*����Ƿ��ס*/
 	iMouseDown:false,/*����Ƿ��ס*/
	DataBase:{},/*����Ӧģ����϶�ģ���һ����װ�Ŀ�zowell@20090213*/
	ActionMod:{},/*������Ӧ��ģ��*/
	AffixMot:{},
	RegisterF:function(){
		var EDD=EHMDragDrop;
		if(arguments.length<=0){throw new Error("��������ȷ��ע����קģ��ʧ�ܡ�");}
		else{
		/*��ע���ܵ�ʱ����ק����������ʼ��*/
		if(EDD.containerHelper.element==null){
			EDD.containerHelper.element =  $$('DIV',"containerHelper","module_wrapper");
			var sty=EDD.containerHelper.element.style;
			
			sty.marginTop="5px"
			sty.height="auto";
			sty.width="auto";
			sty.border="2px dashed #999999";
			
			HW.dom.setOpacity(EDD.containerHelper.element,40);

			HW.dom.unSelectable(EDD.containerHelper.element);
			var dh=EDD.dragHelper.element = $$('DIV');
			dh.style.cssText = "position:absolute;display:block;";
			HW.dom.setOpacity(dh,50);
			HW.dom.unSelectable(dh);
			document.body.appendChild(dh);	
			}		
		EDD.ParentFrame[arguments[0].id]={w:parseInt(arguments[0].offsetWidth),h:parseInt(arguments[0].offsetHeight),Element:arguments[0]};}
		},
	unRegisterF:function(){
		var EDD=EHMDragDrop;
		if(arguments.length<=0)
		{EDD.ParentFrame={};}
		else
		{if (EDD.ParentFrame[arguments[0].id]) delete EDD.ParentFrame[arguments[0].id];}
		},
	Register:function(){
		var EDD=EHMDragDrop;
		if(arguments.length<=0){throw new Error("��������ȷ��ע����קģ��ʧ�ܡ�");}
		else if(arguments.length>=2)
		{EDD.DataBase[arguments[0].id]={handMo:arguments[0],actionMo:arguments[1]};}
		else{EDD.DataBase[arguments[0].id]={handMo:arguments[0],actionMo:arguments[0]};}
		EDD.DataBase[arguments[0].id].handMo.style.cursor="move"
		},
	unRegister:function(){
		var EDD=EHMDragDrop;
		if(arguments.length<=0)
		{throw new Error("��������ȷ��ע����קģ��ʧ�ܡ�");}
		else
		{if (EDD.DataBase[arguments[0].id]) delete EDD.DataBase[arguments[0].id];}
		},
	getMod:function(target){
		var EDD=EHMDragDrop;
		while ((!HW.IsMoz())?target.parentElement:target.parentNode ){		
		if(target.tagName=="BODY"||target.tagName=="INPUT"){return null;}
		var tempId= target.id
		if(tempId==""){return null;}
		if(EDD.DataBase[tempId]){return EDD.DataBase[tempId];}	
		target  = ((!HW.IsMoz())?target.parentElement:target.parentNode);
		}
		return null;
		},
	mouseDown:function(ev){
		ev=ev||window.event;
		var EDD=EHMDragDrop;
		var target = ev.target || ev.srcElement;
		var acMod=EDD.getMod(target);
		if(acMod==null)return;
		EDD.ActionMod=acMod.actionMo;/*�����ڱ���Ӧ��ģ��װ���ֵ�*/
		var pos=EDD.getMouseOffset(acMod.handMo, ev);
		//var Epos=EDD.getElePositionP(acMod.handMo,acMod.actionMo);
		//EDD.RectifyPositions=Epos;/*����Ƿ��ס*/
		EDD.Positions.x=pos.x;
		EDD.Positions.y=pos.y;
		EDD.iMouseDown=true;
		EDD.curTarget=acMod.actionMo;
		EDD.rootParent = EDD.rootParent||acMod.actionMo.parentNode;
		EDD.cloneParent = EDD.cloneParent||acMod.actionMo.parentNode;
		EDD.rootSibling = EDD.rootSibling||acMod.actionMo.nextSibling;
		EDD.dragHelper.w=260// parseInt( acMod.actionMo.offsetWidth);
		EDD.dragHelper.h=200// parseInt( acMod.actionMo.offsetHeight);
		HW.util.Event.stopEvent(ev);
			var h=0;
			for(var _i in EDD.ParentFrame){
				//console.print(EDD.ParentFrame[_i].Element.offsetHeight)
				h=(h<EDD.ParentFrame[_i].Element.offsetHeight)?EDD.ParentFrame[_i].Element.offsetHeight:h;
				}
			
			h=h+EDD.dragHelper.h;
			 for(var _i in EDD.ParentFrame){
				EDD.ParentFrame[_i].Element.style.height=h+"px";
				}
		
		if(EDD.AffixMot["mouseDown"]){EDD.AffixMot["mouseDown"](acMod);}
		},
	getSibling:function(x,y){
		var dd=document.documentElement;
		var EDD=EHMDragDrop;
		var sTP=dd.scrollTop;//����ȥ��ͷ
		var sLT=dd.scrollLeft;//����ȥ�����
		var IM=EDD.rootSibling;
		var sss=0
		
		for(var F in EDD.ParentFrame){
			sss++;
			var Fe=EDD.ParentFrame[F];
			var Fm=Fe.Element;
			var SX=sLT+Fm.offsetLeft;
			var SY=sTP+Fm.offsetTop;
			
			var XX=Fm.offsetWidth+SX;
			var YY=Fm.offsetHeight+SY;
			if((parseInt(x)>parseInt(SX))&&(parseInt(x)<parseInt(XX))&& (parseInt(y)>parseInt(SY))&&(parseInt(y)<parseInt(YY))){
				IM=Fm;
				var cH_H=0;
				for(var mm=0;mm<Fm.childNodes.length;mm++){
					if(Fm.childNodes[mm].id=="containerHelper"){cH_H=parseInt(Fm.childNodes[mm].style.height.replace('px',''));}
					var elem_top=EDD.getElePosition(Fm.childNodes[mm]).y;
					var elem_bttom=elem_top+Fm.childNodes[mm].offsetHeight;
				if((parseInt(y)>parseInt(elem_top-cH_H))&&(parseInt(y)<parseInt(elem_bttom-cH_H))){	return Fm.childNodes[mm];}
								 
				}
			}	
		 }
		// window.status=sss;
		return IM;
	},
	mouseMove:function(ev){
		var EDD=EHMDragDrop;
		var Dhp=EDD.dragHelper.element;
		
		var Drs=EDD.rootSibling;
		var Dch=EDD.containerHelper.element;
		if(!EDD.iMouseDown||EDD.ActionMod===null)return;
		ev=ev||window.event;
		var target = ev.target || ev.srcElement;
		try{
			if(Dhp.childNodes.length==0){
				var curTarget=EDD.ActionMod;
				var clonenode=curTarget.cloneNode(true);
					clonenode.style.paddingTop="";
					Dhp.appendChild(clonenode);				
					Dhp.style.display = 'block';	
					HW.dom.removeNode(curTarget);
					}
			Dhp.style.height=(EDD.dragHelper.h-3)+"px";
			Dhp.style.width=(EDD.dragHelper.w-3)+"px"
		}catch(ex){alert(ex)}
	if(Dhp){
		var mousePos =EDD.mouseCoords(ev);
		var TP=mousePos.y-EDD.Positions.y+EDD.RectifyPositions.y;
		var LF= mousePos.x-100+EDD.RectifyPositions.x;
		
		var dw=window.document.documentElement.offsetWidth;
			Dhp.style.top  =((TP<=0)?0:TP) +"px";
			Dhp.style.left =((LF<=0)?0:((LF+parseInt(EDD.dragHelper.w))>dw)?(dw-parseInt(EDD.dragHelper.w)):LF)+"px";
//console.log(LF+">>"+Dhp.style.left+">>"+EDD.Positions.x)
		var DP_X=parseInt(Dhp.style.left.replace('px',''))+(parseInt(EDD.dragHelper.w)/2);
		var DP_Y=parseInt(Dhp.style.top.replace('px',''))+5;
			EDD.rootSibling=EDD.getSibling(DP_X,DP_Y);
			
		if(EDD.rootSibling){
			
			if(EDD.ParentFrame[EDD.rootSibling.id]){
			EDD.rootParent=EDD.rootSibling;
			EDD.rootSibling=null;
			}else{
			EDD.rootParent=EDD.rootSibling.parentNode;
			if(EDD.rootParent==null||(!EDD.rootParent)){EDD.rootParent=EDD.cloneParent;}
			}
			if(Dch.nextSibling==EDD.rootSibling){return;}
			/*����ط�ֵ���Ż�*/
			Dch.style.height=(EDD.dragHelper.h-3)+"px";
			
			
			if(EDD.rootParent==null||(!EDD.rootParent)){EDD.rootParent=EDD.cloneParent;}
			//console.print(EDD.rootParent)
			EDD.rootParent.insertBefore(Dch, EDD.rootSibling);
			HW.util.Event.stopEvent(ev);
		}else{
			HW.dom.removeNode(Dch);
			Dch.style.height=(EDD.dragHelper.h-3)+"px";
			Dch.style.width=(EDD.dragHelper.w-3)+"px";
			//window.status=Dch.style.width;
			if(EDD.rootParent==null||(!EDD.rootParent)){EDD.rootParent=EDD.cloneParent;}
			EDD.rootParent.appendChild(Dch);
			HW.util.Event.stopEvent(ev);
		}
		Dch.style.width="98%";//(EDD.dragHelper.w-3)+"px";
		
		}
		
		if(EDD.AffixMot["mouseMove"]){EDD.AffixMot["mouseMove"]();}
		},
	mouseUp:function(ev){
		
		var EDD=EHMDragDrop;
		if(!EDD.iMouseDown)return;
		var Dhp=EDD.dragHelper.element;
		var Drs=EDD.rootSibling;
		var Dch=EDD.containerHelper.element;
		
		EDD.ActionMod=null;
		EDD.iMouseDown=false;
		if(Dhp.style.display != 'none'&&EDD.rootParent){
			if(EDD.rootSibling){
				EDD.rootParent.insertBefore(EDD.curTarget, EDD.rootSibling);
			}else {
				if(EDD.rootParent==null||(!EDD.rootParent)){EDD.rootParent=EDD.cloneParent;}
				EDD.rootParent.appendChild(EDD.curTarget);
			}
			if(Dch)HW.dom.removeNode(Dch);
			for(var i=0; i<Dhp.childNodes.length; i++) Dhp.removeChild(Dhp.childNodes[i]);
			Dhp.style.display = 'none';
			var after=((!!EDD.rootSibling)?EDD.rootSibling:null);
			//console.log("EHMDragDrop:after>>>>"+((!!after)?after.id:""))
			//if(!!after&&after.id=="containerHelper"){
			//	console.log("������ף�����")
			//}
			//console.log("EDD.rootSibling>>>>>>>>>>>>>"+((!!EDD.rootSibling)?EDD.rootSibling.id:null))
			if(EDD.AffixMot["mouseUp"]){EDD.AffixMot["mouseUp"](EDD.rootParent,EDD.rootSibling);}
			//HW.util.Event.stopEvent(ev);
		}
		(function (){
			 for(var _i in EDD.ParentFrame){
				EDD.ParentFrame[_i].Element.style.height="auto";
				}
			/**/ 
			})()
		EDD.rootParent = null;
		EDD.cloneParent = null;
		EDD.rootSibling = null;
		},
	getPosition:function(e){/*��ȡ���λ��*/
	var left = 0;
	var top  = 0;
	while (e.offsetParent){left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);e     = e.offsetParent;}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);return {x:left, y:top};
},
getElePosition:function (obj){/*��ȡ����ľ�������*/
	var left = 0,top  = 0;
	while ((!HW.IsMoz())?obj.parentElement:obj.parentNodet){
		left += obj.offsetLeft + (obj.currentStyle?(parseInt(obj.currentStyle.borderLeftWidth)).NaN0():0);
		top  += obj.offsetTop  + (obj.currentStyle?(parseInt(obj.currentStyle.borderTopWidth)).NaN0():0);
		obj     = (!HW.IsMoz())?obj.parentElement:obj.parentNodet;
	}
	left += obj.offsetLeft + (obj.currentStyle?(parseInt(obj.currentStyle.borderLeftWidth)).NaN0():0);
	top  += obj.offsetTop  + (obj.currentStyle?(parseInt(obj.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
},
getElePositionP:function (obj,pobj){/*��ȡ����ľ�������*/
	var left = 0,top  = 0;
	while ((!HW.IsMoz())?obj.parentElement:obj.parentNodet){
		left += obj.offsetLeft + (obj.currentStyle?(parseInt(obj.currentStyle.borderLeftWidth)).NaN0():0);
		top  += obj.offsetTop  + (obj.currentStyle?(parseInt(obj.currentStyle.borderTopWidth)).NaN0():0);
		obj     = (!HW.IsMoz())?obj.parentElement:obj.parentNodet;
		if(obj== pobj)break;
	}
	return {x:left, y:top};
},
	mouseCoords:function(ev){/*��ȡ����ľ�������*/
	if(ev.pageX || ev.pageY){return {x:ev.pageX, y:ev.pageY};}
	var dd=document.documentElement,db=document.body;
	return {x:ev.clientX + dd.scrollLeft - db.clientLeft,	y:ev.clientY + dd.scrollTop  - db.clientTop};
},
	getMouseOffset:function(target, ev){/*��ȡ���ƫ����*/
	ev = ev || window.event;
	var docPos    = EHMDragDrop.getPosition(target);
	var mousePos  = EHMDragDrop.mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
},
	affixAction:function(evName,fn){
		EHMDragDrop.AffixMot[evName]=fn;
		},
init:(function (){addEvent(window,"load",function(){
	addEvent(window.document.body,"mousedown",EHMDragDrop.mouseDown);	
	addEvent(window.document.body,"mousemove",EHMDragDrop.mouseMove);
	addEvent(window.document,"mouseup",EHMDragDrop.mouseUp);

//*	EHMDragDrop.affixAction("mouseDown",function(ac){
//				DataManager.dissociateNode=DataManager.getNode(ac.actionMo.id);
//			  return; });
//	EHMDragDrop.affixAction("mouseUp",function(/*document newStrus*/NewS,/*document Sibling*/obj){
			//	StrutsManager.insertAfter(/*document newStrus*/NewS,/*document Sibling*/obj);
//									});
//*/
								});})()
	};
	
//console.log("EHMDragDropģ�� �������");