/*
 -------------- �������� --------------
 trim����:                         trim() lTrim() rTrim() trimAll()
 У���ַ����Ƿ�Ϊ��:                 checkIsNotEmpty(str)
 У���ַ����Ƿ�Ϊ����:               checkIsInteger(str)
 У��������Сֵ:                    checkIntegerMinValue(str,val)
 У���������ֵ:                    checkIntegerMaxValue(str,val)
 У�������Ƿ�Ϊ�Ǹ���:               isNotNegativeInteger(str)
 У���ַ����Ƿ�Ϊ������:             checkIsDouble(str)
 У�鸡������Сֵ:                  checkDoubleMinValue(str,val)
 У�鸡�������ֵ:                  checkDoubleMaxValue(str,val)
 У�鸡�����Ƿ�Ϊ�Ǹ���:             isNotNegativeDouble(str)
 У���ַ����Ƿ�Ϊ������:             checkIsValidDate(str)
 У���������ڵ��Ⱥ�:                checkDateEarlier(strStart,strEnd)
 У���ַ����Ƿ�Ϊemail��:           checkEmail(str)

 У���ַ����Ƿ�Ϊ����:               checkIsChinese(str)
 �����ַ����ĳ��ȣ�һ�����������ַ�:   realLength()
 У���ַ����Ƿ�����Զ����������ʽ:   checkMask(str,pat)
 �õ��ļ��ĺ�׺��:                   getFilePostfix(oFile)
 ��֤IP��ַ�Ϸ���                      checkIpStr(ipStr)
 ��֤URL�Ϸ���                      checkURLStr(urlStr)
 ��������������λС��				numberCheckFloat(text)
 �ٷ�����������λС��				numberCheckPercent (text)
 У�鲼��ֵ							checkBool(val)
 -------------- �������� --------------
 */


/**
 * added by LxcJie 2004.6.25
 * ȥ������ո���
 * trim:ȥ�����߿ո� lTrim:ȥ����ո� rTrim: ȥ���ҿո�
 * �÷���
 *     var str = "  hello ";
 *     str = str.trim();
 */
String.prototype.trim = function()
{
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}
String.prototype.lTrim = function()
{
    return this.replace(/(^[\s]*)/g, "");
}
String.prototype.rTrim = function()
{
    return this.replace(/([\s]*$)/g, "");
}
/********************************** Empty **************************************/
/**
 *У���ַ����Ƿ�Ϊ��
 *����ֵ��
 *�����Ϊ�գ�����У��ͨ��������true
 *���Ϊ�գ�У�鲻ͨ��������false               �ο���ʾ��Ϣ����������Ϊ�գ�
 */
function checkIsNotEmpty(str)
{
    if (str.trim() == "")
        return false;
    else
        return true;
}
//~~~
/*--------------------------------- Empty --------------------------------------*/
/********************************** Integer *************************************/
/**
 *У���ַ����Ƿ�Ϊ����
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����      ����true
 *����ִ�ȫ��Ϊ���֣�У��ͨ��������true
 *���У�鲻ͨ����              ����false     �ο���ʾ��Ϣ�����������Ϊ���֣�
 */
function checkIsInteger(str, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (/^(\-?)(\d+)$/.test(str))
        return true;
    else {
        alert("�����" + name + "����Ϊ���֣�ǰ�����пո�!");
        return false;
    }
}
//~~~
/**
 *У��������Сֵ
 *str��ҪУ��Ĵ���  val���Ƚϵ�ֵ
 *
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����                ����true
 *����������������ڵ��ڸ���ֵ��У��ͨ��������true
 *���С�ڸ���ֵ��                        ����false              �ο���ʾ��Ϣ����������С�ڸ���ֵ��
 */
function checkIntegerMinValue(str, val)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (typeof(val) != "string")
        val = val + "";
    if (checkIsInteger(str) == true)
    {
        if (parseInt(str, 10) >= parseInt(val, 10))
            return true;
        else
            return false;
    }
    else
        return false;
}
//~~~
/**
 *У���������ֵ
 *str��ҪУ��Ĵ���  val���Ƚϵ�ֵ
 *
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����                ����true
 *�������������С�ڵ��ڸ���ֵ��У��ͨ��������true
 *������ڸ���ֵ��                        ����false       �ο���ʾ��Ϣ������ֵ���ܴ��ڸ���ֵ��
 */
function checkIntegerMaxValue(str, val)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (typeof(val) != "string")
        val = val + "";
    if (checkIsInteger(str) == true)
    {
        if (parseInt(str, 10) <= parseInt(val, 10))
            return true;
        else
            return false;
    }
    else
        return false;
}
//~~~
/**
 *У�������Ƿ�Ϊ�Ǹ���
 *str��ҪУ��Ĵ���
 *
 *����ֵ��
 *���Ϊ�գ�����У��ͨ��������true
 *����Ǹ�����            ����true
 *����Ǹ�����            ����false               �ο���ʾ��Ϣ������ֵ�����Ǹ�����
 */
