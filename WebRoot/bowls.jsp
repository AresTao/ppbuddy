<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE HTML>
<html>
<head>
<title>泡泡帮之刷刷碗</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="miao"/>
<script type="applijegleryion/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<!-- Custom Theme files -->
<link href="css/style.css" rel='stylesheet' type='text/css' />	
<script src="js/jquery-1.11.1.min.js"></script>
</head>
<body>
<!--start-home-->
		<div class="head" id="home">
			  <div class="container">  
			     <div class="main">	
				   <div class="wht-head">	
				     <div class="logo">
				   	   <a href="index.html"><img src="./images/logo.png" title="logo" /></a>
				     </div>
					<!--top-nav-->
					 <span class="menu"> </span>
					  <div class="top-menu">
					  <nav>
						<ul class="cl-effect-16">
							<li><a href="index.jsp" data-hover="首页">首页</a></li>
							<li><a href="hands.jsp" data-hover="洗洗手">洗洗手</a></li>
							<li><a class="active" href="bowls.jsp" data-hover="刷刷碗">刷刷碗</a></li>
							<li><a href="cars.jsp" data-hover="擦擦车">擦擦车</a></li>
							<li><a href="news.jsp" data-hover="新闻">新闻</a></li>
							<li><a href="about.jsp" data-hover="关于">关于</a></li>
							<div class="clearfix"></div>
						</ul>
					  </nav>		
					</div>
					<!-- script-for-menu -->
					<script>
					$( "span.menu" ).click(function() {
					  $( ".top-menu" ).slideToggle( "slow", function() {
						// Animation complete.
					  });
					});
					</script>
					<!-- script-for-menu -->
					<div class="shopping_car">
						<a href="http://shop.paopaobuddy.com"><img src="./images/car_shop.png" title="购物车" /></a>
					</div>
					<div class="clearfix"></div>
					</div>
			 <!--end-nav-->
		<!--start video-->
		<div class="video_bowls">
			<embed class="player" src="http://player.youku.com/player.php/sid/XMTI2MjgwOTI5Mg==/v.swf" width="39%" height="407" allowFullScreen="true" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" >
		</div>
		<!--end video-->
		<div class="buy_bowls">
			<div class="col-md-2">
				<div class="btn_container2">
				<a href="http://shop.paopaobuddy.com"><div class="knowMoreBtn2"></div></a>
				</div>
			</div>
		</div>
		<div class="bowls_info"></div>
		<div class="bowls_qa"></div>
		<div class="wechat"></div>
        <div class="clearfix"></div>
		<!--start footer-->
		<div class="copy">
			<center><img src="./images/QRcode.jpg" class="img-responsive" alt=""/></center>
		    <p><B>&copy; 泡泡帮<br>地址</B> | 北京市丰台区方庄南路15号方恒偶寓1座802室 京ICP备15025321号<br><B>联系方式</B> | 电话：010-56288540， 010-56288541， 邮箱：paopaobang@paopaobuddy.com
<br></p>
		</div>
		<!--footer-->


	    </div>
        <link rel="stylesheet" href="css/swipebox.css">
        	<script src="js/jquery.swipebox.min.js"></script> 
        	    <script type="text/javascript">
        			jQuery(function($) {
        				$(".swipebox").swipebox();
        			});
        </script>
	<!--//gallery-->

	</div>
</div>	
		<a href="#home" id="toTop" class="scroll" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>

</body>
</html>