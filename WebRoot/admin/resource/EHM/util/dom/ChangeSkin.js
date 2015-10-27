var theme="";
var ChangeSkin= new function(){
    this.ImportGlobe=function(){
        EHM.ImportCss("/resource/style/global/css/global.css");
        EHM.ImportCss("/resource/style/global/css/ext-all.css");
        EHM.ImportCss("/resource/style/global/css/ext-all-ne-tree.css");
    }
    this.Import=function(src){
        theme=cookie.get("EAP_THEME");
        theme=(theme)?theme:"blue";
        EHM.ImportCss("/resource/style/xtheme/"+theme+"/css/"+src);
    }
}

var ChangeSkinAPP=new function(){
	var action=[];
	var self=this;
	var _init=function(){ChangeSkin.ImportGlobe();} ;
	var _do=function(){for(var i=0;i<action.length;i++){action[i]();}};
    var hiddenMenu=function(){

    };
	this.Do=function(){_do();	};
	this.Register=function(O){
         action.push(O);
        return self;
    };
	this.init=function(){
        _init();
        _do();
        addEvent(window,"load",function(){
             if(parent.EHM&&parent.EHM.isTreeFrame){
                var TWin = parent.document.frames ? parent.document.frames["treeFrame"] : parent.document.getElementById("treeFrame").contentWindow;
                var MWin= parent.document.frames ? parent.document.frames["manageFrame"] : parent.document.getElementById("manageFrame").contentWindow;
              if(MWin==window){
                 if(top.zowellLabel) {
                     var lab=top.zowellLabel.getCurrent();
                     lab.TreeFrame=lab.TreeFrame||{};
                     lab.TreeFrame.manageFrame=lab.TreeFrame.manageFrame||{};
                      lab.TreeFrame.manageFrame.src = window.location.href;
                     }
              }else if(TWin==window){
                if(top.zowellLabel) {
                     var lab=top.zowellLabel.getCurrent();
                     lab.TreeFrame=lab.TreeFrame||{};
                     lab.TreeFrame.treeFrame=lab.TreeFrame.treeFrame||{};
                      lab.TreeFrame.treeFrame.src = window.location.href;
                     }
              }
             }
            if(!!!(EHM.ToolbarInstance)){
              addEvent(window.document.body, "click",function(ev){
                  if(top&&top.EHM&&top.EHM.ToolbarInstance)
              try{top.EHM.ToolbarInstance.hidden();}catch(e){}
                 // HW.util.Event.stopEvent(ev);
            });
            }else{

               addEvent(window.document.body, "click",function(ev){
                   EHM.ToolbarInstance.hidden();
                   HW.util.Event.stopEvent(ev);
               })
            };
        })
    };
}
