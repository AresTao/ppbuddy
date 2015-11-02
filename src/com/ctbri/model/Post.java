package com.ctbri.model;

public class Post implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8777974044090699311L;
	private String postId;
	private int categoryId;
	private String title;
	private String shortContent;
	private String content;
	private String createTime;
	private String publishTime;
	private int isPublish;
	private int level;
	private String publisherName;
	private String bannerPath;
	
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
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}
	public int getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(int isPublish) {
		this.isPublish = isPublish;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getPublisherName() {
		return publisherName;
	}
	public void setPublisherName(String publisherName) {
		this.publisherName = publisherName;
	}
	public String getBannerPath() {
		return bannerPath;
	}
	public void setBannerPath(String bannerPath) {
		this.bannerPath = bannerPath;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String toString()
	{
		return "postId = "+postId+", content= "+content+", shortContent="+shortContent+", publisherName="+publisherName+", title="+title;
	}
}
