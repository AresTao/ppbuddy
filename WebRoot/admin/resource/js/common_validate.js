String.prototype.Trim = function() { 
return this.replace(/(^\s*)|(\s*$)/g, ""); 
}  
String.prototype.LTrim = function() {
return this.replace(/(^\s*)/g, "");
}  
String.prototype.RTrim = function() { 
return this.replace(/(\s*$)/g, ""); 
} 
   
   function CheckField()
 {
    this.name = null;
    this.type = null;
    this.message=null;
    this.maxLength=null;
    this.selectValue=null
    
    this.setSelectValue = function(param)
    {
       this.selectValue=param;
    };

    this.getSelectValue = function()
    {
       return this.selectValue;
    };

    this.setName = function(param)
    {
       this.name=param;
    };

    this.setCheckType = function(param)
    {
      this.type=param;
    };

    this.setMessage = function(param)
    {
       this.message=param;
    };
    
    this.getName = function()
    {
       return this.name;
    };

    this.getCheckType = function()
    {
      return this.type;
    };

    this.getMessage = function()
    {
       return this.message;
    };
    
     this.setMaxLength = function(param)
    {
      return this.maxLength=param;
    };

    this.getMaxLength = function()
    {
       return this.maxLength;
    };
    
 };
       
    
    function getObject(para_name){ 
    	return document.getElementById(para_name).value;
    }  
  
    function isBlank(para_value){
    	 if(para_value.LTrim()==''){
     	  	return false;
     	  }else{
     	  	return true;
     	  }
    } 
  
    
    function isIP(strIP) {
     if (strIP=='') return false;
       var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
       if(re.test(strIP))
        {
        if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
        }
        return false;
    }

    function isEmail(para_value){
    	var patrn=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
  
    	return checkRegExp(patrn,para_value);
    } 
    
    function isPhone(para_value){
    	//var patrn=/(^([0][1-9]{2,3}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0][1-9]{2,3}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/;
    	var patrn=/^(([0\+]\d{2,3}[-]{0,1})?(0\d{2,3})[-]{0,1})?(\d{7,8})([-]{0,1}(\d{3,}))?$/;
    	return checkRegExp(patrn,para_value);
    } 
    
    function isMobile(para_value){
    	var  patrn=/^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/;	
    	return checkRegExp(patrn,para_value);
    } 
  
    function isUrl(para_value){
    	var  patrn=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    	return checkRegExp(patrn,para_value);
    } 
    
    function isIdCard(para_value){
    	var  patrn=/^\d{15}(\d{2}[A-Za-z0-9])?$/;
    	return checkRegExp(patrn,para_value);
    } 
    
    function isNumber(para_value){
    	var  patrn=/^\d+$/; 
    	return checkRegExp(patrn,para_value);
    } 
    
    function isPositiveInt(para_value){
    	var  patrn=/^\d+$/; ; 
    	if(checkRegExp(patrn,para_value)){
    	   if(para_value.indexOf('0')==0)
    	    return false;
    	   
    	   var num=new Number(para_value);
    	   if(num>0){
    		   return true;
    	   }
    	}
  
    	return false;
    } 
    
    function isZipCode(para_value){
    	var  patrn=/^[1-9]\d{5}$/;
    	return checkRegExp(patrn,para_value);
    }
    
    function isInteger(para_value){
    	var  patrn=/^[-\+]?\d+$/; 
    	return checkRegExp(patrn,para_value);
    }
    
    function isDouble(para_value){
    	var  patrn=/^[-\+]?\d+(\.\d+)?$/; 
    	return checkRegExp(patrn,para_value);
    }
    
    function isEnglish(para_value){
    	var  patrn=/^[A-Za-z]+$/; 
    	return checkRegExp(patrn,para_value);
    }
    
    function isChinese(para_value){
    	var  patrn=/^[\u0391-\uFFE5]+$/; 
    	return checkRegExp(patrn,para_value);
    }
    
    function isMaxLength(para_value,def_max){
	//去掉空格
	   var para_value_trim= para_value.LTrim();
       if(para_value==undefined)
    	    return true;
  	    if(para_value.length>def_max){
	      return false;	
	    }else{
	    	return true;
	    }
    }
    
    function isSelected(para_value,def_value){
    	if(para_value==def_value ||(para_value.length==0 && def_value.length==0)){
	      return false;
	    }else{
	      return true;
	    }
    }
    
    function isChecked(oneField){
    	var groups = document.getElementsByName(oneField.getName());
      var is_checked=false;
      for(var i=groups.length-1;i>=0;i--)
       if(groups[i].checked){
       	  is_checked=true;
       	 
       	}
       return is_checked; 	
     }
    
    
    function checkRegExp(patrn,para_value){
    	if(para_value ==null )
    		return true;
    	
    	if(patrn == null)
    		return true;
    	
    	return new RegExp(patrn).test(para_value);
    	
    }
    
    function checkFormat(oneField,para_value){
   	     var is_valid=true;
    	 var type=oneField.getCheckType();
     	 var maxLength=oneField.getMaxLength();
     	 if(type!='blank' && para_value==''){
    	     return true;
    	 }
    
     	 switch(type){
    	  case 'blank':
    		  is_valid = isBlank(para_value);
    		  break;
    	  case 'length':
    		  is_valid = isMaxLength(para_value,maxLength);
    		  break;
    	  case 'group':
    		  is_valid = isChecked(oneField);
    		  break;
    	  case 'select':
    		  is_valid = isSelected(para_value,oneField.getSelectValue());
    		  break;
    	  case 'number':
    		  is_valid = isNumber(para_value);
    		  break; 
    	  case 'email':
    		  is_valid = isEmail(para_value);
    		  break; 
    	  case 'mobile':
    		  is_valid = isMobile(para_value);
    		  break;   
    	  case 'phone':
    		  is_valid = isPhone(para_value);
    		  break; 
    	  case 'zipcode':
    		  is_valid = isZipCode(para_value);
    		  break; 
    	  case 'integer':
    		  is_valid = isInteger(para_value);
    		  break; 
    	  case 'posiInt':
    		  is_valid = isPositiveInt(para_value);
    		  break; 	  
    	  case 'english':
    		  is_valid = isEnglish(para_value);
    		  break; 
    	  case 'chinese':
    		  is_valid = isChinese(para_value);
    		  break; 
    		case 'ip':
    		  is_valid = isIP(para_value);
    		  break;   
    	  }
    	  
    	  return is_valid;
    	
    }
   
    
    
    function clearInfo(){
    	var obj=event.srcElement;
    	var err_id_obj=document.getElementById(obj.id+"_err");
    	var err_name_obj=document.getElementById(obj.name+"_err");
    	
    	if(err_name_obj!=null){
    		err_name_obj.parentNode.removeChild(err_name_obj); 
    	}else if(err_id_obj!=null){
    		err_id_obj.parentNode.removeChild(err_id_obj); 
    	}
    }
	
    function buttonclearInfo(id){
    	var obj = document.getElementById(id);
    	var err_id_obj=document.getElementById(obj.id+"_err");
    	var err_name_obj=document.getElementById(obj.name+"_err");
    	if(err_name_obj!=null){
    		err_name_obj.parentNode.removeChild(err_name_obj); 
    	}else if(err_id_obj!=null){
    		err_id_obj.parentNode.removeChild(err_id_obj); 
    	}
    }
    
    function genErrMessage(alert_message){
   
    	var len=alert_message.length*15;
    	var final_msg="";
    	
    	final_msg+="<div style=\"background:#ffffff;width:"+len+"px; ";
    	final_msg+=" height: 1.5em;line-height: 1.5em;border:1px solid #FC1603;margin:0px\"> ";
    	final_msg+=alert_message+"</div>"
    	
    	return final_msg;
    }
    
    
    function drawErrMessage(oneField,obj){
    	 var div_id=oneField.getName()+"_err";
    	 if(document.getElementById(div_id)==null){
    		  	  var err_div = document.createElement("DIV");
    	 		    err_div.id=div_id;
          	  err_div.style.position="absolute";
          	  //absolute,fixed,inherit,relative
          	  err_div.style.border="thin";
          	  //double,dotted,thin,dashed:groove
          	  err_div.style.height="25";
          	  err_div.style.color="red";
          	  err_div.innerHTML=genErrMessage(oneField.getMessage());
          	  
          	 if(obj.parentNode!=null)
          	  obj.parentNode.appendChild(err_div);
    		}
    }
    
    function check(oneField,obj){
    
    	 if(obj==undefined)
         return true;
      
       if(obj==null)
         return true;
    	
    	 var cur_value=obj.value;
    	 var is_valid=checkFormat(oneField,cur_value);
   		 if(!is_valid){
    		drawErrMessage(oneField,obj);
    	 }
		 
    	  return is_valid;
     } 


     function checkField(){
      var obj=event.srcElement;

      if(obj.disabled==true)
        return true;
     
      for(var i=0;i<checkList.length;i++){
       	var cur_value=obj.value;
       	var curField=checkList[i];
       	
       	if(curField.getName()!=obj.name && curField.getName()!=obj.id)
       	   continue;
       	if(!check(checkList[i],obj)){
       		  return false;
       	}
		
      }
    }  
	
	function checkFieldsOther(para_checkList){
      var message='';
      var is_valid=true;  
     
      for(var i=0;i<para_checkList.length;i++){
       var curField=para_checkList[i];
	   
	   var obj=document.getElementById(curField.getName());
       if(obj==null)
         obj=document.getElementsByName(curField.getName());
     
	   if(obj == undefined)
        continue;
      
        if(obj.disabled==true)
        continue;
      
	    var cur_value=obj.value;
      
       	if(cur_value==undefined)
         continue;
       	
       	
       	obj.onblur=checkField;
       	obj.onfocus=clearInfo;
       	
       	if(!check(para_checkList[i],obj)){
           if(is_valid){
           	  is_valid=false;
           	}
       	 }
       }
      
       if(!is_valid){
       	  alert('表单信息填写不完整或不正确，请确认后重新提交！');
       	}
       
      return is_valid;
     }
   
   
   function checkFields(){
       
      var message='';
      var is_valid=true;  
      
      for(var i=0;i<checkList.length;i++){
       var curField=checkList[i];
       var obj=document.getElementById(curField.getName());
       
       
    //   alert(curField.getName());
       
       if(obj==null)
         obj=document.getElementsByName(curField.getName());
      
        
        if(obj == undefined)
        continue;
        
        if(obj.disabled==true)
        continue;
         
       	var cur_value=obj.value;
       	
       	if(cur_value==undefined)
         continue;
       	
       	
       	obj.onblur=checkField;
       	obj.onfocus=clearInfo;
       	
       	
       	if(!check(checkList[i],obj)){
           if(is_valid){
           	  is_valid=false;
           	}
       	 }
       }
      
       if(!is_valid){
       	  alert('表单信息填写不完整或不正确，请确认后重新提交！');
       	}
       
       //alert(is_valid);
       
       
      return is_valid;
     }
   
      //此方法突出提示详细而不是笼统的提示表单信息填写不正确
    function checkFieldsNew(){
       
      var message='';
      var is_valid=true;  
      var j=0;
      for(var i=0;i<checkList.length;i++){
       var curField=checkList[i];
       var obj=document.getElementById(curField.getName());
       
       
    //   alert(curField.getName());
       
       if(obj==null)
         obj=document.getElementsByName(curField.getName());
      
        
        if(obj == undefined)
        continue;
        
        if(obj.disabled==true)
        continue;
         
       	var cur_value=obj.value;
       	
       	if(cur_value==undefined)
         continue;
       	
       	
       	obj.onblur=checkField;
       	obj.onfocus=clearInfo;
       	
       	
       	if(!check(checkList[i],obj)){
           if(is_valid){
           	  is_valid=false;
           	  j=i;
           	}
       	 }
       }
       if(!is_valid){
       	  alert(checkList[j].getMessage());
       	}
       
       //alert(is_valid);
       
       
      return is_valid;
     }

