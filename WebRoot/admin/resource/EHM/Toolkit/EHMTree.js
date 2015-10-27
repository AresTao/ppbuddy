/*
 * <p>Title: EAP企业应用开发平台</p>
 *
 * <p>Description: 旨在为各位同仁提供统一的基础开发平台，提高开发效率，改进工作质量！</p>
 *
 * <p>Copyright: Copyright (C) Surekam 2008</p>
 *
 * <p>Company: www.surekam.com</p>
 */
/*import css */
EHM.ImportCss("EHM/css/EHMTree/EhmTree.css");
var TreeNodeConfig=new function(){
	this.config = {
		target				: 'cmainFrame',
		stepContainer		: null,
		folderLinks			: true,
		useSelection		: true,
		useCookies			: true,
		useLines			: true,
		useIcons			: true,
		useStatusText		: false,
		closeSameLevel		: false,
		inOrder				: false
	}
	
	//set EHMTree root folder
	this.EHMTreeroot =EHM.rootPath+'/resource/EHM/css/EHMTree/';
	this.icon = {
		root				: this.EHMTreeroot + 'img/base.gif',
		folder				: this.EHMTreeroot + 'img/folder.gif',
		folderOpen			: this.EHMTreeroot + 'img/folderopen.gif',
		loading				: this.EHMTreeroot + 'img/loading.gif',
		update				: this.EHMTreeroot + 'img/update.gif',
		node				: this.EHMTreeroot + 'img/page.gif',
		empty				: this.EHMTreeroot + 'img/empty.gif',
		line				: this.EHMTreeroot + 'img/line.gif',
		join				: this.EHMTreeroot + 'img/join.gif',
		joinBottom			: this.EHMTreeroot + 'img/joinbottom.gif',
		plus				: this.EHMTreeroot + 'img/plus.gif',
		plusBottom			: this.EHMTreeroot + 'img/plusbottom.gif',
		minus				: this.EHMTreeroot + 'img/minus.gif',
		minusBottom			: this.EHMTreeroot + 'img/minusbottom.gif',
		nlPlus				: this.EHMTreeroot + 'img/nolines_plus.gif',
		nlMinus				: this.EHMTreeroot + 'img/nolines_minus.gif'
		
	};
}
// Node object
var TreeNode=function (id, title, url, icon, open,target,isRoot) {
	this.id = id;
	this.name = title;
	this.url = url;
	this.target = target;
	this.step=0;
	this.isOpen = !!open;
	this.isRoot=!!isRoot;
	this.img=icon;
	this.components={};
	this.parent=null;
	this.nextNode=null;
	this.prevNode=null;
	this.plus=this.createPlus();
	this.topPlus=$$("span");
	this.noBr=$$("nobr");
	this.topPlus.appendChild(this.plus);
	this.title = this.createTitle(title);
	this.icon = this.createImg(this.img);
	this.element=$$("span","tree_"+id.replace(/-/gi,"_"));

	this.div=$$("div","","EHMTree");
	this.div.noWrap=true;
	this.noBr.appendChild(this.topPlus)
	this.noBr.appendChild(this.icon)
	this.noBr.appendChild(this.title)
	
	this.div.appendChild(this.noBr)
	
	this.element.appendChild(this.div)
};
// Tree object
TreeNode.prototype.getLastChild=function(){
	var l=null;
	for(var j in this.components)l= this.components[j];
	return l;
	}
TreeNode.prototype.getChildContainer=function(){
		if(!this.Container){
			var l=this.nextNode;
			this.Container=$$("span","","");
			this.element.appendChild(this.Container);
		if(this.step>0)this.Container.style.display="none";

		}
		return this.Container;
	}
TreeNode.prototype.getChildL=function(){var i=0;for(var j in this.components){i++};return i;}
TreeNode.prototype.add=function(child){
		
		child.step=this.step+1;
		
		var last=this.getLastChild();
		var el= this.getChildContainer();
			el.appendChild(child.getElement());
		child.setParent(this);
		if(last){child.setPrevNode(last);}
		this.components[child.getId()] = child;
		this.setPlus();
		this.addExtend();
		this.changeImg();
		child.changeImg();
		child.changePlus();
	//	console.log(child.name+">>"+child.parent)
	}
TreeNode.prototype.addExtend=function(){}
TreeNode.prototype.setPrevNode=function(nod){
	this.prevNode=nod;
	nod.nextNode=this;
	nod.setPlus();
	}
TreeNode.prototype.setPlus=function(){
	if(this.isRoot)return;
	if(this.getChildL()>0){
		this.plus.src=(this.nextNode)?TreeNodeConfig.icon.plus:TreeNodeConfig.icon.plusBottom;
        	this.plus.style.cursor="pointer";
		}else{
		this.plus.src=(this.nextNode)?TreeNodeConfig.icon.join:TreeNodeConfig.icon.joinBottom;	
		}
	}
