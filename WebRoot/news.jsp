<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE HTML>
<html>
<head>
<title>泡泡帮之新闻</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Educator Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
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
							<li><a href="bowls.jsp" data-hover="刷刷碗">刷刷碗</a></li>
							<li><a href="cars.jsp" data-hover="擦擦车">擦擦车</a></li>
							<li><a class="active" href="news.jsp" data-hover="新闻">新闻</a></li>
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

		<!--start head news-->
		<div class="news-header">
			<div class="slider">
				<div class="slider-caption">
					<a href="#"><h1>既然是植物精华的，刷刷碗可以洗果蔬类的食物吗</h1></a>
				</div>
			</div>
		</div>	
		<div class="clearfix"> </div>
		<!--end head news-->
		<!--start news-->
		<div class="news-list">
			
 			<div id="rocktheworld"></div>
		</div>

		<div class="viewmore" id="viewmore" onclick="getMoreNews()"><p>查看更多</p></div>
		<!--end news-->
<!-- 		<div class="news" onload="getNewsList()">
			<div id="a">aa</div>
			<div id="b">bb</div>
			<div id="c">cc</div>
			<div id="d">dd</div>
		</div>

		<div class="clearfix"> </div> -->
		<!--start footer-->
		<div class="wechat"></div>
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
		<a href="#home" id="toTop" class="scroll" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>

</body>
<script type="text/javascript">

var pageNo = 1;
var page = 10;
function getPostList(categoryId, flag, pageNum, page)
{
	var url = "${pageContext.request.contextPath}/api/0.1/post/getList/category/"+categoryId+"/flag/"+flag+"/pageNum/"+pageNum+"/page/"+page;
	$.ajax({
		url : url,
		type : "get",
		dataType : "json",
		cache : false,
 		async : true,
 		success : function(res) {
 			for (var i=0; i<res.length; i++)
 			{
 				$("#rocktheworld").append("<div class=\"top-grids\"><a href=\"newsItem.jsp?newsId="+res[i].postId+"\"><div class=\"news-small-pic col-md-3\"><img class=\"news-ab-img zoom-img\" src='"+res[i].bannerPath+"'/></div><div class=\"news-block\"><h4>"+res[i].title+"</h4><p>"+res[i].shortContent+"</p></div></a></div><div class=\"news-seg\"></div>");
 			}
 		},
 		error : function() {
 			$("#rocktheworld").append("<div class='nomore'><p>没有更多新闻</p></div>");
 			$("#viewmore").hide();
 		}
 	});
}
$(function(){
	getPostList(1,2,pageNo,page);
	pageNo+=1;
});
function getMoreNews()
{
    getPostList(1,2,pageNo,page);
}
</script>
</html>