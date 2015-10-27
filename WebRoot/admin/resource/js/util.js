//check IP string format
function checkIpStr(ipStr) 
{
	if(ipStr == "")
	{
		return false;
	}
	
	//no Chinese characters
	if(ipStr.match(/[\u4E00-\u9FA5]/)!=null)
	{
		return false;
	}
	
	//4 segments with 3 dot
	if(ipStr.length>15)
	{
		return false;
	}
	if(ipStr.length<7)
	{
		return false; 
	}
	
	//no " "
	if(ipStr.indexOf(" ")!=-1)
	{
		return false;
	}
	var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	var IPArray = ipStr.match(ipDomainPat);
    if (IPArray != null) 
	{
       	for (var i = 1; i <= 4; i++) 
		{
       		if (i == 1)
       		{
	           	if (IPArray[i] == 0 || IPArray[i] > 240) 
				{
	               	return false;
	            }       			
       		}       		
       		else
			{
				if(IPArray[i] > 255)
				{
					return false;
				}
			}			
        }
        return true;
    }
	
	return false;
}

function checkIpStrIncludeZero(ipStr) 
{
	if(ipStr == "")
	{
		return false;
	}
	if(ipStr.match(/[\u4E00-\u9FA5]/)!=null)
	{
		return false;
	}
	if(ipStr.length>15)
	{
		return false;
	}
	if(ipStr.length<7)
	{
		return false; 
	}
	if(ipStr.indexOf(" ")!=-1)
	{
		return false;
	}
	var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	var IPArray = ipStr.match(ipDomainPat);
    if (IPArray != null) {
       	for (var i = 1; i <= 4; i++) {
       		
       		
       		if (i == 1)
       		{
	           	if (IPArray[i] > 240) {
	               	return false;
	            }          		
       		}
       		
       		if (i != 2 && i != 3)
       		{
	           	if (IPArray[i] >= 255 ) {
	               	return false;
	            }       			
       		}
       		else
       		{
				if (IPArray[i] > 255 ) {
	               	return false;
	            }          		
       		}
        }
        return true;
    }
	return false;
}

//check IP Segment format
function checkIpSegmentStr(ipStr) 
{
	if(ipStr == "")
	{
		return false;
	}
	if(ipStr.match(/[\u4E00-\u9FA5]/)!=null)
	{
		return false;
	}
	if(ipStr.length>15)
	{
		return false;
	}
	if(ipStr.length<7)
	{
		return false; 
	}
	if(ipStr.indexOf(" ")!=-1)
	{
		return false;
	}
	
	var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	var IPArray = ipStr.match(ipDomainPat);
	
    if (IPArray != null) {
       	for (var i = 1; i <= 4; i++) {
       		if (i == 1)
       		{
	           	if (IPArray[i] == 0 || IPArray[i] > 240) {
	               	return false;
	            }
       		}
       		
       		if (i != 2 && i != 3)
       		{
	           	if (IPArray[i] > 255 ) {
	               	return false;
	            }       			
       		}
       		else
       		{
				if (IPArray[i] > 255 ) {
	               	return false;
	            }          		
       		}
        }
        return true;
    }
    else
    {
		return false;
	}
}

//check mask string format
function checkMaskStr(ipStr) 
{
	if(ipStr == "")
	{
		return false;
	}
	if(ipStr.match(/[\u4E00-\u9FA5]/)!=null)
	{
		return false;
	}
	if(ipStr.length>15)
	{
		return false;
	}
	if(ipStr.length<7)
	{
		return false; 
	}
	if(ipStr.indexOf(" ")!=-1)
	{
		return false;
	}
	var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	var IPArray = ipStr.match(ipDomainPat);
    if (IPArray != null) {
    	var ip = 0;
    	for (var i = 1; i <= 4; i++) {
    		if (IPArray[i] > 255 || IPArray[i] < 0) {
    			return false;
    		}

    		ip |= IPArray[i] << ((4 - i)*8);
    	}
		
    	var prevBit = -1;
    	if (ip != 0) {
	    	for (var j=32; j>0; --j) {
    			var bit = ip >> (j - 1);
    			bit &= 0x01;  			
    			if (prevBit != -1) {
    				if (bit > prevBit) {
    					return false;
    				}
    			}
				prevBit = bit;
    		}    	
    	}
	    return true;
    }
    else {
		return false;
	}
}

