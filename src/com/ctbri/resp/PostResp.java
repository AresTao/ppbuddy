package com.ctbri.resp;

import java.util.ArrayList;
import java.util.List;

public class PostResp {

	private String postId;
	private String title;
	private String content;
	private String publishTime;
	private String publisherName;
	private List<MimeFileItem> imgPaths = new ArrayList<MimeFileItem>();
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
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}
	public String getPublisherName() {
		return publisherName;
	}
	public void setPublisherName(String publisherName) {
		this.publisherName = publisherName;
	}
	public List<MimeFileItem> getImgPaths() {
		return imgPaths;
	}
	public void setImgPaths(List<MimeFileItem> imgPaths) {
		this.imgPaths = imgPaths;
	}
	
}