function isNotNegativeInteger(str, name)
{
    //���Ϊ�գ���ͨ��У��
    // if (str == "")
    //     return true;
    if (checkIsInteger(str, name) == true)
    {
        if (parseInt(str, 10) < 0) {
            alert("��" + name + "������Ϊ����");
            return false;
        }
        else
            return true;
    }
    else {
        //  alert("��" + name + "��ǰ�����пո�����ı���Ϊ���֣�");
        return false;
    }

}

/**
 zhangjing
 *У�������Ƿ�Ϊ������()
 *str��ҪУ��Ĵ���
 *
 *����ֵ��
 *�����������            ����true
 *���������������0����            ����false               �ο���ʾ��Ϣ������ֵ�����Ǹ�����
 */
function isPositiceInteger(str, name)
{
    if (/^[0-9]*[1-9][0-9]*$/.test(str)) {
        return true;
    } else {
        alert("��" + name + "��ǰ�����пո�����ı���Ϊ���֣�");
        return false;
    }

}
//~~~
/*--------------------------------- Integer --------------------------------------*/
/********************************** Double ****************************************/
/**
 *У���ַ����Ƿ�Ϊ������
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����      ����true
 *����ִ�Ϊ�����ͣ�У��ͨ����  ����true
 *���У�鲻ͨ����              ����false     �ο���ʾ��Ϣ���������ǺϷ��ĸ�������
 */
function checkIsDouble(str, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    //�������������У����������Ч��
    if (str.indexOf(".") == -1)
    {
        if (checkIsInteger(str, name) == true)
            return true;
        else
            return false;
    }
    else
    {
        if (/^(\-?)(\d+)(.{1})(\d+)$/g.test(str))
            return true;
        else {
            alert("�����" + name + "��������������С����")
            return false;
        }
    }
}

/********************* zhangjing     ��֤������Ϊ�� ************************/
function checkDoubleLength(str, start, end, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;

    if (checkIsDouble(str, name) == true) {
        var s = str.split(".");
        if (s[1] != null) {
            if (s[0].length > start) {
                alert("�����" + name + "С����ǰ���" + start + "λ");
                return false;
            }
            else if (s[1].length > end) {
                alert("�����" + name + "С��������" + end + "λ");
                return false;
            }
            return true;
        }
        else {
            if (str.length > start) {
                alert("�����" + name + "���" + start + "λ");
                return false;
            }
            return true;
        }
        return true;
    }
    else
        return false;
}


//~~~
/**
 *У�鸡������Сֵ
 *str��ҪУ��Ĵ���  val���Ƚϵ�ֵ
 *
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����                ����true
 *����������������ڵ��ڸ���ֵ��У��ͨ��������true
 *���С�ڸ���ֵ��                        ����false              �ο���ʾ��Ϣ����������С�ڸ���ֵ��
 */
function checkDoubleMinValue(str, val, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (typeof(val) != "string")
        val = val + "";
    if (checkIsDouble(str) == true) {

        if (parseFloat(str) >= parseFloat(val))
            return true;
        else
            return false;

    }
    else
        return false;
}
//~~~
/**
 *У�鸡�������ֵ
 *str��ҪУ��Ĵ���  val���Ƚϵ�ֵ
 *
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����                ����true
 *�������������С�ڵ��ڸ���ֵ��У��ͨ��������true
 *������ڸ���ֵ��                        ����false       �ο���ʾ��Ϣ������ֵ���ܴ��ڸ���ֵ��
 */
function checkDoubleMaxValue(str, val, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (typeof(val) != "string")
        val = val + "";
    if (checkIsDouble(str, name) == true)
    {
        if (parseFloat(str) <= parseFloat(val))
            return true;
        else {
            alter("�����" + name + "���������ܳ���" + val);
            return false;
        }
    }
    else
        return false;
}
//~~~
/**
 *У�鸡�����Ƿ�Ϊ�Ǹ���
 *str��ҪУ��Ĵ���
 *
 *����ֵ��
 *���Ϊ�գ�����У��ͨ��������true
 *����Ǹ�����            ����true
 *����Ǹ�����            ����false               �ο���ʾ��Ϣ������ֵ�����Ǹ�����
 */
function isNotNegativeDouble(str, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (checkIsDouble(str, name) == true)
    {
        if (parseFloat(str) < 0) {
            alert("��" + name + "������Ϊ����");
            return false;
        } else
            return true;
    }
    else
        return false;
}
//~~~
/*--------------------------------- Double ---------------------------------------*/


//~~~
/*--------------------------------- date -----------------------------------------*/
/********************************** email *****************************************/
/**
 *У���ַ����Ƿ�Ϊemail��
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����           ����true
 *����ִ�Ϊemail�ͣ�У��ͨ����      ����true
 *���email���Ϸ���                  ����false    �ο���ʾ��Ϣ��Email�ĸ�ʽ�����_��
 */
