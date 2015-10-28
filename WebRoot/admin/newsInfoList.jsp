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
		<script type="text/javascript" src="resource/js/common_validate.js"></script>
		<script type="text/javascript" src="resource/My97DatePicker/WdatePicker.js"></script>
	    <script type="text/javascript" src="resource/wbox/wbox-min.js"></script>
	    <script type="text/javascript">
	    
		//删除新闻信息
		function deleteNews(){
			var newsIds = ""; 
			$("input[name='newsId']:checked").each(function(i,n){
				newsIds += $(this).val() + ",";
			});
			newsIds = newsIds.substring(0, newsIds.lastIndexOf(","));
			if(newsIds==null||newsIds==""||newsIds==undefined){
				alert("请至少选择一条新闻进行处理");		
				return false;	
			}
		};
		
		//发布/取消发布新闻信息
		function publish(isPublish){
			var newsIds = ""; 
			$("input[name='newsId']:checked").each(function(i,n){
				newsIds += $(this).val() + ",";
			});
			newsIds = newsIds.substring(0, newsIds.lastIndexOf(","));
			if(newsIds==null||newsIds==""||newsIds==undefined){
				alert("请至少选择一条新闻进行处理");
				return false;
			}
		};
	    
	    function doSubmit() {
	       	if(!dateValidate("startTime","endTime")){
	      		return false;
	      	}
	        	
	      	$("#frm").action = "getAdminNewsInfoList.do";
	      	$("#frm").method = "post";
	        $("#frm").submit();
	    }
	        
	    //enter事件触发搜索
	    function enterSearch(){
	      	$("input[type='text']").each(function(){
	      		$(this).keydown(function(event){
	       			if(event.keyCode == 13){
	       				doSubmit();
	       			}
	       		});
	       	});
	    }
	        
		//页面初始化函数
	    $(function(){
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
		
		function addNews(){
			window.location.href='addNews.jsp';	
	    }
	    
		function updateNews(newsId){
			window.location.href='${ctx}/adminman/updateAdminNewsInfo.do?reqPage=toPage&reqType=${reqType}&newsId='+newsId;	    		
	    }
	    
	    function getNewsDetail(newsId){
			window.location.href='${ctx}/adminman/getNewsInfoAdminDetail.do?reqPage=toPage&reqType=${reqType}&newsId='+newsId;	    		
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
	                	<input type="text" name="newsInfo.newsTitle" id="newsTitle" value="${newsInfo.newsTitle }" class="input50"/>
	                </td>
					<th width="10%">新闻类型</th>
                	<td width="25%" colspan="3">
                		<select name="newsInfo.newsType" id="newsType" >
                			<option value="-1" selected="selected">-- 全部 --</option>
                			<option value="0">-- 未发布 --</option>
                			<option value="1">-- 已发布 --</option>
                		</select>
					</td>
	            </tr>
	            <tr>
	            	<th width="10%">创建时间</th>
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
		            <input type=button class="btn3" value="查&nbsp;&nbsp;询" onClick="doSubmit();"/>
					<input type=button class="btn3" value="增&nbsp;&nbsp;加" onClick="addNews();"/>
					<input type=button class="btn3" value="删&nbsp;&nbsp;除" onClick="delNewsInfo()"/>
					<input type=button class="btn3" value="发布" onClick="publish(1);"/>
					<input type=button class="btn3" value="取消发布"onClick="publish(0);"/>
				</td>
			</table>
            <table cellspacing=1 class="query_table" align="center">
            	 <colgroup>
            		<col width="4%"/>
            		<col width="6%"/>
            		<col width="10%"/>
            		<col width="8%"/>
            		<col width="18%"/>
            		<col width="18%"/>
            		<col width="18%"/>
            		<col width="10%"/>
            		<col width="10%"/>
            	 </colgroup> 
				<thead>
	                <tr>
	                    <th colspan="10">查询结果</th>
	                </tr>
	            </thead> 
                <tr>
                	<th><input type="checkbox" name="selectall" id="selectall"/></th>
                    <th>ID</th>
                    <th>新闻标题</th>
                    <th>新闻类型</th>
                    <th>链接地址</th>
                    <th>创建时间</th>
                    <th>发布时间</th>
                    <th>是否发布</th>
                    <th>操作</th>
                </tr>
               
                <tbody>
                	<tr>
	                    <td>	
		                    <input type="checkbox" onclick="controllCheckAllBtn()" name="newsId" id="newsId" value="${news.newsId}" class="validate[required]"/>
	                    </td>
	                    <td>${news.newsId}</td>
	                    <td title="${news.newsTitle}">${news.newsTitle}</td>
	                    <td>
	                        	
			            </td>
	                    <td title="${news.detailAddr}">${news.detailAddr}</td>
	                    <td>
	                    	<a href="#" onclick="updateNews('${news.newsId}')" style="color: blue;">修改</a>
	                    </td>
	                </tr>
					
				</tbody>
            </table>
		</form>
	</div>
</body>
</html>
