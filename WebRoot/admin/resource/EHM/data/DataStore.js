/*
 对于挂件所要应用的数据处理器必须提供的功能。
 HWDATA
 后面的开发者可能会认为在这里浪费时间开发XmlDataStroe是
 徒增工作量、代码的难度和运行时间。
 但确实作到了浏览器的兼容和数据形式的统一
 zowell @2090224
 */

function HWNode() {
        this.nodeName = null;
        this.value = null;
        this.attributes = {};
        this.parent = null;
        this.children = [];
        }
		HWNode.prototype.add = function(node) {
			
            this.children.push(node);
            if (typeof this[node.nodeName] == 'undefined')this[node.nodeName] = [];
            this[node.nodeName].push(node);
            node.setParent(this);
            return this;
        };
        HWNode.prototype.Insert = function(node, index) {
            index = (index) ? ((index >= 0) ? index : 0) : 0;
            if (!this[node.nodeName])return this.add(node);
            this[node.nodeName] = this[node.nodeName].insert(index, node);
            this.children = this.children.reverse().insert(index, node).reverse();
            node.setParent(this);
            return this;
        }
        HWNode.prototype.Delete= function () {
            if (this.parent != null) {
                this.parent.Remove.call(this, this);
            }
        };
		HWNode.prototype.destroy =function(){
			if (this.parent != null) {
				var __C=[];
				for(var __j=0;__j<this.parent.children.length;__j++){
					var __E=this.parent.children[__j]
					if(__E!=this)__C.push(__E);}
				this.parent.children=[];
				for(var __j=0;__j<__C.length;__j++){this.parent.children.push(__C[__j]);}
				if(this.parent[this.nodeName].length==1){delete this.parent[this.nodeName];}
				else{
					this.parent[this.nodeName]=[];
					for(var __j=0;__j<__C.length;__j++){this.parent[this.nodeName].push(__C[__j]);}
					}
				
				}
			}
        HWNode.prototype.Remove = function (node) {
            this[node.nodeName] = this[node.nodeName].remove(node);
            this.children = this.children.remove(node);
        };
        HWNode.prototype.setParent = function(node) {
            this.parent = node;
            return this;
        };
        HWNode.prototype.setAtt = HWNode.prototype.setAttributes = function(at, val) {
            this.attributes[at] = val;
            return this;
        };
        HWNode.prototype.getP = this.getParent = function() {
            return this.parent;
        };
        HWNode.prototype.getAtt = HWNode.prototype.getAttributes = function(at) {
            return this.attributes[at];
        };
        HWNode.prototype.hC = HWNode.prototype.hasChild = function() {
            return (this.children.length > 0);
        };
        HWNode.prototype.byTName = HWNode.prototype.getElementsByTagName = function(TName) {
            return this[TName];
        };
var XmlDataStroe = function (XmlData) {
    var dat = XmlData;

    if (!dat || !dat.nodeType || (dat.nodeType != 9)) {
        throw new Error("只能对XMLDcoument文档对象进行格式存储。");
        return;
    }
    this.root = null;
    var that = this;
	
    (function(Xnode) {
        function gnV(n) {
            for (var _i = 0; _i < n.childNodes.length; _i++) {
                if (n.childNodes[_i].nodeType === 4)return n.childNodes[_i].nodeValue;
            }
            return n.firstChild.nodeValue;
        }
 var k=!!0;
        function createNode(node) {
            var nd = new HWNode();
			
            nd.nodeName = node.nodeName;
			
            var v=node.getElementsByTagName("value")
			
            nd.value =(v!=null&&v.length>0)?[]:( (node.firstChild && node.childNodes.length === 1 && (node.firstChild.nodeType == 3 || node.firstChild.nodeType == 4)) ? node.firstChild.nodeValue : ((node.firstChild && node.firstChild.nodeType == 3) ? gnV(node) : null));
			
            if (node.attributes && node.attributes != null) {
                for (var _i = 0,_len = node.attributes.length; _i < _len; _i++) {
                    var tisAt = node.attributes[_i];
                    nd.setAttributes(tisAt.nodeName, tisAt.nodeValue);
                }
            }
			
            return nd;
        }

        function parseNode(obj, Xnode) {
           
            for (var i = 0,len = Xnode.childNodes.length; i < len; i++) {
                var c = Xnode.childNodes[i];
                if (c.nodeType != 1) continue;
                if (obj == null) {
                    obj = that.root = createNode(c);
                    parseNode(obj, Xnode.childNodes[i]);
                } else {
					k=!k;
                    var thisNode = createNode(c);
					
                    obj.add(thisNode);
                    parseNode(thisNode, Xnode.childNodes[i]);
                }
            }
        }

        parseNode(that.root, Xnode);
    })(dat);
}
/*
 - 
 - 将jsObject转换成xml格式
 - zowell@20090309
 - XMLDomStroe.setData(HWDATA); 初始化将要格式化的数据；
 - XMLDomStroe.X();获取xml
 */
var XMLDomStroe = new (function() {
    var data = null;
    this.setData = function(/*HWDATA*/dat) {
        if (dat.nodeName) {
            data = dat;
        } else {
            throw new Error("只能对HWDATA对象进行格式转换。");
        }
    };
    this.X = this.getXml = function() {
        var tmp = "<{nodeName} {Attri}>{nodeValue}</{nodeName}>";

        function __(node) {
            var temp = tmp;
            var self = this;
            temp = (function() {
                return temp.replace(/{([^{}]*)}/g,
                        function(a, b) {

                            if (a == "{nodeName}") {
                                var r = node[b];
                                return (typeof r === "string" || typeof r === 'number') ? r : a;
                            } else if (a == "{Attri}") {
                                var r = "";
                                for (var it in node.attributes) {
                                    r += " " + it + "=\"" + node.attributes[it] + "\"";
                                }
                                return r;
                            } else if (a == "{nodeValue}") {
                                return     (node.children.length < 1) ? ((node.value != null) ? "<![CDATA[" + node.value + "]]>" : "<![CDATA[]]>") : (function() {
                                    var r = "";
                                    for (var __i = 0,__l = node.children.length; __i < __l; __i++) {
                                        r += __(node.children[__i]);
                                    }
                                    return r;
                                })();
                            }
                        }
                        );
            })();
            return (temp);
        }

        var r = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + __(data);
        return r;

    }
})();
/*
 - 
 - 将String转换成json格式
 - zowell@20090309
 - StrToJson(Str); 将要格式化的数据；
 */
function StrToJson(Str) {
    var json = null;
    try {
        try {
            var func = new Function("return " + Str);
            json = func();
        } catch(e) {
            json = eval(Str);
        }
    } catch(e) {
        json = null;
    }
    return json;
}