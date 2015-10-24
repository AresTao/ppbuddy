package com.ctbri.config;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.ctbri.config.api.ConfigException;
import com.ctbri.config.api.Configer;

/**
 * 解析配置文件
 * @author ztwu
 *
 */
public class XmlConfigerImpl implements Configer {

    private static final Log log = LogFactory.getLog(XmlConfigerImpl.class);

    private static final String CONFIG_FILE_NAME = "/config/config.xml";

    private Map<String, Document> allDocs = new HashMap<String, Document>();
    private static Configer config=null;
    
    static{
    	if(config==null){
  		    config=new XmlConfigerImpl();
  	    }
    }
    
    public static Configer getConfigerInstance()
    {
	   	return config;
	}
    
    private XmlConfigerImpl() 
    {
    	init();
    }

    private void init() throws ConfigException 
    {
        try {
            initAllConfig();
            if (allDocs.size() == 0) {
                throw new ConfigException("无法找到配置文件,启动终止...");
            }
        }
        catch (Exception e) {
            throw new ConfigException("解析配置文件出错,启动终止...");
        }
    }

    public  String getParameter(String id) 
    {
        log.debug("根据名字查询参数id=" + id);

        Element parameterElement = null;
        //存在默认文件时从默认文件获取参数
        if (null != allDocs.get(CONFIG_FILE_NAME)) {
            log.debug("存在默认配置文件，从默认配置文件加载参数");
            Element root = allDocs.get(CONFIG_FILE_NAME).getRootElement();
            parameterElement = root.elementByID(id);
            if (null != parameterElement) {
                log.debug("从默认配置文件获取到参数！");
                return parameterElement.elementText("value");
            }
        }
        return null;
    }

    public Configer reload() throws ConfigException {
        init();
        return this;
    }

    /**
     * 初始化所有全局配置文件信息
     */
    private void initAllConfig() throws Exception {
        SAXReader reader = new SAXReader();
        URL url = XmlConfigerImpl.class.getResource(CONFIG_FILE_NAME);
        Document tempDoc = reader.read(url.openStream());
        allDocs.put(CONFIG_FILE_NAME, tempDoc);
        log.info("文件:" + CONFIG_FILE_NAME+ "解析完成");
    }
}