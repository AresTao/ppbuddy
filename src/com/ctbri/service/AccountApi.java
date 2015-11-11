package com.ctbri.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.jboss.resteasy.spi.HttpRequest;

import com.ctbri.operator.AccountOperator;
import com.ctbri.operator.FileOperator;

@Path("/api")
public class AccountApi {

private static final Logger log = Logger.getLogger(AccountApi.class);
	
	@Context
	HttpRequest request;
	
	@POST
	@Path("/{APIversion}/admin/checkPwd/username/{USERNAME}/passwd/{PASSWD}")	
	//@Consumes("application/json")
	@Produces("application/json")
	public Response checkPwd(@PathParam("APIversion") String APIversion,@PathParam("USERNAME") String username,@PathParam("PASSWD") String passwd
			){
		boolean res = AccountOperator.login(username, passwd);
		return Response.status(200).entity(res).build(); 
	}
	
	@POST
	@Path("/{APIversion}/admin/modifyPwd/username/{USERNAME}/oldpasswd/{OLDPASSWD}/newpasswd/{NEWPASSWD}")	
	//@Consumes("application/json")
	@Produces("application/json")
	public Response modifyPwd(@PathParam("APIversion") String APIversion,@PathParam("USERNAME") String username,@PathParam("OLDPASSWD") String oldpasswd,
			@PathParam("NEWPASSWD") String newpasswd){
		boolean res = AccountOperator.modifyPwd(username, oldpasswd, newpasswd);
		return Response.status(200).entity(res).build();
	}
}