function checkedValue(groups,value){
    	
      for(var i=groups.length-1;i>=0;i--)
       if(groups[i].value==value){
       	  groups[i].checked=true;
       }
}

var curSelectObj;
var curFilterBox;
var isOpen=false;

function showFilterBox(param_selectId,btnObj){
	
	if(isOpen)
		return;
	
	     curSelectObj=document.getElementById(param_selectId);
       var div_id=param_selectId+"_filterBox";
    		var filter_div = document.createElement("DIV");
    	 	filter_div.id=div_id;
        filter_div.style.position="absolute";
        //absolute,fixed,inherit,relative
        filter_div.style.border="thin";
        //double,dotted,thin,dashed:groove
        filter_div.style.height="25";
        filter_div.style.color="red";
        filter_div.innerHTML=getInitBox();
        curFilterBox=filter_div;
     if(btnObj.parentNode!=null)
         btnObj.parentNode.appendChild(filter_div);
     
     document.getElementById("backFrameContainer").height=1;
     document.getElementById('OptionSelecter_Field').focus();
     isOpen=true;
     
}




function doFilter(textValue){
	var containerDiv=document.getElementById('OptionSelecterFilterBoxContainer');
	containerDiv.innerHTML='';
	var content='<table id="FilterContentTable" width="100%">';
	
	if(curSelectObj!=null && curSelectObj.options!=null){
	  var validOptions=new Array();
	  for(var i=0,j=0;i<curSelectObj.options.length;i++){
		  var curText=curSelectObj.options[i].text;
		  if(textValue!='' && curText.indexOf(textValue)>=0){
		     validOptions[j]=curSelectObj.options[i];
		     j++;
		   }
	   }
	  
	   if(validOptions!=null && validOptions.length>0){
	     for(var m=0;m<validOptions.length;m++){
	         content = content+'<tr height="10" style="cursor:hand;" onclick="setSelectValue('+validOptions[m].value+');" bgcolor="#FFFFFF" ><td onMouseOver=\"this.style.background=\'#7EF55C\'\" onMouseOut=\"this.style.background=\'FFFFFF\'\" >' +validOptions[m].text+'</td></tr>';
	     }
	   }
	   content = content +'</table>'
	   containerDiv.innerHTML=content;
	   
	   document.getElementById("backFrameContainer").height=document.getElementById("FilterContentTable").rows.length*10;
	   
	}
}

