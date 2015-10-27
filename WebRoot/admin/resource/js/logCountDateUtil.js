//??¨¬¨¬
function showToDay()
{
	var Nowdate=new Date();
	M=Number(Nowdate.getMonth())+1
	return Nowdate.getFullYear()+"-"+M+"-"+Nowdate.getDate();
}
 
//¡À??¨¹¦Ì¨²¨°?¨¬¨¬
function showWeekFirstDay()
{
	if(document.getElementById("startDate").value==""){
		
		var Nowdate=new Date();
		var WeekFirstDay;
		if(Nowdate.getDay()==0){
			WeekFirstDay=new Date(Nowdate-6*86400000);
		}else{
			WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
				
		}
		
		
		return WeekFirstDay;
	}else{
		var mdate = document.getElementById("startDate").value.split("-");
		var mydate = new Date(mdate[0],mdate[1]-1,mdate[2]);
		var WeekFirstDay;
		
		if(mydate.getDay()==0){
			WeekFirstDay=new Date(mydate-6*86400000);
		}else{
			WeekFirstDay=new Date(mydate-(mydate.getDay()-1)*86400000);
				
		}
		return WeekFirstDay;
	}
}
//¨º¦Ì?¨º¡À??¨¹¦Ì¨²¨°?¨¬¨¬
function showWeekFirstDay2()
{
	var Nowdate=new Date();
	var WeekFirstDay;
	if(Nowdate.getDay()==0){
			WeekFirstDay=new Date(Nowdate-6*86400000);
		}else{
			WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
				
		}
	return WeekFirstDay;
}
//¡À??¨¹¡Á?o¨®¨°?¨¬¨¬
function showWeekLastDay()
{
	if(document.getElementById("endDate").value==""){
		var Nowdate=new Date();
		var WeekFirstDay;
		var WeekLastDay;
	
		if(Nowdate.getDay()==0){
			WeekFirstDay=new Date(Nowdate-6*86400000);
			WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
		}else{
			WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
			WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
				
		}
		return WeekLastDay;
	}else{
		var mdate = document.getElementById("endDate").value.split("-");
		var mydate = new Date(mdate[0],mdate[1]-1,mdate[2]);
		var WeekFirstDay;
		var WeekLastDay;
		if(mydate.getDay()==0){
			WeekFirstDay=new Date(mydate-6*86400000);
			WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
		}else{
			WeekFirstDay=new Date(mydate-(mydate.getDay()-1)*86400000);
			WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
				
		}
		return WeekLastDay;
	}
}
//¨º¦Ì?¨º¡À??¨¹¡Á?o¨®¨°?¨¬¨¬
function showWeekLastDay2()
{
	var Nowdate=new Date();
	var WeekFirstDay;
	var WeekLastDay;
	if(Nowdate.getDay()==0){
			WeekFirstDay=new Date(Nowdate-6*86400000);
			WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
		}else{
			WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
			WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
				
		}
	return WeekLastDay;
}
 
