/*
 - 事件私有管理库 private interface
 - 用来做动态效果
 - zowell@20090302
*/
 EHM.ImportCss("EHM/css/page/event.css");
HW.EventManager=window.HW.EventManager||{
	module:{/*模块上的推拉效果*/
		PuPu:{
			Conf:{CLOSE:"module_wrapper_bottom_off",OPEN:"module_wrapper_bottom_on",OVER:"",SPEND:(HW.IsMoz())?50:1},
			DataBase:{},
			Register:function(hc,ac){
				var db=HW.EventManager.module.PuPu.DataBase;
					hc.className=HW.EventManager.module.PuPu.Conf.OPEN;
					db[hc.id]={handMo:hc,actionMo:ac,ope:true};
				},
			Pull:function(hc,hi){/*拉的过程 打开*/
				var PP=HW.EventManager.module.PuPu;
				var db=PP.DataBase;
				var Hc=hc;
				var timeout;
				var actionArea=db[Hc.id];
					actionArea.ope=true;
				var chgArea=actionArea.actionMo;
					chgArea.style.overflowY ="hidden";
					chgArea.style.overflowX ="hidden";
					Hc.className=PP.Conf.OPEN;

				chgArea.style.height="auto";
				hi=hi||chgArea.offsetHeight;
				var h=0;
				var cah=1/3;/*缓冲*/
					function openFun(){
						if(h>hi) {chgArea.style.height="auto";return;}
						h=h+parseInt(((hi-h)<3)?(hi-h):(hi-h)*cah);
						if(h>hi)h=hi;
						chgArea.style.height=h+"px";
						if(h<hi)setTimeout(openFun,PP.Conf.SPEND);
						else {return ;}
					}
					 openFun();
				// console.print(">>>>>>>>>>>>//")
				},
			Push:function(hc,hi){/*推的过程 关闭*/
				var PP=HW.EventManager.module.PuPu;
				var db=PP.DataBase;
				var Hc=hc;
					db[Hc.id].ope=false;
				var timeout;
				var actionArea=db[Hc.id];
				var chgArea=actionArea.actionMo;
					chgArea.style.overflowY ="hidden";
					Hc.className=PP.Conf.CLOSE;
					hi=1;
				var h=chgArea.offsetHeight;
					h=parseInt(h);
					function closeFun(){
                       
						if(h<=hi) return;
						h=h-parseInt((h<3)?(hi+h):(hi+h)/2);
						if(h<hi)h=hi;
						chgArea.style.height=h+"px";
						if(h>=hi)setTimeout(closeFun,PP.Conf.SPEND);
					}
					 closeFun();


				},
			GetData:function(target){
				var EDD=HW.EventManager.module.PuPu;
				var s=0;
				while ((!HW.IsMoz())?target.parentElement:target.parentNode ){
				if(target.tagName=="BODY"||target.tagName=="INPUT"||s>=3){return null;}
				var tempId= target.id

				if(tempId==""){return null;}
				if(EDD.DataBase[tempId]){return EDD.DataBase[tempId];}
				target  = ((!HW.IsMoz())?target.parentElement:target.parentNode);
				}
				return null;
				},
			mouseDown:function(ev){
				ev=ev||window.event;
				var EDD=HW.EventManager.module.PuPu;
				var target = ev.target || ev.srcElement;
				var acMod=EDD.GetData(target);
				if(acMod==null)return;
                var PP=HW.EventManager.module.PuPu;
               var db= PP.DataBase;
                var actionArea=db[target.id];
 				(acMod.ope)?EDD.Push(acMod.handMo):EDD.Pull(acMod.handMo);
				}
			}
		},
	win:{}
	};
addEvent(window,"load",function(){
	addEvent(window.document,"mousedown",HW.EventManager.module.PuPu.mouseDown);
								});