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
import com.ctbri.model.Img;
import com.ctbri.model.MimeFile;
import com.ctbri.model.Post;
import com.ctbri.param.QueryImgParam;
import com.ctbri.param.QueryParam;
import com.ctbri.resp.AdminImgItem;
import com.ctbri.resp.AdminImgResp;
import com.ctbri.resp.AdminPostItem;
import com.ctbri.resp.AdminPostResp;
import com.ctbri.resp.BannerResp;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.ImgItem;
import com.ctbri.resp.ImgResp;
import com.ctbri.resp.MimeFileItem;
import com.ctbri.resp.PostItem;
import com.ctbri.resp.PostResp;
import com.ctbri.util.DbHelper;
import com.ctbri.util.StringUtils;

public class ImgOperator {

private static final Logger log = Logger.getLogger(ImgOperator.class);
	
	public static CommonPostResp addImg(Img img)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			session = DbHelper.getSession();
			
			Transaction tran = session.beginTransaction();//开始事物     
			session.save(img);   
	        tran.commit();			
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("create success.");
	        log.info("add img success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp updateImg(Img img)
	{
		Session session = null;
		CommonPostResp res = null;
		
		try{
			session = DbHelper.getSession();
						
			Transaction tran = session.beginTransaction();//开始事物     
			StringBuffer hql = new StringBuffer();
			hql.append("UPDATE com.ctbri.model.Img i set ");
			if (!StringUtils.isBlank(img.getName()))
				hql.append("i.name=:name, ");
			if (!StringUtils.isBlank(img.getPath()) && !img.getPath().endsWith("."))
				hql.append("i.path=:path, ");
			if (!StringUtils.isBlank(img.getLink()))
				hql.append("i.link=:link, ");
			if (img.getType() != 0)
				hql.append("i.type=:type ");
			else
				hql.delete(hql.lastIndexOf(","),hql.lastIndexOf(",")+1);
			hql.append("where imgId=:imgId");
			
			Query query = session.createQuery(hql.toString());
			if (!StringUtils.isBlank(img.getName()))
				query.setString("name", img.getName());
			if (!StringUtils.isBlank(img.getPath()) && !img.getPath().endsWith("."))
				query.setString("path", img.getPath());
			if (!StringUtils.isBlank(img.getLink()))
				query.setString("link", img.getLink());
			if (img.getType() != 0)
				query.setInteger("type", img.getType());
			query.setInteger("imgId", img.getImgId());
			query.executeUpdate();
	        tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("update success.");
	        log.info("update img "+img.getImgId()+" success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	public static CommonPostResp publishImg(Vector<Integer> imgIds, int flag)
	{
		Session session = null;	
		CommonPostResp res = null;		
		try{
			session = DbHelper.getSession();
			
			Transaction tran = session.beginTransaction();//开始事物  
			for (Integer imgId : imgIds)
			{
				String hql = "UPDATE com.ctbri.model.Img i set i.isPublish=:isPublish, i.publishTime=:publishTime where i.imgId =:imgId";
				Query query = session.createQuery(hql);
				query.setInteger("isPublish", flag);
				String publishTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
				query.setString("publishTime", publishTime);
				query.setInteger("imgId", imgId);
				query.executeUpdate();
			}
			tran.commit();
			
	        res = new CommonPostResp();
	        res.setCode(200);
	        res.setReason("publish success.");
	        log.info("publish img "+imgIds+" success.");
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	
	@SuppressWarnings("unchecked")
	public static CommonPostResp deleteImg(Vector<Integer> imgIds)
	{
		Session session = null;
		CommonPostResp res = null;
		try{
			res = new CommonPostResp();
			session = DbHelper.getSession();
			for (Integer imgId : imgIds)
			{
				
				Transaction tran = session.beginTransaction();//开始事物     
				String hql = "from com.ctbri.model.Img as i where i.imgId=:imgId";
				Query query = session.createQuery(hql);
				query.setInteger("imgId", imgId);
				List<Img> imgs = query.list();
				tran.commit();
				if (imgs.size() > 0)
				{
					if (imgs.get(0).getIsPublish() == 0)
					{
						Transaction tran2 = session.beginTransaction();//开始事物    
						hql = "delete com.ctbri.model.Img  as i where i.imgId=:imgId";
						query = session.createQuery(hql);
						query.setInteger("imgId", imgId);
						query.executeUpdate();
						tran2.commit();
						res.setCode(200);
						res.setReason("删除成功.");
						log.info("delete img "+imgId+" success.");
					} else
					{
						res.setCode(403);
						res.setReason("删除失败，该图片已经发布.");
						log.info("img "+imgId+" can not be delete.unpublish it first.");
						return res;
					}
				} else 
				{
					res.setCode(404);
					res.setReason("img "+imgId+" not exist.");
					log.info("img "+imgId+" not exist.");
					return res;
				}
			}
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	

	public static List<AdminImgItem> getAdminImgList(int flag) 
	{
		Session session = null;
		List<AdminImgItem> res = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = null;
			if (flag == -1)
			{
				hql = "from com.ctbri.model.Img order by publishTime desc";
			}else 
			{
				hql = "from com.ctbri.model.Img where type=:type order by publishTime desc";
			}
			
			Query query = session.createQuery(hql);
			if (flag != -1)
			query.setInteger("type", flag);
			List<Img> imgs = query.list();
			tran.commit();
			if (imgs.size() > 0)
			{
				res = new ArrayList<AdminImgItem>();
				AdminImgItem item = null;
				for (Img img : imgs)
				{
					item = new AdminImgItem();
					item.setImgId(img.getImgId());
					item.setIsPublish(img.getIsPublish());
					item.setName(img.getName());
					item.setPublishTime(img.getPublishTime());
					item.setCreateTime(img.getCreateTime());
					item.setPath(img.getPath());
					item.setLink(img.getLink());
					item.setType(img.getType());
					
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
	public static AdminImgResp getAdminImg(int imgId)
	{
		Session session = null;
		AdminImgResp img = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = "from com.ctbri.model.Img where imgId=:imgId";
			Query query = session.createQuery(hql);
			query.setInteger("imgId", imgId);
			List<Img> accounts = query.list();
			tran.commit();
			
			if(accounts.size() > 0)
			{
				Img res = accounts.get(0);
				img = new AdminImgResp();
				String fileName = res.getPath();
				int index = fileName.lastIndexOf('/');
				fileName = fileName.substring(index+1);
				int index2 = fileName.indexOf('.');
				fileName = fileName.substring(index2+1);
				img.setImgId(res.getImgId());
				
				img.setName(res.getName());
				
				img.setPath(fileName);
				img.setLink(res.getLink());
				img.setType(res.getType());
				
			}
			return img;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return img;
	}
	
	public static List<AdminImgItem> queryAdminImgList(QueryImgParam param)
	{
		Session session = null;
		List<AdminImgItem> res = null;
		try{
			boolean ifHasFrontParam = true;
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			StringBuffer hql = new StringBuffer();
			hql.append("from com.ctbri.model.Img as i ");
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
			List<Img> imgs = query.list();
			tran.commit();
			
			if (imgs.size() > 0)
			{
				res = new ArrayList<AdminImgItem>();
				AdminImgItem item = null;
				for (Img img : imgs)
				{
					item = new AdminImgItem();
					item.setImgId(img.getImgId());
					item.setIsPublish(img.getIsPublish());
					item.setName(img.getName());
					item.setPublishTime(img.getPublishTime());
					item.setCreateTime(img.getCreateTime());
					item.setPath(img.getPath());
					item.setLink(img.getLink());
					item.setType(img.getType());
					
					res.add(item);
				}
			}
			log.info("query img list success.");
			return res;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return res;
	}
	//head表示关于页head部分图片个数、body表示页面中的图片个数、reward表示证书图片个数
	@SuppressWarnings("unchecked")
	public static ImgResp getAboutImgList(int head, int body, int reward) 
	{
		Session session = null;
		ImgResp res = null;
		try{
			session = DbHelper.getSession();
			String hql = null;
			res = new ImgResp();
			Transaction tran = session.beginTransaction();//开始事物     			
			hql = "from com.ctbri.model.Img where type=:type and isPublish=1 order by publishTime desc limit "+head;	
			Query query = session.createQuery(hql);
			query.setInteger("type", Consts.ABOUT_HEAD);
			List<Img> Imgs = query.list();
			
			if (Imgs.size() > 0)
			{
				ImgItem item = new ImgItem();
				for (Img img : Imgs)
				{
					item = new ImgItem();
					item.setName(img.getName());
					item.setPath(img.getPath());
					item.setType(img.getType());
					
					res.getHeadImg().add(item);
				}
			}
			hql = "from com.ctbri.model.Img where type=:type and isPublish=1 order by publishTime desc limit "+body;	
			query = session.createQuery(hql);
			query.setInteger("type", Consts.ABOUT_BODY);
			Imgs = query.list();
			
			if (Imgs.size() > 0)
			{
				ImgItem item = new ImgItem();
				for (Img img : Imgs)
				{
					item = new ImgItem();
					item.setName(img.getName());
					item.setPath(img.getPath());
					item.setType(img.getType());
					
					res.getBodyImg().add(item);
				}
			}
			
			hql = "from com.ctbri.model.Img where type=:type and isPublish=1 order by publishTime desc limit "+reward;	
			query = session.createQuery(hql);
			query.setInteger("type", Consts.ABOUT_REWARD);
			Imgs = query.list();
			
			if (Imgs.size() > 0)
			{
				ImgItem item = new ImgItem();
				for (Img img : Imgs)
				{
					item = new ImgItem();
					item.setName(img.getName());
					item.setPath(img.getPath());
					item.setType(img.getType());
					
					res.getRewardImg().add(item);
				}
			}
			tran.commit();
			return res;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}	
		return res;	
	}
	
	//head表示关于页head部分图片个数、body表示页面中的图片个数、reward表示证书图片个数
		@SuppressWarnings("unchecked")
		public static BannerResp getBanners(int num) 
		{
			Session session = null;
			BannerResp res = null;
			try{
				session = DbHelper.getSession();
				String hql = null;
				res = new BannerResp();
				Transaction tran = session.beginTransaction();//开始事物     			
				hql = "from com.ctbri.model.Img where type=:type and isPublish=1 order by publishTime desc limit "+num;	
				Query query = session.createQuery(hql);
				query.setInteger("type", Consts.INDEX_BANNER);
				List<Img> Imgs = query.list();
				
				if (Imgs.size() > 0)
				{
					ImgItem item = new ImgItem();
					for (Img img : Imgs)
					{
						item = new ImgItem();
						item.setName(img.getName());
						item.setPath(img.getPath());
						item.setType(img.getType());
						item.setLink(img.getLink());
						res.getBanners().add(item);
					}
				}
				
				tran.commit();
				return res;
			}catch(Exception e)
			{
				log.error(e.getMessage());
			}	
			return res;	
		}
	
/*	//isPublish  0 not published 1 published 2 all
	
	
	@SuppressWarnings("unchecked")
	public static ImgResp getImg(int imgId)
	{
		Session session = null;
		ImgResp img = null;
		try{
			session = DbHelper.getSession();
			Transaction tran = session.beginTransaction();//开始事物     
			String hql = "from com.ctbri.model.Img where imgId=:imgId";
			Query query = session.createQuery(hql);
			query.setInteger("imgId", imgId);
			List<Img> imgs = query.list();
			tran.commit();
			img = new ImgResp();
			if(imgs.size() > 0)
			{
				Img res = imgs.get(0);
				
				post.setPostId(res.getPostId());
				post.setTitle(res.getTitle());
				post.setContent(res.getContent());
				post.setPublishTime(res.getPublishTime());
				post.setPublisherName(res.getPublisherName());
				
				
			}
			return img;
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return img;
	}
	
	
	
	
	*/
}
