/*
 * <p>Title: EAP企业应用开发平台</p>
 *
 * <p>Description: 旨在为各位同仁提供统一的基础开发平台，提高开发效率，改进工作质量！</p>
 *
 * <p>Copyright: Copyright (C) Surekam 2008</p>
 *
 * <p>Company: www.surekam.com</p>
 */

// JavaScript Document
EHM.Import("EHM/Toolkit/EHMTree.js")
//--------Factory-----------
var EHMTreeFactory=new function(){
	var d = null;
	var self=this;
	this.datapath="";
	this.sid=0;
	this.mid=0;
	this.trees={};
	this.plus={"static":staticTree}
	this.Register=function(id,t){
		self.trees[id]=t
		}
	this.getTree=function(s){
		var Tree=new self.plus[s](self);
		return Tree;
		}
}

var staticTree=function(EHMTreeFactory){
	this.fac=EHMTreeFactory;
	this.c;
	this.cache={};
	this.dustyCache={}
	this.root;
	};
	EHMTreeFactory.plus["static"]=staticTree;
	staticTree.prototype.setContianer=function(c){this.c=c;this.c.className="EHMTreeMain";}
	staticTree.prototype.getContianer=function(){
		if(!this.c){this.c=$$("div","staticTree_"+this.id,"EHMTreeMain");window.document.body.appendChild(this.c);}
		return this.c;
		}
	staticTree.prototype.getNode=function(id){
		return this.cache[id];
		}
	staticTree.prototype.create=function(treeArray){
		var dustyCache={},t={},root;
		var self=this;
		for(var i=0,l=treeArray.length;i<l;i++){
			var json=treeArray[i]
			var parA=json.split("|");
			var id=parA[0];
			var pid=parA[1];
			var title=parA[2];
			var src=parA[3];
			var icon=parA[4];
			t[id]={"id":id,"pid":pid,"title":title,"src":src,"icon":icon,"child":null};
			if(!!!pid||pid==""){root=t[id];}
			}
			
			var rootNode=this.cache[root.id]=new TreeNode(root.id, root.title, root.src, root.icon, 0,"",1)
			this.getContianer().appendChild(rootNode.getElement());
			this.fac.Register(rootNode.id,this);
			this.root=rootNode;
				
			function sortT(pnode){
				for(var j in t){
					if(t[j].pid==pnode.id){
						var nd=t[j];
						var node=self.cache[j]=new TreeNode(nd.id, nd.title, nd.src, nd.icon, 0,"",0)
						self.cache[pnode.id].add(node);
						
						}
					}
				for(var h in self.cache[pnode.id].components){
					sortT(t[h]);
					}
					return;
				}
			sortT(root);

		}
		