function checkEmail(str, name)
{
    //���Ϊ�գ���ͨ��У��
    if (str == "")
        return true;
    if (str.charAt(0) == "." || str.charAt(0) == "@" || str.indexOf('@', 0) == -1
            || str.indexOf('.', 0) == -1 || str.lastIndexOf("@") == str.length - 1 || str.lastIndexOf(".") == str.length - 1) {
        alert("����ġ�" + name + "����ʽ����");
        return false;
    }
    else {
        return true;
    }
}
//~~~
/*--------------------------------- email ----------------------------------------*/
/********************************** chinese ***************************************/
/**
 *У���ַ����Ƿ�Ϊ����
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����           ����true
 *����ִ�Ϊ���ģ�У��ͨ����         ����true
 *����ִ�Ϊ�����ģ�             ����false    �ο���ʾ��Ϣ������Ϊ���ģ�
 */
function checkIsChinese(str)
{
    //���ֵΪ�գ�ͨ��У��
    if (str == "")
        return true;
    var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
    if (pattern.test(str))
        return true;
    else
        return false;
}
//~~~
/**
 * �����ַ����ĳ��ȣ�һ�����������ַ�
 */
String.prototype.realLength = function()
{
    return this.replace(/[^\x00-\xff]/g, "**").length;
}
/*--------------------------------- chinese --------------------------------------*/
/********************************** mask ***************************************/
/**
 *У���ַ����Ƿ�����Զ����������ʽ
 *str ҪУ����ִ�  pat �Զ�����������ʽ
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����           ����true
 *����ִ����ϣ�У��ͨ����           ����true
 *����ִ������ϣ�                   ����false    �ο���ʾ��Ϣ����������***ģʽ
 */
function checkMask(str, pat)
{
    //���ֵΪ�գ�ͨ��У��
    if (str == "")
        return true;
    var pattern = new RegExp(pat, "gi")
    if (pattern.test(str))
        return true;
    else
        return false;
}
//~~~
/*--------------------------------- mask --------------------------------------*/
/********************************** file ***************************************/
/**
 * added by LxcJie 2004.6.25
 * �õ��ļ��ĺ�׺��
 * oFileΪfile�ؼ�����
 */
function getFilePostfix(oFile)
{
    if (oFile == null)
        return null;
    var pattern = /(.*)\.(.*)$/gi;
    if (typeof(oFile) == "object")
    {
        if (oFile.value == null || oFile.value == "")
            return null;
        var arr = pattern.exec(oFile.value);
        return RegExp.$2;
    }
    else if (typeof(oFile) == "string")
    {
        var arr = pattern.exec(oFile);
        return RegExp.$2;
    }
    else
        return null;
}


// zhangjing
function checkRequired(value, name) {
    if (value == "") {
        alert("��" + name + "������");
        return false;
    }
    return true;
}

function checkSelected(value, name) {
    if (value == -1) {
        alert("��" + name + "��û��ѡ��");
        return false;
    }
    return true;
}

function chectNumber(value, name) {
    var Letters = "1234567890";
    var i;
    var c;

    for (i = 0; i < value.length; i++)
    {
        c = value.charAt(i);
        if (Letters.indexOf(c) == -1)
        {
            alert(name);
            return false;
        }
    }
    return true;
}

function checkSign(value, name) {
    if (value.substring(0, 1) == "`") {
        alert("����ġ�" + name + "����Ҫ�ԡ��ࡱ��ͷ");
        return false;
    }
    return true;
}


//zzq
function clearAllTextField() {
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        if (document.forms[0].elements[i].type == 'text' || document.forms[0].elements[i].type == 'textarea') {
            document.forms[0].elements[i].value = "";
        }
    }
}
//�������ѡ
function clearAllSelectField() {
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        if (document.forms[0].elements[i].type == 'select-one') {
            document.forms[0].elements[i].options.selectedIndex = 0;
        }
    }
}

//����ҳ�������
//����formIndexΪ��Ҫ���õ�form����ţ�Ĭ��Ϊ��һ��form
function resetQuery(formIndex) {
    if (formIndex == undefined)
        formIndex = 0;
    var inputfields = document.forms[formIndex].getElementsByTagName("input");
    for (i = 0; i < inputfields.length; i++) {
        if (inputfields[i].type == "checkbox")
            inputfields[i].checked = false;
        else if (inputfields[i].type == "text")
            inputfields[i].value = "";
    }
    var selectfields = document.forms[formIndex].getElementsByTagName("select");
    for (i = 0; i < selectfields.length; i++) {
        selectfields[i].options[0].selected = true;
    }
    var textareafields = document.forms[formIndex].getElementsByTagName("textarea");
    for (i = 0; i < textareafields.length; i++) {
        textareafields[i].value = "";
    }
}
//zzq
function disableAllBts() {
    for (var f = 0; f < document.forms.length; f++) {
        for (var i = 0; i < document.forms[f].elements.length; i++) {
            if (document.forms[f].elements[i].type == 'button' || document.forms[f].elements[i].type == 'submit' ||
                document.forms[f].elements[i].type == 'reset') {
                document.forms[f].elements[i].disabled = true;
            }
        }
    }
}
//tanyang ���ӻָ�button
function restoreAllBts() {
    for (var f = 0; f < document.forms.length; f++) {
        for (var i = 0; i < document.forms[f].elements.length; i++) {
            if (document.forms[f].elements[i].type == 'button' || document.forms[f].elements[i].type == 'submit' ||
                document.forms[f].elements[i].type == 'reset') {
                document.forms[f].elements[i].disabled = false;
            }
        }
    }
}
//zhangjing  ��֤IP��ַ�Ϸ���
function checkIp(value)
{
    if (value == "") {
        return true;
    }
    var pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
    flag_ip = pattern.test(value);
    if (!flag_ip) {
        alert("IP��ַ����Ƿ�!");
        return false;
    }
    return true;
}

