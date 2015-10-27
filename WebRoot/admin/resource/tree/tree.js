var nodes			= new Array();
var openNodes		= new Array();
var icons			= new Array(7);

var rootidex,clicked_index;

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
	icons[6] = new Image();
    icons[6].src = "../resource/images/tree/page.gif";
}
  function getSelect(obj) {

            obj.className = "ablock";
            doClearCss(obj);
        }
        function doClearCss(obj) {
            //alert(obj);
            var selA = document.getElementsByName("aiid");
            for (var i = 0; i < selA.length; i++) {
                //alert(selA[i]);
                if (selA[i].id != obj.id)
                {selA[i].className = "";}

            }
        }
// Create the tree
// nodeId | parentNodeId | nodeName | nodeUrl | type
//menuTree[0]  = "0|0|Root|#";
function createTree(arrName, rootName, startNode, openNode) {
	document.write('<img src="../resource/images/update.gif" id="reflashDeptTree" onclick="window.location.reload()" alt="重新加载树..."/><br>');
	document.write("<div style='white-space: nowrap;'>");
	nodes = arrName;
	if (nodes.length > 0) {
		preloadIcons();
		if (startNode == null) startNode = 0;
		if (openNode != 0 || openNode != null) setOpenNodes(openNode);

		if (startNode != -1) {
			rootidex=getArrayId(startNode)
			var nodeValues = nodes[rootidex].split("|");

            ico=nodeValues[4]==""?icons[5].src:nodeValues[4];

			if(nodeValues[3]==""){
				document.write("<img src=\""+ico+"\" align=\"absbottom\"  /><a target='manageFrame'><font id=\"treeLeft\" onclick = showMenu('2','"+nodeValues[0]+"','"+nodeValues[2]+"','"+nodeValues[5]+"')>" + nodeValues[2] + "</font><br />");
			}else{
				var target_=(nodeValues[3].indexOf("javascript")>=0)?"":"target='manageFrame'";
				
                document.write("<img src=\""+ico+"\" align=\"absbottom\"  /><a "+target_+" name='aiid' class='simple' onclick='getSelect(this)' href=\"" + nodeValues[3] + "\"  >" + nodeValues[2] + "</a><br />");
			}
			
		} else document.write("<img src=\"../resource/images/tree/base.gif\" align=\"absbottom\"  />" + rootName + "<br />");

		var recursedNodes = new Array();
		addNode(startNode, recursedNodes);
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
// Adds a new node to the tree
function addNode(parentNode, recursedNodes) {

	for (var i = 0; i < nodes.length; i++) {

		var nodeValues = nodes[i].split("|");
 
		if (nodeValues[1] == parentNode&&rootidex!=i) {
			var ls	= lastSibling(nodeValues[0], nodeValues[1]);
			var hcn	= hasChildNode(nodeValues[0]);
			var ino = isNodeOpen(nodeValues[0]);

			// Write out line & empty icons
			for (g=0; g<recursedNodes.length; g++) {
				if (recursedNodes[g] == 1) document.write("<img src=\"../resource/images/tree/line.gif\" align=\"absbottom\"  />");
				else  document.write("<img src=\"../resource/images/tree/empty.gif\" align=\"absbottom\"  />");
			}

			// put in array line & empty icons
			if (ls) recursedNodes.push(0);
			else recursedNodes.push(1);

			// Write out join icons
			if (hcn) {
				if (ls) {
					document.write("<a href=\"javascript: oc('" + nodeValues[0] + "', 1);\"><img id=\"join" + nodeValues[0] + "\" src=\"../resource/images/tree/");
					 	if (ino) document.write("minus");
						else document.write("plus");
					document.write("bottom.gif\" align=\"absbottom\" alt=\"Open/Close node\" /></a>");
				} else {
					document.write("<a href=\"javascript: oc('" + nodeValues[0] + "', 0);\"><img id=\"join" + nodeValues[0] + "\" src=\"../resource/images/tree/");
						if (ino) document.write("minus");
						else document.write("plus");
					document.write(".gif\" align=\"absbottom\"  /></a>");
				}
			} else {
				if (ls) document.write("<img src=\"../resource/images/tree/join.gif\" align=\"absbottom\"  />");
				else document.write("<img src=\"../resource/images/tree/joinbottom.gif\" align=\"absbottom\"  />");
			}

			// Start link
			
			if(nodeValues[3]!=""){
				if(nodeValues[3].indexOf('javascript')>=0){
	   			   document.write("<a href=\"" + nodeValues[3] + "\" name='aiid' class='simple' onclick='getSelect(this)' >");
				}else{
				   document.write("<a target='manageFrame' name='aiid' class='simple' onclick='getSelect(this)' href=\"" + nodeValues[3] + "\"  >");
				}
			}else{
				document.write("<a style='cursor:hand;' name='aiid' class='simple' onclick='getSelect(this)'>");
			}
	
			
			// Write out folder & page icons
			ico=nodeValues[4]==""?(hcn?(ino?icons[5].src:icons[4].src):icons[6].src):nodeValues[4];
		 
 
            document.write("<img id=\"icon" + nodeValues[0] + "\" src=\""+ico+"\" align=\"absbottom\" />");

			// Write out node name
			//check   flag to show different tree
			if(nodeValues[4]==1){
			//复制功能	document.write("<font id=\"treeLeft\" oncontextmenu = //showMenu('1','"+nodeValues[0]+"')>"+nodeValues[2]+"</font>");
			  document.write(nodeValues[2]);
			
			}else if(nodeValues[4]==2){
				document.write("<font id=\"treeLeft\" onclick = showMenu('2','"+nodeValues[0]+"','"+nodeValues[2]+"','"+nodeValues[5]+"')>"+nodeValues[2]+"</font>");
			
			}else{

				document.write(nodeValues[2]);
			}
			

			// End link
			document.write("</a><br />");

			// If node has children write out divs and go deeper
			if (hcn) {
				document.write("<div id=\"div" + nodeValues[0] + "\"");
					if (!ino) document.write(" style=\"display: none;\"");
				document.write(">");
				addNode(nodeValues[0], recursedNodes);
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
		if(theIcon.src==icons[4].src)
			theIcon.src = icons[5].src;
		theDiv.style.display = '';
	} else {
		if (bottom==1) theJoin.src = "../resource/images/tree/plusbottom.gif";
		else theJoin.src = "../resource/images/tree/plus.gif";
		if(theIcon.src==icons[5].src)
			theIcon.src = icons[4].src;
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
