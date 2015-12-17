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

import org.jboss.resteasy.spi.HttpRequest;

import com.ctbri.operator.VideoOperator;
import com.ctbri.param.PublishVideoParam;
import com.ctbri.param.QueryVideoParam;
import com.ctbri.resp.AdminVideoItem;
import com.ctbri.resp.AdminVideoResp;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.resp.VideoResp;

@Path("/api")
public class VideoService {

	@Context
	HttpRequest request;
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/video/publish/flag/{flag}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response publishVideo(@PathParam("APIversion") String APIversion, @PathParam("flag") int flag,
			PublishVideoParam param){
		CommonPostResp res = VideoOperator.publishVideo(param.getVideoIds(), flag);
		return Response.status(200).entity(res).build();
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/admin/video/getList/flag/{flag}")	//flag 0 未发布 1 已经发布 2 全部
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getAdminVideoList(@PathParam("APIversion") String APIversion, @PathParam("flag") int flag){
		List<AdminVideoItem> res = VideoOperator.getAdminVideoList(flag);
		return Response.status(200).entity(res).build(); 
	}
	
	/*
	 * 
	 * */
	@GET
	@Path("/{APIversion}/admin/video/get/{IMGID}")
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getAdminPost(@PathParam("APIversion") String APIversion, @PathParam("IMGID") int videoId
			){
		AdminVideoResp res = VideoOperator.getAdminVideo(videoId);
		return Response.status(200).entity(res).build();
	}
	
	/*
	 * 
	 * */
	@POST
	@Path("/{APIversion}/video/delete")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteVideo(@PathParam("APIversion") String APIversion,PublishVideoParam videoIds
			){
		CommonPostResp res = VideoOperator.deleteVideo(videoIds.getVideoIds());
		return Response.status(200).entity(res).build(); 
	}
	
	@POST
	@Path("/{APIversion}/admin/video/queryList")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response queryAdminVideoList(@PathParam("APIversion") String APIversion, 
			QueryVideoParam param){
		List<AdminVideoItem> res = VideoOperator.queryAdminVideoList(param);
		return Response.status(200).entity(res).build(); 
	}
	
	
	
	/*
	 * 
	 * *
	@GET
	@Path("/{APIversion}/video/get/{IMGID}")
	//@Consumes("application/json")
	@Produces("application/json")
	public Response getVideo(@PathParam("APIversion") String APIversion, @PathParam("IMGID") String videoId
			){
		VideoResp res = VideoOperator.getVideo(videoId);
		return Response.status(200).entity(res).build();
	}
	
	
	
	
	
	
	
	
	
	
	*/
}
