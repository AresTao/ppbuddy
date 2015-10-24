package com.ctbri.operator;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ctbri.model.MimeFile;
import com.ctbri.util.DbHelper;

public class FileOperator {

	private static final Logger log = Logger.getLogger(FileOperator.class);
	
	@SuppressWarnings("deprecation")
	public static boolean addMimeFile(String postId, String name, String path)
	{
		MimeFile file = new MimeFile();
		file.setName(name);
		file.setPath(path);
		file.setPostId(postId);
		file.setCreateTime(new Date().toLocaleString());
		
		Session session = null;	
				
		try{

			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			session.save(file);   
	        tran.commit();			
			
	        return true;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return false;
	}
	
	@SuppressWarnings("unchecked")
	public static List<MimeFile> getFiles(String postId)
	{
		Session session = null;	
		List<MimeFile> fileList = null;
		try{

			session = DbHelper.getSession();
			String hql = "from com.ctbri.model.MimeFile where postId=:postId";
			Query query = session.createQuery(hql);
			query.setString("postId", postId);
			fileList = query.list();			
			
	        return fileList;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return fileList;
	}
	
	public static boolean deleteFiles(String postId)
	{
		Session session = null;	
				
		try{
			session = DbHelper.getSession();
			
			Transaction tran = session.beginTransaction();//开始事物     
			session.delete("FROM mimeFile as m where m.postId="+postId);  
	        tran.commit();
	        
			return true;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return false;
	}
}