function setSelectValue(param_value){
	curSelectObj.value=param_value;
	document.getElementById("backFrameContainer").height=1;
	curFilterBox.parentNode.removeChild(curFilterBox); 
	setLevel2();
	isOpen=false;
}
   	
function getInitBox(){
	var t_html='';
         t_html =t_html+'<table  width="150px" bgcolor="#D8F4F5" cellpadding="0" cellspacing="1" ';
           t_html =t_html+'<tr bgcolor="#FFFFFF">';
           t_html =t_html+'  <td bgcolor="#FFFFFF"><input type="text" style="width:100%;" onKeyUp="doFilter(this.value);" name="OptionSelecter_Field" id="OptionSelecter_Field" /></td>';
           t_html =t_html+'</tr>';
           t_html =t_html+'<tr bgcolor="#FFFFFF">';
           t_html =t_html+' <td id="tdContainer"><iframe id="backFrameContainer" src="" frameborder="no" style="position: absolute; left: -1px; top: -1px; z-index: -1;width:100%;"></iframe><div id="OptionSelecterFilterBoxContainer"></div></td>';
           t_html =t_html+'</tr>';
           t_html =t_html+'</table>';
           return t_html;
}

var curTargetSelectId;

function  getSlaLevelList(applicationId,aimSelect){
	curTargetSelectId=aimSelect;
	slaLevelWorker.getIncidentLevelList(applicationId,doJsonResult);
}

