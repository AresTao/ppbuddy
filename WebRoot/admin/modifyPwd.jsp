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
		<link rel="stylesheet" type="text/css" href= "./css/jquery.alerts.css">
		<script type="text/javascript" src="resource/js/common_validate.js"></script>
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.alerts.js"></script>
		<script type="text/javascript" src="js/jquery.ui.draggable.js"></script>
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
			var id = document.getElementById("hiddenusername").value;
			var oldpasswd = document.getElementById("oldpasswd").value;
			var newpasswd1 = document.getElementById("newpasswd1").value;
			var newpasswd2 = document.getElementById("newpasswd2").value;
			if (oldpasswd == newpasswd1)
			{
				jAlert("新密码和原始密码相同",'提示');
				return;
			}
			if (newpasswd1 != newpasswd2)
			{
				jAlert("新密码和确认密码不一致",'提示');
				return;
			}
			jConfirm("确定保存修改？",'提示',function(r){
	    		if(r)
	    		{
	    			//var fileId = document.getElementById("file"+fileNo+"Id").value;
	    			var url = "${pageContext.request.contextPath}/api/0.1/admin/modifyPwd/username/"+id+"/oldpasswd/"+oldpasswd+"/newpasswd/"+newpasswd1;
					$.ajax({
						url : url,
						type : "post",
						dataType : "json",
						cache : false,
						async : true,
						success : function(res) {
							if (res)
							{
								jAlert("修改成功",'提示');
								window.location.href='newsInfoList.jsp';
							} else
							{
								jAlert("修改失败",'提示');
							}
						},
						error : function() {
							jAlert("发送请求失败，请检查网络或刷新重试",'提示');
						}
					});
				}
	    	});
		}
			
		$(function() {
			
		});
	    </script>
    </head>
    <body>
	<div class="mainbody">
	    <form id="frm" action="" method="post" >
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
	               		<input type="hidden" id="hiddenusername" name="username" class="btn3" value='<%=request.getParameter("username")%>'>
	                    <input type="password" id="oldpasswd" name="oldpasswd" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <th width="30%">新密码</th>
	                <td >
	               		
	                    <input type="password" id="newpasswd1" name="newpasswd1" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <th width="30%">确认密码</th>
	                <td >
	               		
	                    <input type="password" id="newpasswd2" name="newpasswd2" class="input50 validate[required]"/>
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
