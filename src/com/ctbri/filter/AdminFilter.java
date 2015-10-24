package com.ctbri.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AdminFilter implements Filter{
	public void destroy() {
	
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest r = (HttpServletRequest)request;
		
		HttpSession session = r.getSession();
		String path = r.getContextPath();
			
		if (session.getAttribute("index") == null || path.endsWith("/"))
		{
			
			((HttpServletResponse)response).sendRedirect("./login.jsp");
			
			return;
		}
		else{
			
			chain.doFilter(request,response);
		}
		
	}

	public void init(FilterConfig arg0) throws ServletException {
		System.out.println("init invoked!");
	}
}
