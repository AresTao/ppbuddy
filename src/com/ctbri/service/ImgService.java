package com.ctbri.service;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.jboss.resteasy.spi.HttpRequest;

import com.ctbri.operator.ImgOperator;
import com.ctbri.operator.PostOperator;
import com.ctbri.param.PublishImgParam;
import com.ctbri.param.PublishPostParam;
import com.ctbri.param.QueryImgParam;
import com.ctbri.param.QueryParam;
import com.ctbri.resp.AdminImgItem;
import com.ctbri.resp.AdminImgResp;
import com.ctbri.resp.AdminPostItem;
import com.ctbri.resp.AdminPostResp;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.ImgItem;
import com.ctbri.resp.ImgResp;
import com.ctbri.resp.PostItem;
import com.ctbri.resp.PostResp;
@Path("/api")
public class ImgService {

private static final Logger log = Logger.getLogger(ImgService.class);
	
	@Context
	HttpRequest request;
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/img/publish/flag/{flag}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response publishImg(@PathParam("APIversion") String APIversion, @PathParam("flag") int flag,
			PublishImgParam param){
		CommonPostResp res = ImgOperator.publishImg(param.getImgIds(), flag);
		return Response.status(200).entity(res).build();
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/admin/img/getList/flag/{flag}")	//flag 0 未发布 1 已经发布 2 全部
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getAdminImgList(@PathParam("APIversion") String APIversion, @PathParam("flag") int flag){
		List<AdminImgItem> res = ImgOperator.getAdminImgList(flag);
		return Response.status(200).entity(res).build(); 
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/admin/img/get/{IMGID}")
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getAdminPost(@PathParam("APIversion") String APIversion, @PathParam("IMGID") int imgId
			){
		AdminImgResp res = ImgOperator.getAdminImg(imgId);
		return Response.status(200).entity(res).build();
	}
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/img/delete")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteImg(@PathParam("APIversion") String APIversion,PublishImgParam imgIds
			){
		CommonPostResp res = ImgOperator.deleteImg(imgIds.getImgIds());
		return Response.status(200).entity(res).build(); 
	}
	
	@POST
	@Path("/{APIversion}/admin/img/queryList")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response queryAdminImgList(@PathParam("APIversion") String APIversion, 
			QueryImgParam param){
		List<AdminImgItem> res = ImgOperator.queryAdminImgList(param);
		return Response.status(200).entity(res).build(); 
	}
	
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/img/getAboutList")	//flag 0 未发布 1 已经发布 2 全部
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getImgList(@PathParam("APIversion") String APIversion){
		ImgResp res = ImgOperator.getAboutImgList(1,1,20);
		return Response.status(200).entity(res).build(); 
	}
	/*
	 * 
	 * *
	@GET
	@Path("/{APIversion}/img/get/{IMGID}")
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getImg(@PathParam("APIversion") String APIversion, @PathParam("IMGID") String imgId
			){
		ImgResp res = ImgOperator.getImg(imgId);
		return Response.status(200).entity(res).build();
	}
	
	
	
	
	
	
	
	
	
	
	*/
}
