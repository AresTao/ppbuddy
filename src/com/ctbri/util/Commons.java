package com.ctbri.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import java.util.Map;
import java.util.UUID;

import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;

import com.ctbri.util.Const;

import com.ctbri.config.XmlConfigerImpl;
import com.ctbri.config.api.Configer;



/**
 * update:请按照通过类型按模块添加封装方法
 * 
 * 现有通用类型:
 * 1.通用数据操作提取 
 * 2.通用业务功能提取
 * @author zjl 
 * 
 */
public class Commons {
	private static Logger log = Logger.getLogger(Commons.class);
	private static Map<String,String> globalParas = new HashMap<String,String>();
	@SuppressWarnings("unused")
	private static Pattern patternAppAccount=null;
	
	static{
		String p = getGlobalPara(Const.SYS_REGEXP_APPACCOUNT);
		patternAppAccount= Pattern.compile(p);
	}
	
/************************************************        通用数据操作提取         *****************************************************************************/
	
	/**
	 * 根据格式化字符串日期或时间格式date的日期
	 * 
	 * @param date
	 * @param formatString
	 *            "yyyy-MM-dd","HHmm",......
	 * @return String
	 */
	public static String getFormattedDate(Date date, String formatString) {
		SimpleDateFormat sdf = new SimpleDateFormat(formatString);
		return sdf.format(date);
	}
	
	//取得系统当前的日期时间(到毫秒)
	public static String getDateTimes(String formatString) {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat(formatString);
		String result = sdf.format(calendar.getTime());
		return result;
	}
	 
