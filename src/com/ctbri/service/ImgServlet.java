package com.ctbri.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.ctbri.model.Img;
import com.ctbri.model.Post;
import com.ctbri.operator.FileOperator;
import com.ctbri.operator.ImgOperator;
import com.ctbri.operator.PostOperator;
import com.ctbri.resp.CommonPostResp;
import com.ctbri.util.StringUtils;

public class ImgServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2799300111002020494L;

	private static final Logger log = Logger.getLogger(ImgServlet.class);

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		request.setCharacterEncoding("utf-8");  //设置编码  
        
        //获得磁盘文件条目工厂  
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        //获取文件需要上传到的路径  
        ResourceBundle bundle = ResourceBundle.getBundle("path");
		String path = bundle.getString("path");
		String downloadPath = bundle.getString("download");
          
        //如果没以下两行设置的话，上传大的 文件 会占用 很多内存，  
        //设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同  
        /** 
         * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上，  
         * 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的  
         * 然后再将其真正写到 对应目录的硬盘上 
         */
        factory.setRepository(new File(path));
        //设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室  
        factory.setSizeThreshold(1024*1024);
          
        //高水平的API文件上传处理  
        ServletFileUpload upload = new ServletFileUpload(factory);
        try { 
            List<FileItem> list = (List<FileItem>)upload.parseRequest(request);  
            Map<String, String> fields = new HashMap<String,String>();
            
            String realName="";
            String downPath="";
            int imgId;
            boolean hasBanner = true;
            for(FileItem item : list)  
            {  
                //获取表单的属性名字  
                String name = item.getFieldName();  
                  
                //如果获取的 表单信息是普通的文本信息  
                if(item.isFormField())  
                {
                    //获取用户具体输入的字符串 ，名字起得挺好，因为表单提交过来的是 字符串类型的  
                    String value = item.getString() ;
                    fields.put(name, new String(value.getBytes("ISO-8859-1"), "utf-8"));
                    if (name.equals("imgId"))
                    {
                    	
                    	imgId = Integer.parseInt(fields.get("imgId"));
                    }
                }  
                //对传入的非 简单的字符串进行处理 ，比如说二进制的 图片，电影这些  
                else  
                {  
                    //获取路径名  
                    String value = item.getName();
                    //索引到最后一个反斜杠 
                    int start = value.lastIndexOf("\\");
                    //截取 上传文件的 字符串名字，加1是 去掉反斜杠，  
                    String fileName = value.substring(start+1);
                      
                    String fileNameNew =UUID.randomUUID().toString();
                    realName=fileName;
                    if (StringUtils.isChinese(fileName))
                    {
                    	int pointIndex = fileName.lastIndexOf('.');
                    	if (pointIndex != -1)
                    		fileName = fileName.substring(pointIndex+1);
                    }
                    fileName = fileNameNew+"."+fileName;
                    //真正写到磁盘上  
                    //它抛出的异常 用exception 捕捉  
                      
                    //item.write( new File(path,filename) );//第三方提供的  
                      
                    //手动写的  
                    OutputStream out = new FileOutputStream(new File(path,fileName));  
                      
                    InputStream in = item.getInputStream() ;  
                      
                    int length = 0 ;  
                    byte [] buf = new byte[1024] ;  
                      
                    System.out.println("获取上传文件的总共的容量："+item.getSize());  
                    
                   
                    // in.read(buf) 每次读到的数据存放在   buf 数组中  
                    while( (length = in.read(buf) ) != -1)  
                    {  
                        //在   buf 数组中 取出数据 写到 （输出流）磁盘上  
                        out.write(buf, 0, length);
                    }  
                     
                    in.close();
                    out.close();
                    downPath = downloadPath +"/" +fileName;
                }  
            }
            Img img = new Img();
            
            if (fields.containsKey("imgId"))
            {
            	
            	img.setName(fields.get("imgName"));
            	img.setPath(downPath);
            	img.setType(Integer.parseInt(fields.get("imgType")));
            	img.setImgId(Integer.parseInt(fields.get("imgId")));
            	 
        		CommonPostResp res = ImgOperator.updateImg(img);
            }else
            {
            	img.setName(fields.get("imgName"));
            	img.setPath(downPath);
            	img.setType(Integer.parseInt(fields.get("imgType")));
            	img.setIsPublish(Integer.parseInt(fields.get("isPublish")));
            	
        		
                DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                String createTime = format1.format(new Date());
        		img.setCreateTime(createTime);
        		img.setPublishTime(createTime);
        		
        		CommonPostResp res = ImgOperator.addImg(img);
            }
    		
    		
            response.sendRedirect("imgInfoList.jsp");
              
        } catch (FileUploadException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
        catch (Exception e) {  
            // TODO Auto-generated catch block  
              
            //e.printStackTrace();
        }
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		this.doPost(req, resp);
	}
}
