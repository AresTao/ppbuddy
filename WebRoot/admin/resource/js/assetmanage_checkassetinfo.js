/**
 * ���ļ����ʲ���Ϣ��Ӻͱ��ʱ����������
 * @author yelb
*/

/**
 * ȥ���ַ������˵ĵĿո�(��Ǻ��˽�)
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
String.prototype.trim = function(){
    return this.replace(/(^[\s��]*)|([\s��]*$)/g, "");
}


/**----------------------------------------------------------------------------
 * �õ���Ӧ��ID��ά����ID
 * @param {Object} selectType ������ֵ������������selectOneѡ��һ����selectManyѡ����
 * @param {Object} providerType ������ֵ������������1��ʾ�����Ӧ��,2��ʾѡ��ά����
 *-----------------------------------------------------------------------------*/
function getProvider(selectType, providerType) {
    var url = "listSuperOrMaintenance.do?selectType=" + selectType + "&providerType=" + providerType;
    showPopWin('', url, document.body.clientWidth - 200, document.body.clientHeight - 80, null, true, true);
}
/*��Ӧ����Ϣ�ķ��ص���*/
function processProviderInfo(providerId, providerName) {
    $("idSup").value = providerId;
    $("nameSup").value = providerName;
}
/**ά������Ϣ�ķ��ص���*/
function processMaintenanceInfo(providerId, providerName) {
    $("idMaintenance").value = providerId;
    $("nameMaintenance").value = providerName;
}

/**----------------------------------------------------------------------------
 * �õ���ǩ������Ϣ
 * @param {Object} codeId 
 * @param {Object} codeName 
 *-----------------------------------------------------------------------------*/
function getAssetCode() {
     showPopWin('', "../assetmanage/listCodeNotUse.do?flag=addAsset", document.body.clientWidth - 200, document.body.clientHeight - 30, null, true, true);
}
function selectCodeInfo(codeId,codeName){
    $("assetcertInfoPO.codeGoods").value = codeName;//��ǩ����
    $("assetcertInfoPO.id").value = codeId;//��ǩID
}


/**--------------------------start--------------------------------------------------
 * �õ��ʲ�ͼƬ
 *-----------------------------------------------------------------------------*/
 function getAssetStorImg() {
     showPopWin('', "../assetmanage/queryPlaceAndImg.do", document.body.clientWidth - 200, document.body.clientHeight - 30, null, true, true);
}

//�õ��ʲ���ŵص�ͼƬ��ϢimgId,imgPath,imgName
function selectStorImgInfo(addressValue){
        $("addressInfo").value = addressValue;
//    $("idStor").value = imgId;//�ʲ���ŵص�ͼƬId
    //$("storName").value = imgName;//�ʲ���ŵص�ͼƬ����(·��)
    //$("storSrc").src = imgPath;//�ʲ���ŵص�ͼƬ����(·��)
//    $("storImgName").value = imgName;//�ʲ���ŵص�ͼƬ����
	//$("win1").style.display = '';
    //�޸ĳ�ʼû���ͼƬʱ��ͼƬxyΪ""�����±��ʱͼƬ�����϶������⡣
    //$("dragObj").style.left = "0px";
    //$("dragObj").style.top = "0px";
//    document.getElementById("gisX").value = "0";
//    document.getElementById("gisY").value = "0";
}

/** �õ��ʲ���ŵص㼰ͼƬ**/
 function getPlaceAndImg() {
     showPopWin('', "../assetmanage/queryPlaceAndImg.do", document.body.clientWidth - 20, document.body.clientHeight - 40, null, true, true);
}

/**
 * �鿴�ʲ���ŵص�ͼƬ��ϸ��Ϣ
 *  @param {Object} idImg�ʲ�ͼƬId
 */
function showBigStorImg(idImg){
	var url = "showAssetStorImgage.do?idStor="+idImg;
	showPopWin('',url, 600, 420, null, true, true);
}

/*****************end******************/


