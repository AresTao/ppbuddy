// JavaScript Document
/*������ʷ����
 *ͨ��ע�᷽������ʽholdס���������˷���ִ�к󣬱���ķ�������ɾ��
 *�˷��������ڿ��֮������ⲿ��ע�᷽��ʹ��
 */
//zowell@2011008@����
var FlashHistFunc=new function(){
	var EHM=EHM||{};
	EHM.Cache=EHM.Cache||{};

	this.Register=function(f){EHM.Cache["_flash_f"]=f;};
	this.Do=function(){if(typeof EHM.Cache["_flash_f"]=="function"){EHM.Cache["_flash_f"]();delete EHM.Cache["_flash_f"];}};
	}