function  doJsonResult(strObj){
	var applyServiceObj = eval(strObj);

	var targetSelect=$(curTargetSelectId);
	targetSelect.options.length=0;
	targetSelect.options[targetSelect.options.length]=new Option("请选择",0);
	for(var i=0;i<applyServiceObj.length;i++){
		  var curLevel=applyServiceObj[i];
		  targetSelect.options[targetSelect.options.length]=new Option(curLevel.levelName,curLevel.id);
	} 
}

/**
 *author:Lebron Lin
 *全选全不选JS
 *参数描述
 *第一个参数直接写this.checked
 *第二个参数内容部分的CheckBox的Id
 *第三个参数列表框第一行checkBox旁边的文字描述Id
 *如有不清楚请参照Picker文件的role.jsp
 */
  function checkAllAppIds(isChecked,checkBoxId,topCheckBoxId){
	 var objs=document.getElementsByName(checkBoxId);
      for(var i=0,j=0;i<objs.length;i++){
       objs[i].checked=isChecked
       }
      var div=document.getElementById(topCheckBoxId);
      if(isChecked){
    	  div.innerHTML="全取消";
      }else{
    	  div.innerHTML="全选择";
      }
 }

var xmlHttp
var curDoAjaxWorkTargetId;


function doAjaxWork(actionUrl,targetObjId)
{ 
	curDoAjaxWorkTargetId=targetObjId;
xmlHttp=GetXmlHttpObject();
if (xmlHttp==null)
  {
  alert ("您的浏览器不支持AJAX！");
  return;
  } 

xmlHttp.onreadystatechange=stateChanged;
xmlHttp.open("POST",actionUrl,true);
xmlHttp.send(null);
}

