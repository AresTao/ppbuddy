//Date.js
Date.prototype.pattern = function(formatter)
{
    if(!formatter || formatter == "")
{
    formatter = "yyyy-MM-dd hh:mm:ss";
    }
    var year = this.getFullYear().toString();
    var month = (this.getMonth() + 1).toString();
    var day = this.getDate().toString();
	var hour=this.getHours().toString();

   var minutes= this.getMinutes().toString();
   var seconds= this.getSeconds().toString();
   var mills= this.getMilliseconds().toString();

    var yearMarker = formatter.replace(/[^y|Y]/g,'');
    if(yearMarker.length == 2)
    {
	    year = year.substring(2,4);
    }
	if(yearMarker!=''){formatter=formatter.replace(yearMarker,year)}    
    var monthMarker = formatter.replace(/[^M]/g,'');
    if(monthMarker.length > 1)
    {
        if(month.length == 1)
        {
            month = "0" + month;
       }
  }
if(monthMarker!=''){formatter=formatter.replace(monthMarker,month)}   
  var dayMarker = formatter.replace(/[^d]/g,'');
  if(dayMarker.length > 1)
  {
    if(day.length == 1)
    {
      day = "0" + day;
    }
  }
if(dayMarker!=''){formatter=formatter.replace(dayMarker,day)}  
var hourMarker = formatter.replace(/[^h]/g,'');
  if(hourMarker.length > 1)
  {
    if(hour.length == 1)
    {
      hour = "0" + hour;
    }
  }
if(hourMarker!=''){formatter=formatter.replace(hourMarker,hour)} 
var minutesMarker = formatter.replace(/[^m]/g,'');
  if(minutesMarker.length > 1)
  {
    if(minutes.length == 1)
    {
      minutes = "0" + minutes;
    }
  }
if(minutesMarker!=''){formatter=formatter.replace(minutesMarker,minutes)} 
var secondsMarker = formatter.replace(/[^s]/g,'');
  if(secondsMarker.length > 1)
  {
    if(seconds.length == 1)
    {
      seconds = "0" + seconds;
    }
  }
if(secondsMarker!=''){formatter=formatter.replace(secondsMarker,seconds)} 
  return formatter;  
}
  
Date.prototype.parseString = function(dateString,formatter)
{
  var today = new Date();
  if(!dateString || dateString == "")
  {
    return today;
  }
  if(!formatter || formatter == "")
  {
    formatter = "yyyy-MM-dd";
  } 
  var yearMarker = formatter.replace(/[^y|Y]/g,''); 
  var monthMarker = formatter.replace(/[^m|M]/g,''); 
  var dayMarker = formatter.replace(/[^d]/g,'');
  var yearPosition = formatter.indexOf(yearMarker);
  var yearLength = yearMarker.length;
  var year = dateString.substring(yearPosition ,yearPosition + yearLength) * 1;
  if( yearLength == 2)
  {
    if(year < 50 )
    {
      year += 2000;
    }
    else
    {
      year += 1900;
    }
  }
  var monthPosition = formatter.indexOf(monthMarker);
  var month = dateString.substring(monthPosition,monthPosition + monthMarker.length) * 1 - 1;
  var dayPosition = formatter.indexOf(dayMarker);
  var day = dateString.substring( dayPosition,dayPosition + dayMarker.length )* 1;
  return new Date(year,month,day);
}
