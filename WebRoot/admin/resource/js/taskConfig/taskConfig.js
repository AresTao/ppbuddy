var ModalDialog = function(sURL ,_iHeight){
	
    var sFeatures = function(){
    	var iHeight=200;
    	if(_iHeight){
    		iHeight=_iHeight;
    	}
        var sFeatures="dialogHeight: " + iHeight + "px;";
        return sFeatures;        
    }();
    
    var returnValue = window.showModalDialog(sURL, "",sFeatures);
    return returnValue
} 

var WindowHandler=new function(){
	
	this.closeDialog = function(){
		var rObj = {};
		rObj.isConf=false;
		
		window.returnValue =rObj;
		window.close();
	}
	
	this.confirmCloseDialog = function(){
		var rObj = {};
        rObj.isConf=true;
        
		window.returnValue = rObj;
        window.close();
    }
    
    this.configParameter=function (id){
    	var configContainer = document.getElementById(id);
        configContainer.style.display="block";
    }
    
    this.showConfirmDialog = function (sURL,check,iHeight){
    	var nofun = document.getElementById("nofun");
    	if(nofun.innerHTML=="��Ч"){
    		if(check.checked){
	             if(window.confirm("��δ����Э���Ƿ����ã�")){
	                 var showModal = new ModalDialog(sURL,iHeight);
	                 if(showModal&&!showModal.isConf){
	                    check.checked=false;
	                 }else{
	                    check.checked=true;
	                    var nofun = document.getElementById("nofun");
	                    nofun.innerHTML="��Ч";
	                 }
	            }else{
	                check.checked=false;
	            }
             }
    	}
    }
    
    this.showDialog = function (sURL){
        var showModal = new ModalDialog(sURL);    
    }

};

var changeParameter=function (obj){
	
	var val = obj.value;

	var showParameter=function(id){
		var config = document.getElementById("telnet");
		config.style.display="none";
		config = document.getElementById("snmp");
		config.style.display="none";
		
		config = document.getElementById(id);
		config.style.display="block";
		
	}(val);
}