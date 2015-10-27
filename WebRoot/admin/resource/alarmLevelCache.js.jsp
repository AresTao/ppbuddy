<%@ page contentType="text/javascript; charset=GBK" %><%@ include file="../common/taglib.jsp" %>
EHM=EHM||{};EHM.Cache=EHM.Cache||{};
EHM.Cache["AlarmLevel"]={};
<logic:present name="alarmLevel">
        <logic:iterate id="leve" name="alarmLevel" indexId="index">
EHM.Cache["AlarmLevel"]["<bean:write name="leve" property="alarmLevelCode"/>"]={name:"<bean:write name="leve" property="name"/>",color:"<bean:write name="leve" property="bgcolor"/>",img:"<bean:write name="leve" property="imgFile"/>"}
		</logic:iterate>
</logic:present>