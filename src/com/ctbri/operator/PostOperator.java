package com.ctbri.operator;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Vector;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ctbri.model.MimeFile;
import com.ctbri.model.Post;
import com.ctbri.param.QueryParam;
import com.ctbri.resp.AdminPostItem;
import com.ctbri.resp.AdminPostResp;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.MimeFileItem;
import com.ctbri.resp.PostItem;
import com.ctbri.resp.PostResp;
import com.ctbri.util.DbHelper;
import com.ctbri.util.StringUtils;

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
	        log.info("add post success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp updatePost(Post post)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			session = DbHelper.getSession();
						
			Transaction tran = session.beginTransaction();//开始事物     
			StringBuffer hql = new StringBuffer();
			hql.append("UPDATE com.ctbri.model.Post p set ");
			if (!StringUtils.isBlank(post.getTitle()))
				hql.append("p.title=:title, ");
			if (!StringUtils.isBlank(post.getContent()))
				hql.append("p.content=:content, ");
			if (!StringUtils.isBlank(post.getShortContent()))
				hql.append("p.shortContent=:shortContent, ");
			if (!StringUtils.isBlank(post.getPublisherName()))
				hql.append("p.publisherName=:publisherName, ");
			if (!StringUtils.isBlank(post.getBannerPath()))
				hql.append("p.bannerPath=:bannerPath ");
			else
				hql.delete(hql.lastIndexOf(","),hql.lastIndexOf(",")+1);
			hql.append("where postId=:postId");
			
			Query query = session.createQuery(hql.toString());
			query.setString("title", post.getTitle());
			query.setString("content", post.getContent());
			query.setString("shortContent", post.getShortContent());
			query.setString("publisherName", post.getPublisherName());
			if (!StringUtils.isBlank(post.getBannerPath()))
				query.setString("bannerPath", post.getBannerPath());
			query.setString("postId", post.getPostId());
			query.executeUpdate();
	        tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("update success.");
	        log.info("update "+post.getPostId()+" success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp publishPost(Vector<String> postIds, int flag)
	{
		Session session = null;	
		CommonPostResp res = null;		
		try{
			session = DbHelper.getSession();
			
			Transaction tran = session.beginTransaction();//开始事物  
			for (String postId : postIds)
			{
				String hql = "UPDATE com.ctbri.model.Post p set p.isPublish=:isPublish, p.publishTime=:publishTime where p.postId =:postId";
				Query query = session.createQuery(hql);
				query.setInteger("isPublish", flag);
				String publishTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
				query.setString("publishTime", publishTime);
				query.setString("postId", postId);
				query.executeUpdate();
			}
			tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("publish success.");
	        log.info("publish "+postIds+" success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	@SuppressWarnings("unchecked")
	public static CommonPostResp deletePost(Vector<String> postIds)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			res = new CommonPostResp();
			session = DbHelper.getSession();
			for (String postId:postIds)
			{
				FileOperator.deleteFiles(postId);
				Transaction tran = session.beginTransaction();//开始事物     
				String hql = "from com.ctbri.model.Post as p where p.postId=:postId";
				Query query = session.createQuery(hql);
				query.setString("postId", postId);
				List<Post> posts = query.list();
				tran.commit();
				if (posts.size() > 0)
				{
					if (posts.get(0).getIsPublish() == 0)
					{
						Transaction tran2 = session.beginTransaction();//开始事物    
						hql = "delete com.ctbri.model.Post  as p where p.postId=:postId";
						query = session.createQuery(hql);
						query.setString("postId", postId);
						query.executeUpdate();
						//session.delete("FROM com.ctbri.model.MimeFile as m where m.postId="+postId);  
				        tran2.commit();
						res.setCode(200);
						res.setReason("删除成功.");
						log.info("delete post "+postId+" success.");
					} else
					{
						res.setCode(403);
						res.setReason("删除失败，该新闻已经发布.");
						log.info("post "+postId+" can not be delete.unpublish it first.");
						return res;
					}
				} else 
				{
					res.setCode(404);
					res.setReason("post "+postId+" not exist.");
					log.info("post "+postId+" not exist.");
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
	public static List<PostItem> getPostList(int categoryId, int flag, int pageNum, int page) 
	{
		Session session = null;
		List<PostItem> res = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = null;
			if (flag == 0)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId and isPublish=0 order by postId desc ";
			}else if (flag == 1)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId and isPublish=1 order by postId desc ";
			}else if (flag == 2)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId order by postId desc ";
			}
			
			Query query = session.createQuery(hql);
			query.setInteger("categoryId", categoryId);
			List<Post> posts = query.list();
			tran.commit();
			int start = (pageNum-1)*page;
			int size = posts.size();
			if (start > size)
				return res;
			if (size > 0)
			{
				res = new ArrayList<PostItem>();
				PostItem item = null;
				for (int i = start; i<start + page && i<size;i++)
				//for (Post post : posts)
				{
					Post post = posts.get(i);
					item = new PostItem();
					item.setPostId(post.getPostId());
					item.setTitle(post.getTitle());
					item.setShortContent(post.getShortContent());
					item.setPublishTime(post.getPublishTime());
					item.setPublisherName(post.getPublisherName());
					item.setBannerPath(post.getBannerPath());
					
					res.add(item);
				}
			}
			log.info("query post list success.");
			return res;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}	
		return res;	
	}
	
	public static List<AdminPostItem> getAdminPostList(int categoryId, int flag) 
	{
		Session session = null;
		List<AdminPostItem> res = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = null;
			if (flag == 0)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId and isPublish=0  order by postId desc";
			}else if (flag == 1)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId and isPublish=1  order by postId desc";
			}else if (flag == 2)
			{
				hql = "from com.ctbri.model.Post where categoryId=:categoryId order by postId desc";
			}
			
			Query query = session.createQuery(hql);
			query.setInteger("categoryId", categoryId);
			List<Post> posts = query.list();
			tran.commit();
			if (posts.size() > 0)
			{
				res = new ArrayList<AdminPostItem>();
				AdminPostItem item = null;
				for (Post post : posts)
				{
					item = new AdminPostItem();
					item.setPostId(post.getPostId());
					item.setTitle(post.getTitle());
					item.setShortContent(post.getShortContent());
					item.setPublishTime(post.getPublishTime());
					item.setPublisherName(post.getPublisherName());
					item.setCreateTime(post.getCreateTime());
					item.setPublishTime(post.getPublishTime());
					item.setIsPublish(post.getIsPublish());
					item.setCategoryId(post.getCategoryId());
					
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
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = "from com.ctbri.model.Post where postId=:postId";
			Query query = session.createQuery(hql);
			query.setString("postId", postId);
			List<Post> accounts = query.list();
			tran.commit();
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
	
	@SuppressWarnings("unchecked")
	public static AdminPostResp getAdminPost(String postId)
	{
		Session session = null;
		AdminPostResp post = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = "from com.ctbri.model.Post where postId=:postId";
			Query query = session.createQuery(hql);
			query.setString("postId", postId);
			List<Post> accounts = query.list();
			tran.commit();
			post = new AdminPostResp();
			if(accounts.size() > 0)
			{
				Post res = accounts.get(0);
				
				post.setPostId(res.getPostId());
				post.setTitle(res.getTitle());
				post.setContent(res.getContent());
				post.setShortContent(res.getShortContent());
				post.setPublisherName(res.getPublisherName());
				String banner = res.getBannerPath();
				int index = banner.lastIndexOf('/');
				banner = banner.substring(index+1);
				int index2 = banner.indexOf('.');
				banner = banner.substring(index2+1);
				post.setBannerPath(banner);
				
				List<MimeFile> fileList = FileOperator.getFiles(postId);
				List<MimeFileItem> mimeFileList = new ArrayList<MimeFileItem>();
				MimeFileItem mimeFileItem = null;
				if (fileList.size() > 0)
				{
					for (MimeFile file:fileList)
					{
						mimeFileItem = new MimeFileItem();
						mimeFileItem.setFileId(file.getFileId());
						mimeFileItem.setName(file.getName());
						mimeFileItem.setPath(file.getPath());
						
						mimeFileList.add(mimeFileItem);
					}
					
				}
				post.setFileList(mimeFileList);
			}
			return post;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return post;
	}
	
	public static List<AdminPostItem> queryAdminPostList(QueryParam param)
	{
		Session session = null;
		List<AdminPostItem> res = null;
		try{
			boolean ifHasFrontParam = true;
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			StringBuffer hql = new StringBuffer();
			hql.append("from com.ctbri.model.Post as p ");
			if (!StringUtils.isBlank(param.getNewsTitle()))
			{
				hql.append("where p.title like '%"+param.getNewsTitle()+"%' ");	
			}
			else
			{
				ifHasFrontParam = false;
			}
			if (!StringUtils.isBlank(param.getStartTime()) && ifHasFrontParam)
				hql.append("and p.publishTime >= :startTime ");
			else if(!StringUtils.isBlank(param.getStartTime()) && !ifHasFrontParam)
			{	
				hql.append("where p.publishTime >= :startTime ");
				ifHasFrontParam = true;
			}
			if (!StringUtils.isBlank(param.getEndTime()) && ifHasFrontParam)
				hql.append("and p.publishTime <= :endTime ");
			else if(!StringUtils.isBlank(param.getEndTime()) && !ifHasFrontParam)
			{	
				hql.append("where p.publishTime  <= :endTime ");
				ifHasFrontParam = true;
			}
			if (param.getIsPublish() != -1 && ifHasFrontParam)
				hql.append("and p.isPublish = :isPublish");
			else if(param.getIsPublish() != -1 && !ifHasFrontParam)
				hql.append("where p.isPublish = :isPublish");
			Query query = session.createQuery(hql.toString());
			
			if (!StringUtils.isBlank(param.getStartTime()))
				query.setString("startTime", param.getStartTime());
			if (!StringUtils.isBlank(param.getEndTime()))
				query.setString("endTime", param.getEndTime());
			if (param.getIsPublish() != -1)
				query.setInteger("isPublish", param.getIsPublish());
			List<Post> posts = query.list();
			tran.commit();
			
			if (posts.size() > 0)
			{
				res = new ArrayList<AdminPostItem>();
				AdminPostItem item = null;
				for (Post post : posts)
				{
					item = new AdminPostItem();
					item.setPostId(post.getPostId());
					item.setTitle(post.getTitle());
					item.setShortContent(post.getShortContent());
					item.setPublishTime(post.getPublishTime());
					item.setPublisherName(post.getPublisherName());
					item.setCreateTime(post.getCreateTime());
					item.setPublishTime(post.getPublishTime());
					item.setIsPublish(post.getIsPublish());
					item.setCategoryId(post.getCategoryId());
					
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
	
	public static void main(String[] args) throws Exception
	{
		List<PostItem> res = PostOperator.getPostList(1, 2, 1, 10);
		System.out.println(res.size());
		for (int i = 0; i < res.size(); i++)
		{
			System.out.println(res.get(i).getPostId());
		}
	}
}
