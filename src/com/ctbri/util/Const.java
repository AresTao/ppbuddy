package com.ctbri.util;

/**
 * 系统的公用静态常量
 * @date 2014-09-23
 * @author wsp
 */
public class Const {
	
	public static final String PATH = "/ws";
	
	/**
	 * SOAP webserive url
	 */
	public static final String SOAPWSURL = "SoapWSUrl";
	
	
	public static final String P2PCallUrl = "P2PCallUrl";
	
	/**
	 * 格式化时间毫秒字符串常量
	 * yyyy-MM-dd HH:mm:ss:sss
	 */
	public static final String millisecond = "yyyy-MM-dd HH:mm:ss:sss";
	
	/**
	 * 将当前日期时间格式化格式:yyyyMMddHHmmss
	 */
	public static final String formatStr = "yyyyMMddHHmmss";
	
	/**
	 * 授权类型
	 * 1:向应用内用户授权
	 */
	public static final String authType = "1";
	
	/**
	 * 第三方客户端系统标识
	 */
	public static final String APPCLIENT = "AppClient";
	
	/**
	 * 第三方平台系统标识
	 */
	public static final String APPSERVER = "AppServer";
	
	
	/*************************认证信息常量*************************/
	/**
	 * 认证方式
	 */
	public static final String AUTHMETHOD = "RTCAUTH";
	
	/**
	 * 认证范围
	 */
	public static final String REALM = "realm";

	/**
	 * 应用ID
	 */
	public static final String APPLICATIONID = "ApplicationId";
	
	/**
	 * 鉴权Key
	 */
	public static final String APPKEY = "APP_Key";
	
	/**
	 * 鉴权AppClient时，Token
	 */
	public static final String TOKEN = "Token";
	
	/**
	 * 鉴权AppClient时，AppAccountID
	 */
	public static final String APPACCOUNTID = "AppAccountID";
	
	/*********************************************************************/
	
	/**
	 * addMember:添加会议成员
	 */
	public static final String OPERATION_AD_MM = "addMember";
	/**
	 * deleteMember:删除与会成员
	 */
	public static final String OPERATION_DL_MM = "deleteMember";
	
	/**
	 * AVStreamManagement:视频流控制
	 */
	public static final String AVSTREAMMANAGEMENT = "AVStreamManagement";
	/**
	 * enableAudio:开启声音
	 */
	public static final String OPERATION_EN_AU = "enableAudio";
	/**
	 * enableAudio:关闭声音
	 */
	public static final String OPERATION_DS_AU = "disableAudio";

	/**
	 * deleteMember:成员退出
	 */
	public static final String OPERATION_MM_DE = "deleteMember";
	/**
	 * applyToJoin:主动申请加入会议
	 */
	public static final String OPERATION_APP_JN1 = "applyToJoin";
	/**
	 * chairManExit:主席退出
	 */
	public static final String OPERATION_CM_EX = "chairManExit";
	/**
	 * endConf:结束删除会话
	 */
	public static final String OPERATION_ED_CF = "endConf";
			
	/**
	 * 禁止群组成员发言
	 */
	public static final String OPERATION_TYPE_FORBID = "0";
	/**
	 * 允许群组成员发言
	 */
	public static final String OPERATION_TYPE_ALLOW= "1";
	/**
	 * 关闭视频
	 */
	public static final String OPERATION_TYPE_MEDIACHANGE="2";
	/**
	 * 管理人员
	 * 
	 */
	public static final String MANAGE_ADMINFLAG ="1";
	
	/**
	 * 普通人员
	 * 
	 */
	public static final String NOMANAGE_ADMINFLAG ="0";
	
	
	/**
	 * 废弃
	 */
	@Deprecated
	public static final String ADMINFLAG="3";
	
	
	/**
	 * 接口访问单位时间
	 */
	public static final String ACCESSMSTIME = "Access_Time_MS";
	
	/**
	 * 接口单位时间内访问次数
	 */
	public static final String ACCESSNUM ="Access_Num";
	
	public static final String Main_Server_Address="@chinartc.com";
	
	
	/************************http状态码**************************/
	
	/**请求被执行*/
	public static final String HTTP200 = "200";
	public static final String HTTP200Reason = "请求被执行";
	
	/**资源生成*/
	public static final String HTTP201 = "201";
	public static final String HTTP201Reason = "资源生成";
	
	/**资源变更*/
	public static final String HTTP202 = "202";
	public static final String HTTP202Reason = "资源变更";
	
	/**资源删除*/
	public static final String HTTP204 = "204";
	public static final String HTTP204Reason = "资源删除";
	
	/**参数丢失或者无效*/
	public static final String HTTP400 = "400";
	public static final String HTTP400Reason = "参数丢失或者无效";
	
	/**认证失败*/
	public static final String HTTP401 = "401";
	public static final String HTTP401Reason = "认证失败";
	
	/**资源无效*/
	public static final String HTTP404 = "404";
	public static final String HTTP404Reason = "资源无效";
	
	/**不支持HTTP访问*/
	public static final String HTTP405 = "405";
	public static final String HTTP405Reason = "不支持HTTP访问";
	
	/**应用的并发请求超载*/
	public static final String HTTP429 = "429";
	public static final String HTTP429Reason = "应用的并发请求超载";
	
	/**应用状态异常*/
	public static final String HTTP430 = "430";
	public static final String HTTP430Reason = "应用状态异常";
	
	/**开发者状态异常*/
	public static final String HTTP432 = "432";
	public static final String HTTP432Reason = "开发者状态异常";
	
