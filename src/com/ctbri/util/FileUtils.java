package com.ctbri.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.ws.rs.core.MultivaluedMap;

/**
 * 文件工具类
 * 
 * @author ztwu
 */
public class FileUtils {

	private FileUtils() {
	};

	//private static List<File> fs = new ArrayList<File>();

	/**
	 * 复制文件
	 * 
	 * @param oldfile
	 *            :原文件
	 * @param path
	 *            :要复制的文件路径
	 * @param filename
	 *            :复制的文件名称
	 * @return
	 */
	public static boolean copyFile(File oldfile, String filename, String path) {
		boolean flag = false;
		BufferedInputStream is = null;
		BufferedOutputStream os = null;
		try {
			if (oldfile != null) {
				if (oldfile.exists()) {
					File newFile = new File(path.concat(filename));// 创建新文件
					if (newFile.createNewFile()) {
						is = new BufferedInputStream(new FileInputStream(
								oldfile));// 创建文件输入流将原文件的数据读入到内存中
						os = new BufferedOutputStream(new FileOutputStream(
								newFile));// 创建文件输出流原文件的数据读入到复制的文件中
						byte[] oldBytes = new byte[(int) oldfile.length()];// 创建字节数组保存字节
						int len = 0;// 每次的吞吐量
						int off = 0;
						while ((len = is.read(oldBytes)) != -1) {
							os.write(oldBytes, off, len);
							off = len;
						}
						os.flush();
						flag = true;
					}
				}
			}
		} catch (FileNotFoundException fne) {
			fne.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				is.close();
				os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
	}

	/**
	 * 复制文件
	 * 
	 * @param oldfile
	 *            :原文件
	 * @param path
	 *            :要复制的文件路径
	 * @return
	 */
	public static boolean copyFile(File oldfile, String path) {
		return copyFile(oldfile, oldfile.getName(), path);
	}

	/**
	 * 生成文件
	 * 
	 * @param is
	 *            输入流
	 * @param path
	 *            生成文件的路径
	 * @return
	 */
	public static File createFiles(InputStream is, String path) {
		BufferedInputStream bis = null;// 缓存输入流
		BufferedOutputStream bos = null;// 缓存输出
		File file = null;
		try {
			File f = new File(path);// 创建要写入的文件
			if (!f.exists()) {
				if (f.createNewFile()) {
					bis = new BufferedInputStream(is);
					bos = new BufferedOutputStream(new FileOutputStream(file));
					int len = 0;
					int offle = 0;
					byte[] bytes = new byte[1024 * 1024];
					while ((len = bis.read(bytes)) != -1) {
						bos.write(bytes, offle, len);
						offle = len;
					}
					bos.flush();
					file = f;
				}
			}
		} catch (FileNotFoundException fne) {
			file = null;
			fne.printStackTrace();
		} catch (IOException ioe) {
			file = null;
			ioe.printStackTrace();
		} catch (Exception e) {
			file = null;
			e.printStackTrace();
		} finally {
			try {
				bis.close();
				bos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return file;
	}

	/**
	 * 生成文件
	 * 
	 * @param is
	 *            输入流
	 * @param path
	 *            生成文件的路径
	 * @param filename
	 *            文件名
	 * @return
	 */
	public static File createFiles(InputStream is, String path, String filename) {
		return createFiles(is, path.concat(filename));
	}

	/**
	 * 删除指定目录下所有文件 flag为true时删除文件夹 false时不删除
	 * 
	 * @param dir
	 *            目录名称
	 * @return
	 */
	public static boolean delete(File dir, boolean flag) {
		boolean isok = false;
		if (dir != null) {
			if (dir.isDirectory()) {
               if(flag){
            	   deleteFileAndDir(dir);
               }else{
            	   deleteFiles(dir);
               }
			}
		}
		return isok;
	}

	/**
	 * 删除当前目录下的所有文件
	 * 
	 * @param dir
	 * @return
	 */
	private static void deleteFiles(File dir) {
		if (dir != null) {
			if(dir.isDirectory()){
				File[] filearr = dir.listFiles();
				if(filearr!=null&&filearr.length>0){
					for (int i = 0; i < filearr.length; i++) {
						if (filearr[i].isFile()) {
							filearr[i].delete();
						}
						if (filearr[i].isDirectory()) {
							deleteFiles(filearr[i]);
						}
					}		
				}
			}else{
				dir.delete();
			}
		}
	}

	/**
	 * 删除当前目录下的所有文件及目录
	 * 
	 * @param dir
	 * @return
	 */
	private static void deleteFileAndDir(File dir) {
		if (dir != null) {
			File[] filearr = dir.listFiles();
			for (int i = 0; i < filearr.length; i++) {
                deleteFiles(filearr[i]);
			}
			for (int i = 0; i < filearr.length; i++) {
                 if(filearr[i].listFiles().length>0){
                	 deleteFileAndDir(filearr[i]);
                 }else{
                	 filearr[i].delete();	 
                 }
			}
		}
	}

	public static String getFileName(MultivaluedMap<String, String> header) {  
		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");  
	    for (String filename : contentDisposition) {  
	        if ((filename.trim().startsWith("filename"))) {  
	            String[] name = filename.split("=");  
	            String finalFileName = name[1].trim().replaceAll("\"", "");  
	            return finalFileName;  
	        }  
	    }  
	    return "unknown";  
	}  
	//save to somewhere  
	public static void writeFile(byte[] content, String filename) throws IOException {  
	    File file = new File(filename);
	    if (!file.exists()) {
	        file.createNewFile();
	    }
	    FileOutputStream fop = new FileOutputStream(file);  
	    fop.write(content);
	    fop.flush();
	    fop.close();
	}
}
