/*
 * <p>Title: EAP企业应用开发平台</p>
 *
 * <p>Description: 旨在为各位同仁提供统一的基础开发平台，提高开发效率，改进工作质量！</p>
 *
 * <p>Copyright: Copyright (C) Surekam 2008</p>
 *
 * <p>Company: www.surekam.com</p>
 *
 * <p>auther zouwd</p>
 */

var nodes			= new Array();
var openNodes		= new Array();
var icons			= new Array(6);

var rootidex;

var oldTypeCat;
var n=0;
//判断是否添加enpty图标 --- zouwd
var dRoot =0;
var dNode;
// Loads all icons that are used in the tree
function preloadIcons() {
	icons[0] = new Image();
	icons[0].src = "../resource/images/tree/plus.gif";
	icons[1] = new Image();
	icons[1].src = "../resource/images/tree/plusbottom.gif";
	icons[2] = new Image();
	icons[2].src = "../resource/images/tree/minus.gif";
	icons[3] = new Image();
	icons[3].src = "../resource/images/tree/minusbottom.gif";
	icons[4] = new Image();
	icons[4].src = "../resource/images/tree/folder.gif";
	icons[5] = new Image();
	icons[5].src = "../resource/images/tree/folderopen.gif";
}
// Create the tree  add by zouwd
// nodeId | parentNodeId | nodeName | nodeUrl | type
//menuTree[0]  = "0|0|Root|#";
var iid = 0;
function createTree(arrName, rootName, startNode, openNode,neTypeCat) {
    nodes = arrName;
    var hcn	= hasChildNode(startNode);
    var ino = isNodeOpen(startNode);
    //dRoot = 0;
	document.write("<div style='white-space: nowrap;'>");
    if(n != 0 && neTypeCat != oldTypeCat )
            document.write("<br/>");
	if (nodes.length > 0) {
		//preloadIcons();
		if (startNode == null) startNode = 0;
		if (openNode != 0 || openNode != null) setOpenNodes(openNode);

		if (startNode != -1) {
			rootidex=getArrayId(startNode)
			var nodeValues = nodes[rootidex].split("|");
            var photoURI ="";
            if(neTypeCat == 5)//平台类的图标显示
               photoURI="src=\"../resource/images/tree/platForm.gif\"";
		    else if(neTypeCat == 10)//应用类的图标
               photoURI="src=\"../resource/images/tree/application.gif\"";
            else if(neTypeCat == 15)//业务类
               photoURI="src=\"../resource/images/tree/business.gif\"";
            else//静态类
               photoURI="src=\"../resource/images/tree/static.gif\"";
            // Write out join icons
			if (hcn) {
                document.write("<a href=\"javascript: rootOc('" + startNode + "', 1);\"><img id=\"join" + startNode + "\" src=\"../resource/images/tree/");
                    if (ino) document.write("minus");
                    else document.write("plus");
                document.write("Root.gif\" align=\"absbottom\" alt=\"Open/Close node\" /></a>");
			} else {
				document.write("<img src=\"../resource/images/tree/null.gif\" align=\"absbottom\"  />");
			}
            document.write("<img "+photoURI+" align=\"absbottom\"  /><a target='manageFrame' id=a"+iid+" name='aiid' class='simple' onclick='getSelect(this)' href=\"" + nodeValues[3] + "\"  >" + nodeValues[2] + "</a><br />");
            iid++;
        } else document.write("<img src=\"../resource/images/tree/base.gif\" align=\"absbottom\"  />" + rootName + "<br />");

		var recursedNodes = new Array();
		//addNode(startNode, recursedNodes);
        // If node has children write out divs and go deeper
            //alert(hcn);
			if (hcn) {
				document.write("<div id=\"div" + startNode + "\"");
					if (!ino) document.write(" style=\"display: none;\"");
				document.write(">");
                //首次增加认为有兄弟存在
				addNode(startNode, recursedNodes,false);
				document.write("</div>");
			}
        oldTypeCat = neTypeCat;
        n++;
		document.write("</div>");
	}
}
// Returns the position of a node in the array
function getArrayId(node) {
	for (i=0; i<nodes.length; i++) {
		var nodeValues = nodes[i].split("|");
		if (nodeValues[0]==node) return i;
	}
}
// Puts in array nodes that will be open
function setOpenNodes(openNode) {
	for (i=0; i<nodes.length; i++) {
		var nodeValues = nodes[i].split("|");
		if (nodeValues[0]==openNode) {
			openNodes.push(nodeValues[0]);
			setOpenNodes(nodeValues[1]);
		}
	}
}
// Checks if a node is open
function isNodeOpen(node) {
	for (i=0; i<openNodes.length; i++)
		if (openNodes[i]==node) return true;
	return false;
}
// Checks if a node has any children
function hasChildNode(parentNode) {
	for (i=0; i< nodes.length; i++) {
		var nodeValues = nodes[i].split("|");
        //alert(nodeValues[1]+"    "+parentNode);
		if (nodeValues[1] == parentNode) return true;
	}
	return false;
}

// Checks if a node is the last sibling
function lastSibling (node, parentNode) {
	var lastChild = 0;
	for (i=0; i< nodes.length; i++) {
		var nodeValues = nodes[i].split("|");
		if (nodeValues[1] == parentNode)
			lastChild = nodeValues[0];
	}
	if (lastChild==node) return true;
	return false;
}