//get ip value from ip string
function getIpValue(ipStr)
{
	var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	var IPArray = ipStr.match(ipDomainPat);
	var ip = 0;
    if (IPArray != null) {		
    	for (var i = 1; i <= 4; i++) {
    		if (IPArray[i] > 255 || IPArray[i] < 0) {
    			return 0;
    		}
    		ip |= IPArray[i] << ((4 - i)*8);
    	}
    }
	return ip;	
}

//check the ips at the same ip segment
function checkIPInSameSegment(ipArray, ipMask)
{
	if(ipArray.length == 0)
	{
		return true;
	}
	
	var maskValue = getIpValue(ipMask);
	var matched = new Array(); 
	for(var i=0; i<ipArray.length; ++i)
	{
		var ip = getIpValue(ipArray[i]);
		matched[i] = ip & maskValue;
	}
	
	var preValue = matched[0];
	for(var j=1; j<matched.length; ++j)
	{
		if(preValue != matched[j])
		{
			return false;
		}
	}
	
	return true;
}

//check date string format
function checkDateStr(timeStr)
{	
	if(timeStr.length <= 0) return false
	var timePattern = /^(\d{4})[-](\d{2})[-](\d{2})$/;
	var timeArray = timeStr.match(timePattern);
	if(timeArray != null)
	{
		for(var i=1; i<=6; i++)
		{
			switch(i)
			{
			case 1: //year
				if(timeArray[i] > 2070 || timeArray[i] < 2000) return false;
				break;
			case 2: //month
				if(timeArray[i] > 12 || timeArray[i] < 1) return false;
				break;
			case 3:	//day
				var days = getMonthDay(timeArray[i-2],timeArray[i-1]);
				if(timeArray[i] > days || timeArray[i] < 1) return false;
				break;
			}
		}
		return true;
	}
	return false;
}

//check time string format
function checkTimeStr(timeStr)
{	
	if(timeStr.length <= 0) return false
	var timePattern = /^(\d{4})[-](\d{2})[-](\d{2})[ ](\d{2})[:](\d{2})[:](\d{2})$/;
	var timeArray = timeStr.match(timePattern);
	if(timeArray != null)
	{
		for(var i=1; i<=6; i++)
		{
			switch(i)
			{
			case 1: //year
				if(timeArray[i] > 2070 || timeArray[i] < 2000) return false;
				break;
			case 2: //month
				if(timeArray[i] > 12 || timeArray[i] < 1) return false;
				break;
			case 3:	//day
				var days = getMonthDay(timeArray[i-2],timeArray[i-1]);
				if(timeArray[i] > days || timeArray[i] < 1) return false;
				break;
			case 4: //hour
				if(timeArray[i] > 23 || timeArray[i] < 0) return false;
				break;
			case 5:	//minute
				if(timeArray[i] > 59 || timeArray[i] < 0) return false;
				break;			
			case 6: //second
				if(timeArray[i] > 59 || timeArray[i] < 0) return false;
				break;
			}
		}
		return true;
	}
	return false;
}

//build url by element		
function buildUrlParam(elementId, paramName)
{
	var urlParam = paramName;		
	urlParam += '=';
	urlParam += document.getElementById(elementId).value;
	return urlParam;
}
		
function buildFirstUrlParam(elementId, paramName)
{
	return '?' + buildUrlParam(elementId, paramName);
}
		
function buildNonFirstUrlParam(elementId, paramName)
{
	return '&' + buildUrlParam(elementId, paramName);
}

