<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="common/common.jsp" %>

<html>
    <head>
    
    	<title>编辑视频</title>
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
		//确定提交表单
		function updateVideo(isPublish){
			$("#frm").submit();
		}
			
		function loadVideo(videoId)
		{
			
			var url = "${pageContext.request.contextPath}/api/0.1/admin/video/get/"+videoId;
			$.ajax({
				url : url,
				type : "get",
				dataType : "json",
				cache : false,
				async : true,
				success : function(res) {
					document.getElementById("videoName").value = res.name;
					$("#videoType").find("option[value='"+res.type+"']").attr("selected",true); 
					document.getElementById("videoLink").value = res.link;
					
				},
				error : function() {
					jAlert("发送请求失败，请检查网络或刷新重试",'提示');
				}
			});
		
		}
			
		$(function() {
				//initFormValidate();//表单验证
			videoId = document.getElementById("hiddenVideoId").value;
			loadVideo(videoId);
		});
		</script>
    </head>
    <body>
	<div class="mainbody">
	    <form id="frm" action="${pageContext.request.contextPath}/admin/video" method="post"  enctype="multipart/form-data">
	       	<table cellspacing=1 class="form_table" align="center">
	            <thead>
		             <tr>
		                <th colspan="4">
		               		 更新视频
		                </th>
		            </tr>
	            </thead>
	            <tbody id="videoTable">
	            <tr>
	                <th width="30%">视频标题</th>
	                <td >
	               	    <input type="hidden" id="hiddenVideoId" name="videoId" class="btn3" value='<%=request.getParameter("videoId")%>'>
	                    <input type="text" id="videoName" name="videoName" class="input50 validate[required]"/>
	                    
	                </td>
	            </tr>
	            <tr>
	        		<th >视频类型</th>
                	<td >
                		<select name="videoType" id="videoType" >
                			<option value="5" selected="selected">-- 洗洗手视频 --</option>
                			<option value="6">-- 刷刷碗视频 --</option>
                			<option value="7">-- 擦擦车视频 --</option>
                		</select>
					</td>
				</tr>
	            <tr>
	                <th width="30%">视频链接</th>
	                <td >
	               		
	                    <input type="text" id="videoLink" name="videoLink" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            
	            
	            </tbody>
	        </table>
	       	
	       	
	        <table class="btn_table" align="center">
				<td>
		            <input type="button" class="btn3" value="保存修改"onclick=" updateVideo(0) ">
		            <input type="button" class="btn3" value="取消" onClick="javascript:history.back();">
				</td>
			</table>
	    </form>
	</div>
    </body>
</html>
