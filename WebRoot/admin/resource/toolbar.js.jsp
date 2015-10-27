<%@ page contentType="text/javascript; charset=GBK" %>

<%@ include file="../common/taglib.jsp" %>

<!--

//-->
//ע�����μ�
var shift = false;
var MyKeyDown = function() {
    if (event.ctrlKey) shift = true;
    if (event.shiftKey) shift = true;
    return true;
};
document.onkeydown = MyKeyDown;
var showMsg = true;

function setCookie(sName, sValue, nDays) {
    var expires = "";
    if (nDays) {
        var d = new Date();
        d.setTime(d.getTime() + nDays * 24 * 60 * 60 * 1000);
        expires = "; expires=" + d.toGMTString();
    }
    document.cookie = sName + "=" + sValue + expires + "; path=/";
}

var loadDoc = function(url, label) {
            var frame = Ext.get("main");
            var ret = /javascript:/gi;
            if (ret.test(url)) {
                var funStr = url.replace(ret, "");
                EHM.eval(funStr);
            } else if (frame) {
                if (url != "") {
                        frame.dom.src = url;
                }
            }
        };

//-----------------------------------------------------------------------------------------------------------------------------------------
var init_toolbar = function() {

    var tb = EHM.ToolbarInstance = new EHM.Toolbar('toolbar');

    //��Ĭ����ҳ
    //layout.getRegion('west').hide();
  // src="<c:url value='/portal/getPortalInstance.do?tmplateCode=40282ede2b192d8f012b194289520001'/>" 

    //����һ���˵�
    tb.addButton({ icon:"resource/style/xtheme/blue/images/header/home.png",text: '��ҳ' ,handler: function() {
          layout.getRegion('west').hide();
          loadDoc(home_page, "��ҳ");
     } });

    <eap:param_if name="�˵�ģʽ" value="PANEL">

        <logic:present name="mainMenu">
        <logic:iterate id="menu" name="mainMenu" indexId="index">
            tb.addButton({ text: '<bean:write name="menu"
                                              property="functionName"/>',icon:'<bean:write name="menu" property="viewIcon"/>' ,handler: function() {
                loadMenu("showOutlookMenu.do?MenuID=<bean:write
                name="menu" property="functionID"/>", "<bean:write name="menu" property="functionName"/>");
                //��Ĭ��portalҳ
                loadDoc("<bean:write name="menu" property="functionValue"/>", "<bean:write name="menu" property="functionName"/>");
            } });

        </logic:iterate>
        </logic:present>

        tb.addSeparator();
        //��ݲ˵�
        <logic:present name="ShortcutMenu">
        <logic:iterate id="ShortcutMenu" name="ShortcutMenu" indexId="index">
            tb.addButton({ text: '<bean:write name="ShortcutMenu" property="name"/>',icon:'<bean:write name="ShortcutMenu" property="icon"/>',handler: function() {
                loadDocWarp("<c:url
                value="${ShortcutMenu.url}"/>", "<bean:write name="ShortcutMenu" property="name"/>")
            } });

        </logic:iterate>
        </logic:present>
	
     
    </eap:param_if>

    <eap:param_if name="�˵�ģʽ" value="POPUP">
        //�����˵�
        <c:out value="${menu_js}" escapeXml="false"/>
    </eap:param_if>

    //var tb2 = EHM.ToolbarInstance = new EHM.Toolbar('toolbar2');


    $("StaffNameDiv").innerHTML = getStaffName();
};

var logout = function(val) {
	
    if (confirm("[<bean:write name="UserName"/>]ȷ��Ҫ�˳�ϵͳ�� ?")) {
    	if(val==1){//������������
        	document.location = "j_security_logout2"
        }
        if(val==2){
        	document.location = "j_security_logout"
        }
    }
};

var getStaffName = function() {
    return '<bean:write name="UserDept"/> <bean:write name="UserName"/>';
};

var loadDocWarp = function(url, label) {//�ڹ�������url
    if (shift)
        window.open(url, label, 'height=' + (screen.height - 160) + ', width=' + (screen.width - 100) + ', top=50, left=50, toolbar=no, menubar=no');
    else
        loadDoc(url, label);
    shift = false;
};

var changeKeyword = function() {
    //loadDoc("<c:url value="/staff/getStaffInfo.do"/>", "�޸�����");
    top.showPopWin('�޸�����', EHM.rootPath+'/staff/getStaffInfo.do' , 680, 450, null, true, false);
};

Ext.onReady(init_toolbar);
var home_page="portal/getPortalInstance.do?tmplateCode=8acb0c592fa41ed2012fba6d85fa003a";
loadDoc(home_page, "��ҳ");
