/**
 * 此文件供资产信息添加和变更时检验数据用
 * @author yelb
*/

/**
 * 去掉字符串两端的的空格(半角和人角)
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
String.prototype.trim = function(){
    return this.replace(/(^[\s　]*)|([\s　]*$)/g, "");
}


/**----------------------------------------------------------------------------
 * 得到供应商ID或维护商ID
 * @param {Object} selectType 参数的值有两个，其中selectOne选择一个，selectMany选择多个
 * @param {Object} providerType 参数的值有两个，其中1表示查出供应商,2表示选择维修商
 *-----------------------------------------------------------------------------*/
function getProvider(selectType, providerType) {
    var url = "listSuperOrMaintenance.do?selectType=" + selectType + "&providerType=" + providerType;
    showPopWin('', url, document.body.clientWidth - 200, document.body.clientHeight - 80, null, true, true);
}
/*供应商信息的返回弹道*/
function processProviderInfo(providerId, providerName) {
    $("idSup").value = providerId;
    $("nameSup").value = providerName;
}
/**维修商信息的返回弹道*/
function processMaintenanceInfo(providerId, providerName) {
    $("idMaintenance").value = providerId;
    $("nameMaintenance").value = providerName;
}

/**----------------------------------------------------------------------------
 * 得到标签条码信息
 * @param {Object} codeId 
 * @param {Object} codeName 
 *-----------------------------------------------------------------------------*/
function getAssetCode() {
     showPopWin('', "../assetmanage/listCodeNotUse.do?flag=addAsset", document.body.clientWidth - 200, document.body.clientHeight - 30, null, true, true);
}
function selectCodeInfo(codeId,codeName){
    $("assetcertInfoPO.codeGoods").value = codeName;//标签编码
    $("assetcertInfoPO.id").value = codeId;//标签ID
}


/**--------------------------start--------------------------------------------------
 * 得到资产图片
 *-----------------------------------------------------------------------------*/
 function getAssetStorImg() {
     showPopWin('', "../assetmanage/queryPlaceAndImg.do", document.body.clientWidth - 200, document.body.clientHeight - 30, null, true, true);
}

//得到资产存放地点图片信息imgId,imgPath,imgName
function selectStorImgInfo(addressValue){
        $("addressInfo").value = addressValue;
//    $("idStor").value = imgId;//资产存放地点图片Id
    //$("storName").value = imgName;//资产存放地点图片名称(路径)
    //$("storSrc").src = imgPath;//资产存放地点图片名称(路径)
//    $("storImgName").value = imgName;//资产存放地点图片名称
	//$("win1").style.display = '';
    //修改初始没添加图片时，图片xy为""，导致变更时图片不能拖动的问题。
    //$("dragObj").style.left = "0px";
    //$("dragObj").style.top = "0px";
//    document.getElementById("gisX").value = "0";
//    document.getElementById("gisY").value = "0";
}

/** 得到资产存放地点及图片**/
 function getPlaceAndImg() {
     showPopWin('', "../assetmanage/queryPlaceAndImg.do", document.body.clientWidth - 20, document.body.clientHeight - 40, null, true, true);
}

/**
 * 查看资产存放地点图片详细信息
 *  @param {Object} idImg资产图片Id
 */
function showBigStorImg(idImg){
	var url = "showAssetStorImgage.do?idStor="+idImg;
	showPopWin('',url, 600, 420, null, true, true);
}

/*****************end******************/


/**----------------------------------------------------------------------------
 * 得到资产图片
 *-----------------------------------------------------------------------------*/
  function getAssetImg() {
     var codeType = $("codeType").value;
     showPopWin('', "../assetmanage/queryAssetImage.do?flag=addAsset&codeType="+codeType, document.body.clientWidth - 200, document.body.clientHeight - 30, null, true, true);
}

//得到资产图片信息
function selectImgInfo(imgId,imgName){
    $("idImg").value = imgId;//资产图片Id
    $("imgSrc").src = imgName;//资产图片名称(路径)
	$("assetImg").style.display = '';
    
}

/**
 * 查看资产图片详细信息
 *  @param {Object} idImg资产图片Id
 */
function showBigImg(idImg){
	var url = "showAssetImgage.do?idImg="+idImg;
	showPopWin('',url, 600, 420, null, true, true);
}	

/**改变存放地点图片*/
function changeStorImg(){
	var storImgPaths = $("storImgPath");
    //alert('storImgPaths='+storImgPaths);
	$("storImg").src = storImgPaths[$("idStor").selectedIndex].value;
    //alert('storImgPaths[$("idStor").selectedIndex].value='+storImgPaths[$("idStor").selectedIndex].value);
}

/** ---------------------------------------------------------------------------
 * 添加配件信息
 * @author yelb
 ------------------------------------------------------------------------------*/
