// JavaScript Document
addEvent(window,"load",function(){

var _msOver=function(ev){
	var evt=HW.util.Event.getEvent(ev);var tg=HW.util.Event.getTarget(evt);
	var cls=tg.className
	var cArr=cls.split("_");
	if(cArr.length==1){
		cArr.push("over");
		}else{
	cArr[cArr.length-1]="over";
	
	}
	tg.className=cArr.join("_");
}
var _msOut=function(ev){
	var evt=HW.util.Event.getEvent(ev);var tg=HW.util.Event.getTarget(evt);
	var cls=tg.className
	var cArr=cls.split("_");
	tg.className=cArr[0];
	}
var _click=function(ev){
	var evt=HW.util.Event.getEvent(ev);var tg=HW.util.Event.getTarget(evt);
	var cls=tg.className
	var cArr=cls.split("_");
	if(cArr.length==1){
		cArr.push("on");
		}else{
	cArr[cArr.length-1]="on";
	
	}
	tg.className=cArr.join("_");	
	}
var _focus=function(ev){
	var evt=HW.util.Event.getEvent(ev);var tg=HW.util.Event.getTarget(evt);
	var cls=tg.className
	var cArr=cls.split("_");
	if(cArr.length==1){
		cArr.push("focus");
		}else{
	cArr[cArr.length-1]="focus";
	}
	tg.className=cArr.join("_");
	}
function addButtonEvent(obj){
		addEvent(obj,"mouseover",_msOver);
		addEvent(obj,"mouseout",_msOut);
		addEvent(obj,"click",_click);
	}
function addTextEvent(obj){
		addEvent(obj,"focus",_focus);
		addEvent(obj,"blur",_msOut);
	}
var ts=document.getElementsByTagName("input");
for(var i =0;i<ts.length;i++){
	if(ts[i].type=="button"||ts[i].type=="submit"||ts[i].type=="reset"){
		addButtonEvent(ts[i]);
		}else if(ts[i].type=="text"||ts[i].type=="password"){
		addTextEvent(ts[i]);
			}
	}
var ts=document.getElementsByTagName("textarea");
for(var i =0;i<ts.length;i++){
		addTextEvent(ts[i]);
	}
var ts=document.getElementsByTagName("button");
for(var i =0;i<ts.length;i++){
		addButtonEvent(ts[i]);
	}
});