// ȥ�����ҿո񲢽�ȥ���ո��ֵ���ر���
function trimAll(formIndex) {
    if (formIndex == undefined)
        formIndex = 0;
    var fields = document.forms[formIndex].getElementsByTagName("input");
    for (i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (field.type == "text")
            field.value = field.value.trim();
    }
    return true;
}

//��֤������ֶ��в��ܺ��пո�    add zhangjing
function checkAllNullSign(value, name, length) {
    for (var i = 0; i < length; i++) {
        if (value.substring(i, i + 1) == " ") {
            alert("�����" + name + "�в��ܺ��пո�");
            return false;
        }
    }
    return true;
}
//��֤������ֶ���β���ܺ��пո�     add zhangjing
function checkNullSign(value, name, length) {
    if (value.substring(0, 1) == " ") {
        alert("�����" + name + "�п�ʼ���ܺ��пո�");
        return false;
    }
    if (value.substring(length - 1, length) == " ") {
        alert("�����" + name + "��ĩβ���ܺ��пո�");
        return false;
    }
    return true;
}
//��֤��ѯ�����в��ܺ��С�'��   add zhangjing
function checkOtherSign(value, name, length) {
    for (var i = 0; i < length; i++) {
        if (value.substring(i, i + 1) == "'") {
            alert("�����" + name + "�в��ܺ��С� ' ���ַ�");
            return false;
        }
    }
    return true;
}

