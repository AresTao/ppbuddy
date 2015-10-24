package com.ctbri.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Encoder;

/**
 * MD5加密数据实现类
 * 
 * @author ztwu
 */
public class MD5 {

	/**
	 * 对字符串数据进行MD5加密
	 * @param sourceCode MD5转换前的字符串数据
	 * @return
	 */
	public static String doStringToMD5(String sourceCode) {
		String s = null;  
        char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  
                'a', 'b', 'c', 'd', 'e', 'f' };
        try
        {  
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");  
            md.update(sourceCode.getBytes());  
            byte tmp[] = md.digest();
            char str[] = new char[16 * 2];
           
            int k = 0; 
            for (int i = 0; i < 16; i ++)
            {
                str[k ++] = hexDigits[tmp[i] >>> 4 & 0xf];
                str[k ++] = hexDigits[tmp[i] & 0xf];
            }  
            s = new String(str);
        }
        catch (Exception e)
        {  
        	// 
        }  
        return s;
	}
	
    /**  
     * 将二进制转化为16进制字符串  
     *   
     * @param b  
     *            二进制字节数组  
     * @return String  
     */  
    @SuppressWarnings("unused")
	private static String byte2hex(byte[] b) {   
        String hs = "";   
        String stmp = "";   
        for (int n = 0; n < b.length; n++) {   
            stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));   
            if (stmp.length() == 1) {   
                hs = hs + "0" + stmp;   
            } else {   
                hs = hs + stmp;   
            }   
        }   
        return hs.toUpperCase();   
    }

    public static String getHmacSHA1(String data, String key) throws Exception {
		byte[] byteHMAC = null;
		
        try {  
            Mac mac = Mac.getInstance("HmacSHA1");  
            SecretKeySpec spec = new SecretKeySpec(key.getBytes(), "HmacSHA1");  
            mac.init(spec);  
            byteHMAC = mac.doFinal(data.getBytes());  
        } catch (Exception e) {
        	throw new Exception("Fail to load HmacSHA1 Algorithm");
        }
        
        String result = new BASE64Encoder().encode(byteHMAC);  
        return result;
	}
}
