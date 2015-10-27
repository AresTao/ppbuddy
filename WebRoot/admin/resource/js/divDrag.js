/*
<!-- * 一个简单的拖曳页面元素的js脚本
<!-- * @author yelb
<!-- * 
<!-- */

/*#win1 { position: relative;width: 250px; height: 80px;border: 0px solid #000;}
<!-- 
<!--#win1 { position: relative;width: 250px; height: 80px;border: 1px solid #666FF;}
<!--.title {position: absolute;width: 6px;height: 6px;overflow:hidden;background: red;color: #fff;cursor: move;}

<!--/*


var initMouseClientX;//用于在鼠标按下时记下鼠标的位置x
var initMouseClientY;//用于在鼠标按下时记下鼠标的位置y
var initDragObjX;//用于在鼠标按下时记被拖曳对象的位置x
var initDragObjY;//用于在鼠标按下时记被拖曳对象的位置y
var isMove = false; // 鼠标移动的一个标识

/**拖曳准备*/
function startMove(obj){
	obj.setCapture();//捕获鼠标事件
	isMove=true;
	initMouseClientX = event.clientX;//用于在鼠标按下时记下鼠标的位置x
	initMouseClientY = event.clientY;//用于在鼠标按下时记下鼠标的位置y
	initDragObjX = parseFloat(obj.style.left.substr(0,obj.style.left.length-2));//用于在鼠标按下时记被拖曳对象的位置x
	initDragObjY = parseFloat(obj.style.top.substr(0,obj.style.top.length-2));//用于在鼠标按下时记被拖曳对象的位置y
}

/**拖曳停止*/
function stopMove(obj){
	obj.releaseCapture();//释放，和setCapture是对应的
	isMove = false;
	afterDrag(obj);
}

/**停止拖动后的坐标定位*/
function afterDrag(obj){
	var parentDiv = document.getElementById("storImg");
	var gisX = obj.style.left.substr(0,obj.style.left.length-2);
	var gisY = obj.style.top.substr(0,obj.style.top.length-2);
	document.getElementById("gisX").value = gisX;
	document.getElementById("gisY").value = gisY;
	document.getElementById("gis").innerHTML = "x:"+gisX+",&nbsp;y:"+gisY;
}

/**移动，元素只能在父结点的区域内移动*/
function move(obj,parentObjId){
	if(isMove){ // 鼠标移动的一个标识，标识为true时开始调整元素的位置
		var newLeft = event.clientX - initMouseClientX + initDragObjX; //event.clientX鼠标在屏幕上的x位置
		var newTop = event.clientY - initMouseClientY + initDragObjY;
		var parentDiv =  document.getElementById(parentObjId); //被拖曳对象的父结点或其它参考结点
		//被拖曳对象的活动范围:到左最小、最大距离； 到上最小、最大距离
		var leftMin = parentDiv.style.left;//坐标左的最小值，parentDiv.style.left为被拖曳对象的父结点或其它参考结点x位置
		var leftMax = parentDiv.style.left + parentDiv.clientWidth - obj.clientWidth; // 坐标左的最在值
		var topMin = parentDiv.style.top;//坐标上的最小值，parentDiv.style.left为被拖曳对象的父结点或其它参考结点y位置
		var topMax = parentDiv.style.top + parentDiv.clientHeight - obj.clientHeight;
		//如果被拖曳对象在被拖曳后的仍活动范围内，改变该对象的坐标
		if(newLeft >leftMin && newLeft < leftMax){
			obj.style.left =  newLeft;
		}
		if(newTop > topMin	&& newTop < topMax){
			obj.style.top = newTop;
		}
	}
}