// Adds a new node to the tree add  by zouwd
function addNode(parentNode, recursedNodes,isSibling) {
    dNode=false;
	for (var i = 0; i < nodes.length; i++) {

		var nodeValues = nodes[i].split("|");

		if (nodeValues[1] == parentNode&&rootidex!=i) {
			var ls	= lastSibling(nodeValues[0], nodeValues[1]);
			var hcn	= hasChildNode(nodeValues[0]);
			var ino = isNodeOpen(nodeValues[0]);
            document.write("<img src=\"../resource/images/tree/empty.gif\" align=\"absbottom\"  />");

			// Write out line & empty icons
			for (g=0; g<recursedNodes.length; g++) {
				if (recursedNodes[g] == 1) document.write("<img src=\"../resource/images/tree/line.gif\" align=\"absbottom\"  />");
				//else  document.write("<img src=\"../resource/images/tree/empty.gif\" align=\"absbottom\"  />bbb");
			}
            //如果没有兄弟多缩进一位
            if(isSibling)
            document.write("<img src=\"../resource/images/tree/empty.gif\" align=\"absbottom\"  />");
			// put in array line & empty icons
			if (ls) recursedNodes.push(0);
			else recursedNodes.push(1);
			// Write out join icons
			if (hcn) {
				if (!ls) {
					document.write("<a href=\"javascript: oc('" + nodeValues[0] + "', 1);\"><img id=\"join" + nodeValues[0] + "\" src=\"../resource/images/tree/");
					 	if (ino) document.write("minus");
						else document.write("plus");
					document.write("bottom.gif\" align=\"absbottom\" alt=\"Open/Close node\" /></a>");
				} else {
					document.write("<a href=\"javascript: oc('" + nodeValues[0] + "', 0);\"><img id=\"join" + nodeValues[0] + "\" src=\"../resource/images/tree/");
						if (ino) document.write("minus");
						else document.write("plus");
					document.write(".gif\" align=\"absbottom\"  /></a>");
                    dNode = true;
				}

			} else {
				if (!ls){

                     document.write("<img src=\"../resource/images/tree/joinbottom.gif\" align=\"absbottom\"  />");
                }
				else {

                    document.write("<img src=\"../resource/images/tree/join.gif\" align=\"absbottom\"  />");
                }
			}

			

			// Write out folder & page icons
			if (hcn) {
				document.write("<img id=\"icon" + nodeValues[0] + "\" src=\"../resource/images/tree/folder")
					if (ino) document.write("open");
				document.write(".gif\" align=\"absbottom\" alt=\"Folder\" />");
			} else{
                    var photoURI=""
                    if(nodeValues[5] == 0 && nodeValues[6] == 1)
                        photoURI="src=\"../resource/images/tree/isLeaf.gif\"";
                    else if(nodeValues[5] == 0 && nodeValues[6] == 0)
                        photoURI="src=\"../resource/images/tree/page.gif\"";
                    else
                        photoURI="src=\"../resource/images/tree/folder.gif\"";

                document.write("<img id=\"icon" + nodeValues[0] + "\" "+photoURI+" align=\"absbottom\" /><span>");
            }

            // Start link
			document.write("<a target='manageFrame' id=a"+iid+" name='aiid' onclick='getSelect(this)' href=\"" + nodeValues[3] + "\"  >");
            iid++;
			// Write out node name
			document.write(nodeValues[2]);

			// End link
			document.write("</span></a><br />");


			// If node has children write out divs and go deeper
			if (hcn) {
				document.write("<div id=\"div" + nodeValues[0] + "\"");
					if (!ino) document.write(" style=\"display: none;\"");
				document.write(">");
                //没有兄弟，多缩进一个
                if(dNode)
                   addNode(nodeValues[0], recursedNodes,true);
                else
				   addNode(nodeValues[0], recursedNodes,false);
				document.write("</div>");
			}

			// remove last line or empty icon
			recursedNodes.pop();
		}
	}
}


// Opens or closes a node
function oc(node, bottom) {
	var theDiv = document.getElementById("div" + node);
	var theJoin	= document.getElementById("join" + node);
	var theIcon = document.getElementById("icon" + node);

	if (theDiv.style.display == 'none') {
		if (bottom==1) theJoin.src = "../resource/images/tree/minusbottom.gif";
		else theJoin.src = "../resource/images/tree/minus.gif";
		theIcon.src = "../resource/images/tree/folderopen.gif";
		theDiv.style.display = '';
	} else {
		if (bottom==1) theJoin.src = "../resource/images/tree/plusbottom.gif";
		else theJoin.src = "../resource/images/tree/plus.gif";
		theIcon.src = "../resource/images/tree/folder.gif";
		theDiv.style.display = 'none';
	}
}

// Opens or closes a node by RootOc
function rootOc(node, bottom) {
	var theDiv = document.getElementById("div" + node);
	var theJoin	= document.getElementById("join" + node);

	if (theDiv.style.display == 'none') {
		if (bottom==1) theJoin.src = "../resource/images/tree/minusRoot.gif";
		else theJoin.src = "../resource/images/tree/minusRoot.gif";
		theDiv.style.display = '';
	} else {
		if (bottom==1) theJoin.src = "../resource/images/tree/plusRoot.gif";
		else theJoin.src = "../resource/images/tree/plusRoot.gif";
		theDiv.style.display = 'none';
	}
}
// Push and pop not implemented in IE
if(!Array.prototype.push) {
	function array_push() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
	Array.prototype.push = array_push;
}
if(!Array.prototype.pop) {
	function array_pop(){
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
	Array.prototype.pop = array_pop;
}
