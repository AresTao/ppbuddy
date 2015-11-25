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
    
    public static boolean isBlank(String str)
    {
        if (str == null || str.trim().equals(""))
        {
            return true;
        }
        return false;
    }
    
    public static boolean isNumber(String str)
    {
    	if(java.lang.Character.isDigit(str.charAt(0))){
    		return true;
    	}
        return false;
    }
    
    private static final boolean isChinese(char c) {  
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);  
        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS  
                || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS  
                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A  
                || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION  
                || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION  
                || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS) {  
            return true;  
        }  
        return false;  
    }  
  
    public static final boolean isChinese(String strName) {  
        char[] ch = strName.toCharArray();  
        for (int i = 0; i < ch.length; i++) {  
            char c = ch[i];  
            if (isChinese(c)) {  
                return true;  
            }  
        }  
        return false;  
    }
}