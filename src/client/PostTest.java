package client;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.bouncycastle.crypto.RuntimeCryptoException;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

public class PostTest {

	public static void main(String[] args) throws Exception
	{
		//testGetPost();
		//testGetPostList();
		//testPublishPost();
		//testDeletePost();
		testQueryPost();
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
	
	public static void testDeletePost() throws Exception
	{
		try{
			
			String restUrl = "http://localhost:8080/ppbuddy/api/0.1/post/delete";
			//String restUrl = "http://124.127.117.203:8199/logservice/log/upload";
			
			URL url = new URL(restUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setConnectTimeout(30000);
			//conn.setRequestProperty("Content-Encoding", "gzip");
			//conn.setRequestProperty("Accept-Encoding", "gzip");
			
			JSONObject body = new JSONObject();
			JSONArray param = new JSONArray();
			param.put("20151025");
			param.put("20151026");
			
			body.accumulate("postIds", param);
			String input = body.toString();
			OutputStream os = conn.getOutputStream();		    
			//os.write(input.getBytes());
			os.write(input.getBytes());
			os.flush();
			
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
	
	public static void testPublishPost() throws Exception
	{
		try{
			
			String restUrl = "http://localhost:8080/ppbuddy/api/0.1/post/publish/flag/0";
			//String restUrl = "http://124.127.117.203:8199/logservice/log/upload";
			
			URL url = new URL(restUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setConnectTimeout(30000);
			//conn.setRequestProperty("Content-Encoding", "gzip");
			//conn.setRequestProperty("Accept-Encoding", "gzip");
			JSONObject body = new JSONObject();
			JSONArray param = new JSONArray();
			param.put("20151025");
			param.put("20151026");
			
			body.accumulate("postIds", param);
			String input = body.toString();
			OutputStream os = conn.getOutputStream();		    
			//os.write(input.getBytes());
			os.write(input.getBytes());
			os.flush();
			
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
	
	public static void testQueryPost() throws Exception
	{
		try{
			
			String restUrl = "http://localhost:8080/ppbuddy/api/0.1/admin/post/queryList";
			//String restUrl = "http://124.127.117.203:8199/logservice/log/upload";
			
			URL url = new URL(restUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setConnectTimeout(30000);
			//conn.setRequestProperty("Content-Encoding", "gzip");
			//conn.setRequestProperty("Accept-Encoding", "gzip");
			JSONObject body = new JSONObject();
			body.accumulate("newsTitle", "t");
			body.accumulate("startTime", "2015-10-25 00:00:00");
			body.accumulate("endTime", "2015-10-31 00:00:00");
			body.accumulate("newsType", 1);
			body.accumulate("isPublish", 1);
			
			String input = body.toString();
			OutputStream os = conn.getOutputStream();		    
			//os.write(input.getBytes());
			os.write(input.getBytes());
			os.flush();
			
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