/**----------------------------------------------------------------------------
 * �õ��ʲ�ͼƬ
 *-----------------------------------------------------------------------------*/
  function getAssetImg() {
     var codeType = $("codeType").value;
     showPopWin('', "../assetmanage/queryAssetImage.do?flag=addAsset&codeType="+codeType, document.body.clientWidth - 200, document.body.clientHeight - 30, null, true, true);
}

//�õ��ʲ�ͼƬ��Ϣ
function selectImgInfo(imgId,imgName){
    $("idImg").value = imgId;//�ʲ�ͼƬId
    $("imgSrc").src = imgName;//�ʲ�ͼƬ����(·��)
	$("assetImg").style.display = '';
    
}

/**
 * �鿴�ʲ�ͼƬ��ϸ��Ϣ
 *  @param {Object} idImg�ʲ�ͼƬId
 */
function showBigImg(idImg){
	var url = "showAssetImgage.do?idImg="+idImg;
	showPopWin('',url, 600, 420, null, true, true);
}	

/**�ı��ŵص�ͼƬ*/
function changeStorImg(){
	var storImgPaths = $("storImgPath");
    //alert('storImgPaths='+storImgPaths);
	$("storImg").src = storImgPaths[$("idStor").selectedIndex].value;
    //alert('storImgPaths[$("idStor").selectedIndex].value='+storImgPaths[$("idStor").selectedIndex].value);
}

/** ---------------------------------------------------------------------------
 * ��������Ϣ
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
	td1.innerHTML = "<input type='hidden' name='prepareId' value='0'>";//��0��ʾ������ӵ�
	td1.innerHTML = td1.innerHTML + "<input type='text' name='prepareName' class='input70' maxlength='32' width='100%'/>";
	td2.innerHTML = "<input type='text' name='prepareBrand' class='input70' maxlength='16' width='100%'/>";
	td3.innerHTML = "<input type='text' name='prepareStandard' class='input70' maxlength='16' width='100%'/>";
	td4.innerHTML = "<input type='text' name='prepareSum' class='input70' maxlength='10' width='100%' onkeyup='clearNoNum(this)'/>";
	td5.innerHTML = "<div align='center'><a href='#' onclick='delPrepare()'>ɾ��</a></div>";
}
//ɾ��һ�������Ϣ
function delPrepare(){
	var index = event.srcElement.parentNode.parentNode.parentNode.rowIndex;
	$("prepareTable").deleteRow(index);
}

/** ---------------------------------------------------------------------------
 * �����ʲ�������Ϣ
 * @author yelb
 ------------------------------------------------------------------------------*/
