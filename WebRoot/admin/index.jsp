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
<link rel="shortcut icon" href="../rtcweb/img/favicon.ico">
<script type="text/javascript" src="js/libs/modernizr.min.js"></script>
</head>
<body>
<%@ include file="./common/head.jsp"%>
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
                                                
                    </ul>
                </li>
                <li>
                    <a href="#"><i class="icon-font">&#xe018;</i>系统管理</a>
                    <ul class="sub-menu">
                        <li><a href="#"><i class="icon-font">&#xe017;</i>系统设置</a></li>
                        <li><a href="#"><i class="icon-font">&#xe037;</i>清理缓存</a></li>
                        <li><a href="#"><i class="icon-font">&#xe046;</i>数据备份</a></li>
                        <li><a href="#"><i class="icon-font">&#xe045;</i>数据还原</a></li>
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