TreeNode.prototype.openClose=function(){
	if(this.getChildL()>0){
		if(this.isOpen){
			this.isOpen=false;
			this.plus.src=(this.nextNode)?TreeNodeConfig.icon.plus:TreeNodeConfig.icon.plusBottom;
			this.close();
			}else{
			this.isOpen=true;
			this.plus.src=(this.nextNode)?TreeNodeConfig.icon.minus:TreeNodeConfig.icon.minusBottom;
			this.open();	
			}	
			this.changeImg(this.isOpen)
		}
	
	//this.plus.src=TreeNodeConfig.icon.minus//:TreeNodeConfig.icon.plusBottom;
	}
	
TreeNode.prototype.close=function(){
	 this.getChildContainer().style.display="none";
	}
	
TreeNode.prototype.open=function(){
	 this.getChildContainer().style.display="inline";
	}
	
TreeNode.prototype.closePlus=function(f){
	this.plus.src=(f)?TreeNodeConfig.icon.plus:TreeNodeConfig.icon.plusBottom;
	}	
TreeNode.prototype.changePlus=function(){
	var self=this;
		var timg=self.plus;
	var addPuls=function(n){
		var f=n;
		var	img =$$("img","",""); 
		img.align="absbottom";
		
		img.src=(!f.nextNode)?TreeNodeConfig.icon.empty:TreeNodeConfig.icon.line;	
		self.topPlus.insertBefore(img,timg);
		timg=img;
		if(f.parent!=null){
		addPuls(f.getParent());}
		}
	if(this.parent){addPuls(this.getParent());}
	}

TreeNode.prototype.getId=function(){return this.id;}	
TreeNode.prototype.changeImg=function(t){
		if(this.img) return;
		if(!this.parent){
			this.icon.src=	TreeNodeConfig.icon.root;
		}
		else if(this.getChildL()>0){
			this.icon.src=	(!!t)?TreeNodeConfig.icon.folderOpen:TreeNodeConfig.icon.folder;
			
			}
		else {
		this.icon.src=	TreeNodeConfig.icon.node;
		}
	}	
TreeNode.prototype.createImg=function(src){
	var img=$$("img","","");img.src=src||TreeNodeConfig.icon.root;
	return img
	}
TreeNode.prototype.createTitle=function(title){
	var titled=$$("a","","EHMTreeNode",title);
	var self=this;
	addEvent(titled, "click", function(){
			if(self.url.indexOf("javascript:")==0){
				var ac=self.url.replace("javascript:","");
				eval(ac);
				}else{
				var $managerF = window.top.manageFrame;
					$managerF.location.href=(self.url) 	
				}
				self.selected();					   /*self.url();*/ 
		});
	return titled
	}
TreeNode.prototype.createPlus=function(){
	var self=this;
	var img=$$("img","","");
	 img.align="absbottom";
	 if(this.isRoot){
		img.src=TreeNodeConfig.icon.update;
		img.alt="重新加载树...";
		addEvent(img, "click", function(){window.location.reload();});
		 }else{
		img.src=TreeNodeConfig.icon.joinBottom; 
		addEvent(img, "click", function(){self.openClose();});
		}
	
	return img
	};
	TreeNode.prototype.remove = function() {
    if (this.parent!=null) this.parent.removeComponents(this.getElement().id);
};
TreeNode.prototype.selected=function(){
	this.getTipParent().unSelected();
	this.title.className ="EHMTreeNode_Over"
};

TreeNode.prototype.unSelected=function(){
	this.title.className ="EHMTreeNode"
	for(var i in this.components){this.components[i].unSelected();}
};

TreeNode.prototype.Delete = function() {
    HW.dom.removeNode(this.getElement());
    if (this.parent) this.parent.removeComponents(this.getElement().id);
};
TreeNode.prototype.destroy= function() {
    HW.dom.removeNode(this.getElement());
	this.data.destroy();
    if (this.parent) this.parent.removeComponents(this.getElement().id);
};
TreeNode.prototype.removeComponents = function(id) {
    delete this.components[id];
};
TreeNode.prototype.getChild = function(id) {
    return this.components[id];
};
TreeNode.prototype.getChildNodes = function() {
    return this.components;
};
TreeNode.prototype.setClass = function(className) {
    this.element.className = className;
};
TreeNode.prototype.getClass = function() {
    return this.element.className;
};
TreeNode.prototype.getT = function() {
    return this.element.innerHTML;
};
TreeNode.prototype.setT = function(t) {
    purge(this.element);
    HW.util.GC();
    if (typeof t === "object") {
        this.element.innerHTML = "";
        this.element.appendChild(t);
    } else {
        this.element.innerHTML = t;
    }

};
TreeNode.prototype.setParent = function(mode) {
    this.parent = mode;
};
TreeNode.prototype.getParent = function() {
    return this.parent;
};
TreeNode.prototype.getTipParent = function() {
    var that = this;
	//alert(this.id)
	if(this.getParent()==null){return this;}else{return this.getParent().getTipParent()}
};
TreeNode.prototype.getElement = function() {
    return this.element;
};
TreeNode.prototype.each = function(f) {
    for (var Item in this.components) {
        f(this.components[Item], Item, this)
    }
}
TreeNode.prototype.addEvent = function(type, fn) {
    addEvent(this.element, type, fn);
};
