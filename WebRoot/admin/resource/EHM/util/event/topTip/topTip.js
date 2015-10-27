// JavaScript Document

/*
	提示框
*/
var $$topTip= function(){
	var self=this;
	this.element=$$("div","topTip","toptip_main");
	this.point={x:0,y:0};
	this.Data={};
	this.handel={over:function(ev){
					ev=ev||window.event;
					var target = ev.target || ev.srcElement;
					var id=target.id;

					if(self.Data[id]&&self.Data[id].isLoad){
							self.setContext(id);
						}else{
							self.loadData(id);
							}
					
					},out:null};
	
	this._show=function(ev){self.getPoint(ev);self.handel.over(ev);};
	
	this._hidden=function(ev){self.element.style.display='none';};
	window.document.body.appendChild(this.element)
	};
	$$topTip.prototype.Register=function(Obj,/*[]*/json){
		var self=this;
		if(typeof Obj =="object"){
			
			if(Obj instanceof $$interFaceModule||Obj instanceof StatsSensor||Obj instanceof PowerSensor||Obj instanceof Temperature){
				addEvent(Obj.getElement(),"mouseover",self._show);
				addEvent(Obj.getElement(),"mouseout",self._hidden);
				this.setData(Obj.getElement().id,json,Obj);
					var it=Obj.getData();
					
					var neId = it.getAtt("id");
					var deviceId = it.getAtt("deviceId"); 
					var alias = it.getAtt("alias"); 
					var collected = it.getAtt("collected"); 
					 
					if(it.title){
						var tit = it.title[0].value
						this.setData(Obj.getElement().id,{title:"名称",context:tit});
						if(alias&&alias!='null'){
							this.setData(Obj.getElement().id,{title:"别名",context:alias});
						}else if(alias&&alias=='null'){
							this.setData(Obj.getElement().id,{title:"别名",context:'N/A'});
						}
					} 
					
					if(it.alarms&&it.alarms[0].alarm){
						
						var alarm = it.alarms[0].alarm[0];
						
						var level = alarm.getAtt("level");
						level=(level=="null")?"0":level;
						if(collected!=1){
							this.setData(Obj.getElement().id,{title:"当前状态",context:EHM.Cache["LEVE"]["30"].desc});
						}else{
							this.setData(Obj.getElement().id,{title:"当前状态",context:EHM.Cache["LEVE"][level].desc});
						}
						var msg = alarm.value;
						if(!!msg)this.setData(Obj.getElement().id,{title:"告警",context:msg});
					}
					
					if(it.kpis){
						var kpis=it.kpis[0];
						if(kpis)
							for(var i=0;i<kpis.kpi.length;i++){
								var kpi=kpis.kpi[i];
								this.setData(Obj.getElement().id,{title:kpi.title[0].value,context:kpi.value[0].value+" "+kpi.rate[0].value});
							}
					}
				
				}else if(Obj instanceof PowerImg ||Obj instanceof FanImg){ //电源，风扇
				
					addEvent(Obj.getElement(),"mouseover",self._show);
					addEvent(Obj.getElement(),"mouseout",self._hidden);
					this.setData(Obj.getElement().id,json,Obj);
					var it=Obj.getData();
					
					var neId = it.getAtt("id");
					var deviceId = it.getAtt("deviceId"); 
					var alias = it.getAtt("alias"); 
					var collected = it.getAtt("collected"); 
					
					if(it.title){
						var tit = it.title[0].value
						this.setData(Obj.getElement().id,{title:"名称",context:tit});
					} 
					
					if(it.alarms&&it.alarms[0].alarm){
						var alarm = it.alarms[0].alarm[0];
						var level = alarm.getAtt("level");
						level=(level=="null")?"0":level;
						this.setData(Obj.getElement().id,{title:"当前状态",context:EHM.Cache["LEVE"][level].desc});
						var msg = alarm.value;
						if(!!msg){
							this.setData(Obj.getElement().id,{title:"告警",context:msg});
						}
					}
					
					if(it.kpis){
						var kpis=it.kpis[0];
						if(kpis)
							for(var i=0;i<kpis.kpi.length;i++){
								var kpi=kpis.kpi[i];
								this.setData(Obj.getElement().id,{title:kpi.title[0].value,context:kpi.value[0].value+" "+kpi.rate[0].value});
							}
					}
				}
				else{
					addEvent(Obj,"mouseover",self._show);
					addEvent(Obj,"mouseout",self._hidden);
					this.setData(Obj.id,json,Obj);
				}
			
			}
		};
	$$topTip.prototype.getPoint=function(e){
		var dd=document.body;
		var sTP=dd.scrollTop;//被卷去的头
		var sLT=dd.scrollLeft;//被卷去的左边
		var _x=((e.clientX+this.element.clientWidth)>=dd.clientWidth)?(e.clientX-this.element.clientWidth):(e.clientX+sLT)
		this.point={x:_x,y: e.clientY+sTP};
		return this.point;
		}
	$$topTip.prototype.setData=function(key,json,o){
		if(!this.Data[key])this.Data[key]={json:[],obj:null,isLoad:false}
		if(json)this.Data[key].json.push(json);	
		if(o)this.Data[key].obj=o;
		};
	$$topTip.prototype.isLoaded=function(key){this.Data[key]["isLoad"]=true;	};
	
	$$topTip.prototype.setShowHandel=function(fn){this.handel.over=fn;};
	$$topTip.prototype.hidden=function(ev){this._hidden(ev);};
	$$topTip.prototype.loadData=function(id){
		var self=this;
		var cB = {
            success:function (responseText, responseXML) {
                try {
                    var datas = new XmlDataStroe(responseXML);
                    var root = datas.root;
					var json=[];
					for(var h=0;h<root.item.length;h++){
						var kpi=root.item[h];
						self.setData(id,{title:kpi.title[0].value,context:kpi.rate[0].value+kpi.unit[0].value});
						}
					//self.setData(id,json);
					self.isLoaded(id);
					self.setContext(id);
                } catch(e) {
					alert(e)
                }
                responseXML = null;
                responseText = null;
            },
            failure:function(status) {
                self.isLoaded(id);
				self.setContext(id);
            }};
        var postFlag = "GET";
        var postBody = null;
        var serverAddress = EHM.rootPath+"/resource/collieApp/snapShot/testData/"+id+".xml";
        var psNum = 0;
        var exh = new SuperHandler();
        exh.request(postFlag, serverAddress, cB, psNum, postBody);
        exh = null;
		
		};
	$$topTip.prototype.setOpacity=function(rate){
		HW.dom.setOpacity(this.element,rate);
		}
	$$topTip.prototype.setContext=function(id){
		var s="";
		this.element.style.display='block';
		var jsonArr=this.Data[id].json;
		for(var k=0;k<jsonArr.length;k++){
			 var Json=jsonArr[k];
			  s+=Json.title+":"+Json.context+"</br>"
			}
		
		this.element.style.top=this.point.y;
		this.element.style.left=this.point.x;
		this.element.innerHTML=s;
		};