function getDateFromString(timeStr)
{
	var timePattern = /^(\d{4})[-](\d{2})[-](\d{2})[ ](\d{2})[:](\d{2})[:](\d{2})$/;
	var timeArray = timeStr.match(timePattern);
	var year = 0;
	var month = 0;
	var day = 0;
	var hour = 0;
	var minute = 0;
	var second = 0;
	if(timeArray != null)
	{
		for(var i=1; i<=6; i++)
		{
			switch(i)
			{
			case 1: //year
				year = timeArray[i];
				break;
			case 2: //month
				month = timeArray[i];
				break;
			case 3:	//day
				day = timeArray[i];
				break;
			case 4: //hour
				hour = timeArray[i];
				break;
			case 5:	//minute
				minute = timeArray[i];
				break;			
			case 6: //second
				second = timeArray[i];
				break;
			}
		}
		return new Date(year,month,day,hour,minute,second,0);
	}	
	return new Date();
}

//check year and month consistency
function getMonthDay(year, month)
{	
	switch(month)
	{
	case '01':
		return 31;
	case '02':
		if (isLeapYear(year))
		{
			return 29;
		}
		else
		{
			return 28;
		}
	case '03':
		return 31;
	case '04':
		return 30;
	case '05':
		return 31;
	case '06':
		return 30;
	case '07':
		return 31;
	case '08':
		return 31;
	case '09':
		return 30;
	case '10':
		return 31;
	case '11':
		return 30;
	case '12':
		return 31;
	default:
		return -1;	
	}
}

//check year and month consistency
function getMonthDate(year, month)
{	
	if (month == 1) return 31;
	else if (month == 2){ return isLeapYear(year) ? 29 : 28;}
	else if (month == 3) return 31;
	else if (month == 4) return 30;
	else if (month == 5) return 31;
	else if (month == 6) return 30;
	else if (month == 7) return 31;
	else if (month == 8) return 31;
	else if (month == 9) return 30;
	else if (month == 10) return 31;
	else if (month == 11) return 30;
	else if (month == 12) return 31;
	else return -1;
}

//check number digit
function checkNum(value)
{	
	for (var i=0;i<value.length;++i)
	{
        var c = value.charAt(i);
   		if((c >= "0") && (c <= "9"))
   		{
   			continue;
   		}
   		else
   		{	
   			return false;
   		}
	}
	
	return true;
}	
//page order	
function pageOrder(orderField)
{
	 var orderFlag = document.pageListForm.orderFlag.value;
	 if ("desc" == orderFlag && document.pageListForm.orderField.value == orderField)
	 {
	   document.pageListForm.orderFlag.value="asc";
	 }
	 else
	 {
	   document.pageListForm.orderFlag.value="desc";
	 }

	 document.pageListForm.orderField.value=orderField;

	 document.pageListForm.submit();
}

