package client;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.bouncycastle.crypto.RuntimeCryptoException;
import org.codehaus.jettison.json.JSONObject;

public class PostTest {

	public static void main(String[] args) throws Exception
	{
		testGetPost();
		//testGetPostList();
	}
	
	public static void testGetPost() throws Exception
	{
		try{
			
			String restUrl = "http://localhost:8080/ppbuddy/api/0.1/post/get/20151025";
			//String restUrl = "http://124.127.117.203:8199/logservice/log/upload";
			
			URL url = new URL(restUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setConnectTimeout(30000);
			//conn.setRequestProperty("Content-Encoding", "gzip");
			//conn.setRequestProperty("Accept-Encoding", "gzip");
			
			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				throw new RuntimeException("Failed : HTTP error code : "
					+ conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream())));

			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {

				System.out.println(output);
			}

			conn.disconnect();

		} catch (Exception e) {

			e.printStackTrace();
			throw new RuntimeCryptoException(e.getMessage());
		}
	}
	
	public static void testGetPostList() throws Exception
	{
		try{
			
			String restUrl = "http://localhost:8080/ppbuddy/api/0.1/post/getList/category/1/flag/1";
			//String restUrl = "http://124.127.117.203:8199/logservice/log/upload";
			
			URL url = new URL(restUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setConnectTimeout(30000);
			//conn.setRequestProperty("Content-Encoding", "gzip");
			//conn.setRequestProperty("Accept-Encoding", "gzip");
			
			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				throw new RuntimeException("Failed : HTTP error code : "
					+ conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream())));

			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {

				System.out.println(output);
			}

			conn.disconnect();

		} catch (Exception e) {

			e.printStackTrace();
			throw new RuntimeCryptoException(e.getMessage());
		}
	}
}