//��֤�����ַ����Ƿ��С�+ ��% '�������ַ� add caill
function checkSpectCharactor(value, name, length) {
    for (var i = 0; i < length; i++) {
        if (value.substring(i, i + 1) == "'" || value.substring(i, i + 1) == "+" || value.substring(i, i + 1) == "%" || value.substring(i, i + 1) == "?") {
            alert("�����" + name + "�в��ܰ�����+ ��% '�������ַ���");
            return false;
        }
    }
    return true;
}
/**
 * auther:zhangjing
 *
 * ��֤ʱ���Ƿ���ϸ�ʽ
 * ��ȷ��ʽ��yyyy-MM-dd HH:mm:ss
 *
 * str:��֤��ʱ�䴮
 * name:��֤��ʱ������
 *
 * strΪ��ͨ����֤  str��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkDate(str, name) {
    if (str != null) {
        if (str.length != 19) {
            alert("'" + name + "' �ĸ�ʽ������Ҫ��,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm:ss) ");
            return false;
        }
    }

    var a = str.match(/^(\d{0,4})-(\d{0,2})-(\d{0,2}) (\d{0,2}):(\d{0,2}):(\d{0,2})$/);
    if (a != null) {
        var day;
        var tmp = new Date(a[1], a[2], 0);
        if (tmp.getDate() <= 28) {
            day = 29;
        } else if (tmp.getDate() <= 29) {
            day = 30;
        } else if (tmp.getDate() <= 30) {
            day = 31;
        } else if (tmp.getDate() <= 31) {
            day = 32;
        }
        if (a[2] >= 13 || a[3] >= day || a[4] >= 24 || a[5] >= 60 || a[6] >= 60) {
            alert("'" + name + "' �ĸ�ʽ������Ҫ���������Ч,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm:ss) ");
            return false;
        }
    }
    var time = str.split(" ");
    if (!checkIsValidDay(time[0])) {
        alert("'" + name + "' �ĸ�ʽ������Ҫ��,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm:ss) ");
        return false;
    }
    if (!checkIsValidTime(time[1])) {
        alert("'" + name + "' �ĸ�ʽ������Ҫ��,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm:ss) ");
        return false;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤ʱ���Ƿ���ϸ�ʽ
 * ��ȷ��ʽ��yyyy-MM-dd HH:mm
 *
 * str:��֤��ʱ�䴮
 * name:��֤��ʱ������
 *
 * strΪ��ͨ����֤  str��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkDates(str, name) {
    if (str != null) {
        if (str.length != 16) {
            alert("'" + name + "' �ĸ�ʽ������Ҫ��,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm) ");
            return false;
        }
    }

    var a = str.match(/^(\d{0,4})-(\d{0,2})-(\d{0,2}) (\d{0,2}):(\d{0,2}):(\d{0,2})$/);
    if (a != null) {
        var day;
        var tmp = new Date(a[1], a[2], 0);
        if (tmp.getDate() <= 28) {
            day = 29;
        } else if (tmp.getDate() <= 29) {
            day = 30;
        } else if (tmp.getDate() <= 30) {
            day = 31;
        } else if (tmp.getDate() <= 31) {
            day = 32;
        }
        if (a[2] >= 13 || a[3] >= day || a[4] >= 24 || a[5] >= 60) {
            alert("'" + name + "' �ĸ�ʽ������Ҫ���������Ч,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm) ");
            return false;
        }
    }
    var time = str.split(" ");
    if (!checkIsValidDay(time[0])) {
        alert("'" + name + "' �ĸ�ʽ������Ҫ��,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm) ");
        return false;
    }
    if (!checkIsValidTimes(time[1])) {
        alert("'" + name + "' �ĸ�ʽ������Ҫ��,��������д.(��ȷ��ʽ:yyyy-MM-dd HH:mm) ");
        return false;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤��ʼʱ�䲻�ܴ��ڽ���ʱ��
 * ��֤��ʱ���ʽ�ǣ�yyyy-MM-dd HH:mm:ss ; yyyy-MM-dd ; yyyy-MM-dd HH:mm
 *
 * beginTime:��ʼʱ�䴮
 * endTime:����ʱ�䴮
 * beginName:��֤�Ŀ�ʼʱ������
 * endName:��֤�Ľ���ʱ������
 *
 * beginTime,endTimeΪ��ͨ����֤  beginTime,endTime��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkTime(beginTime, endTime, beginName, endName) {

    if (beginTime != "" && endTime != "") {
        if ((beginTime.length == 19 && endTime.length == 19) || (beginTime.length == 16 && endTime.length == 16)) {     //��֤��ʱ���ʽ�ǣ�yyyy-MM-dd HH:mm:ss , yyyy-MM-dd HH:mm
            if (!checkDay(beginTime, endTime)) {
                alert("'" + beginName + "' �е����ڴ��� '" + endName + "' �е�����");
                return false;
            }
        } else if (beginTime.length == 10 && endTime.length == 10) {   //��֤��ʱ���ʽ�ǣ�yyyy-MM-dd
            if (!checkAfterTime(beginTime, endTime)) {
                alert("'" + beginName + "' �е����ڴ��� '" + endName + "' �е�����");
                return false;
            }
            return true;
        }
        return true;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤ʱ����ڵ�ǰʱ��
 * ��֤��ʱ���ʽ�ǣ�yyyy-MM-dd HH:mm:ss ; yyyy-MM-dd ; yyyy-MM-dd HH:mm
 *
 * str:��֤ʱ�䴮
 * name:��֤ʱ������
 *
 * strΪ��ͨ����֤  str��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function compareDate(str, name) {

    if (str != "") {
        var today = new Date();
        var strToDay = today.getYear() + "-";
        if ((today.getMonth() + 1) < 10) {
            strToDay = strToDay + "0" + (today.getMonth() + 1);
        } else {
            strToDay = strToDay + (today.getMonth() + 1);
        }
        if (today.getDate() < 10) {
            strToDay = strToDay + "-0" + today.getDate();
        } else {
            strToDay = strToDay + "-" + today.getDate();
        }
        if (today.getHours() < 10) {
            strToDay = strToDay + " 0" + today.getHours();
        } else {
            strToDay = strToDay + " " + today.getHours();
        }
        if (today.getMinutes() < 10) {
            strToDay = strToDay + ":0" + today.getMinutes();
        } else {
            strToDay = strToDay + ":" + today.getMinutes();
        }
        if (today.getSeconds() < 10) {
            strToDay = strToDay + ":0" + today.getSeconds();
        } else {
            strToDay = strToDay + ":" + today.getSeconds();
        }
        var toDay = strToDay.split(" ");
        if (str.length == 19) {       //��֤��ʱ���ʽ�ǣ�yyyy-MM-dd HH:mm:ss
            if (!checkDay(strToDay, str)) {
                alert("'" + name + "' ������� '��ǰʱ�� " + strToDay + " '");
                return false;
            }
        } else if (str.length == 16) {      //��֤��ʱ���ʽ�ǣ� yyyy-MM-dd HH:mm
            if (!checkDay(strToDay, str)) {
                alert("'" + name + "' ������� '��ǰʱ�� " + strToDay + " '");
                return false;
            }
        } else if (str.length = 10) {   //��֤��ʱ���ʽ�ǣ�yyyy-MM-dd
            if (!checkAfterTime(toDay[0], str)) {
                alert("'" + name + "' ������� '��ǰʱ�� " + toDay[0] + " '");
                return false;
            }
        }
        return true;
    }
    return true;
}


/********************************** date ******************************************/
/**
 *У���ַ����Ƿ�Ϊ������
 *����ֵ��
 *���Ϊ�գ�����У��ͨ����           ����true
 *����ִ�Ϊ�����ͣ�У��ͨ����       ����true
 *������ڲ��Ϸ���                   ����false    �ο���ʾ��Ϣ���������ʱ�䲻�Ϸ�����yyyy-MM-dd��
 */
