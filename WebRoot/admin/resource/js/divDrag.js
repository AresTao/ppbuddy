/*
<!-- * һ���򵥵���ҷҳ��Ԫ�ص�js�ű�
<!-- * @author yelb
<!-- * 
<!-- */

/*#win1 { position: relative;width: 250px; height: 80px;border: 0px solid #000;}
<!-- 
<!--#win1 { position: relative;width: 250px; height: 80px;border: 1px solid #666FF;}
<!--.title {position: absolute;width: 6px;height: 6px;overflow:hidden;background: red;color: #fff;cursor: move;}

<!--/*


var initMouseClientX;//��������갴��ʱ��������λ��x
var initMouseClientY;//��������갴��ʱ��������λ��y
var initDragObjX;//��������갴��ʱ�Ǳ���ҷ�����λ��x
var initDragObjY;//��������갴��ʱ�Ǳ���ҷ�����λ��y
var isMove = false; // ����ƶ���һ����ʶ

/**��ҷ׼��*/
function startMove(obj){
	obj.setCapture();//��������¼�
	isMove=true;
	initMouseClientX = event.clientX;//��������갴��ʱ��������λ��x
	initMouseClientY = event.clientY;//��������갴��ʱ��������λ��y
	initDragObjX = parseFloat(obj.style.left.substr(0,obj.style.left.length-2));//��������갴��ʱ�Ǳ���ҷ�����λ��x
	initDragObjY = parseFloat(obj.style.top.substr(0,obj.style.top.length-2));//��������갴��ʱ�Ǳ���ҷ�����λ��y
}

/**��ҷֹͣ*/
function stopMove(obj){
	obj.releaseCapture();//�ͷţ���setCapture�Ƕ�Ӧ��
	isMove = false;
	afterDrag(obj);
}

/**ֹͣ�϶�������궨λ*/
function afterDrag(obj){
	var parentDiv = document.getElementById("storImg");
	var gisX = obj.style.left.substr(0,obj.style.left.length-2);
	var gisY = obj.style.top.substr(0,obj.style.top.length-2);
	document.getElementById("gisX").value = gisX;
	document.getElementById("gisY").value = gisY;
	document.getElementById("gis").innerHTML = "x:"+gisX+",&nbsp;y:"+gisY;
}

/**�ƶ���Ԫ��ֻ���ڸ������������ƶ�*/
function move(obj,parentObjId){
	if(isMove){ // ����ƶ���һ����ʶ����ʶΪtrueʱ��ʼ����Ԫ�ص�λ��
		var newLeft = event.clientX - initMouseClientX + initDragObjX; //event.clientX�������Ļ�ϵ�xλ��
		var newTop = event.clientY - initMouseClientY + initDragObjY;
		var parentDiv =  document.getElementById(parentObjId); //����ҷ����ĸ����������ο����
		//����ҷ����Ļ��Χ:������С�������룻 ������С��������
		var leftMin = parentDiv.style.left;//���������Сֵ��parentDiv.style.leftΪ����ҷ����ĸ����������ο����xλ��
		var leftMax = parentDiv.style.left + parentDiv.clientWidth - obj.clientWidth; // �����������ֵ
		var topMin = parentDiv.style.top;//�����ϵ���Сֵ��parentDiv.style.leftΪ����ҷ����ĸ����������ο����yλ��
		var topMax = parentDiv.style.top + parentDiv.clientHeight - obj.clientHeight;
		//�������ҷ�����ڱ���ҷ����Ի��Χ�ڣ��ı�ö��������
		if(newLeft >leftMin && newLeft < leftMax){
			obj.style.left =  newLeft;
		}
		if(newTop > topMin	&& newTop < topMax){
			obj.style.top = newTop;
		}
	}
}