//build range number chekcer
function numRangeBuilder(minValue, maxValue)
{
	return function (value) {
		if(checkNum(value))
		{
			if(value > maxValue || value < minValue)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		else 
		{
			return false;
		}				
	}
}	

//Tag node
function tagCheckNode(checkName)
{
	if(document.getElementById(checkName).checked)
	{
		document.getElementById(checkName).value = CHECK_TAG;	
	}
	else
	{
		document.getElementById(checkName).value = UNCHECK_TAG;
	}
}

//valid node value
function validValueNode(nodeName,callback)
{
	var nodeValue = document.getElementById(nodeName).value;
	if(!callback(nodeValue))
	{
		document.getElementById(nodeName).focus();
		return false;
	}
	return true;		
}		

//check and valid node value
function validCheckAndValueNode(checkName,nodeName,callback)
{
	if(document.getElementById(checkName).checked)
	{
		document.getElementById(checkName).value = CHECK_TAG;
		var nodeValue = document.getElementById(nodeName).value.trim();
		if(!callback(nodeValue))
		{
			document.getElementById(nodeName).focus();
			return false;
		}
	}
	else
	{
		document.getElementById(checkName).value = UNCHECK_TAG;
	}
	return true;		
}	

//check start time must less than end time
function checkStartTimeLessThanEndtime(startName, endName, fmt)
{
	var startValue = document.getElementById(startName).value;
	var startDate = Date.parseDate(startValue, fmt);
	
	var endValue = document.getElementById(endName).value;
	var endDate = Date.parseDate(endValue, fmt);
	
	return startDate.getTime() <= endDate.getTime();
}

function checkStartTimeEndTimeInSameMonth(startName, endName, fmt)
{
	var startValue = document.getElementById(startName).value;
	var startDate = Date.parseDate(startValue, fmt);
	
	var endValue = document.getElementById(endName).value;
	var endDate = Date.parseDate(endValue, fmt);
	
	if (startDate.getFullYear() != endDate.getFullYear())
	{
		return false;
	}
	
	if (startDate.getMonth() != endDate.getMonth())
	{
		return false;
	}
	
	return true;
}

// check starttime and endtime must be the same day 
function checkStartTimeEndTimeInSameDay(startName, endName, fmt)
{
	var startValue = document.getElementById(startName).value;
	var startDate = Date.parseDate(startValue, fmt);
	
	var endValue = document.getElementById(endName).value;
	var endDate = Date.parseDate(endValue, fmt);
	
	if (startDate.getFullYear() != endDate.getFullYear())
	{
		return false;
	}
	
	if (startDate.getMonth() != endDate.getMonth())
	{
		return false;
	}
	
	if (startDate.getDate() != endDate.getDate())
	{
		return false;
	}
	return true;
}

//between start time and end time must not exceed spanNum
function checkTimeSpanLimit(startName, endName, fmt, spanNum)
{
	var startValue = document.getElementById(startName).value;
	var startDate = Date.parseDate(startValue, fmt);
	
	var endValue = document.getElementById(endName).value;
	var endDate = Date.parseDate(endValue, fmt);
	
	var startSeconds = startDate.getTime()/1000;
	var endSeconds = endDate.getTime()/1000;

	var timeDiff = endSeconds - startSeconds;
	if(timeDiff > 86400 * spanNum)
	{
		return false;
	}
	
	return true;
}

//fomat date to string
function formatDate(date, fmt)
{
	var m = date.getMonth();
	var d = date.getDate();
	var y = date.getFullYear();
	var wn = date.getWeekNumber();
	var w = date.getDay();
	var s = {};
	var hr = date.getHours();
	var pm = (hr >= 12);
	var ir = (pm) ? (hr - 12) : hr;
	var dy = date.getDayOfYear();
	if (ir == 0)
		ir = 12;
	var min = date.getMinutes();
	var sec = date.getSeconds();

	var s = {};
	s["%C"] = 1 + Math.floor(y / 100); // the century number
	s["%d"] = (d < 10) ? ("0" + d) : d; // the day of the month (range 01 to 31)
	s["%e"] = d; // the day of the month (range 1 to 31)
	// FIXME: %D : american date style: %m/%d/%y
	// FIXME: %E, %F, %G, %g, %h (man strftime)
	s["%H"] = (hr < 10) ? ("0" + hr) : hr; // hour, range 00 to 23 (24h format)
	s["%I"] = (ir < 10) ? ("0" + ir) : ir; // hour, range 01 to 12 (12h format)
	s["%j"] = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy; // day of the year (range 001 to 366)
	s["%k"] = hr;		// hour, range 0 to 23 (24h format)
	s["%l"] = ir;		// hour, range 1 to 12 (12h format)
	s["%m"] = (m < 9) ? ("0" + (1+m)) : (1+m); // month, range 01 to 12
	s["%M"] = (min < 10) ? ("0" + min) : min; // minute, range 00 to 59
	s["%n"] = "\n";		// a newline character
	s["%p"] = pm ? "PM" : "AM";
	s["%P"] = pm ? "pm" : "am";
	// FIXME: %r : the time in am/pm notation %I:%M:%S %p
	// FIXME: %R : the time in 24-hour notation %H:%M
	s["%s"] = Math.floor(date.getTime() / 1000);
	s["%S"] = (sec < 10) ? ("0" + sec) : sec; // seconds, range 00 to 59
	s["%t"] = "\t";		// a tab character
	// FIXME: %T : the time in 24-hour notation (%H:%M:%S)
	s["%U"] = s["%W"] = s["%V"] = (wn < 10) ? ("0" + wn) : wn;
	s["%u"] = w + 1;	// the day of the week (range 1 to 7, 1 = MON)
	s["%w"] = w;		// the day of the week (range 0 to 6, 0 = SUN)
	// FIXME: %x : preferred date representation for the current locale without the time
	// FIXME: %X : preferred time representation for the current locale without the date
	s["%y"] = ('' + y).substr(2, 2); // year without the century (range 00 to 99)
	s["%Y"] = y;		// year with the century
	s["%%"] = "%";		// a literal '%' character

	var result = fmt;
	var a = fmt.match(/%./g);
	for (var i = 0; i < a.length; i++) {
		var tmp = s[a[i]];
		if (tmp) {
			var re = new RegExp(a[i], 'g');
			result = result.replace(re, tmp);
		}
	}
	
	return result;
}

function isLeapYear(year)
{
	if((year%4) > 0)
	{
		return false;
	}
	else if((year%100) == 0 && (year%400) >0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

//encode base64
encodeBase64.keyArray 
			  = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";

function encodeBase64(input)
{
    input = encodeURI(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
       chr1 = input.charCodeAt(i++);
       chr2 = input.charCodeAt(i++);
       chr3 = input.charCodeAt(i++);

       enc1 = chr1 >> 2;
       enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
       enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
       enc4 = chr3 & 63;

       if (isNaN(chr2)) {
          enc3 = enc4 = 64;
       } else if (isNaN(chr3)) {
          enc4 = 64;
       }

       output = output + 
          encodeBase64.keyArray.charAt(enc1) + 
          encodeBase64.keyArray.charAt(enc2) + 
          encodeBase64.keyArray.charAt(enc3) + 
          encodeBase64.keyArray.charAt(enc4);
       chr1 = chr2 = chr3 = "";
       enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;	
}

function decodeBase64(input)
{
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
	
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
       alert("There were invalid base64 characters in the input text.\n" +
             "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
             "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	if (input.length == 0)
	{
		return input;
	}
	
    do {
       enc1 = encodeBase64.keyArray.indexOf(input.charAt(i++));
       enc2 = encodeBase64.keyArray.indexOf(input.charAt(i++));
       enc3 = encodeBase64.keyArray.indexOf(input.charAt(i++));
       enc4 = encodeBase64.keyArray.indexOf(input.charAt(i++));

       chr1 = (enc1 << 2) | (enc2 >> 4);
       chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
       chr3 = ((enc3 & 3) << 6) | enc4;

       output = output + String.fromCharCode(chr1);

       if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
       }
       if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
       }

       chr1 = chr2 = chr3 = "";
       enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);
     
     var result = decodeURI(output);
     var ret = "";
     var inputEscape = false;
     for(var i=0;i<result.length;++i)
     {
     	var ch = result.charAt(i);
     	switch(ch)
     	{
     	case '+':
     		ret += ' ';
     		break;
     	case '%':
     		inputEscape = true;
     		break;
     	case '0':
     	case '1':
     	case '2':
     	case '3':
     	case '4':
     	case '5':
     	case '6':
     	case '7':
     	case '8':
     	case '9':
     	case 'A':
     	case 'B':
     	case 'C':
     	case 'D':
     	case 'E':
     	case 'F':
     		{
     			if(inputEscape)
     			{
     				var num = ch;
     				num += result.charAt(++i);
     				ret += String.fromCharCode(parseInt(num, 16));
     				inputEscape = false;
     			}
     			else
     			{
     				ret += ch;
     			}
     		}
     		break;
     	default:
     		ret += ch;
     	}
     	
     }   
     
     return ret;     
}
