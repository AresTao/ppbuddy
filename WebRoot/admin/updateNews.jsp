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
	    
	    var fileNum=0;
	    var postId;
	    function addMimeFile()
	    {
	        var newRow = document.createElement('tr');
	        fileNum++;
	        newRow.innerHTML = "<th>附件"+fileNum+"</th><td><input type='hidden' id='file"+fileNum+"Id' name='fileId' class='btn3' value=''><label id='file"+fileNum+"Name' style='float:left;display:inline-block;width:50px;'></label><input type='file' name='file"+fileNum+"' id='file"+fileNum+"' accept=''/>"
	                +"<input type='button' class='btn3' value='删除' onclick='deleteMimeFile("+fileNum+")'>"
	                +"<img onclick='addMimeFile()' src='resource/images/add.gif'></td>";
	        document.getElementById('newsTable').appendChild( newRow);
	    }
	    
	    function addNewMimeFile()
	    {
	        var newRow = document.createElement('tr');
	        fileNum++;
	        newRow.innerHTML = "<th>附件"+fileNum+"</th><td><label id='file"+fileNum+"Name' style='float:left;display:inline-block;width:40px;'></label><input type='file' name='file"+fileNum+"' id='file"+fileNum+"' accept=''/>"
	                +"<img onclick='addMimeFile()' src='resource/images/add.gif'></td>";
	        document.getElementById('newsTable').appendChild( newRow);
	    }
	    
	    function deleteMimeFile(fileNo)
	    {
	    	if(confirm("确定删除？"))
	    	{
	    	var fileId = document.getElementById("file"+fileNo+"Id").value;
	    	var url = "${pageContext.request.contextPath}/api/0.1/admin/file/delete/"+fileId;
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				cache : false,
				async : true,
				success : function(res) {
					if (res)
					{
						alert("删除成功");
						loadNews(postId);
					} else
					{
						alert("删除失败");
					}
				},
				error : function() {
					alert("发送请求失败，请检查网络或刷新重试");
				}
			});
			}
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
		function updateNews(isPublish){
			//document.getElementById("frm").action = "addNewsInfo.do?reqPage=toSave&isPublish="+isPublish;
			//document.getElementById("frm").method = "post";
			
			$("#frm").submit();
		}
			
		function loadNews(postId)
		{
			
			var url = "${pageContext.request.contextPath}/api/0.1/admin/post/get/"+postId;
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
					var fileList = res.fileList;
					for (var i=1;i<=fileList.length;i++)
					{
						addMimeFile();
						document.getElementById("file"+i+"Name").innerHTML = fileList[i-1].name;
						document.getElementById("file"+i+"Id").value = fileList[i-1].fileId;
					}
				},
				error : function() {
					alert("发送请求失败，请检查网络或刷新重试");
				}
			});
		
		}
			
		$(function() {
				//initFormValidate();//表单验证
			postId = document.getElementById("hiddenNewsId").value;
			loadNews(postId);
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
	               	    <input type="hidden" id="hiddenNewsId" name="postId" class="btn3" value='<%=request.getParameter("postId")%>'>
	                    <input type="text" id="title" name="title" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <th width="30%">发布人</th>
	                <td >
	               	 
	                    <input type="text" id="publisherName" name="publisherName" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	                <tr>
	                <th >新闻纲要</th>
	                <td colspan="3" >
	              	<textarea name="shortContent" id="shortContent" cols=120 rows=4 maxlength="5000"></textarea>  
	                </td>
	                
	            </tr>
		
	            <tr>
	                <tr>
	                <th >新闻内容</th>
	                <td colspan="3" >
	              	<textarea name="content" id="content" cols=120 rows=2 maxlength="5000"></textarea>  
	                </td> 
	            </tr>
	            <tr>
	                
	                <th>banner</th>
	                <td>
	                	<label id="bannerName" style='float:left;display:inline-block;width:50px;'></label><input type="file" name="file0" id="banner" accept=""/>
	                	<img onclick='addNewMimeFile()' src='resource/images/add.gif'>
	                </td>
	            </tr> 
	            
	            </tbody>
	        </table>
	       	
	       	
	        <table class="btn_table" align="center">
				<td>
		            <input type="button" class="btn3" value="保存修改"onclick=" updateNews(0) ">
		            <input type="button" class="btn3" value="取消" onClick="javascript:location.href='newsInfoList.jsp';">
				</td>
			</table>
	    </form>
	</div>
	 <ckeditor:replace replace="content" basePath="./ckeditor/" />
    </body>
</html>
