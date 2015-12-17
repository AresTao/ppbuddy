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

import com.ctbri.consts.Consts;
import com.ctbri.model.Video;
import com.ctbri.param.QueryVideoParam;
import com.ctbri.resp.AdminVideoItem;
import com.ctbri.resp.AdminVideoResp;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.VideoItem;
import com.ctbri.resp.VideoResp;
import com.ctbri.util.DbHelper;
import com.ctbri.util.StringUtils;

public class VideoOperator {

private static final Logger log = Logger.getLogger(VideoOperator.class);
	
	public static CommonPostResp addVideo(Video video)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			session = DbHelper.getSession();
			
			Transaction tran = session.beginTransaction();//开始事物     
			session.save(video);   
	        tran.commit();			
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("create success.");
	        log.info("add video success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp updateVideo(Video video)
	{
		Session session = null;
		CommonPostResp res = null;
		
		try{
			session = DbHelper.getSession();
						
			Transaction tran = session.beginTransaction();//开始事物     
			StringBuffer hql = new StringBuffer();
			hql.append("UPDATE com.ctbri.model.Video i set ");
			if (!StringUtils.isBlank(video.getName()))
				hql.append("i.name=:name, ");
			if (!StringUtils.isBlank(video.getPath()) && !video.getPath().endsWith("."))
				hql.append("i.path=:path, ");
			if (video.getType() != 0)
				hql.append("i.type=:type ");
			else
				hql.delete(hql.lastIndexOf(","),hql.lastIndexOf(",")+1);
			hql.append("where videoId=:videoId");
			
			Query query = session.createQuery(hql.toString());
			if (!StringUtils.isBlank(video.getName()))
				query.setString("name", video.getName());
			if (!StringUtils.isBlank(video.getPath()) && !video.getPath().endsWith("."))
				query.setString("path", video.getPath());
			if (video.getType() != 0)
				query.setInteger("type", video.getType());
			query.setInteger("videoId", video.getVideoId());
			query.executeUpdate();
	        tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("update success.");
	        log.info("update video "+video.getVideoId()+" success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp publishVideo(Vector<Integer> videoIds, int flag)
	{
		Session session = null;	
		CommonPostResp res = null;		
		try{
			session = DbHelper.getSession();
			
			Transaction tran = session.beginTransaction();//开始事物  
			for (Integer videoId : videoIds)
			{
				String hql = "UPDATE com.ctbri.model.Video i set i.isPublish=:isPublish, i.publishTime=:publishTime where i.videoId =:videoId";
				Query query = session.createQuery(hql);
				query.setInteger("isPublish", flag);
				String publishTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
				query.setString("publishTime", publishTime);
				query.setInteger("videoId", videoId);
				query.executeUpdate();
			}
			tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("publish success.");
	        log.info("publish video "+videoIds+" success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	@SuppressWarnings("unchecked")
	public static CommonPostResp deleteVideo(Vector<Integer> videoIds)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			res = new CommonPostResp();
			session = DbHelper.getSession();
			for (Integer videoId : videoIds)
			{
				
				Transaction tran = session.beginTransaction();//开始事物     
				String hql = "from com.ctbri.model.Video as i where i.videoId=:videoId";
				Query query = session.createQuery(hql);
				query.setInteger("videoId", videoId);
				List<Video> videos = query.list();
				tran.commit();
				if (videos.size() > 0)
				{
					if (videos.get(0).getIsPublish() == 0)
					{
						Transaction tran2 = session.beginTransaction();//开始事物    
						hql = "delete com.ctbri.model.Video  as i where i.videoId=:videoId";
						query = session.createQuery(hql);
						query.setInteger("videoId", videoId);
						query.executeUpdate();
						tran2.commit();
						res.setCode(200);
						res.setReason("删除成功.");
						log.info("delete video "+videoId+" success.");
					} else
					{
						res.setCode(403);
						res.setReason("删除失败，该图片已经发布.");
						log.info("video "+videoId+" can not be delete.unpublish it first.");
						return res;
					}
				} else 
				{
					res.setCode(404);
					res.setReason("video "+videoId+" not exist.");
					log.info("video "+videoId+" not exist.");
					return res;
				}
			}
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	

	public static List<AdminVideoItem> getAdminVideoList(int flag) 
	{
		Session session = null;
		List<AdminVideoItem> res = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = null;
			if (flag == -1)
			{
				hql = "from com.ctbri.model.Video order by videoId desc";
			}else 
			{
				hql = "from com.ctbri.model.Video where type=:type order by videoId desc";
			}
			
			Query query = session.createQuery(hql);
			if (flag != -1)
			query.setInteger("type", flag);
			List<Video> videos = query.list();
			tran.commit();
			if (videos.size() > 0)
			{
				res = new ArrayList<AdminVideoItem>();
				AdminVideoItem item = null;
				for (Video video : videos)
				{
					item = new AdminVideoItem();
					item.setVideoId(video.getVideoId());
					item.setIsPublish(video.getIsPublish());
					item.setName(video.getName());
					item.setPublishTime(video.getPublishTime());
					item.setCreateTime(video.getCreateTime());
					item.setPath(video.getPath());
					item.setType(video.getType());
					
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
	public static AdminVideoResp getAdminVideo(int videoId)
	{
		Session session = null;
		AdminVideoResp video = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = "from com.ctbri.model.Video where videoId=:videoId";
			Query query = session.createQuery(hql);
			query.setInteger("videoId", videoId);
			List<Video> accounts = query.list();
			tran.commit();
			
			if(accounts.size() > 0)
			{
				Video res = accounts.get(0);
				video = new AdminVideoResp();
				String fileName = res.getPath();
				int index = fileName.lastIndexOf('/');
				fileName = fileName.substring(index+1);
				int index2 = fileName.indexOf('.');
				fileName = fileName.substring(index2+1);
				video.setVideoId(res.getVideoId());
				
				video.setName(res.getName());
				
				video.setPath(fileName);
				video.setType(res.getType());
				
			}
			return video;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return video;
	}
	
	public static List<AdminVideoItem> queryAdminVideoList(QueryVideoParam param)
	{
		Session session = null;
		List<AdminVideoItem> res = null;
		try{
			boolean ifHasFrontParam = true;
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			StringBuffer hql = new StringBuffer();
			hql.append("from com.ctbri.model.Video as i ");
			if (!StringUtils.isBlank(param.getName()))
			{
				hql.append("where i.name like '%"+param.getName()+"%' ");	
			}
			else
			{
				ifHasFrontParam = false;
			}
			if (!StringUtils.isBlank(param.getStartTime()) && ifHasFrontParam)
				hql.append("and i.publishTime >= :startTime ");
			else if(!StringUtils.isBlank(param.getStartTime()) && !ifHasFrontParam)
			{	
				hql.append("where i.publishTime >= :startTime ");
				ifHasFrontParam = true;
			}
			if (!StringUtils.isBlank(param.getEndTime()) && ifHasFrontParam)
				hql.append("and i.publishTime <= :endTime ");
			else if(!StringUtils.isBlank(param.getEndTime()) && !ifHasFrontParam)
			{	
				hql.append("where i.publishTime  <= :endTime ");
				ifHasFrontParam = true;
			}
			if (param.getIsPublish() != -1 && ifHasFrontParam)
				hql.append("and i.isPublish = :isPublish");
			else if(param.getIsPublish() != -1 && !ifHasFrontParam)
			{
				hql.append("where i.isPublish = :isPublish");
				ifHasFrontParam = true;
			}
			if (param.getType() != -1 && ifHasFrontParam)
				hql.append("and i.type = :type");
			else if(param.getType() != -1 && !ifHasFrontParam)
				hql.append("where i.type = :type");
			Query query = session.createQuery(hql.toString());
			
			if (!StringUtils.isBlank(param.getStartTime()))
				query.setString("startTime", param.getStartTime());
			if (!StringUtils.isBlank(param.getEndTime()))
				query.setString("endTime", param.getEndTime());
			if (param.getIsPublish() != -1)
				query.setInteger("isPublish", param.getIsPublish());
			if (param.getType() != -1)
				query.setInteger("type", param.getType());
			List<Video> videos = query.list();
			tran.commit();
			
			if (videos.size() > 0)
			{
				res = new ArrayList<AdminVideoItem>();
				AdminVideoItem item = null;
				for (Video video : videos)
				{
					item = new AdminVideoItem();
					item.setVideoId(video.getVideoId());
					item.setIsPublish(video.getIsPublish());
					item.setName(video.getName());
					item.setPublishTime(video.getPublishTime());
					item.setCreateTime(video.getCreateTime());
					item.setPath(video.getPath());
					item.setType(video.getType());
					
					res.add(item);
				}
			}
			log.info("query video list success.");
			return res;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	
/*	//isPublish  0 not published 1 published 2 all
	
	
	@SuppressWarnings("unchecked")
	public static VideoResp getVideo(int videoId)
	{
		Session session = null;
		VideoResp video = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = "from com.ctbri.model.Video where videoId=:videoId";
			Query query = session.createQuery(hql);
			query.setInteger("videoId", videoId);
			List<Video> videos = query.list();
			tran.commit();
			video = new VideoResp();
			if(videos.size() > 0)
			{
				Video res = videos.get(0);
				
				post.setPostId(res.getPostId());
				post.setTitle(res.getTitle());
				post.setContent(res.getContent());
				post.setPublishTime(res.getPublishTime());
				post.setPublisherName(res.getPublisherName());
				
				
			}
			return video;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return video;
	}
	*/
}
