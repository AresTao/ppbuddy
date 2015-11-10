package client;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.bouncycastle.crypto.RuntimeCryptoException;

public class ImgTest {
	public static void main(String[] args) throws Exception
	{
		
		testGetAboutImgList();
	}

	public static void testGetAboutImgList() throws Exception
	{
		try{
			
			//String restUrl = "http://localhost:8080/ppbuddy/api/0.1/img/getAboutList";
			String restUrl = "http://101.200.173.116:8096/ppbuddy/api/0.1/img/getAboutList";
			
			URL url = new URL(restUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("GET");
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
