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
			for (String postId : postIds)
			{
				String hql = "UPDATE com.ctbri.model.Post p set p.isPublish=:isPublish where p.postId =:postId";
				Query query = session.createQuery(hql);
				query.setInteger("isPublish", flag);
				query.setString("postId", postId);
				query.executeUpdate();				
			}
			tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("publish success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	@SuppressWarnings("unchecked")
	public static CommonPostResp deletePost(List<String> postIds)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			res = new CommonPostResp();
			session = DbHelper.getSession();
			for (String postId:postIds)
			{
				FileOperator.deleteFiles(postId);
				String hql = "from com.ctbri.model.Post as p where p.postId=:postId";
				Query query = session.createQuery(hql);
				query.setString("postId", postId);
				List<Post> posts = query.list();
				if (posts.size() > 0)
				{
					if (posts.get(0).getIsPublish() == 0)
					{
						Transaction tran = session.beginTransaction();//开始事物    
						hql = "delete com.ctbri.model.Post  as p where p.postId=:postId";
						query = session.createQuery(hql);
						query.setString("postId", postId);
						query.executeUpdate();
						//session.delete("FROM com.ctbri.model.MimeFile as m where m.postId="+postId);  
				        tran.commit();
						res.setCode(200);
						res.setReason("delete success.");
					} else
					{
						res.setCode(403);
						res.setReason("post "+postId+" is published.");
						return res;
					}
				} else 
				{
					res.setCode(404);
					res.setReason("post "+postId+" not exist.");
					return res;
				}
			}
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
