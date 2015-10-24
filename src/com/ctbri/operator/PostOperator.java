package com.ctbri.operator;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ctbri.model.MimeFile;
import com.ctbri.model.Post;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.PostItem;
import com.ctbri.resp.PostResp;
import com.ctbri.util.DbHelper;

public class PostOperator {
	
	private static final Logger log = Logger.getLogger(PostOperator.class);
	
	public static CommonPostResp addPost(Post post)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			session = DbHelper.getSession();
						
			Transaction tran = session.beginTransaction();//开始事物     
			session.save(post);   
	        tran.commit();			
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("create success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp publishPost(List<String> postIds, int flag)
	{
		Session session = null;	
		CommonPostResp res = null;		
		try{
			session = DbHelper.getSession();
						
			Transaction tran = session.beginTransaction();//开始事物  
			String hql = "UPDATE post p set p.isPublish=:isPublish where p.postId in :postIds";
			Query query = session.createQuery(hql);
			query.setInteger("isPublish", flag);
			query.setEntity("postIds", postIds);
			query.executeUpdate();
	        tran.commit();			
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("create success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp deletePost(final String postId)
	{
		Session session = null;	
		CommonPostResp res = null;		
		try{
			FileOperator.deleteFiles(postId);
			session = DbHelper.getSession();
					
			Transaction tran = session.beginTransaction();//开始事物     
			session.delete("FROM post as p where p.postId="+postId+" and p.isPublish=0");   
	        tran.commit();
	        
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("delete success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	//isPublish  0 not published 1 published 2 all
	@SuppressWarnings("unchecked")
	public static List<PostItem> getPostList(int categoryId, int flag) 
	{
		Session session = null;
		List<PostItem> res = null;
		try{
			session = DbHelper.getSession();
			String hql = null;
			if (flag == 0)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId and isPublish=0";
			}else if (flag == 1)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId and isPublish=1";
			}else if (flag == 2)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId";
			}
			
			Query query = session.createQuery(hql);
			query.setInteger("categoryId", categoryId);
			List<Post> posts = query.list();
			
			if (posts.size() > 0)
			{
				res = new ArrayList<PostItem>();
				PostItem item = null;
				for (Post post : posts)
				{
					item = new PostItem();
					item.setPostId(post.getPostId());
					item.setShortContent(post.getShortContent());
					item.setPublishTime(post.getPublishTime());
					item.setPublisherName(post.getPublisherName());
					item.setBannerPath(post.getBannerPath());
					
					res.add(item);
				}
			}
			return res;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}	
		return res;	
	}
	
	@SuppressWarnings("unchecked")
	public static PostResp getPost(String postId)
	{
		Session session = null;
		PostResp post = null;
		try{
			session = DbHelper.getSession();
						
			String hql = "from com.ctbri.model.Post where postId=:postId";
			Query query = session.createQuery(hql);
			query.setString("postId", postId);
			List<Post> accounts = query.list();
			
			post = new PostResp();
			if(accounts.size() > 0)
			{
				Post res = accounts.get(0);
				
				post.setPostId(res.getPostId());
				post.setTitle(res.getTitle());
				post.setContent(res.getContent());
				post.setPublishTime(res.getPublishTime());
				post.setPublisherName(res.getPublisherName());
				
				List<MimeFile> fileList = FileOperator.getFiles(postId);
				List<String> imgPaths = new ArrayList<String>();
				if (fileList.size() > 0)
				{
					for (MimeFile file:fileList)
					{
						imgPaths.add(file.getPath());
					}
					
				}
				post.setImgPaths(imgPaths);
				
			} 
			return post;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return post;
	}
}
