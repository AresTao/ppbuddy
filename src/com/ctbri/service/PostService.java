package com.ctbri.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.jboss.resteasy.annotations.Form;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.jboss.resteasy.spi.HttpRequest;

import com.ctbri.model.Post;
import com.ctbri.operator.FileOperator;
import com.ctbri.operator.PostOperator;
import com.ctbri.param.PublishPostParam;
import com.ctbri.resp.AdminPostItem;
import com.ctbri.resp.AdminPostResp;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.PostItem;
import com.ctbri.resp.PostResp;
import com.ctbri.util.FileUtils;
import com.ctbri.util.StringUtils;

@Path("/api")
public class PostService {

    private static final Logger log = Logger.getLogger(PostService.class);
	
	@Context
	HttpRequest request;
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/post/add")
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Consumes("multipart/form-data")
	//@Produces("text/plain")
	public Response addPost(@PathParam("APIversion") String APIversion,MultipartFormDataInput input
			) throws IOException{
		//MultivaluedMap<String,String> param = request.getFormParameters();
		
		String fileName = "";
		String realName = "";
		
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        
        int fileSize = uploadForm.size();
        
        String title = getValue(uploadForm, "title");
      	String shortContent = getValue(uploadForm, "shortContent");
      	String content = getValue(uploadForm, "content");
      	String publisherName = getValue(uploadForm, "publisherName");
        String isPublishStr = getValue(uploadForm,"isPublish");
        int isPublish = Integer.parseInt(isPublishStr);
        
      	Post post = new Post();
		
		
		String postId = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
		post.setTitle(title);
		post.setShortContent(shortContent);
		post.setContent(content);
		post.setPublisherName(publisherName);
		post.setPostId(postId);
		post.setIsPublish(isPublish);
		post.setCreateTime(new Date().toLocaleString());
		post.setPublishTime(new Date().toLocaleString());
		post.setCategoryId(1);
		
		for (int i=0; i<fileSize - 5; i++)
		{
            String fileNameNew =UUID.randomUUID().toString();  
            String downPath = null;
            boolean flag = true;
        	List<InputPart> inputParts = uploadForm.get("file"+i);
        	if (inputParts != null)
            for (InputPart inputPart : inputParts) {
            	try {
            		
            		MultivaluedMap<String, String> header = inputPart.getHeaders();  
            		fileName = FileUtils.getFileName(header);
            		if (fileName == null || StringUtils.isBlank(fileName))
            		{
            			flag = false;
            			break;
            		}
            		realName=fileName;
            		//convert the uploaded file to inputstream
            		InputStream inputStream = inputPart.getBody(InputStream.class,null);  
            		byte [] bytes = IOUtils.toByteArray(inputStream);
            		//constructs upload file path
            		ResourceBundle bundle = ResourceBundle.getBundle("path");
           		    String path = bundle.getString("path1");
           		    fileName = fileNameNew+"."+fileName;
		            if (!path.endsWith("/"))
           		    	path = path + "/";
		            downPath=new String(path+fileName);
		            log.info(downPath);
            		FileUtils.writeFile(bytes,downPath);
                } catch (IOException e) {
                	e.printStackTrace(); 
                }
            }
            if (i == 0)
            {
                post.setBannerPath(fileName);
            } else
            {
            	if (flag)
            	{
            		FileOperator.addMimeFile(postId, realName, downPath);
            	} else
            	{
            		flag = true;
            	}
            	
            }
        }
		CommonPostResp res = PostOperator.addPost(post);
		
		return Response.status(200).entity(res.getReason()).build();
	}
	