function checkFormValue() {
    /*if ($("assetcertInfoPO.codeGoods").value == "") {
        alert("�������豸��ţ�");
       return false;
    }*/

    if ($("codeType").value == ""){
       alert("��ѡ���ʲ����");
       return false;
    }

    //if ($("idImg").value == "") {
       // alert("��ѡ���ʲ�ͼƬ��");
       // return false;
   // }

    var assetName = $("assetcertInfoPO.name");
    if (assetName.value.trim() == "") {
        alert("�������ʲ����ƣ�");
        assetName.value = ""
        assetName.focus();
        return false;
    }
    assetName.value = ToDBC(assetName.value.trim());

    /*var assetUnicode = $("assetcertInfoPO.unicode");
    if (assetUnicode.value.trim() == "") {
        alert("��������ʱ�ţ�");
        assetUnicode.value = ""
        assetUnicode.focus();
        return false;
    }*/
   // assetUnicode.value = ToDBC(assetUnicode.value.trim());

    var assetBrand = $("assetcertInfoPO.brand");
    if (assetBrand.value.trim() == "") {
        alert("�������ʲ�Ʒ�ƣ�");
        assetBrand.value = ""
        assetBrand.focus();
        return false;
    }
    assetBrand.value = ToDBC(assetBrand.value.trim());

    var assetStandard = $("assetcertInfoPO.standard");
    if (assetStandard.value.trim() == "") {
        alert("�������ʲ����");
        assetStandard.value = "";
        assetStandard.focus();
        return false;
    }
    assetStandard.value = ToDBC(assetStandard.value.trim());

    if ($("assetcertInfoPO.buyD").value == "") {
        alert("������ɹ�ʱ�䣡");
        $("assetcertInfoPO.buyD").focus();
        return false;
    }

    var assetPrice = $("assetcertInfoPO.sum");
    if (assetPrice.value == "") {
        alert("������ɹ��۸�");
        assetPrice.focus();
        return false;
    }
    if (isNaN(assetPrice.value) || parseFloat(assetPrice.value) < 0) {
        alert("�ɹ��۸�������ʽ����ȷ��");
        assetPrice.focus();
        return false;
    }
    if(parseInt(assetPrice.value).toString().length >8){
    	alert("�ɹ��۸���������ֲ��ܳ���8λ��!");
        assetPrice.focus();
    	return false;
    }
 	assetPrice.value = parseFloat(assetPrice.value).toFixed(2);
	
	
    /*var netvalueEff = $("assetcertInfoPO.netvalueEff");
    if (netvalueEff.value == "") {
        alert("�����뾻ֵ���ʣ�");
        netvalueEff.focus();
        return false;
    }
    if (isNaN(netvalueEff.value) || parseFloat(netvalueEff.value).toFixed(3) < 0
            || parseFloat(netvalueEff.value).toFixed(3) > 1) {
        alert("��ֵ���ʱ���Ϊ0~1֮���С����");
        netvalueEff.focus();
        return false;
    }
    //Ϊ��ֵ���ʱ�����λС��
    netvalueEff.value = parseFloat(netvalueEff.value).toFixed(3);
*/
    var assetCycle = $("assetcertInfoPO.cycle");
    if (assetCycle.value == "") {
        alert("������Ѳ�����ڣ�");
        assetCycle.focus();
        return false;
    }
    if (isNaN(assetCycle.value) 
    		|| parseInt(assetCycle.value) < 0
    		|| parseInt(assetCycle.value) < parseFloat(assetCycle.value)) {
        alert("Ѳ��������Ϊ���ڻ����0��������");
        assetCycle.focus();
        return false;
    }
    //Ѳ�����ڱ�����λС��
    assetCycle.value = parseInt(assetCycle.value);
    //���ʲ�����ֵ�������ַ�ת����ȫ��
    var assetInsValues = $("assetInsValue");
    if (assetInsValues != null) {
        for (var index = 0; index < assetInsValues.length; index++) {
            assetInsValues[index].value = ToDBC(assetInsValues[index].value.trim());
        }
    }
	
    //����ʱ����֤
    var buyDate = $("assetcertInfoPO.buyD").value.replace(/-/g,"");//�ɹ�ʱ��
    var availabilityD = $("assetcertInfoPO.availabilityD").value.replace(/-/g,"");//���޽�ֹ����
    var rejectDate = $("assetcertInfoPO.rejectD").value.replace(/-/g,"");//Ԥ�Ʊ�������
    if(buyDate != "" && availabilityD != ""){
    	if(parseInt(buyDate) > parseInt(availabilityD)){
    		alert("�ɹ�ʱ�䲻�����ڱ��޽�ֹ���ڣ�");
    		$("assetcertInfoPO.availabilityD").focus();
    		return false;
    	}
    }
    if(buyDate != "" && rejectDate != ""){
    	if(parseInt(buyDate) > parseInt(rejectDate)){
    		alert("�ɹ�ʱ�䲻������Ԥ�Ʊ������ڣ�");
    		$("assetcertInfoPO.rejectD").focus();
    		return false;
    	}
    }
    
    //Ԥ�Ʊ�������_����۾ɷ�ʽ���ǡ������۾ɡ�����ô"Ԥ�Ʊ�������"Ϊ������
   /* var  typeDepreciation = $("assetcertInfoPO.typeDepreciation").value;
    if(typeDepreciation != 1 && rejectDate == ""){
    	alert("������Ԥ�������ڣ�");
    	$("assetcertInfoPO.rejectD").focus();
    	return false;
    }*/
    //ȫ����֤ͨ��
    return true;
}

