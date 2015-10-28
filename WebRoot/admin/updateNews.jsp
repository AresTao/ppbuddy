<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="common/common.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<html>
    <head>
    
    	<title>更新新闻</title>
    	<script type="text/javascript" src="resource/EHM/Base.js"></script>
		<script type="text/javascript">
			 ChangeSkinAPP.Register(function(){ChangeSkin.Import("style.css");});
			 ChangeSkinAPP.init();
		</script>
		<link rel="stylesheet" type="text/css" href= "css/add.css">
		<script type="text/javascript" src="resource/jquery/jquery-1.7.2.min.js"></script>
		<link rel="stylesheet" type="text/css" href="resource/jQuery_Validation_Engine_2.6/css/validationEngine.jquery.css"/>
		<script type="text/javascript" src="resource/jQuery_Validation_Engine_2.6/js/languages/jquery.validationEngine-zh_CN.js"></script>
		<script type="text/javascript" src="resource/jQuery_Validation_Engine_2.6/js/jquery.validationEngine.js"></script>
		<script type="text/javascript" src="resource/My97DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" type="text/css" href="resource/wbox/wbox/wbox-min.css"/>
		<script type="text/javascript" src="resource/wbox/wbox-min.js"></script>
	    <script type="text/javascript">
	    
	    var fileNum=1;
	    function addMimeFile()
	    {
	        alert("test");
	        var newRow = document.createElement('tr');
	        fileNum++;
	        newRow.innerHTML = "<th>附件"+fileNum+"</th><td><input type='file' name='file"+fileNum+"' id='uploadFile' accept=''/>"
	                +"<img onclick='addMimeFile()' src='resource/images/add.gif'></td>";
	        document.getElementById('newsTable').appendChild( newRow);
	    }
	        
	      	//给表单绑定验证引擎
	     function initFormValidate(){
	       	$("#frm").validationEngine("attach",{
					validationEventTrigger : "blur",
					autoPositionUpdate : true,
					showOneMessage : true,
					promptPosition : "centerRight",//position：topLeft,topRight, bottomLeft, centerRight, bottomRight
					autoHidePrompt : true,
					autoHideDelay : 3000
			});
	    }
	      	
			//确定提交表单
		function addNewsInfo(isPublish){
			//document.getElementById("frm").action = "addNewsInfo.do?reqPage=toSave&isPublish="+isPublish;
			//document.getElementById("frm").method = "post";
			$("#isPublish").val(isPublish);
			$("#frm").submit();
		}
			
		function loadNews()
		{
			
			var url = "${pageContext.request.contextPath}/api/0.1/admin/post/get/"+postId;
			$.ajax({
				url : url,
				type : "get",
				dataType : "json",
				cache : false,
				async : true,
				success : function(res) {
					
					alert(res[0].title);
				},
				error : function() {
					alert("发送请求失败，请检查网络或刷新重试");
				}
			});
		
		}
			
		$(function() {
				//initFormValidate();//表单验证
			loadNews(<%=request.getParameter("postId")%>);
		});
		</script>
    </head>
    <body>
	<div class="mainbody">
	    <form id="frm" action="${pageContext.request.contextPath}/api/0.1/post/update" method="post"  enctype="multipart/form-data">
	       	<table cellspacing=1 class="form_table" align="center">
	            <thead>
		             <tr>
		                <th colspan="4">
		               		 更新新闻
		                </th>
		            </tr>
	            </thead>
	            <tbody id="newsTable">
	            <tr>
	                <th width="30%">新闻标题</th>
	                <td >
	               	 <input type="hidden" id="isPublish" name="newsInfo.isPublish" class="btn3" value="0" ">
	                    <input type="text" id="newsTitle" name="newsInfo.newsTitle" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <th width="30%">发布人</th>
	                <td >
	               	 
	                    <input type="text" id="newsTitle" name="publisherName" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <tr>
	                <th >新闻纲要</th>
	                <td colspan="3" >
	              	<textarea name="newsInfo.content" id="shortremark" cols=120 rows=4 maxlength="5000"></textarea>  
	                </td>
	                
	            </tr>
		
	            <tr>
	                <tr>
	                <th >新闻内容</th>
	                <td colspan="3" >
	              	<textarea name="newsInfo.content" id="remark" cols=120 rows=2 maxlength="5000"></textarea>  
	                </td> 
	            </tr>
	            <tr>
	                
	                <th>banner</th>
	                <td>
	                	<input type="file" name="file0" id="uploadFile" accept=""/>
	                </td>
	            </tr> 
	            <tr>
	                
	                <th>附件1</th>
	                <td>
	                	<input type="file" name="file1" id="uploadFile" accept=""/>
	                	<img onclick='addMimeFile()' src='resource/images/add.gif'>
	                </td>
	                
	            </tr>
	            </tbody>
	        </table>
	       	
	       	
	        <table class="btn_table" align="center">
				<td>
		            <input type="button" class="btn3" value="保存修改"onclick=" addNewsInfo(0) ">
		            <input type="button" class="btn3" value="取消" onClick="javascript:location.href='getAdminNewsInfoList.do?reqType=${reqType}';">
				</td>
			</table>
	    </form>
	</div>
	 <ckeditor:replace replace="remark" basePath="./ckeditor/" />
    </body>
</html>