	//取得系统当前的日期时间(到毫秒)
	public static String getDateTimes2(String formatString) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.SECOND, 1);
		SimpleDateFormat sdf = new SimpleDateFormat(formatString);
		String result = sdf.format(calendar.getTime());
		return result;
	}
		 
	 
	/**
	 * 判断是NULL或是空字符串方法
	 * 
	 * @param value
	 * @return boolean
	 */
	public static boolean isNullOrEmpty(String value) {
		if (value == null) {
			return true;
		}
		if (value.equals("")) {
			return true;
		}

		return false;
	}

	/**
	 * 判断传入的对象为空指针
	 * 
	 * true:表示为NULL false:表示不为NULL
	 * 
	 * @param object
	 * @return boolean
	 */
	public static boolean isNullForObject(Object object) {
		if (object == null) {
			return true;
		}
		return false;
	}
		
	/**
	 * 获取传入时间与当前时间
	 * 间隔毫秒数
	 * @param date
	 * @return long(IntervalMillisecond)
	 */
	public static Long getIntervalMillisecond(Date date){
		long intervalMS = 0l;
		
		if(null == date){
			return null;
		}
		
		Date currentDate = new Date();
		//用现在距离1970年的时间间隔new Date().getTime()
		//减去  以前的时间距离1970年的时间间隔d1.getTime()
		//得出的就是以前的时间与现在时间的时间间隔
		intervalMS = currentDate.getTime() - date.getTime();
		
		return intervalMS;
	}
		
	/**
	 * 计算两个时间间隔毫秒数
	 * @param startDate  开始时间
	 * @param endDate    结束时间
	 * @return Long :两个时间间隔毫秒数
	 * @return null : 传入参数为空
	 */
	public static Long getIntervalMillisecond(Date startDate, Date endDate) {
		Long intervalMillisecond = 0l;
			
		if(isNullForObject(startDate)){
			log.error("参数值:开始时间为空!");
			return null;
		} else if (isNullForObject(endDate)) {
			log.error("参数值:结束时间为空!");
			return null;
		}
			
		intervalMillisecond = endDate.getTime() - startDate.getTime();
			
		return intervalMillisecond;
	}
		
    /**
     * 将用户ID后面的other phone等等转换为Any
     * @author wsp
     * @param str : 要转换的字符串
     * @return 转换后的字符串
     */
	public static String convertUserIDType(String str){
		String type = str.substring(str.lastIndexOf("~")+1);
		String userNo = str.replace(type, Const.ANY);
		log.info("转换后的字符串:----------"+userNo);
		return userNo;
	}

		
	/**
	 * 处理CODE值
	 * 将code值为200转为返回0
	 * @return string
	 * @author zjl
	 * @date 2013-08-21 17:01
	 */
	public static String getCode(String code){
		String strCode = "0";
		if(isNullOrEmpty(code)){
			strCode = "0";
		} else if(Const.HTTP200.equals(code)){
			strCode = "0";
		} else {
			strCode = code;
		}
		
		return strCode;
	}
		
	/**
	 * 获取请求ID
	 * @return String
	 */
	public static String getRequestId(){
		return getDateTimes(Const.millisecond);
	}
	
		
	/*******************************************       读取配置文件的值          ****************************************************************************/
	public static  String getConfigValue(String id){
		Configer config=XmlConfigerImpl.getConfigerInstance();
		String value=config.getParameter(id);
		if( value!=null){
			return value.trim();
		} else {
			log.error("根据配置文件ID：" + id + "获取对应的值为NULL对象");
		}
		
		return value;
			
	}
		
	/**
	 * 获取配置文件ID的值为整数方法
	 * @param id 配置文件配置ID
	 * @return int 配置文件配置ID对应整数值
		 */
	public static int getIntConfigValue(String id){
		try {
			return Integer.valueOf(getConfigValue(id));
		} catch (Exception e) {
			log.error("指定参数"+id+"的值不是整数！请检查此参数ID配置对应的值类型!");
			throw new RuntimeException("指定参数"+id+"的值不是整数！导致程序中止！");
		}
	}
	
	/**
	 * 获取配置文件ID的值为长整数方法
	 * @param id 配置文件配置ID
	 * @return Long 配置文件配置ID对应长整数值
	 */
	public static Long getLongConfigValue(String id){
		try {
			return Long.valueOf(getConfigValue(id));
		} catch (Exception e) {
			log.error("指定参数"+id+"的值不是长整数！请检查此参数ID配置对应的值类型!");
			throw new RuntimeException("指定参数"+id+"的值不是长整数！导致程序中止!");
		}
	}
	
	public static String getUUID(){ 
		String s = UUID.randomUUID().toString(); 
		//去掉“-”符号 
		return s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
	} 	
	/**
	 * 转为appAccountID如果带有具体终端不做修改否则在字符串后面加上~Any
	 * @param appAccount:账号
	 * @return
	 */
	public static String convertAppAccount(String appAccount){
		if(appAccount.split("~").length==2){
			appAccount=appAccount.concat("~").concat(Const.ANY);
		}
		return appAccount;
	}	
		
		
	public static String getGlobalPara(String paraName)
	{
		if(globalParas.size() > 0)
		{
			return globalParas.get(paraName);
		}
		
		Session session = null;
			
		try {
			session = DbHelper.getSession();
			session.doWork(new Work() {
				public void execute(Connection conn)  throws SQLException {
			       	PreparedStatement stmt = null;
			       	ResultSet  rs = null;
			      	try{
				       	String sql = " select paraname,paravalue from t_rtc_global_paras ";
				       	stmt = conn.prepareStatement(sql);
						rs = stmt.executeQuery();
						
						while(rs.next())
						{
							globalParas.put(rs.getString(1), rs.getString(2));
						}
			       	}catch(Exception e)
			       	{
			       		e.printStackTrace();
			       	}finally {
	                    if(rs != null) {
	                       	rs.close();
	                    }
	                    if(stmt != null) {
	                      	stmt.close();
	                    }
	                }
			    }
			});
						
		} catch(Exception e){
			log.error("在数据库中查询全局配置项目失败");
			log.error(e.getMessage());
		}finally {
			if(session != null){
				try {
					session.disconnect();
					session.close();
				} catch (HibernateException e) {
					log.error("关闭session出现异常，"
							+ "异常信息为：" + e.getMessage());
				}
			}
		}
			
		return globalParas.get(paraName);	
	}	
}