function checkIsValidDate(str)
{
    //���Ϊ�գ���ͨ��У��
    //  if (str == "")
    //     return true;
    var pattern = /^((\d{4})|(\d{2}))-(\d{1,2})-(\d{1,2})$/g;
    if (!pattern.test(str)) {
        //  alert("ʱ���ʽ����ȷ");
        return false;
    }

    var arrDate = str.split("-");
    if (parseInt(arrDate[0], 10) < 100)
        arrDate[0] = 2000 + parseInt(arrDate[0], 10) + "";
    var date = new Date(arrDate[0], (parseInt(arrDate[1], 10) - 1) + "", arrDate[2]);
    if (date.getYear() == arrDate[0]
            && date.getMonth() == (parseInt(arrDate[1], 10) - 1) + ""
            && date.getDate() == arrDate[2])
        return true;
    else {
        // alert("ʱ���ʽ����ȷ");
        return false;
    }
}
//~~~
/**
 *У���������ڵ��Ⱥ�
 *����ֵ��
 *���������һ������Ϊ�գ�У��ͨ��,          ����true
 *�����ʼ�������ڵ�����ֹ���ڣ�У��ͨ����   ����true
 *�����ʼ����������ֹ���ڣ�                 ����false    �ο���ʾ��Ϣ�� ��ʼ���ڲ������ڽ������ڡ�
 */
