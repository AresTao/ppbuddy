<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>泡泡帮运营管理平台</title>
<meta name="keywords" content="">
<meta name="description" content="">

<style type = "text/css">

.topbar-wrap {margin-bottom: 10px;}


</style>
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<link rel="stylesheet" type="text/css" href="css/main.css"/>
<link rel="shortcut icon" href="img/favicon.ico">
<script type="text/javascript" src="js/libs/modernizr.min.js"></script>
</head>
<body>
<div class="topbar-wrap white">
    <div class="topbar-inner clearfix">
        <div class="topbar-logo-wrap clearfix">
            <h1 class="topbar-logo none"><a href="index.html" class="navbar-brand">后台管理</a></h1>
            <ul class="navbar-list clearfix">
            	<img src="resource/images/logo.png" style="float:left;padding:5px;">
                <li><a class="on" href="index.html">后台运营管理系统</a></li>
            </ul>
        </div>
        <div class="top-info-wrap">
            <ul class="top-info-list clearfix">
                <li><a href="#">管理员：<%=request.getParameter("username")%></a></li>
                <li><a href="javascript:menu('./modifyPwd.jsp?username=<%=request.getParameter("username")%>')">修改密码</a></li>
                <li><a href="./login?username=<%=request.getParameter("username")%>&method=logout">退出</a></li>
            </ul>
        </div>
    </div>
</div>
<div class="container clearfix">
	<div class="sidebar-wrap">
        <div class="sidebar-title">
            <h1>菜单</h1>
        </div>
        <div class="sidebar-content">
            <ul class="sidebar-list">
                <li>
                    <a href="#"><i class="icon-font">&#xe003;</i>常用操作</a>
                    <ul class="sub-menu">
                        
                        <li><a href="javascript:menu('./newsInfoList.jsp')"><i class="icon-font">&#xe002;</i>新闻管理</a></li>
                        <li><a href="javascript:menu('./imgInfoList.jsp')"><i class="icon-font">&#xe010;</i>图片管理</a></li>
                        <li><a href="javascript:menu('./videoInfoList.jsp')"><i class="icon-font">&#xe010;</i>视频管理</a></li>
                                                
                    </ul>
                </li>
                
            </ul>
        </div>
    </div>
    <div id="contentMain" style='margin-bottom:5px;'>
		<iframe src="./newsInfoList.jsp" id="contentframe" class="contentframe"></iframe>
	</div>
</div>    
<%@ include file="./common/footer.jsp"%>

<script type="text/javascript">

function menu(url)
{
    document.getElementById('contentframe').src = url;
}
</script>
</body>