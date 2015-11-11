<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="common/common.jsp" %>

<html>
    <head>
    
    	<title>修改密码</title>
    	<script type="text/javascript" src="resource/EHM/Base.js"></script>
		<script type="text/javascript">
			 ChangeSkinAPP.Register(function(){ChangeSkin.Import("style.css");});
			 ChangeSkinAPP.init();
		</script>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href= "css/add.css">
		<script type="text/javascript" src="resource/jquery/jquery-1.7.2.min.js"></script>
		<link rel="stylesheet" type="text/css" href="resource/jQuery_Validation_Engine_2.6/css/validationEngine.jquery.css"/>
		<script type="text/javascript" src="resource/jQuery_Validation_Engine_2.6/js/languages/jquery.validationEngine-zh_CN.js"></script>
		<script type="text/javascript" src="resource/jQuery_Validation_Engine_2.6/js/jquery.validationEngine.js"></script>
		<script type="text/javascript" src="resource/My97DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" type="text/css" href="resource/wbox/wbox/wbox-min.css"/>
		<script type="text/javascript" src="resource/wbox/wbox-min.js"></script>
	    <script type="text/javascript">
	    
	      	
		//确定提交表单
		function modifyPwd(){
			$("#isPublish").val(isPublish);
			$("#frm").submit();			
		}
			
		$(function() {
			
		});
	    </script>
    </head>
    <body>
	<div class="mainbody">
	    <form id="frm" action="${pageContext.request.contextPath}/admin/" method="post" enctype="multipart/form-data">
	       	<table cellspacing=1 class="form_table" align="center" >
	            <thead>
		             <tr>
		                <th colspan="4">
		               		 修改密码
		                </th>
		            </tr>
	            </thead>
	            <tbody id="passwdTable">
	            <tr>
	                <th width="30%">原始密码</th>
	                <td >
	               		
	                    <input type="text" id="oldPasswd" name="oldPasswd" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <th width="30%">新密码</th>
	                <td >
	               		
	                    <input type="text" id="newPasswd1" name="newPasswd1" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <th width="30%">确认密码</th>
	                <td >
	               		
	                    <input type="text" id="newPasswd2" name="newPasswd2" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            
	            </tbody>
	        </table>
	       	
	       	
	        <table class="btn_table" align="center">
				<td>
		            <input type="button" class="btn3" value="保存修改" onclick=" modifyPwd() ">
		           	
		            <input type="button" class="btn3" value="取消" onClick="javascript:history.back();">
				</td>
			</table>
	    </form>
	</div>
    </body>
</html>
