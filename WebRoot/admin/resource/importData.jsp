<!--author  /web/resource/importData.jsp -->
<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@include file="/common/common.jsp"%>

<head>

	<title>��Դ����</title>
	<script type="text/javascript"
		src="<c:url value='/resource/EHM/Base.js'/>"></script>
	<script type="text/javascript">		
	EHM.ImportCalendar();
	ChangeSkinAPP.Register(function() {  ChangeSkin.Import("style.css");});
	ChangeSkinAPP.init();
	

        function doSubmit() {
            var name= $("xlsFile").value;
            if(name == ""){
                   alert("�������ļ�");
                   return false;
             }

           importForm.submit();
        }
		 function doCancel() {
		    window.history.go(-1);
		}
		function fileDownload(){  
		      form1.action= "fileDownload.do";
		      form1.submit();
		}
		function returnBack()
		{
			window.location.href="../provider/toProviderList.do";
		}	
</script>

</head>

<body style="margin: 10px;">



	<form name="form1" method="post">
		<table border=0 cellpadding=1 cellspacing=1 align="center"
			class="form_table">
			<thead>
				<tr>
					<th>
						<c:choose>
							<c:when test="${importType == 1}">��Դ���� --�ͻ����ݵ���</c:when>
							<c:when test="${importType == 2}">��Դ���� --��ͬ���ݵ���</c:when>
							<c:when test="${importType == 3}">��Դ���� --��Ŀ���ݵ���</c:when>
							<c:when test="${importType == 4}">������&nbsp;--&nbsp;���ݵ���</c:when>
						</c:choose>
					</th>
				</tr>
			</thead>
		</table>
	</form>

	<html:form action="/importData" method="post"
		enctype="multipart/form-data">
		<table border=0 cellpadding=1 cellspacing=1 width="100%"
			align="center" class="form_table">


			<tr>
				<th height="30" width="40%">
					�����ļ�
				</th>
				<td width="60%">
					<input type="file" name="xlsFile" class="input50" ContentEditable="false">
				</td>


			</tr>
			<tr>
				<td colspan="2">
					<div align="center">
					    <input type="button" name="btn2" value="����ģ��"
							onClick="fileDownload()" class="btn4">
						<input type="button" name="btn1" value="�� ��" onClick="doSubmit()"
							class="btn4">
						<input type="button" name="btn2" value="����"
							onClick="returnBack();" class="btn4">	
					</div>
				</td>


			</tr>

		</table>

	</html:form>

	<c:if test="${comMsg != null}">

		<script type="text/javascript">
       var msg = "<c:out value='${comMsg}'/>" ;
       alert(msg);
    </script>
	</c:if>
</body>

