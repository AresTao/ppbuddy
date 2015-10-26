package com.ctbri.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.jboss.resteasy.spi.HttpRequest;

import com.ctbri.model.Post;
import com.ctbri.operator.FileOperator;
import com.ctbri.operator.PostOperator;
import com.ctbri.param.PublishPostParam;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.PostItem;
import com.ctbri.resp.PostResp;
import com.ctbri.util.FileUtils;

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
	@Consumes("multipart/form-data")
	//@Produces("application/json")
	public Response addPost(@PathParam("APIversion") String APIversion,MultipartFormDataInput input
			){
		MultivaluedMap<String,String> param = request.getFormParameters();
		
		Post post = new Post();
		
		String title = param.getFirst("title");
		String shortContent = param.getFirst("shortContent");
		String content = param.getFirst("content");
		String publisherName = param.getFirst("publisherName");
		String postId = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
		post.setTitle(title);
		post.setShortContent(shortContent);
		post.setContent(content);
		post.setPublisherName(publisherName);
		post.setPostId(postId);
		post.setIsPublish(0);
		
		String fileName = "";
		
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
                
        int fileSize = uploadForm.size();
        
        for (int i=0; i<fileSize; i++)
        {
            String fileNameNew =UUID.randomUUID().toString();  
            String downPath = null;
        	List<InputPart> inputParts = uploadForm.get("file"+i);
            for (InputPart inputPart : inputParts) {
            	try {
            		MultivaluedMap<String, String> header = inputPart.getHeaders();  
            		fileName = FileUtils.getFileName(header);
            		//convert the uploaded file to inputstream
            		InputStream inputStream = inputPart.getBody(InputStream.class,null);  
            		byte [] bytes = IOUtils.toByteArray(inputStream);
            		//constructs upload file path
            		ResourceBundle bundle = ResourceBundle.getBundle("path");
           		    String path = bundle.getString("path");
           		    fileName = fileNameNew+"."+fileName;
		            if (!path.endsWith("/"))
           		    	path = path + "/";
		            downPath=new String(path+fileName);
		            
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
            	FileOperator.addMimeFile(postId, fileName, downPath);
            }
        }
		CommonPostResp res = PostOperator.addPost(post);
		return Response.status(200).entity(res).build();
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
	@POST
	@Path("/{APIversion}/post/get/{POSTID}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getPost(@PathParam("APIversion") String APIversion, @PathParam("POSTID") String postId
			){
		PostResp res = PostOperator.getPost(postId);
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
	@POST
	@Path("/{APIversion}/post/getList/category/{Category}/flag/{flag}")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response getPostList(@PathParam("APIversion") String APIversion, 
			@PathParam("Category") int category,@PathParam("flag") int flag){
		List<PostItem> res = PostOperator.getPostList(category, flag);
		return Response.status(200).entity(res).build(); 
	}
}
