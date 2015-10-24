<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>泡泡帮运营管理</title>
<meta name="keywords" content="">
<meta name="description" content="">
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
<link href="css/login.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="admin_login_wrap">
    <h1>登录</h1>
    <div class="adming_login_border">
        <div class="admin_input">
            <form id="login_form" action="./login" method="post">
                <ul class="admin_items">
                    <li>
                        <label for="username">用户名：</label>
                        <input type="text" name="username" value="" id="username" size="40" style="width:270px" class="admin_input_style" />
                    </li>
                    <li>
                        <label for="password">密码：</label>
                        <input type="password" name="password" value="" id="password" size="40" style="width:270px"  class="admin_input_style" />
                    </li>
                    
                    
                    <li>
                        <input type="submit" tabindex="3" value="提交" class="btn btn-primary">
                    </li>
                </ul>
            </form>
        </div>
    </div>
    <!-- <p class="admin_copyright"><a tabindex="5" href="#" target="_blank">返回首页</a> &copy; 2015 Powered by <a href="https://github.com/AresTao" target="_blank">AresTao</a></p> -->
</div>
</body>