//¡À???¦Ì¨²¨°?¨¬¨¬
function showMonthFirstDay()
{
		
	if(document.getElementById("startDate").value==""){
		var Nowdate=new Date();
		var MonthFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth(),1);
		return MonthFirstDay;
	}else {
		var mydate = document.getElementById("startDate").value.split("-");
		var MonthFirstDay=new Date(mydate[0],mydate[1],1);
		return MonthFirstDay;
	}
}
//¨º¦Ì?¨º¡À???¦Ì¨²¨°?¨¬¨¬
function showMonthFirstDay2()
{
	if(document.getElementById("startDate").value==""){
		var Nowdate=new Date();
		var MonthFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth(),1);
		return MonthFirstDay;
	}else {
		var mydate = document.getElementById("startDate").value.split("-");
		var MonthFirstDay=new Date(mydate[0],mydate[1]-1,1);
		return MonthFirstDay;
	}
}
//¡À???¡Á?o¨®¨°?¨¬¨¬
function showMonthLastDay()
{
	if(document.getElementById("startDate").value==""){
		var Nowdate=new Date();
		var MonthNextFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth()+1,1);
		var MonthLastDay=new Date(MonthNextFirstDay-86400000);
		return MonthLastDay;
	}else {
		var mydate = document.getElementById("startDate").value.split("-");
		var MonthNextFirstDay=new Date(mydate[0],Number(mydate[1])+1,1);
		var MonthLastDay=new Date(MonthNextFirstDay-86400000);
		return MonthLastDay;
	}
	
}
//¨º¦Ì?¨º¡À???¡Á?o¨®¨°?¨¬¨¬
function showMonthLastDay2()
{
	if(document.getElementById("startDate").value==""){
		var Nowdate=new Date();
		var MonthNextFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth()+1,1);
		var MonthLastDay=new Date(MonthNextFirstDay-86400000);
		return MonthLastDay;
	}else {
		var mydate = document.getElementById("startDate").value.split("-");
		var MonthNextFirstDay=new Date(mydate[0],Number(mydate[1]),1);
		var MonthLastDay=new Date(MonthNextFirstDay-86400000);
		return MonthLastDay;
	}
}
//¨¦???¦Ì¨²¨°?¨¬¨¬
function showPreviousFirstDay()
{
	var MonthFirstDay=showMonthFirstDay();
	return new Date(MonthFirstDay.getFullYear(),MonthFirstDay.getMonth()-2,1)
}
//¨¦???¡Á?o¨®¨°?¨¬¨¬
function showPreviousLastDay()
{
	var MonthFirstDay=showMonthFirstDay();
	return new Date(MonthFirstDay-86400000);
}
//¨¦??¨¹¦Ì¨²¨°?¨¬¨¬
function showPreviousFirstWeekDay()
{
	var WeekFirstDay=showWeekFirstDay();
	return new Date(WeekFirstDay-86400000*7);
}
//¨¦??¨¹¡Á?o¨®¨°?¨¬¨¬
function showPreviousLastWeekDay()
{
	var WeekFirstDay=showWeekFirstDay()
    var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
	return WeekLastDay;
}
//¨¦?¨°?¨¬¨¬
function showPreviousDay()
{
	var MonthFirstDay=new Date();
	return new Date(MonthFirstDay-86400000);
}
//??¨°?¨¬¨¬
function showNextDay()
{
	var MonthFirstDay=new Date();
	return new Date((MonthFirstDay/1000+86400)*1000);
}
//???¨¹¦Ì¨²¨°?¨¬¨¬
function showNextFirstWeekDay()
{
	var MonthFirstDay=showWeekLastDay()
	return new Date((MonthFirstDay/1000+86400)*1000)
}
//???¨¹¡Á?o¨®¨°?¨¬¨¬
function showNextLastWeekDay()
{
	var MonthFirstDay=showWeekLastDay()
	return new Date((MonthFirstDay/1000+7*86400)*1000)
}
//????¦Ì¨²¨°?¨¬¨¬
function showNextFirstDay()
{
	var MonthFirstDay=showMonthFirstDay()
	return new Date(MonthFirstDay.getFullYear(),MonthFirstDay.getMonth(),1)
}
//????¡Á?o¨®¨°?¨¬¨¬
function showNextLastDay()
{
	var MonthFirstDay=showMonthFirstDay()
	return new Date(new Date(MonthFirstDay.getFullYear(),MonthFirstDay.getMonth(),1)-86400000)
}
Date.prototype.toString = function(){
	return this.getFullYear()+"-"+((this.getMonth()+1)<10?'0'+(this.getMonth()+1):(this.getMonth()+1))+"-"+(this.getDate()<10?'0'+this.getDate():this.getDate());
}
function setDate(num){
	if(num==1){
		document.all.startDate.value=showMonthFirstDay2();
		document.all.endDate.value=showMonthLastDay2();
	}
	if(num==2){
		document.all.startDate.value=showWeekFirstDay2();
		document.all.endDate.value=showWeekLastDay2();
	}
	if(num==3){
		document.all.startDate.value=showToDay();
		document.all.endDate.value=showToDay();
	}
	if(num==4){
		document.all.startDate.value=showPreviousFirstDay();
		document.all.endDate.value=showPreviousLastDay();
	}
	if(num==5){
		document.all.startDate.value=showNextFirstDay();
		document.all.endDate.value=showNextLastDay();
	}
	if(num==6){
		document.all.startDate.value=showPreviousFirstWeekDay();
		document.all.endDate.value=showPreviousLastWeekDay();
	}
	if(num==7){
		document.all.startDate.value=showNextFirstWeekDay();
		document.all.endDate.value=showNextLastWeekDay();
	}
	if(num==8){
		document.all.startDate.value=showPreviousDay();
		document.all.endDate.value=showPreviousDay();
	}
	if(num==9){
		document.all.startDate.value=showNextDay();
		document.all.endDate.value=showNextDay();
	}
}