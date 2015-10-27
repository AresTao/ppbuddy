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
var flexManager=new function(){
    var self =this;
     this.load=function(C,path){

        var rand = (new Date()).valueOf()
       path = (path.indexOf("?") >= 0) ? (path + "&randDate=" + rand) : (path + "?randDate=" + rand)
			var fPar = new flashParameter();
			fPar.setContainer(C);
			fPar.setId("asd");
			fPar.setSize({w:380,h:200});
			fPar.setPath(path);
//C.style.width="400px";
//C.style.height="300px";
			var j=self.createChart(fPar);
      //   console.log(j.parentNode.innerHTML)
     }
     this.createChart = function(chartPar) {
        var d = new Date();
        var dd = d.getTime();
        var w = (chartPar.size) ? chartPar.size.w : "380";
        var h = (chartPar.size) ? chartPar.size.h : "280";
        var so = new SWFObject(EHM.rootPath + chartPar.path, "" + chartPar.id + "", "100%", "200", "8", "#FFFFFF");
        so.addParam("wmode", "asdasdasd");
         so.addVariable("par", "{type:'amChartDataViewFlexTest',data:[{neid:'$NE_ID',entypecode:'',time:'hour',kpicode:['a']}]}");
        //  var div=(typeof chartPar.container=="object")?chartPar.container.id:chartPar.container;

      chartPar.container.innerHTML= so.getSWFHTML();
		
        return  $(chartPar.id);
    };
   }