	public static final String HTTP431 = "431";
	public static final String HTTP431Reason = "超出应用用户最大阀值";
	
	/**服务器内部失败*/
	public static final String HTTP500 = "500";
	public static final String HTTP500Reason = "服务器内部失败";
	
	/**服务不可用*/
	public static final String HTTP503 = "503";
	public static final String HTTP503Reason = "服务不可用";
	/**license控制*/
	public static final String HTTP434 = "434";
	public static final String HTTP434Reason = "REST服务器使用期限已过期";
	
	public static final String HTTP435 = "435";
	public static final String HTTP435Reason = "REST服务器使用人数已达上限";

	
	/**
	 * 第三方应用ID已上线状态
	 * @author zjl
	 * @date 2013-9-14 9:54
	 */
	public static final Integer APPLICATIONIDSTATUS = 2;
	
	/**
	 * 第三方应用开发者正常状态
	 * @author zjl
	 * @date 2013-9-14 9:54
	 */
	public static final Integer DEVELOPERSTATUS = 1;
	
	/**
	 * 授予权限分隔符
	 * @author zjl
	 * @date 2013-9-16 16:59
	 */
	public static final String GANTEDCAPABILITYSPLIT = "<";
	
	
	/**
	 * 获取用户状态 响应码
	 */
	public static int Success = 0;
	public static String SuccessReason = "成功";
	
	public static int  fail_mian = 3201;
	public static String fail_mianReason = "主用户不存在";
	
	public static int fail_sub = 3202;
	public static String fail_subReason = "从用户不存在";
	
	public static int fail_no = 3203;
	public static String fail_noReason = "没有对应记录";
	
	public static int online = 1; //在线
	public static int offline = 0; //离线
	
	//用户状态服务器地址
	public static final String UserStatusServerUrl = "UserStatusServerUrl";
	
	//一号通开销户接口地址
	public static final String OpenAccountServerUrl = "OpenAccountServerUrl";
	
	public static final String ANY = "Any"; 

	public static final String TURNUP = "TURN_UP"; 
	
	///默认的会议密码
	public static final String PASSWD_CONF = "123456";
	
	///t_rtc_global_paras配置表中用户缓存生命周期
	public static final String SYS_CACHE_USER_LIFE = "SYS_CACHE_USR_LIFE";
	
	///t_rtc_global_paras配置表中用户令牌生命周期
	public static final String SYS_TOKEN_LIFE = "SYS_TOKEN_LIFE";
	
	///t_rtc_global_paras配置表中每写入mysql多少条数据后休息1秒
	public static final String SYS_DB_WRITE_BATCH = "SYS_DB_WRITE_BATCH";
	
	///t_rtc_global_paras配置表中应用记录生命周期
	public static final String SYS_CACHE_APP_LIFE = "SYS_CACHE_APP_LIFE";
	
	///t_rtc_global_paras配置表中终端类型集合
	public static final String SYS_TERMINAL_TYPES = "SYS_TERMINAL_TYPES";
	
	///t_rtc_global_paras配置表中应用帐号规则正则表达式
	public static final String SYS_REGEXP_APPACCOUNT = "SYS_REGEXP_APPACCOUNT";
	
	///t_rtc_global_paras配置表中防护例外集合
	public static final String SYS_REST_AUTH_EXCEPTION = "SYS_REST_AUTH_EXCEPTION";
	
	///t_rtc_global_paras
	public static final String SYS_USERSTATUS_BATCHLIMIT = "SYS_USERSTATUS_BATCHLIMIT";
	
	///t_rtc_global_paras
	public static final String SYS_REDIS_MAIN = "SYS_REDIS_MAIN";
	
	public static final String SYS_DATAASYNC_STAT_APPTOKENS_PERIOD = "SYS_DATAASYNC_STAT_APPTOKENS_PERIOD";
	
	public static final String SYS_DATAASYNC_STAT_APPONLINEUSERS_PERIOD = "SYS_DATAASYNC_STAT_APPONLINEUSERS_PERIOD";
	
	
	public static final String SYS_REDIS_QUEUE = "SYS_REDIS_QUEUE";
	
	public static final String SYS_REDIS_SLAVE = "SYS_REDIS_SLAVE";
	
	public static final String SYS_DB_WRITE_THREADS = "SYS_DB_WRITE_THREADS";
	
	public static final String SYS_RESTTURN_SHAREKEY = "SYS_RESTTURN_SHAREKEY";
	
	public static final String SYS_RESTTURN_KEY_LIFE_BROWSER = "SYS_RESTTURN_KEY_LIFE_BROWSER";
	
	public static final String SYS_RESTTURN_KEY_LIFE_APP = "SYS_RESTTURN_KEY_LIFE_APP";
	
	
	public static final String REQ_ATTRIBUTE_STARTTIME = "startTime";
	
	public static final String REQ_ATTRIBUTE_CLIENTIP = "X-Real-IP";
	
	public static final String REQ_ATTRIBUTE_APPID = "appId";
	
	public static final String REQ_ATTRIBUTE_APPACCOUNTID = "appAccountId";
	
	public static final String REQ_ATTRIBUTE_REQAPI = "apiMethod";
	
	public static final String SPLIT_DB = "|";
	
	public static final Integer STATUS_APP_VALID = 2;
	
	public static final Integer STATUS_STAFF_VALID = 1;

	public static final String OPERATION_APP_JN = "applyToJoin";
	
	
		
		
}
