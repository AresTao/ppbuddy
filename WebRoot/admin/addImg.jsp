<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="common/common.jsp" %>

<html>
    <head>
    
    	<title>添加图片</title>
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
	    var fileNum=1;
	    function addMimeFile()
	    {
	        var newRow = document.createElement('tr');
	        fileNum++;
	        newRow.innerHTML = "<th>附件"+fileNum+"</th><td><input type='file' name='file"+fileNum+"' id='uploadFile' accept=''/>"
	                +"<img onclick='addMimeFile()' src='resource/images/add.gif'></td>";
	        document.getElementById('newsTable').appendChild( newRow);
	    }
	      	
		//确定提交表单
		function addImg(isPublish){
			$("#isPublish").val(isPublish);
			$("#frm").submit();			
		}
			
		$(function() {
			
		});
	    </script>
    </head>
    <body>
	<div class="mainbody">
	    <form id="frm" action="${pageContext.request.contextPath}/admin/img" method="post" enctype="multipart/form-data">
	       	<table cellspacing=1 class="form_table" align="center" >
	            <thead>
		             <tr>
		                <th colspan="4">
		               		 添加图片
		                </th>
		            </tr>
	            </thead>
	            <tbody id="imgTable">
	            <tr>
	                <th width="30%">图片标题</th>
	                <td >
	               		<input type="hidden" id="isPublish" name="isPublish" class="btn3" value="0">
	                    <input type="text" id="imgName" name="imgName" class="input50 validate[required]"/>
	                    <span style="color: red;"> *</span>
	                </td>
	            </tr>
	            <tr>
	        		<th >图片类型</th>
                	<td >
                		<select name="imgType" id="imgType" >
                			<option value="1" selected="selected">-- 关于head --</option>
                			<option value="2">-- 关于body --</option>
                			<option value="3">-- 关于证书 --</option>
                			<option value="4">-- 首页banner --</option>
                		</select>
					</td>
				</tr>
				<tr>
	                <th width="30%">图片链接</th>
	                <td >
	               		
	                    <input type="text" id="link" name="link" class="input50 validate[required]"/>
	                    
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
		            <input type="button" class="btn3" value="保存" onclick=" addImg(0) ">
		           <input type="button" class="btn5" value="保存并发布"onclick=" addImg(1)">
		            <input type="button" class="btn3" value="取消" onClick="javascript:location.href='imgInfoList.jsp';">
				</td>
			</table>
	    </form>
	</div>
	 
    </body>
</html>