	@POST
	@Path("/{APIversion}/post/update")
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Consumes("multipart/form-data")
	//@Produces("text/plain")
	public Response updatePost(@PathParam("APIversion") String APIversion,MultipartFormDataInput input
			) throws IOException{
		//MultivaluedMap<String,String> param = request.getFormParameters();
		
		String fileName = "";
		
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        
        int fileSize = uploadForm.size();
        String postId = getValue(uploadForm, "postId");
        String title = getValue(uploadForm, "title");
      	String shortContent = getValue(uploadForm, "shortContent");
      	String content = getValue(uploadForm, "content");
      	String publisherName = getValue(uploadForm, "publisherName");
                
      	Post post = new Post();
		post.setTitle(title);
		post.setShortContent(shortContent);
		post.setContent(content);
		post.setPublisherName(publisherName);
		post.setPostId(postId);
		post.setCategoryId(1);
		log.info("filesize:"+fileSize);
		log.info(postId);
		for (int i=0; i<fileSize - 5; i++)
		{
            String fileNameNew =UUID.randomUUID().toString();  
            String downPath = null;
            boolean flag = true;
        	List<InputPart> inputParts = uploadForm.get("file"+i);
        	if (inputParts != null)
            for (InputPart inputPart : inputParts) {
            	try {
            		
            		MultivaluedMap<String, String> header = inputPart.getHeaders();  
            		fileName = FileUtils.getFileName(header);
            		if (fileName == null || StringUtils.isBlank(fileName))
            		{
            			flag = false;
            			break;
            		}
            		//convert the uploaded file to inputstream
            		InputStream inputStream = inputPart.getBody(InputStream.class,null);  
            		byte [] bytes = IOUtils.toByteArray(inputStream);
            		//constructs upload file path
            		ResourceBundle bundle = ResourceBundle.getBundle("path");
           		    String path = bundle.getString("path1");
           		    fileName = fileNameNew+"."+fileName;
		            if (!path.endsWith("/"))
           		    	path = path + "/";
		            downPath=new String(path+fileName);
		            log.info(downPath);
            		FileUtils.writeFile(bytes,downPath);
                } catch (IOException e) {
                	e.printStackTrace(); 
                }
            }
            if (i == 0)
            {
                post.setBannerPath(fileName);
            } else
            {
            	if (flag)
            	{
            		FileOperator.addMimeFile(postId, fileName, downPath);
            	} else
            	{
            		flag = true;
            	}
            	
            }
        }
		CommonPostResp res = PostOperator.updatePost(post);
		
		return Response.status(200).entity(res.getReason()).build();
	}
	
	private String getValue(Map<String, List<InputPart>> uploadForm, String key)
	{
		List<InputPart> inputParts = uploadForm.get(key);
        StringBuffer content = new StringBuffer();
        String fileName = null;
        if (inputParts.size() == 0)
        	return "";
        for (InputPart inputPart : inputParts) {
        	try {
        		MultivaluedMap<String, String> header = inputPart.getHeaders();  
        		fileName = FileUtils.getFileName(header);
        		//convert the uploaded file to inputstream
        		InputStream inputStream = inputPart.getBody(InputStream.class,null);  
        		byte [] bytes = IOUtils.toByteArray(inputStream);
        		//constructs upload file path
        		content.append(new String(bytes));
        		
            } catch (IOException e) {
            	e.printStackTrace(); 
            }
        }
        return content.toString();
	}
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/post/publish/flag/{flag}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response publishPost(@PathParam("APIversion") String APIversion, @PathParam("flag") int flag,
			PublishPostParam param){
		CommonPostResp res = PostOperator.publishPost(param.getPostIds(), flag);
		return Response.status(200).entity(res).build();
	}
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/post/get/{POSTID}")
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getPost(@PathParam("APIversion") String APIversion, @PathParam("POSTID") String postId
			){
		PostResp res = PostOperator.getPost(postId);
		return Response.status(200).entity(res).build();
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/admin/post/get/{POSTID}")
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getAdminPost(@PathParam("APIversion") String APIversion, @PathParam("POSTID") String postId
			){
		AdminPostResp res = PostOperator.getAdminPost(postId);
		return Response.status(200).entity(res).build();
	}
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/post/delete")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response deletePost(@PathParam("APIversion") String APIversion,PublishPostParam postIds
			){
		CommonPostResp res = PostOperator.deletePost(postIds.getPostIds());
		return Response.status(200).entity(res).build(); 
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/post/getList/category/{Category}/flag/{flag}")	//flag 0 未发布 1 已经发布 2 全部
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getPostList(@PathParam("APIversion") String APIversion, 
			@PathParam("Category") int category,@PathParam("flag") int flag){
		List<PostItem> res = PostOperator.getPostList(category, flag);
		return Response.status(200).entity(res).build(); 
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/admin/post/getList/category/{Category}/flag/{flag}")	//flag 0 未发布 1 已经发布 2 全部
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getAdminPostList(@PathParam("APIversion") String APIversion, 
			@PathParam("Category") int category,@PathParam("flag") int flag){
		List<AdminPostItem> res = PostOperator.getAdminPostList(category, flag);
		return Response.status(200).entity(res).build(); 
	}
}
