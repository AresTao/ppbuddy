<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!doctype html>
<html>
<%@ include file="common/common.jsp"%>
    <head>
		<title>新闻列表</title>
		<script type="text/javascript" src="resource/EHM/Base.js"></script>
		<script type="text/javascript">
			 ChangeSkinAPP.Register(function(){ChangeSkin.Import("style.css");});
			 ChangeSkinAPP.init();
		</script>
		<script type="text/javascript" src="resource/jquery/jquery-1.7.2.min.js"></script>
		<link rel="stylesheet" type="text/css" href= "./css/add.css">
		<link rel="stylesheet" type="text/css" href= "./css/jquery.alerts.css">
		<script type="text/javascript" src="resource/js/common_validate.js"></script>
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.alerts.js"></script>
		<script type="text/javascript" src="js/jquery.ui.draggable.js"></script>
		<script type="text/javascript" src="resource/My97DatePicker/WdatePicker.js"></script>
	    <script type="text/javascript" src="resource/wbox/wbox-min.js"></script>
	    <script type="text/javascript">
	    var queryResult;
	    
	    var getTable = function( arrTr)
	    {
			var s = '';
			
			for(var i=0; i<arrTr.length; i++) {
				s += '<tr>';
				s += '<td>';	
		        s += '<input type="checkbox" onclick="controllCheckAllBtn()" name="newsId" value='+arrTr[i][0]+' class="validate[required]"/>';         
	            s += '</td>';
				for(var j=1; j<arrTr[i].length; j++) {
					s += '<td>' + arrTr[i][j] + '</td>';
				}
				s += '<td>';
				var param = new Object();	
				param.postId = arrTr[i][0];
		        s += '<a href="#" onclick="updateNews()" style="color: blue;">修改</a>';         
	            s += '</td>';
				
				s += '</tr>';
			}
			//s += '</table>';
			return s;
		}
		
		var jsPage = function(el, count, pageStep, pageNum, fnGo) 
		{
			this.getLink = function(fnGo, index, pageNum, text) 
			{
				var s = '<a href="#p' + index + '" onclick="' + fnGo + '(' + index + ');" ';
				if(index == pageNum) {
					s += 'class="aCur" ';
				}
				text = text || index;
				s += '>' + text + '</a> ';
				return s;
			}
		
			//总页数
			var pageNumAll = Math.ceil(count / pageStep);
			if (pageNumAll == 1) {
				document.getElementById('divPage').innerHTML = '';
				return;
			}
			var itemNum = 5; //当前页左右两边显示个数
			pageNum = Math.max(pageNum, 1);
			pageNum = Math.min(pageNum, pageNumAll);
			var s = '';
			if (pageNum > 1) {
				s += this.getLink(fnGo, pageNum-1, pageNum, '上一页');
			} else {
				s += '<span>上一页</span> ';
			}
			var begin = 1;
			if (pageNum - itemNum > 1) {
				s += this.getLink(fnGo, 1, pageNum) + '... ';
				begin = pageNum - itemNum;
			}
			var end = Math.min(pageNumAll, begin + itemNum*2);
			if(end == pageNumAll - 1){
				end = pageNumAll;
			}
			for (var i = begin; i <= end; i++) {
				s += this.getLink(fnGo, i, pageNum);
			}
			if (end < pageNumAll) {
				s += '... ' + this.getLink(fnGo, pageNumAll, pageNum);
			}
			if (pageNum < pageNumAll) {
				s += this.getLink(fnGo, pageNum+1, pageNum, '下一页');
			} else {
				s += '<span>下一页</span> ';
			}
			var divPage = document.getElementById(el);
			divPage.innerHTML = s;
    	}
		
		function initData(data, pageIndex){
			
			var result = [];
			pageIndex = pageIndex || 0;

            for (var i=pageIndex*10;i<(pageIndex+1)*10 && i<data.length;i++)     
            {
		        result.push([
				data[i].postId,
				data[i].title,
				data[i].categoryId,
				data[i].shortContent,
				data[i].createTime,
				data[i].publishTime,
				data[i].isPublish
			     ]);
		    }
           
			document.getElementById('newsList').innerHTML = getTable(result);
			jsPage('divPage', data.length, 10, 1, 'goPage');
		}
	
		function goPage(pageIndex) {
			initData(queryResult, pageIndex-1);
			jsPage('divPage', queryResult.length, 10, pageIndex, 'goPage');
		}
	    
		//删除新闻信息
		function deleteNews(){
			//var newsIds = "";
			
			var newsIds = new Array(); 
			$("input[name='newsId']:checked").each(function(i,n){
				//newsIds += $(this).val() + ",";
				newsIds[i] = $(this).val();
			});
			if (newsIds.length == 0)
			{
				jAlert('请至少选择一个进行删除.', '提示');
				return;
			}
			jConfirm("确定删除吗？","提示",function(r){
			if(r)
			{
				var data = JSON.stringify(newsIds);
				var body = {postIds:newsIds};
				var url = "${pageContext.request.contextPath}/api/0.1/post/delete";
				$.ajax({
					url : url,
					type : "post",
					dataType : "json",
					cache : false,
					async : true,
					contentType: "application/json",
					data  : JSON.stringify(body),
					success : function(res) {
						jAlert(res.reason, '提示');
						document.getElementById('divPage').innerHTML = '';
						document.getElementById('newsList').innerHTML = '';
						getPostList(1, 2);
					},
					error : function(res) {
						jAlert(res, '提示');
					}
				});
			}
			});
			
		};
		
		//发布/取消发布新闻信息
		function publish(isPublish){
			//var newsIds = "";
			var newsIds = new Array(); 
			$("input[name='newsId']:checked").each(function(i,n){
				//newsIds += $(this).val() + ",";
				newsIds[i] = $(this).val();
			});
			if (newsIds.length == 0)
			{
				jAlert('请至少选择一个进行发布.', '提示');
				return;
			}
			var data = JSON.stringify(newsIds);
			var body = {postIds:newsIds};
			var url = "${pageContext.request.contextPath}/api/0.1/post/publish/flag/"+isPublish;
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				cache : false,
				async : true,
				contentType: "application/json",
				data  : JSON.stringify(body),
				success : function(res) {
					if (isPublish == 0)
						jAlert("取消发布成功","提示");
					else 
						jAlert("发布成功","提示");
					document.getElementById('divPage').innerHTML = '';
					document.getElementById('newsList').innerHTML = '';
					getPostList(1, 2);
				},
				error : function(res) {
					jAlert("发送请求失败，请检查网络或刷新重试","提示");
				}
			});
		};
	        
	    //enter事件触发搜索
	    function enterSearch(){
	      	$("input[type='text']").each(function(){
	      		$(this).keydown(function(event){
	       			if(event.keyCode == 13){
	       				queryPostList();
	       			}
	       		});
	       	});
	    }
	        
		//页面初始化函数
	    $(function(){
	    	getPostList(1, 2);
	    	$("#selectall").click(function(){
					$(":checkbox[name='newsId']").attr("checked",this.checked);
			});
	      	//enterSearch();
	       	//全选和取消全选
		    //$("#selectall").click(function(){
			//	$(":checkbox[name='newsId']").attr("checked",this.checked);
			//});
	    });
	    	
	    function controllCheckAllBtn(){
			//获取被所有被选中的复选框
			var checkedSize = $(":checkbox[name='newsId']:checked").length;
			var realSize = $(":checkbox[name='newsId']").length;
			$("#selectall").attr("checked",(realSize === checkedSize));
		}
		
		function getPostList(categoryId, flag)
		{
			var url = "${pageContext.request.contextPath}/api/0.1/admin/post/getList/category/"+categoryId+"/flag/"+flag;
			$.ajax({
				url : url,
				type : "get",
				dataType : "json",
				cache : false,
				async : true,
				success : function(res) {
					queryResult = res;
					initData(res);
				},
				error : function() {
					jAlert("发送请求失败，请检查网络或刷新重试","提示");
				}
			});
		}
		
		function queryPostList()
		{
			var startTime = document.getElementById("startTime").value;
			var endTime = document.getElementById("endTime").value;
			var title = document.getElementById("newsTitle").value;
			var newsTypeEle = document.getElementById("newsType");
			var newsTypeIndex = newsTypeEle.selectedIndex;
			var newsType = newsTypeEle.options[newsTypeIndex].value; // 选中值
			
			var isPublishEle = document.getElementById("isPublish");
			var isPublishIndex = isPublishEle.selectedIndex;
			var isPublish = isPublishEle.options[isPublishIndex].value; // 选中值
			var body = {newsTitle:title,startTime:startTime,endTime:endTime,newsType:1,isPublish:isPublish};
			var url = "${pageContext.request.contextPath}/api/0.1/admin/post/queryList";
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				cache : false,
				async : true,
				contentType: "application/json",
				data  : JSON.stringify(body),
				success : function(res) {
					document.getElementById('newsList').innerHTML = '';
					queryResult = res;
					initData(res);
				},
				error : function() {
					document.getElementById('newsList').innerHTML = '没有查询结果';
					//jAlert("发送请求失败，请检查网络或刷新重试","提示");
				}
			});
		}
		
		function addNews(){
			window.location.href='addNews.jsp';	
	    }
	    
		function updateNews(){
			var newsIds = new Array(); 
			$("input[name='newsId']:checked").each(function(i,n){
				//newsIds += $(this).val() + ",";
				newsIds[i] = $(this).val();
			});
			if (newsIds.length == 0)
			{
				jAlert("请选择一个进行修改","提示");
				return;
			}
			window.location.href='updateNews.jsp?postId='+newsIds[0];
		}
	    
	    function checkNews(postId2){
			window.location.href='checkNews.jsp?postId='+postId2;
	    }
   		</script>
    </head>
	<body>
	<div class="mainbody">
		<form id="frm" action="#" method="post">
	        <table class="form_table" align="center">
	            <thead >
		            <tr>
		                <th colspan="6">新闻管理</th>
		            </tr>
	            </thead>
	            <tr>
	                <th width="10%">新闻标题</th>
	                <td width="25%">
	                	<input type="text" name="title" id="newsTitle" value="${newsInfo.newsTitle }" class="input50"/>
	                </td>
					<th width="10%">新闻类型</th>
                	<td width="25%" colspan="3">
                		<select name="newsType" id="newsType" >
                			<option value="-1" selected="selected">-- 全部 --</option>
                			<option value="0">-- 未发布 --</option>
                			<option value="1">-- 已发布 --</option>
                		</select>
					</td>
	            </tr>
	            <tr>
	            	<th width="10%">发布时间</th>
		            <td width="50%">
	                    <input type="text" name="startTime" id="startTime" value="" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',onpicked:function(){dateValidate('startTime','endTime');}});" style="height: 24px;" class="Wdate"/>&nbsp;&nbsp;到
	                    <input type="text" name="endTime" id="endTime" value="" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',onpicked:function(){dateValidate('startTime','endTime');}});" style="height: 24px;" class="Wdate"/>
	                </td>
	               <th width="10%">是否发布</th>
                	<td width="25%" colspan="2">
                		<select name="newsInfo.isPublish" id="isPublish">
							<option value="-1" selected="selected"> -- 全部--</option>
							<option value="0" > -- 未发布 --</option> 
							<option value="1" > -- 已发布 --</option>  
                		</select>
					</td>
														
                </tr>
                
	        </table>
	        <table class="btn_table" align="center">
				<td>
		            <input type=button class="btn3" value="查&nbsp;&nbsp;询" onClick="queryPostList();"/>
					<input type=button class="btn3" value="增&nbsp;&nbsp;加" onClick="addNews();"/>
					<input type=button class="btn3" value="删&nbsp;&nbsp;除" onClick="deleteNews();"/>
					<input type=button class="btn3" value="发布" onClick="publish(1);"/>
					<input type=button class="btn3" value="取消发布" onClick="publish(0);"/>
					<input type=button class="btn3" value="更新" onClick="updateNews();"/>
				</td>
			</table>
            <table cellspacing=1 class="query_table" align="center">
            	 <colgroup>
            		
            		<col width="4%"/>
            		<col width="15%"/>
            		<col width="10%"/>
            		<col width="27%"/>
            		<col width="18%"/>
            		<col width="18%"/>
            		<col width="10%"/>
            		
            	 </colgroup> 
				<thead>
	                <tr>
	                    <th colspan="10">新闻列表</th>
	                </tr>
	            </thead> 
                <tr>
                	<th><input type="checkbox" name="selectall" id="selectall"/></th>
                    
                    <th>新闻标题</th>
                    <th>新闻类型</th>
                    <th>新闻摘要</th>
                    <th>创建时间</th>
                    <th>发布时间</th>
                    <th>是否发布</th>
                    
                </tr>
               
                <tbody id="newsList">
                	
				</tbody>
				
            </table>
            <div id="divPage"></div>
		</form>
	</div>
</body>
</html>