/** ---------------------------------------------------------------------------
 * ��֤�ʲ����
 * @author yelb
 ------------------------------------------------------------------------------*/
function checkPrepare(){
    if (document.getElementsByName("prepareName") != null) {
        prepareNames = document.getElementsByName("prepareName");
        prepareBrands = document.getElementsByName("prepareBrand");
        prepareStandards = document.getElementsByName("prepareStandard");
        prepareSums = document.getElementsByName("prepareSum");
        for (var index = 0; index < prepareNames.length; index++) {
            //�������
            if (prepareNames[index].value.trim() == "") {
                alert("������������ƣ�");
                prepareNames[index].value = "";
                prepareNames[index].focus();
                return false;
            } else {
                prepareNames[index].value = ToDBC(prepareNames[index].value.trim());
            }
            //���Ʒ��
            prepareBrands[index].value = ToDBC(prepareBrands[index].value.trim());
            //�������ͺ�
            prepareStandards[index].value = ToDBC(prepareStandards[index].value.trim());
            //����۸�
            if (prepareSums[index].value.trim() == "") {
                alert("����������۸�");
                prepareSums[index].value = "";
                prepareSums[index].focus();
                return false;
            } else if (isNaN(prepareSums[index].value)
                    || parseFloat(prepareSums[index].value).toFixed(2) < 0) {
                alert("����۸�������ʽ����ȷ��");
                prepareSums[index].focus();
                return false;
            } else if(parseInt(prepareSums[index].value).toString().length >8){
			    	alert("����۸���������ֲ��ܳ���8λ��!");
			        prepareSums[index].focus();
			    	return false;
			}
           prepareSums[index].value = parseFloat(prepareSums[index].value).toFixed(2);
        }
    }
    return true;
}
/**---------------------------------------------------------------------------
*���ת��Ϊȫ�Ǻ���
*-----------------------------------------------------------------------------*/
function ToDBC(txtstring) {
	return txtstring;
	/*
    var tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {//�ո�
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
 * �����ı���
 * @param {Object} valueKey �ļ�����������,����ԭ��
 * @param {Object} areaId �ļ����id
 * @param {Object} maxLength �ı����������󳤶�
 * @param {Object} allowEmpty �Ƿ������ı�������Ϊ�� trueΪ����falseΪ������
*-----------------------------------------------------------------------------*/
function checkTextarea(valueKey,areaId,maxLength,allowEmpty){
	var textArea = document.getElementById(areaId);
	if(textArea == null) {
		alert("�Ҳ���idΪ"+areaId+"���ļ�����");
		textArea.focus();
		return false;
	}
	//ȫ�ǺͰ�ǿո�
	if(!allowEmpty && textArea.value.replace(/[ ��]/g,"") == ""){
		alert(valueKey+"�����ݲ���Ϊ�գ�");
		textArea.vlaue = "";
		textArea.focus();
		return false;
	}
	if(textArea.value.length > maxLength){
		alert(valueKey+"���������ܳ���"+maxLength+"���֣�");
		textArea.focus();
		return false;
	}
	textArea.value = ToDBC(textArea.value.trim());//�������ַ�ת����ȫ��
	return true;
}
/**
 * ���ַ����Ŀ�ͷ��ȡָ�����ȵ��Ӵ�
 * @param {Object} obj ָ����Ԫ��
 * @param {Object} cutLength ָ���Ӵ��ĳ���
 */
function cutFrontStr(obj,cutLength){
	if(obj.value.length > cutLength) {
		obj.value = obj.value.substr(0,cutLength);
	}
}
/**
 * ���ڡ��۾ɷ�ʽ����ѡ�ͬ����Ԥ�Ʊ������ڡ��Ƿ�����Ҫ��Ҳ��ͬ��
 */
function changRejectdateTitle(){
	var title = "Ԥ�Ʊ�������";//Ԥ�Ʊ�������ǰth�е�����
	var typeDepreciation = $("typeDepreciation").value;
	if(1 != typeDepreciation){
		title += "&nbsp;<font color='#FF0000'>*</font>";
	}
	$("rejectD_title").innerHTML = title;
}
