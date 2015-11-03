package com.ctbri.filter;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.apache.commons.io.IOUtils;

public class EncodingRequest extends HttpServletRequestWrapper{
	private HttpServletRequest request;  
	  
    public EncodingRequest(HttpServletRequest request) {   
    	super(request);
        this.request = request;  
    }  
  
    /** 
     * 先解密，获取明文；然后将明文转化为字节数组；然后再去读取字节数组中的内容 
     */  
    @Override  
    public ServletInputStream getInputStream() {
    	String bizBindMsg = null;  
        ServletInputStream stream = null;  
  
        try {  
            stream = request.getInputStream();  
            bizBindMsg = IOUtils.toString(stream, "UTF-8");  
            System.out.println(bizBindMsg);
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        try {  
            bizBindMsg = URLDecoder.decode(bizBindMsg.toString(), "UTF-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        byte[] buffer = null;  
        try {  
            buffer = bizBindMsg.toString().getBytes("UTF-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        final ByteArrayInputStream bais = new ByteArrayInputStream(buffer);  
  
        ServletInputStream newStream = new ServletInputStream() {  
  
            @Override  
            public int read() throws IOException {  
                return bais.read();  
            }
        };  
        return newStream;  
    }

}