function stateChanged()
{ 
if (xmlHttp.readyState==4)
{ 
document.getElementById(curDoAjaxWorkTargetId).innerHTML=xmlHttp.responseText;
}else{
	//document.getElementById(curDoAjaxWorkTargetId).innerHTML=varProgarm;
	
	}
}

function GetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
}
/**
 *   文本框只允许输入数字或小数点时  调用此方法。
 *   obj：文本框对象
 *   示例：onkeyup="clearNoNum(this)" 
 */
function clearNoNum(obj)
{
	//先把非数字的都替换掉，除了数字和.
	obj.value = obj.value.replace(/[^\d.]/g,"");
	//必须保证第一个为数字而不是.
	obj.value = obj.value.replace(/^\./g,"");
	//保证只有出现一个.而没有多个.
	obj.value = obj.value.replace(/\.{2,}/g,".");
	//保证.只出现一次，而不能出现两次以上
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}

/**
 * auther:zhangjing
 *
 * 验证开始时间不小于结束时间
 * 验证的时间格式是：yyyy-MM-dd HH:mm:ss
 *
 * strStart:开始时间串
 * strEnd:结束时间串
 *
 * strStart,strEnd为空通过验证  strStart,strEnd不为空进行格式验证
 *
 * return:  验证通过返回true 失败返回false
 */

