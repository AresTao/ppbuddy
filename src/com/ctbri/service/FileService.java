package com.ctbri.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.jboss.resteasy.spi.HttpRequest;

import com.ctbri.operator.FileOperator;

@Path("/api")
public class FileService {

	private static final Logger log = Logger.getLogger(FileService.class);
	
	@Context
	HttpRequest request;
	
	@POST
	@Path("/{APIversion}/admin/file/delete/{fileId}")	
	@Consumes("application/json")
	@Produces("application/json")
	public Response deletePost(@PathParam("APIversion") String APIversion,@PathParam("fileId") int fileId
			){
		boolean res = FileOperator.deleteFile(fileId);
		return Response.status(200).entity(res).build(); 
	}
}
