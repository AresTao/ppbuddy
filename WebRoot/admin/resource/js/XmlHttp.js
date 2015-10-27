//����XMLHttpRequest����
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
        // IE5�в�֧��push����
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
		// mozillaĳЩ�汾û��readyState����
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
    // ��������(����[post,get], ��ַ, ����, �ص�����)
    sendReq: function (method, url,data,callback,params)
    {
        var objXMLHttp = this._getInstance();
        with(objXMLHttp)
        {
            try
            {
				// ���������ֹ����
                if (url.indexOf("?") > 0)
                {
                    url += "&randnum=" + Math.random();
                }
                else
                {
                    url += "?randnum=" + Math.random();
                }
                open(method, url, true);
                // �趨������뷽ʽ
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