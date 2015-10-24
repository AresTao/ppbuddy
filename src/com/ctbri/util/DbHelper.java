/**
 *   更新记录
 *   2012-9-13 , zjl
 *             创建
 */
package com.ctbri.util;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * 数据库连接操作类
 * 
 * 负责数据连接的创建,数据库操作对象session的创建
 * 提供获取方法
 * 
 * @author zjl
 * @date 2013-03-15 10:00
 * @mender {修改者姓名}
 * @updateDate {修正时间} 
 * @updateContent {修正内容}
 */
public class DbHelper {
	private static final Logger log = Logger.getLogger(DbHelper.class);
	
	static{
		init();
	}
	
	/**
	 * 私有构造函数
	 */
	private DbHelper() {
	}

	/**
	 * 业务session工厂
	 */
	private static SessionFactory businessFactory;
	

	/**
	 * 初始化
	 */
	public static void init(){
		try {
			// 读取默认的配置文件(hibernate.cfg.xml)并解析配置文件
			log.info("读取默认的配置文件(hibernate.cfg.xml)并解析配置文件");
			Configuration configuration = new Configuration().configure();
			// 读取并解析映射信息，创建SessionFactory
			businessFactory = configuration.buildSessionFactory();
			
		} catch (Throwable ex) {
			throw new ExceptionInInitializerError(ex);
		}
	}

	/**
	 * 获取关于仅有数据库的hibernate session
	 * 
	 * @return Session
	 */
	public static Session getSession() {
		return businessFactory.openSession();
	}
	
}
