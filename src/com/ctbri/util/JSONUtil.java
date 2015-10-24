package com.ctbri.util;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class JSONUtil {
	private static ObjectMapper mapper = new ObjectMapper();
	
	public static <T> String objectToJson(T t)
	{
	    String jsonStr = null;
	    	
	    try {
	    	jsonStr = mapper.writeValueAsString(t);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	    return jsonStr;
	}
	 
	public static String formatStr(String str){
	   	StringBuffer buff=new StringBuffer();
	   	if (str==null || "".equals(str))
	   		return null;
	   	if(str.contains(","))
	   	{
	   		String  [] strs=str.split(",");
	   		for (int i = 0; i < strs.length; i++) 
	   		{
	   			buff.append(strs[i]);
	   			if(i== (strs.length-1))
	   				buff.append("\n\t");
	   			else 
	   				buff.append(",");
	   			buff.append("\n\t");
	   			buff.append("\n\t");
	   		}
	   	}
	   	return  buff.toString();
	}
}