function checkDateEarlier(strStart, strEnd)
{
 //�����һ������Ϊ�գ���ͨ������
    if (( strStart == "" ) || ( strEnd == "" ))
         return true;
    if (checkIsValidDate(strStart) == false || checkIsValidDate(strEnd) == false) {
        alert("ʱ���ʽ����ȷ");
        return false;
    }
   
    var arr1 = strStart.split("-");
    var arr2 = strEnd.split("-");
    var date1 = new Date(arr1[0], parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
    var date2 = new Date(arr2[0], parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
    if (arr1[1].length == 1)
        arr1[1] = "0" + arr1[1];
    if (arr1[2].length == 1)
        arr1[2] = "0" + arr1[2];
    if (arr2[1].length == 1)
        arr2[1] = "0" + arr2[1];
    if (arr2[2].length == 1)
        arr2[2] = "0" + arr2[2];
    var d1 = arr1[0] + arr1[1] + arr1[2];
    var d2 = arr2[0] + arr2[1] + arr2[2];
    if (parseInt(d1, 10) > parseInt(d2, 10)) {
        alert("��ʼʱ�䲻�����ڽ���ʱ��");
        return false;
    }
    else
        return true;
}


/**
 * auther:zhangjing
 *
 * ��֤��ʼʱ����ڽ���ʱ��  �򷵻�false
 * ��֤��ʱ���ʽ�ǣ�yyyy-MM-dd
 *
 * beginTime:��ʼʱ�䴮
 * endTime:����ʱ�䴮
 *
 */
function checkDateEarlierEq(strStart, strEnd)
{
    var arr1 = strStart.split("-");
    var arr2 = strEnd.split("-");
    var date1 = new Date(arr1[0], parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
    var date2 = new Date(arr2[0], parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
    if (arr1[1].length == 1)
        arr1[1] = "0" + arr1[1];
    if (arr1[2].length == 1)
        arr1[2] = "0" + arr1[2];
    if (arr2[1].length == 1)
        arr2[1] = "0" + arr2[1];
    if (arr2[2].length == 1)
        arr2[2] = "0" + arr2[2];
    var d1 = arr1[0] + arr1[1] + arr1[2];
    var d2 = arr2[0] + arr2[1] + arr2[2];
    if (parseInt(d1, 10) == parseInt(d2, 10)) {
        return false;
    }
    else
        return true;
}
/**
 * auther:zhangjing
 *
 * ��֤��ʼʱ�䲻С�ڽ���ʱ��
 * ��֤��ʱ���ʽ�ǣ�yyyy-MM-dd
 *
 * beginTime:��ʼʱ�䴮
 * endTime:����ʱ�䴮
 *
 * strStart,strEndΪ��ͨ����֤  strStart,strEnd��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkAfterTime(strStart, strEnd)
{
    if (strStart != "" && strEnd != "") {
        var arr1 = strStart.split("-");
        var arr2 = strEnd.split("-");
        var date1 = new Date(arr1[0], parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
        var date2 = new Date(arr2[0], parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
        if (arr1[1].length == 1)
            arr1[1] = "0" + arr1[1];
        if (arr1[2].length == 1)
            arr1[2] = "0" + arr1[2];
        if (arr2[1].length == 1)
            arr2[1] = "0" + arr2[1];
        if (arr2[2].length == 1)
            arr2[2] = "0" + arr2[2];
        var d1 = arr1[0] + arr1[1] + arr1[2];
        var d2 = arr2[0] + arr2[1] + arr2[2];
        if (parseInt(d1, 10) > parseInt(d2, 10)) {
            return false;
        }
        return true;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤ʱ��ĺϷ���
 * ��֤��ʱ���ʽ�ǣ�HH:mm:ss
 *
 * str:ʱ�䴮

 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkIsValidTime(str) {
    var pattern = /^(20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/;
    if (!pattern.test(str)) {
        return false;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤ʱ��ĺϷ���
 * ��֤��ʱ���ʽ�ǣ�HH:mm
 *
 * str:ʱ�䴮

 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkIsValidTimes(str) {
    var pattern = /^(20|21|22|23|[0-1]?\d):[0-5]?\d$/;
    if (!pattern.test(str)) {
        return false;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤ʱ��ĺϷ���
 * ��֤��ʱ���ʽ�ǣ�yyyy-MM-dd
 *
 * str:ʱ�䴮

 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function checkIsValidDay(str) {
    var pattern = /^((\d{4})|(\d{2}))-(\d{1,2})-(\d{1,2})$/g;
    if (!pattern.test(str)) {
        return false;
    }
    return true;
}

/**
 * auther:zhangjing
 *
 * ��֤��ʼʱ�䲻�ܴ��ڽ���ʱ��
 * ��֤��ʱ���ʽ�ǣ�HH:mm:ss �� HH:mm �� HH
 *
 * beginTime:��ʼʱ�䴮
 * endTime:����ʱ�䴮
 *
 * beginTime,endTimeΪ��ͨ����֤  beginTime,endTime��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */
function compareWithTime(beginTime, endTime) {
    if (beginTime != "" && endTime != "") {
        var arrDate1 = beginTime.split(":");
        var arrDate2 = endTime.split(":");
        if (parseInt(arrDate1[0], 10) > parseInt(arrDate2[0], 10)) {
            return false;
        }
        else if (parseInt(arrDate1[0], 10) == parseInt(arrDate2[0], 10)) {
            if (arrDate1[1] != undefined && arrDate2[1] != undefined) {
                if (parseInt(arrDate1[1], 10) > parseInt(arrDate2[1], 10)) {
                    return false;
                }
                else if (parseInt(arrDate1[1], 10) == parseInt(arrDate2[1], 10)) {
                    if (arrDate1[2] != undefined && arrDate2[2] != undefined) {
                        if (parseInt(arrDate1[2], 10) > parseInt(arrDate2[2], 10))
                            return false;
                    }
                }
            }
        }
        return true;
    }
    return true;
}
/**
 * auther:zhangjing
 *
 * ��֤��ʼʱ�䲻С�ڽ���ʱ��
 * ��֤��ʱ���ʽ�ǣ�yyyy-MM-dd HH:mm:ss
 *
 * strStart:��ʼʱ�䴮
 * strEnd:����ʱ�䴮
 *
 * strStart,strEndΪ��ͨ����֤  strStart,strEnd��Ϊ�ս��и�ʽ��֤
 *
 * return:  ��֤ͨ������true ʧ�ܷ���false
 */

function checkDay(strStart, strEnd)
{
    if (strStart != "" && strEnd != "") {
        var str1 = strStart.split(" ");
        var str2 = strEnd.split(" ");
        var arr1 = str1[0].split("-");
        var arr2 = str2[0].split("-");
        var date1 = new Date(arr1[0], parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
        var date2 = new Date(arr2[0], parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
        if (arr1[1].length == 1)
            arr1[1] = "0" + arr1[1];
        if (arr1[2].length == 1)
            arr1[2] = "0" + arr1[2];
        if (arr2[1].length == 1)
            arr2[1] = "0" + arr2[1];
        if (arr2[2].length == 1)
            arr2[2] = "0" + arr2[2];
        var d1 = arr1[0] + arr1[1] + arr1[2];
        var d2 = arr2[0] + arr2[1] + arr2[2];
        if (parseInt(d1, 10) > parseInt(d2, 10)) {
            return false;
        }
        if (parseInt(d1, 10) == parseInt(d2, 10)) {
            if (!compareWithTime(str1[1], str2[1])) {
                return false;
            }
        }
        return true;
    }
    return true;

}
//check IP string format
function checkIpStr(ipStr)
{
    if (ipStr == "")
    {
        return false;
    }

    //no Chinese characters
    if (ipStr.match(/[\u4E00-\u9FA5]/) != null)
    {
        return false;
    }

    //4 segments with 3 dot
    if (ipStr.length > 15)
    {
        return false;
    }
    if (ipStr.length < 7)
    {
        return false;
    }

    //no " "
    if (ipStr.indexOf(" ") != -1)
    {
        return false;
    }
    var ipDomainPat = /^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var IPArray = ipStr.match(ipDomainPat);
    if (IPArray != null)
    {
        for (var i = 1; i <= 4; i++)
        {
            if (i == 1)
            {
                if (IPArray[i] == 0 || IPArray[i] > 240)
                {
                    return false;
                }
            }
            else
            {
                if (IPArray[i] > 255)
                {
                    return false;
                }
            }
        }
        return true;
    }

    return false;
}

//check URL 
function checkURLStr(urlStr) {
    var pattern = /^http(s)?:\/\/([\w\u4e00-\u9fa5-]+\.)+[\w\u4e00-\u9fa5-]+((:\d+)?)+(\/[\w\u4e00-\u9fa5- .\?%&=]+)*$/;
    if (!pattern.test(urlStr)) {
        alert("��������ȷ��URL��ַ��");
        return false;
    }
    return true;
}

//��������������λС��
function numberCheckFloat(text) {
    //alert(text);
    var regex = /^([1-9]|[1-9]|(0[.])|((0[.])))[0-9]{0,}(([.]*\d{1,2})|[0-9]{0,})$/;
    if (!regex.test(text)) {
        alert('��������ȷ�ĸ�����������2λС����');
        return false;
    }
    return true;
}
//�ٷ�����������λС��
function numberCheckPercent(text) {
    var regex = /^([1-9]|[1-9]|(0[.])|((0[.])))[0-9]{0,}(([.]*\d{1,2})|[0-9]{0,})$/;
    if (!regex.test(text) || text > 100) {
        alert('��������ȷ�İٷ���������2λС����');
        return false;
    }
    return true;
}

function checkBool(val) {
    if ('true,false'.indexOf(val) < 0) {
        alert("��������ȷ����ֵ��");
        return false;
    }
    return true;
}
function checkString(val,name){
    var exp = new RegExp("^[A-Za-z0-9./:]*$");
    if(!exp.test(val)){
        alert(name+"��Ҫ���������ַ���");
        return false;
    }
    return true;
}

function checkdatatype(data_type, val, kpiName) {
		//�ǿ�У��
		if(val==''){
			return true;
		}
        //String
        if (data_type == 0) {
			return true;
            //return checkString(val, kpiName);
        }
        //boolean
        else if (data_type == 5) {
            return checkBool(val);
        }
        //integer
        else  if (data_type == 10) {
            return isNotNegativeInteger(val, kpiName);
        }
        //float
        else if (data_type == 15) {
            return numberCheckFloat(val);
        }
        //�ٷֱ�
        else if (data_type == 16) {
            return numberCheckPercent(val);
        }
        //anyURI��������ʾʱ����Ҫ�ṩ������
        else if (data_type == 35) {
            return checkURLStr(val);
        }
        //IPv4����192.168.1.2
        else if (data_type == 40) {
            if (!checkIpStr(val)) {
                alert(kpiName + '��������ȷ��ʽ��IP��ַ��');
                return false;
            }
            return true;
        }
        else
            return true;
    }


/*
�Ż�EXt���ڴ�й¶����
���ڿ���Ϊ�ؼ��෢��
zhangc 20091103
*/
var addEvent=function (/*documentElement*/el,/*eventType*/type,/*method*/fn){/*zowell20090209*/
	if (window.addEventListener) {el.addEventListener(type, fn, false);} 
    else if (window.attachEvent) {el.attachEvent('on'+type, fn);}
	}
var removeEvent=function (el,type,fn){/*zowell20090209*/
	try{
	if (window.removeEventListener) {el.removeEventListener(type, fn);} 
    else if (window.detachEvent ) {el.detachEvent('on'+type, fn);}	
		}catch(e){}
	
	}
var collectGarbageManager=new function(){
	var topWin=null;
	var self=this;
	var num=0
	var Collect=function(win){
		  win.document.write("");
          win.document.clear();
		  if(win!=topWin)removeIframe(win);
		  CollectGarbage();
		};
	var removeIframe=function(win){
		var _fa = win.parent.document.getElementsByTagName("IFRAME");
			for(var _i=0;_i<_fa.length;_i++ ){
				if(win.parent.frames[_i]==win){
					_fa[_i].removeNode(true);
					obj=null;
					break;
					}
				}
		var _fa = win.parent.document.getElementsByTagName("FRAME");
			for(var _i=0;_i<_fa.length;_i++ ){
				if(win.parent.frames[_i]==win){
					_fa[_i].removeNode(true);
					obj=null;
					break;
					}
				}		
			};
	this.setTopWin=function(t){topWin=t;}
	this.drill=function(win,fun){
		var fa = win.frames;
		for(var i=0;i<fa.length;i++){
			fun(win.frames[i]);
			}	
		};
	this.frameCG=function(win){
		var _fa = win.frames;
		if(_fa&&_fa.length>0){self.drill(win,self.frameCG);}
		else{
			var pwin=win.parent;
			Collect(win);
			if(win!=topWin)self.drill(pwin,self.frameCG);
			}
		};
	this.doCollect=function(win){
		if(win)self.setTopWin(win);
		self.drill(topWin,self.frameCG);
		}
	}

addEvent(window, 'load', function() {
	addEvent(window.document.body, 'mousedown', function(evts) {
		var $=function(e){return document.getElementById(e);};	
		evts=evts||window.event;
		var target = evts.target || evts.srcElement;
		if(target&&target.tagName){
			var tagN=target.tagName.toLowerCase()
			if(tagN=="div"){
			if(target.id&&target.id.indexOf("ext-gen")>=0&&target.className.indexOf("close-icon")>=0){
				var id=(target.parentNode.childNodes[0].innerHTML)
				collectGarbageManager.doCollect(window.frames[id])
			}}
		}
		
	});
});
