package com.ctbri.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class SetCharacterEncodingFilter implements Filter{
    public void destroy(){
    }
    
    public void doFilter(ServletRequest request,ServletResponse response,
                    FilterChain chain) throws IOException, ServletException{
            request.setCharacterEncoding("UTF-8");
            //System.out.println("be here.");
            //传递控制到下一个过滤器
            chain.doFilter(request,response);
    }
    public void init(FilterConfig filterConfig) throws ServletException{
    }
}
