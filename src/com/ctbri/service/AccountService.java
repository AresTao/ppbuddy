package com.ctbri.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.ctbri.operator.AccountOperator;

public class AccountService extends HttpServlet{

	/**
	 *管理员登录 
	 */
	private static final long serialVersionUID = -7460274838551294486L;

	private static final Logger log = Logger.getLogger(AccountService.class);

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		String id = req.getParameter("username");
		String passwd = req.getParameter("password");
        HttpSession session = req.getSession();
		
		boolean res = AccountOperator.login(id, passwd);
		if (res)
		{
			session.setAttribute("index", id);
			log.info("user "+id+" login success.");
			resp.sendRedirect("./index.jsp");
		}else
		{
			log.info("user "+id+" login failed.");
			resp.sendRedirect("./login.jsp");
		}		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		this.doPost(req, resp);
	}
}
