<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE HTML>
<html>
<head>
<title>泡泡帮</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="applijegleryion/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<link rel="shortcut icon" type="image/x-icon" href="css/images/favicon.ico" />
<link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="all" />
<!-- Custom Theme files -->
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="js/jquery.flexslider-min.js" type="text/javascript"></script>
<script src="js/functions.js" type="text/javascript"></script>
</head>
<body>
<!--start-home-->
		<div class="head" id="home">
			  <div class="container">  
			     <div class="main">	
			     	<!--top-nav-->
				   <div class="wht-head">	
				   <!---- start-logo---->
				     <div class="logo">
				   	   <a href="index.html"><img src="./images/logo.png" title="logo" /></a>
				     </div>
				   <!---- //End-logo---->
					<span class="menu"> </span>
					<div class="top-menu">
					<nav>
						<ul class="cl-effect-16">
							<li><a class="active scroll" href="#home" data-hover="首页">首页</a></li>
							<li><a href="hands.jsp" data-hover="洗洗手">洗洗手</a></li>
							<li><a href="bowls.jsp" data-hover="刷刷碗">刷刷碗</a></li>
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
				<!--start banner-->
		<div class="about" id="about">
			<section><div class="shell">
				<!-- slider -->
				<div class="slider-holder">
					<!-- <span class="slider-shadow"></span> -->
					<div class="flexslider">
						<ul class="slides">
							<li>
								<img src="./images/index_banner_1.jpg" alt="" />
								<span class="overlay"></span>
							</li>
							<li>
								<img src="./images/index_banner_1.jpg" alt="" />
								<span class="overlay"></span>
							</li>
						</ul>
					</div>
				</div>
				<!-- end of slider -->
			</div></section>
			<div class="clearfix"></div>
		</div>
			</div><!--end main-->
		<div class="clearfix"></div>
		<!--end banner-->
		<!--单个产品，最后的文案介绍
			<div class="slide-text text-center">
					<h1>High Quality Template</h1>
					<span>Built with love.</span>
					<a class="slide-btn" href="#">Learn More</a>
				</div>
				<div class="clearfix"></div>
			-->
		<!--start introduction-->

		<div class="product_hands">
			
				<div class="btn_container1">
				<a href="hands.html"><div class="knowMoreBtn"></div></a>
				</div>
			
		</div>

		<div class="product_bowls">
			
				<div class="btn_container2">
				<a href="bowls.html"><div class="knowMoreBtn"></div></a>
				</div>
			
		</div>
   
		<div class="product_cars">
			
				<div class="btn_container3">
				<a href="cars.html"><div class="knowMoreBtn"></div></a>
				</div>
			
		</div>

		<div class="clearfix"></div>
		<div class="wechat1"></div>
        <div class="clearfix"></div>
		<!--end introduction-->
		<!--start footer-->
		<div class="copy">
			<center><img src="./images/QRcode.jpg" class="img-responsive" alt=""/></center>
		    <p><B>&copy; 泡泡帮<br>地址</B> | 北京市丰台区方庄南路15号方恒偶寓1座802室 京ICP备15025321号<br><B>联系方式</B> | 电话：010-56288540， 010-56288541， 邮箱：paopaobang@paopaobuddy.com
</p>
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

	<!--start-smoth-scrolling-->
			<script type="text/javascript">
								jQuery(document).ready(function($) {
									$(".scroll").click(function(event){		
										event.preventDefault();
										$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
									});
								});
								</script>
							<!--start-smoth-scrolling-->
						<script type="text/javascript">
									$(document).ready(function() {
										/*
										var defaults = {
								  			containerID: 'toTop', // fading element id
											containerHoverID: 'toTopHover', // fading element hover id
											scrollSpeed: 1200,
											easingType: 'linear' 
								 		};
										*/
										
										$().UItoTop({ easingType: 'easeOutQuart' });
										
									});
								</script>
		<a href="#home" id="toTop" class="scroll" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>

</body>
</html>