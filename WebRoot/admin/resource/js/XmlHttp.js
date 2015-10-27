//创建XMLHttpRequest对象
var XMLHttp = {
    _objPool: [],
    _getInstance: function ()
    {
    	var poolLength = this._objPool.length;
        for (var i = 0; i < poolLength; i ++)
        {
        	var tempXmlHttp = this._objPool[i];
            if (tempXmlHttp.readyState == 0)
            {
                return tempXmlHttp;
            }
        }
        // IE5中不支持push方法
        this._objPool[this._objPool.length] = this._createObj();
        return this._objPool[this._objPool.length-1];
    },
    _createObj: function ()
    {
        if (window.ActiveXObject){
			objXMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			objXMLHttp = new XMLHttpRequest();
		}
		// mozilla某些版本没有readyState属性
        if (objXMLHttp.readyState == null)
        {
            objXMLHttp.readyState = 0;    
            objXMLHttp.addEventListener("load", function ()
                {
                    objXMLHttp.readyState = 4;    
                    if (typeof objXMLHttp.onreadystatechange == "function")
                    {
                        objXMLHttp.onreadystatechange();
                    }
                },  false);
        } 
        return objXMLHttp;
    },
    // 发送请求(方法[post,get], 地址, 数据, 回调函数)
    sendReq: function (method, url,data,callback,params)
    {
        var objXMLHttp = this._getInstance();
        with(objXMLHttp)
        {
            try
            {
				// 加随机数防止缓存
                if (url.indexOf("?") > 0)
                {
                    url += "&randnum=" + Math.random();
                }
                else
                {
                    url += "?randnum=" + Math.random();
                }
                open(method, url, true);
                // 设定请求编码方式
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				setRequestHeader("Cache-Control","no-cache"); 
                send(data);
                onreadystatechange = function ()
                {
                    if(objXMLHttp.readyState==4){
						if(objXMLHttp.status==200){
							callback(objXMLHttp,params);
						}
					}else{
					}
                }
            }
            catch(e)
            {
                alert(e);
            }
        }
    }
}; 