function checkDay(strStart, strEnd) {
	  if (strStart != "" && strEnd != "") {
        var str1 = strStart.split(" ");
        var str2 = strEnd.split(" ");
        var arr1 = str1[0].split("-");
        var arr2 = str2[0].split("-");
        var date1 = new Date(arr1[0], parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
        var date2 = new Date(arr2[0], parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
        
        return (date1.getTime()<date2.getTime());
 
    }
    return true;
}

/**
 * 验证按时间所搜索时，结束时间不能大于开始时间
 * @param startTimeId 开始时间文本框id
 * @param endTimeId 结束时间文本框id
 * @param hasTime 日期是否有时间，即yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd
 * @param isVal=true 表示前面两个参数startTimeId, endTimeId是时间值，不是id
 * @param promtMsg 提示信息
 */
function dateValidate(startTimeId, endTimeId, isVal, promtMsg){

	isVal = (isVal != "undefined" && isVal != null && isVal != "") ? isVal : false;
	promtMsg = (promtMsg != "undefined" && promtMsg != null && promtMsg != "") ? promtMsg : "结束时间不能小于开始时间";
	var flag = true;
	var startTime = "";
	var endTime = "";
	if(!isVal){//第一二个参数为id时
		
		startTime = $("#"+startTimeId).val();
		endTime = $("#"+endTimeId).val();
	} else {
		startTime = startTimeId;
		endTime = endTimeId;
	}
	if(startTime != null && startTime != "" && endTime != null && endTime != ""){

		var startDateTemp = startTime.split(" ");
		var endDateTemp = endTime.split(" ");
		var arrStartDate = startDateTemp[0].split("-");
		var arrEndDate = endDateTemp[0].split("-");
		
		//判断日期中是否有时间的时分秒，有则分割
		var arrStartTime = (startDateTemp.length > 1) ? startDateTemp[1].split(":") : "";
		var arrEndTime = (endDateTemp.length > 1) ? endDateTemp[1].split(":") : "";

//		alert(arrStartDate.length +"===="+arrStartTime.length);
//		alert(arrStartDate+" "+arrStartTime+"\n"+arrEndDate+" "+arrEndTime);
		var allStartDate = "";
		var allEndDate = "";
		if(arrStartDate.length > 0 && arrStartTime.length == 0){
			allStartDate = new Date(arrStartDate[0],arrStartDate[1],arrStartDate[2]).getTime();   
		}
		if(arrStartDate.length > 0 && arrStartTime.length == 1){
			allStartDate = new Date(arrStartDate[0],arrStartDate[1],arrStartDate[2],arrStartTime[0]).getTime();   
		}
		if(arrStartDate.length > 0 && arrStartTime.length == 2){
			allStartDate = new Date(arrStartDate[0],arrStartDate[1],arrStartDate[2],arrStartTime[0],arrStartTime[1]).getTime();   
		}
		if(arrStartDate.length > 0 && arrStartTime.length == 3){
			allStartDate = new Date(arrStartDate[0],arrStartDate[1],arrStartDate[2],arrStartTime[0],arrStartTime[1],arrStartTime[2]).getTime();   
		}
		if(arrEndDate.length > 0 && arrEndTime.length == 0){
			allEndDate = new Date(arrEndDate[0],arrEndDate[1],arrEndDate[2]).getTime(); 
		}
		if(arrEndDate.length > 0 && arrEndTime.length == 1){
			allEndDate = new Date(arrEndDate[0],arrEndDate[1],arrEndDate[2],arrEndTime[0]).getTime(); 
		}
		if(arrEndDate.length > 0 && arrEndTime.length == 2){
			allEndDate = new Date(arrEndDate[0],arrEndDate[1],arrEndDate[2],arrEndTime[0],arrEndTime[1]).getTime(); 
		}
		if(arrEndDate.length > 0 && arrEndTime.length == 3){
			allEndDate = new Date(arrEndDate[0],arrEndDate[1],arrEndDate[2],arrEndTime[0],arrEndTime[1],arrEndTime[2]).getTime(); 
		}
//		alert(allStartDate +"\n"+allEndDate+"\n"+(allStartDate > allEndDate));
		if(allEndDate < allStartDate){
			
			alert(promtMsg);
			flag = false;
		}
	}
	return flag;
}
  