// JavaScript Document
/*
 FlashFactory.
 window for Flash
 create by zowell @ 201005011 surekam
 */

var flashParameter = function() {
};
flashParameter.prototype.setId = function(I) {
    this.id = I;
};
flashParameter.prototype.setData = function(I) {
    this.data = I;
};
flashParameter.prototype.setPath = function(I) {
    this.path = I;
};
flashParameter.prototype.setContainer = function(I) {
    this.container = I;
};
flashParameter.prototype.setSize = function(I) {
    this.size = I;
};

var FlashOut = new function() {
    var self = this;
    this.load = function(M) {
        var C = $$("div");
        C.style.padding = "0px";
        C.style.margin = "0px";
        C.style.width = "100%";
        var d = M.getData();
        var rand = (new Date()).valueOf()
        var path = d.load[0].path[0].value;
		var unset=(path.indexOf("@@@")!=-1);
        if(unset){//todo 搞该搞的地方
            path="/portal/unset.jsp?widgetCode="+M.getData().getAtt("id");
			var ifWin = $$("iframe");
			path = (path.indexOf("?") >= 0) ? (path + "&randDate=" + rand) : (path + "?randDate=" + rand)
			path = path.replace(/_\*_/gi, "&");
			var ret = /^(http)/i;
			
			ifWin.src = (ret.exec(path)) ? (path) : (EHM.rootPath + path);
			if (HW.IsMoz()) {
				ifWin.setAttribute("frameborder", 0);
				ifWin.setAttribute("scrolling", "no");
				ifWin.setAttribute("width", "98%");
				ifWin.setAttribute("height", (unset?"200px":"300px"));
			}
			else {
				ifWin.frameBorder = "0	";
				ifWin.scrolling = "no"
				ifWin.width = "98%";
				ifWin.height = (unset?"200px":"300px");
			}
			ifWin.style.border = "0px none"
			ifWin.style.padding = "0px"
			ifWin.style.margin = "0px"
			ifWin.style.overflow = "hidden"
			C.appendChild(ifWin)
        }else{
			path = (path.indexOf("?") >= 0) ? (path + "&randDate=" + rand) : (path + "?randDate=" + rand)
			var fPar = new flashParameter();
			fPar.setContainer(C);
			fPar.setId(d.getAtt("id"));
			fPar.setSize({w:380,h:200});
			fPar.setPath(path);
			
			self.createChart(fPar);
			}
        
		
        M.setT(C);
        
    };
    this.edit = PortalManager.widgetEdit;
    this.createChart = function(chartPar) {
        var d = new Date();
        var dd = d.getTime();
        var w = (chartPar.size) ? chartPar.size.w : "380";
        var h = (chartPar.size) ? chartPar.size.h : "280";
        var so = new SWFObject(EHM.rootPath + chartPar.path, "" + chartPar.id + "", "100%", "" + h + "", "8", "#FFFFFF");
        so.addParam("wmode", "opaque");
        //  var div=(typeof chartPar.container=="object")?chartPar.container.id:chartPar.container;

        so.write(chartPar.container);
        return  $(chartPar.id);
    };
}