function addPrepare(){
	var prepareTable = $("prepareTable");
	var tr = prepareTable.insertRow(prepareTable.rows.length);
	var td1 = tr.insertCell();
	var td2 = tr.insertCell();
	var td3 = tr.insertCell();
	var td4 = tr.insertCell();
	var td5 = tr.insertCell();
	td1.innerHTML = "<input type='hidden' name='prepareId' value='0'>";//用0表示是新添加的
	td1.innerHTML = td1.innerHTML + "<input type='text' name='prepareName' class='input70' maxlength='32' width='100%'/>";
	td2.innerHTML = "<input type='text' name='prepareBrand' class='input70' maxlength='16' width='100%'/>";
	td3.innerHTML = "<input type='text' name='prepareStandard' class='input70' maxlength='16' width='100%'/>";
	td4.innerHTML = "<input type='text' name='prepareSum' class='input70' maxlength='10' width='100%' onkeyup='clearNoNum(this)'/>";
	td5.innerHTML = "<div align='center'><a href='#' onclick='delPrepare()'>删除</a></div>";
}
//删除一条配件信息
function delPrepare(){
	var index = event.srcElement.parentNode.parentNode.parentNode.rowIndex;
	$("prepareTable").deleteRow(index);
}

/** ---------------------------------------------------------------------------
 * 检验资产基本信息
 * @author yelb
 ------------------------------------------------------------------------------*/
function checkFormValue() {
    /*if ($("assetcertInfoPO.codeGoods").value == "") {
        alert("请输入设备编号！");
       return false;
    }*/

    if ($("codeType").value == ""){
       alert("请选择资产类别！");
       return false;
    }

    //if ($("idImg").value == "") {
       // alert("请选择资产图片！");
       // return false;
   // }

    var assetName = $("assetcertInfoPO.name");
    if (assetName.value.trim() == "") {
        alert("请输入资产名称！");
        assetName.value = ""
        assetName.focus();
        return false;
    }
    assetName.value = ToDBC(assetName.value.trim());

    /*var assetUnicode = $("assetcertInfoPO.unicode");
    if (assetUnicode.value.trim() == "") {
        alert("请输入国际编号！");
        assetUnicode.value = ""
        assetUnicode.focus();
        return false;
    }*/
   // assetUnicode.value = ToDBC(assetUnicode.value.trim());

    var assetBrand = $("assetcertInfoPO.brand");
    if (assetBrand.value.trim() == "") {
        alert("请输入资产品牌！");
        assetBrand.value = ""
        assetBrand.focus();
        return false;
    }
    assetBrand.value = ToDBC(assetBrand.value.trim());

    var assetStandard = $("assetcertInfoPO.standard");
    if (assetStandard.value.trim() == "") {
        alert("请输入资产规格！");
        assetStandard.value = "";
        assetStandard.focus();
        return false;
    }
    assetStandard.value = ToDBC(assetStandard.value.trim());

    if ($("assetcertInfoPO.buyD").value == "") {
        alert("请输入采购时间！");
        $("assetcertInfoPO.buyD").focus();
        return false;
    }

    var assetPrice = $("assetcertInfoPO.sum");
    if (assetPrice.value == "") {
        alert("请输入采购价格！");
        assetPrice.focus();
        return false;
    }
    if (isNaN(assetPrice.value) || parseFloat(assetPrice.value) < 0) {
        alert("采购价格的输入格式不正确！");
        assetPrice.focus();
        return false;
    }
    if(parseInt(assetPrice.value).toString().length >8){
    	alert("采购价格的整数部分不能超过8位数!");
        assetPrice.focus();
    	return false;
    }
 	assetPrice.value = parseFloat(assetPrice.value).toFixed(2);
	
	
    /*var netvalueEff = $("assetcertInfoPO.netvalueEff");
    if (netvalueEff.value == "") {
        alert("请输入净值残率！");
        netvalueEff.focus();
        return false;
    }
    if (isNaN(netvalueEff.value) || parseFloat(netvalueEff.value).toFixed(3) < 0
            || parseFloat(netvalueEff.value).toFixed(3) > 1) {
        alert("净值残率必须为0~1之间的小数！");
        netvalueEff.focus();
        return false;
    }
    //为净值残率保留三位小数
    netvalueEff.value = parseFloat(netvalueEff.value).toFixed(3);
*/
    var assetCycle = $("assetcertInfoPO.cycle");
    if (assetCycle.value == "") {
        alert("请输入巡检周期！");
        assetCycle.focus();
        return false;
    }
    if (isNaN(assetCycle.value) 
    		|| parseInt(assetCycle.value) < 0
    		|| parseInt(assetCycle.value) < parseFloat(assetCycle.value)) {
        alert("巡检周期需为大于或等于0的整数！");
        assetCycle.focus();
        return false;
    }
    //巡检周期保留两位小数
    assetCycle.value = parseInt(assetCycle.value);
    //将资产属性值的特殊字符转换成全角
    var assetInsValues = $("assetInsValue");
    if (assetInsValues != null) {
        for (var index = 0; index < assetInsValues.length; index++) {
            assetInsValues[index].value = ToDBC(assetInsValues[index].value.trim());
        }
    }
	
    //几个时间验证
    var buyDate = $("assetcertInfoPO.buyD").value.replace(/-/g,"");//采购时间
    var availabilityD = $("assetcertInfoPO.availabilityD").value.replace(/-/g,"");//保修截止日期
    var rejectDate = $("assetcertInfoPO.rejectD").value.replace(/-/g,"");//预计报废日期
    if(buyDate != "" && availabilityD != ""){
    	if(parseInt(buyDate) > parseInt(availabilityD)){
    		alert("采购时间不能晚于保修截止日期！");
    		$("assetcertInfoPO.availabilityD").focus();
    		return false;
    	}
    }
    if(buyDate != "" && rejectDate != ""){
    	if(parseInt(buyDate) > parseInt(rejectDate)){
    		alert("采购时间不能晚于预计报废日期！");
    		$("assetcertInfoPO.rejectD").focus();
    		return false;
    	}
    }
    
    //预计报废日期_如果折旧方式不是“不计折旧”，好么"预计报废日期"为必填项
   /* var  typeDepreciation = $("assetcertInfoPO.typeDepreciation").value;
    if(typeDepreciation != 1 && rejectDate == ""){
    	alert("请输入预报废日期！");
    	$("assetcertInfoPO.rejectD").focus();
    	return false;
    }*/
    //全部验证通过
    return true;
}

