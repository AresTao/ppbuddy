// JavaScript Document

var PortalSet=new function(){
	var self=this;
	var isOpen=false;
	var portalTool=null;
	this.register=function(T){
      //  alert($("top_portal_set"))
	try	{$("top_portal_set").className="portal_tabSet";}catch(e){}
		portalTool=T;
		}
	this.clean=function(){
		isOpen=false;
        try	{$("top_portal_set").className="portal_tabSet_undo";}catch(e){}
		portalTool=null;
		}
	this.createTool=function(){
		if(portalTool){
			if(!isOpen){portalTool.showSet(self.createTool);isOpen=true;}else{
			portalTool.hiddenSet();isOpen=false;
				}
			}
		}
	}