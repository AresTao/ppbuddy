
window.EHM=window.EHM||{};
EHM.util=EHM.util||{};
EHM.util.dom=EHM.util.dom||{};
EHM.util.dom.style=EHM.util.dom.style||{
	setStyle:function(obj,prop,val){
		obj.style[prop]=val;
		return this;
		},
	setCss:function(el, styles){
		for ( var prop in styles ) {
		if (!styles.hasOwnProperty(prop)) continue;
		this.setStyle(el, prop, styles[prop]);
		}
		return this;
		}
	}