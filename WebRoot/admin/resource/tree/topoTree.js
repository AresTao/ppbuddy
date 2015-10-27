var nodes = new Array();
var openNodes = new Array();
var icons = new Array(6);
var SKContextMenu=SKContextMenu||null;
var rootidex;
var eventTarget={}
function addTreeEvent(a,b,c){
    if(a.id) eventTarget[a.id]=a;

    function selectedNode(e){
     for(var d in eventTarget) {
        $(d.replace("taget","topoTree")).style.backgroundColor="";
     }
      e.style.backgroundColor="#a1e1fe";
    }
    addEvent(a, b, function(ev) {
        ev = ev || window.event;
        c(ev);

        var target = ev.target || ev.srcElement;
        selectedNode(target)
    })
}

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
function getFrameByName(win, name) {
    var _fa = win.document.getElementsByTagName("FRAME");
    for (var _i = 0; _i < _fa.length; _i++) {
        if (_fa[_i].name == name) {
            return win.frames[_i];
            break;
        }
    }
}
// Create the tree
// nodeId | parentNodeId | nodeName | nodeUrl | type
//menuTree[0]  = "0|0|Root|#";
var constraint = constraint || function() {
    return false;
}()

function createTree(arrName, rootName, startNode, openNode) {

    var WBody = window.document.body;
    var img = $$("img");
    img.src = "../resource/images/update.gif";
    img.alt = "重新加载树...";
    var _br = $$("br");
    addTreeEvent(img, "click", function() {
        window.location.reload();
    });

    var _div = $$("div");
    _div.style.whiteSpace = "nowrap";
    WBody.appendChild(img);
    WBody.appendChild(_br);
    WBody.appendChild(_div);
    
    nodes = arrName;

    if (nodes.length > 0) {
        if (startNode == null) startNode = 0;
        if (openNode != 0 || openNode != null) setOpenNodes(openNode);
        var ItemNode;
        if (startNode != -1) {
            rootidex = getArrayId(startNode);
            var nodeValues = nodes[rootidex].split("|");
            ItemNode = $$("A");
            var bb = TreeBridge.getInit();

            if (bb || constraint) {
                ItemNode.href = "javascript:void(0);";
                //nodeValues[3];
                ItemNode.v = nodeValues[3];
                ItemNode.b = nodeValues[2];
                ItemNode.c = nodeValues[0];
                
                addTreeEvent(ItemNode, 'click', function(ev) {
                    ev = ev || window.event;
                    var target = ev.target || ev.srcElement;
                  //  target.style.backgroundColor="#6666ff";
                    if (target.tagName.toLowerCase() == "span") {
                        target = target.parentNode

                    }
                    /*存在兼容问题*/
                    var arg = {href:target.v,name:target.b,id:target.c};
                    var action = TreeBridge.getInit();
					
                    action = action || function(obj) {
                        var winframe = getFrameByName(window.parent, "manageFrame")
                        winframe.location.href = obj.href
                    };
                    action(arg);


                });
            } else {

                ItemNode.style.backgroundColor="#6666ff";
                ItemNode.target = "manageFrame";
                ItemNode.href = nodeValues[3];
            }


            var __img = $$("img");
            __img.src = "../resource/images/tree/folderopen.gif";
            __img.align = "absbottom";
            var __span = $$("span");
            __span.innerHTML = nodeValues[2];
            var _br = $$("br");
            _div.appendChild(ItemNode);
            ItemNode.appendChild(__img);
            ItemNode.appendChild(__span);
            ItemNode.appendChild(_br);
            TreeBridge.addCache("-1", nodeValues[0], nodeValues[2]);
            //TreeBridge.dataCache={topoId:nodeValues[0],cTopo:[]};
            __span.id = "topoTree_" + nodeValues[0];
         
            if (SKContextMenu) {
                SKContextMenu.register(__span);
                __span.hasC = "1"
              
            }
        } else {

            var __img = $$("img");
            __img.src = "../resource/images/tree/base.gif";
            __img.align = "absbottom";
            var __span = $$("span");
            __span.id = "topoTree_" + nodeValues[0];
            __span.innerHTML = rootName;
            _div.appendChild(__img);
            _div.appendChild(__span);
            __span.id = "topoTree_" + nodeValues[0];
            TreeBridge.addCache("-1", nodeValues[0], nodeValues[2]);

            if (SKContextMenu) {

                SKContextMenu.register(__span);
                __span.hasC = "0"
            }
        }

        var recursedNodes = new Array();
        addNode(startNode, recursedNodes, _div);
    }
}
// Returns the position of a node in the array
function getArrayId(node) {
    for (i = 0; i < nodes.length; i++) {
        var nodeValues = nodes[i].split("|");
        if (nodeValues[0] == node) return i;
    }
}
// Puts in array nodes that will be open
function setOpenNodes(openNode) {
    for (i = 0; i < nodes.length; i++) {
        var nodeValues = nodes[i].split("|");
        if (nodeValues[0] == openNode) {
            openNodes.push(nodeValues[0]);
            setOpenNodes(nodeValues[1]);
        }
    }
}
// Checks if a node is open
function isNodeOpen(node) {
    for (i = 0; i < openNodes.length; i++)
        if (openNodes[i] == node) return true;
    return false;
}
// Checks if a node has any children
function hasChildNode(parentNode) {
    for (i = 0; i < nodes.length; i++) {
        var nodeValues = nodes[i].split("|");
        if (nodeValues[1] == parentNode) return true;
    }
    return false;
}
// Checks if a node is the last sibling
function lastSibling(node, parentNode) {
    var lastChild = 0;
    for (i = 0; i < nodes.length; i++) {
        var nodeValues = nodes[i].split("|");
        if (nodeValues[1] == parentNode)
            lastChild = nodeValues[0];
    }
    if (lastChild == node) return true;
    return false;
}
// Adds a new node to the tree
function addNode(parentNode, recursedNodes, _div) {
    var D = _div;
    for (var i = 0; i < nodes.length; i++) {

        var nodeValues = nodes[i].split("|");

        if (nodeValues[1] == parentNode && rootidex != i) {
            var ls = lastSibling(nodeValues[0], nodeValues[1]);
            var hcn = hasChildNode(nodeValues[0]);
            var ino = isNodeOpen(nodeValues[0]);
            TreeBridge.addCache(parentNode, nodeValues[0], nodeValues[2]);
            // Write out line & empty icons
            for (g = 0; g < recursedNodes.length; g++) {
                var img = $$("img");
                if (recursedNodes[g] == 1) {
                    img.src = "../resource/images/tree/line.gif";
                }
                else
                {
                    img.src = "../resource/images/tree/empty.gif";
                }
                img.align = "absbottom";
                D.appendChild(img);
            }

            // put in array line & empty icons
            if (ls) recursedNodes.push(0); else recursedNodes.push(1);

            // Write out join icons
            if (hcn) {
                if (!ls) {
                    var Alink = $$("A");
                    Alink.href = "javascript: oc('" + nodeValues[0] + "', 1);"
                    var __img = $$("img");
                    __img.id = "join" + nodeValues[0];
                    __img.src = "../resource/images/tree/" + ((ino) ? "minus" : "plus") + "bottom.gif";
                    __img.align = "absbottom";
                    __img.alt = "Open/Close node";
                    D.appendChild(Alink);
                    Alink.appendChild(__img);
                } else {
                    var Alink = $$("A");
                    Alink.href = "javascript:oc('" + nodeValues[0] + "', 0);"
                    var __img = $$("img");
                    __img.id = "join" + nodeValues[0];
                    __img.src = "../resource/images/tree/" + ((ino) ? "minus" : "plus") + "bottom.gif";
                    __img.align = "absbottom";
                    D.appendChild(Alink);
                    Alink.appendChild(__img);

                }
            } else {
                var __img = $$("img");
                __img.id = "join" + nodeValues[0];
                __img.src = "../resource/images/tree/join" + ((!ls) ? "bottom" : "") + ".gif";
                __img.align = "absbottom";
                D.appendChild(__img);
            }


            var Alink = $$("A");
            var bb = TreeBridge.getBridge();
            var let = function(obj) {
                var o = obj;
                this.doAction = function() {
                    TreeBridge.getBridge()(o)
                };
            };
            if (bb || constraint) {
                Alink.href = "javascript:void(0);";
                //nodeValues[3];
                Alink.v = nodeValues[3];
                Alink.b = nodeValues[2];
                Alink.c = nodeValues[0];
                Alink.id = "taget_" + nodeValues[0];
                addTreeEvent(Alink, 'click', function(ev) {
                    ev = ev || window.event;
                    var target = ev.target || ev.srcElement;
                    if (target.tagName.toLowerCase() == "span" || target.tagName.toLowerCase() == "img") {
                        target = target.parentNode
                    }
                    /*存在兼容问题*/
                    var arg = {href:target.v,name:target.b,id:target.c};
                    var action = TreeBridge.getBridge();
                    action = action || function(obj) {
                       
					//	var $managerF=window.top.document.getElementById("manageFrame");
                            var $managerF = window.top;
                       // var winframe =$managerF.contentWindow;;
                      //  alert($managerF.dom.src)
                        
                        $managerF.loadDoc(obj.href) 
                    };
                    //target.style.backgroundColor="#6666ff";
                    action(arg);

                })
            } else {
                Alink.target = "manageFrame";
                Alink.href = nodeValues[3];
            }

            var __img = $$("img");
            __img.id = "icon" + nodeValues[0];
            __img.src = "../resource/images/tree/" + ((hcn) ? ((ino) ? "folderopen" : "folder") : "page") + ".gif";
            __img.align = "absbottom";
            var __span = $$("span");
            __span.innerHTML = nodeValues[2];
            var _br = $$("br");


            D.appendChild(Alink);
            D.appendChild(_br);
            Alink.appendChild(__img);
            __span.id = "topoTree_" + nodeValues[0];
            Alink.appendChild(__span);
            if (SKContextMenu) {
                SKContextMenu.register(__span);
                __span.hasC = "0"
                if (hcn) {
                    __span.hasC = "1"
                }

            }

           
            // Start link
            // Write out node name

            // End link

            // If node has children write out divs and go deeper
            if (hcn) {
                var _D = $$("DIV");
                _D.id = "div" + nodeValues[0];

                _D.style.display = (!ino) ? "none" : "block";
                D.appendChild(_D);

                addNode(nodeValues[0], recursedNodes, _D);
                //document.write("</div>");
            }

            // remove last line or empty icon
            recursedNodes.pop();
        }
    }
}
// Opens or closes a node
function oc(node, bottom) {
    var theDiv = $("div" + node);
    var theJoin = document.getElementById("join" + node);
    var theIcon = document.getElementById("icon" + node);
    //alert(theDiv)
    if (theDiv.style.display == 'none') {
        if (bottom == 1) theJoin.src = "../resource/images/tree/minusbottom.gif";
        else theJoin.src = "../resource/images/tree/minus.gif";
        theIcon.src = "../resource/images/tree/folderopen.gif";
        theDiv.style.display = '';
    } else {
        if (bottom == 1) theJoin.src = "../resource/images/tree/plusbottom.gif";
        else theJoin.src = "../resource/images/tree/plus.gif";
        theIcon.src = "../resource/images/tree/folder.gif";
        theDiv.style.display = 'none';
    }
    //alert(2)
}
// Push and pop not implemented in IE
if (!Array.prototype.push) {
    function array_push() {
        for (var i = 0; i < arguments.length; i++)
            this[this.length] = arguments[i];
        return this.length;
    }

    Array.prototype.push = array_push;
}
if (!Array.prototype.pop) {
    function array_pop() {
        lastElement = this[this.length - 1];
        this.length = Math.max(this.length - 1, 0);
        return lastElement;
    }

    Array.prototype.pop = array_pop;
}