/** ---------------------------------------------------------------------------
 * 验证资产配件
 * @author yelb
 ------------------------------------------------------------------------------*/
function checkPrepare(){
    if (document.getElementsByName("prepareName") != null) {
        prepareNames = document.getElementsByName("prepareName");
        prepareBrands = document.getElementsByName("prepareBrand");
        prepareStandards = document.getElementsByName("prepareStandard");
        prepareSums = document.getElementsByName("prepareSum");
        for (var index = 0; index < prepareNames.length; index++) {
            //配件名称
            if (prepareNames[index].value.trim() == "") {
                alert("请输入配件名称！");
                prepareNames[index].value = "";
                prepareNames[index].focus();
                return false;
            } else {
                prepareNames[index].value = ToDBC(prepareNames[index].value.trim());
            }
            //配件品牌
            prepareBrands[index].value = ToDBC(prepareBrands[index].value.trim());
            //配件规格型号
            prepareStandards[index].value = ToDBC(prepareStandards[index].value.trim());
            //配件价格
            if (prepareSums[index].value.trim() == "") {
                alert("请输入配件价格！");
                prepareSums[index].value = "";
                prepareSums[index].focus();
                return false;
            } else if (isNaN(prepareSums[index].value)
                    || parseFloat(prepareSums[index].value).toFixed(2) < 0) {
                alert("配件价格的输入格式不正确！");
                prepareSums[index].focus();
                return false;
            } else if(parseInt(prepareSums[index].value).toString().length >8){
			    	alert("配件价格的整数部分不能超过8位数!");
			        prepareSums[index].focus();
			    	return false;
			}
           prepareSums[index].value = parseFloat(prepareSums[index].value).toFixed(2);
        }
    }
    return true;
}
/**---------------------------------------------------------------------------
*半角转换为全角函数
*-----------------------------------------------------------------------------*/
function ToDBC(txtstring) {
	return txtstring;
	/*
    var tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {//空格
            tmp = tmp + String.fromCharCode(12288);
        } else if (txtstring.charCodeAt(i) < 127) {
            tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
        }
        else {
            tmp = tmp + txtstring.charAt(i);
        }
    }
    return tmp;
    */
}

/**---------------------------------------------------------------------------
 * 检验文本域
 * @param {Object} valueKey 文件所属的内容,如变更原因
 * @param {Object} areaId 文件域的id
 * @param {Object} maxLength 文本域允许的最大长度
 * @param {Object} allowEmpty 是否允许文本域内容为空 true为允许，false为不允许
*-----------------------------------------------------------------------------*/
function checkTextarea(valueKey,areaId,maxLength,allowEmpty){
	var textArea = document.getElementById(areaId);
	if(textArea == null) {
		alert("找不到id为"+areaId+"的文件本域！");
		textArea.focus();
		return false;
	}
	//全角和半角空格
	if(!allowEmpty && textArea.value.replace(/[ 　]/g,"") == ""){
		alert(valueKey+"的内容不能为空！");
		textArea.vlaue = "";
		textArea.focus();
		return false;
	}
	if(textArea.value.length > maxLength){
		alert(valueKey+"的字数不能超过"+maxLength+"个字！");
		textArea.focus();
		return false;
	}
	textArea.value = ToDBC(textArea.value.trim());//将特殊字符转换成全角
	return true;
}
/**
 * 从字符串的开头截取指定长度的子串
 * @param {Object} obj 指定的元素
 * @param {Object} cutLength 指定子串的长度
 */
function cutFrontStr(obj,cutLength){
	if(obj.value.length > cutLength) {
		obj.value = obj.value.substr(0,cutLength);
	}
}
/**
 * 由于“折旧方式”的选项不同，“预计报废日期”是否必填的要求也不同。
 */
function changRejectdateTitle(){
	var title = "预计报废日期";//预计报废日期前th中的内容
	var typeDepreciation = $("typeDepreciation").value;
	if(1 != typeDepreciation){
		title += "&nbsp;<font color='#FF0000'>*</font>";
	}
	$("rejectD_title").innerHTML = title;
}
