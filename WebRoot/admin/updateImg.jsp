<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="common/common.jsp" %>

<html>
    <head>
    
    	<title>更新图片</title>
    	<script type="text/javascript" src="resource/EHM/Base.js"></script>
		<script type="text/javascript">
			 ChangeSkinAPP.Register(function(){ChangeSkin.Import("style.css");});
			 ChangeSkinAPP.init();
		</script>
		<link rel="stylesheet" type="text/css" href= "css/add.css">
		<link rel="stylesheet" type="text/css" href= "./css/jquery.alerts.css">
		<script type="text/javascript" src="resource/js/common_validate.js"></script>
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.alerts.js"></script>
		<script type="text/javascript" src="js/jquery.ui.draggable.js"></script>
		<script type="text/javascript" src="resource/jquery/jquery-1.7.2.min.js"></script>
		<link rel="stylesheet" type="text/css" href="resource/jQuery_Validation_Engine_2.6/css/validationEngine.jquery.css"/>
		<script type="text/javascript" src="resource/jQuery_Validation_Engine_2.6/js/languages/jquery.validationEngine-zh_CN.js"></script>
		<script type="text/javascript" src="resource/jQuery_Validation_Engine_2.6/js/jquery.validationEngine.js"></script>
		<script type="text/javascript" src="resource/My97DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" type="text/css" href="resource/wbox/wbox/wbox-min.css"/>
		<script type="text/javascript" src="resource/wbox/wbox-min.js"></script>
	    <script type="text/javascript">
	    
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
		function updateImg(isPublish){
			//document.getElementById("frm").action = "addNewsInfo.do?reqPage=toSave&isPublish="+isPublish;
			//document.getElementById("frm").method = "post";
			
			$("#frm").submit();
		}
			
		function loadImg(imgId)
		{
			
			var url = "${pageContext.request.contextPath}/api/0.1/admin/img/get/"+imgId;
			$.ajax({
				url : url,
				type : "get",
				dataType : "json",
				cache : false,
				async : true,
				success : function(res) {
					document.getElementById("title").value = res.title;
					document.getElementById("publisherName").value = res.publisherName;
					document.getElementById("shortContent").value = res.shortContent;
					document.getElementById("content").value = res.content;
					//document.getElementById("title").value = res.title;
					document.getElementById("bannerName").innerHTML = res.bannerPath;
					
				},
				error : function() {
					jAlert("发送请求失败，请检查网络或刷新重试",'提示');
				}
			});
		
		}
			
		$(function() {
				//initFormValidate();//表单验证
			imgId = document.getElementById("hiddenImgId").value;
			loadImg(imgId);
		});
		</script>
    </head>
    <body>
	<div class="mainbody">
	    <form id="frm" action="${pageContext.request.contextPath}/admin/post" method="post"  enctype="multipart/form-data">
	       	<table cellspacing=1 class="form_table" align="center">
	            <thead>
		             <tr>
		                <th colspan="4">
		               		 更新图片
		                </th>
		            </tr>
	            </thead>
	            <tbody id="newsTable">
	            <tr>
	                <th width="30%">图片标题</th>
	                <td >
	               	    <input type="hidden" id="hiddenImgId" name="imgId" class="btn3" value='<%=request.getParameter("postId")%>'>
	                    <input type="text" id="name" name="name" class="input50 validate[required]"/>
	                    
	                </td>
	            </tr>
	            <tr>
	        		<th >图片类型</th>
                	<td >
                		<select name="imgType" id="imgType" >
                			<option value="1" selected="selected">-- 关于head --</option>
                			<option value="2">-- 关于body --</option>
                			<option value="3">-- 关于证书 --</option>
                		</select>
					</td>
				</tr>
	            
	            <tr>
	                
	                <th>图片文件</th>
	                <td>
	                	<input type="file" name="file0" id="uploadFile" accept=""/>
	                </td>
	                
	            </tr> 
	            
	            </tbody>
	        </table>
	       	
	       	
	        <table class="btn_table" align="center">
				<td>
		            <input type="button" class="btn3" value="保存修改"onclick=" updateImg(0) ">
		            <input type="button" class="btn3" value="取消" onClick="javascript:history.back();">
				</td>
			</table>
	    </form>
	</div>
    </body>
</html>
