// JavaScript Document
/*闪存历史方法
 *通过注册方法的形式hold住方法，若此方法执行后，保存的方法自行删除
 *此方法可用于框架之间进行外部的注册方法使用
 */
//zowell@2011008@湖南
var FlashHistFunc=new function(){
	var EHM=EHM||{};
	EHM.Cache=EHM.Cache||{};

	this.Register=function(f){EHM.Cache["_flash_f"]=f;};
	this.Do=function(){if(typeof EHM.Cache["_flash_f"]=="function"){EHM.Cache["_flash_f"]();delete EHM.Cache["_flash_f"];}};
	}