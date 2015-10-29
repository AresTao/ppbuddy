package com.ctbri.resp;

import java.util.ArrayList;
import java.util.List;

public class AdminPostResp {

	private String postId;
	private String title;
	private String shortContent;
	private String content;
	private String publisherName;
	private String bannerPath;
	private List<MimeFileItem> fileList = new ArrayList<MimeFileItem>();

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getShortContent() {
		return shortContent;
	}

	public void setShortContent(String shortContent) {
		this.shortContent = shortContent;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPublisherName() {
		return publisherName;
	}

	public void setPublisherName(String publisherName) {
		this.publisherName = publisherName;
	}

	public List<MimeFileItem> getFileList() {
		return fileList;
	}

	public void setFileList(List<MimeFileItem> fileList) {
		this.fileList = fileList;
	}

	public String getBannerPath() {
		return bannerPath;
	}

	public void setBannerPath(String bannerPath) {
		this.bannerPath = bannerPath;
	}
	
}
