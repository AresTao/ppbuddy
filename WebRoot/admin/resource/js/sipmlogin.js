
//消息源用户的用户名
var	sourceUser;

var initAjax_submitLogin_flag = 0;
var ajax_submitLogin = 0;

// 初始化一个xmlhttp对象
function initAjax()
{
	var ajax = false;

	try
	{
		ajax = new ActiveXObject (Msxml2.XMLHTTP);
	}
	catch (e)
	{
		try
		{
			ajax = new ActiveXObject ("Microsoft.XMLHTTP");
		}
		catch (e)
		{
			ajax = false;
		}
	}

	if (!ajax && typeof XMLHttpRequest != 'undefined')
	{
		ajax = new XMLHttpRequest ();
	}

	return ajax;

}

function initAjax_submitLogin()
{
	if (initAjax_submitLogin_flag)
		return ajax_submitLogin;
	else{
		ajax_submitLogin = initAjax();
		initAjax_submitLogin_flag = 1;
		return ajax_submitLogin;
	}
}

//处理来自服务器的登录响应消息
function processLoginMsg (responseMsgXML)
{
	var resMsgXML=responseMsgXML.documentElement;
	if (resMsgXML!=null)
	{
		var resCode=resMsgXML.attributes[0].text||resMsgXML.attributes[0].textContent;

		if (resCode == "200")
		{
			
			displayLoginNotification("登录成功，正在转到会话页面……");
			window.location= "sipmui.php?sourcename="+sourceUser;
		}
		else if (resCode == "404")
		{
			displayLoginNotification("用户名或密码错误！");
		}
		else
			displayLoginNotification("登录失败请重试！");
	}
}

//在登录界面中显示提示信息
function displayLoginNotification(notificationString)
{
	var loginNotification = document.getElementById("loginNotification");
	loginNotification.innerText=notificationString;

}

//向服务器（login.php）发送登录请求
function submitLogin()
{
//	var assistantName = document.getElementById("assistantName");
//	var assistantPassword = document.getElementById("assistantPassword");
//	var urlString="login.php?userNameString="+assistantName.value+"&passWordString="+assistantPassword.value;
//	sourceUser = assistantName.value;
	var urlString="http://192.168.2.248/oam/sipm/login.php?userNameString=admin&passWordString=111111";
	sourceUser = "admin";
//	window.location.href=urlString;
	var ajax;

	ajax= initAjax_submitLogin ();

	//使用Get方式进行请求
	ajax.open ("GET", urlString, true);

	//定义回调函数
	ajax.onreadystatechange = function ()
	{
		if (ajax.readyState == 4)
		{
			if (ajax.status == 200)
			{
				processLoginMsg (ajax.responseXML);
			}
		}
	}

	ajax.send (null);
	displayLoginNotification("正在登录，请稍候...");
}  