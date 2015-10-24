package com.ctbri.util;
/**
 * 字符串工具类
 * @author ztwu
 */
public class StringUtils {
	
    private static StringBuffer sb = new StringBuffer();//StringBuffer对象
    /**
     * 将特殊json转换为正常字符串
     * 去掉{}与""
     * @param jsonstr
     * @return
     */
    public static String convertJson(String jsonstr){
    	sb.setLength(0);
    	if(jsonstr!=null&&!jsonstr.equals("")){
    		String str = jsonstr.substring(jsonstr.indexOf('{')+1,jsonstr.lastIndexOf('}'));
    		for (int i = 0; i<str.length();i++) {
				 if(str.charAt(i)!='"'||str.charAt(i)!='"'){
					 sb.append(str.charAt(i));
				 }
			}
    	}
    	return sb.toString();
    }
}