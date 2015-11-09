package com.ctbri.resp;

import java.util.Vector;

public class ImgResp {

	private Vector<ImgItem> headImg = new Vector<ImgItem>();
	private Vector<ImgItem> bodyImg = new Vector<ImgItem>();
	private Vector<ImgItem> rewardImg = new Vector<ImgItem>();
	public Vector<ImgItem> getHeadImg() {
		return headImg;
	}
	public void setHeadImg(Vector<ImgItem> headImg) {
		this.headImg = headImg;
	}
	public Vector<ImgItem> getBodyImg() {
		return bodyImg;
	}
	public void setBodyImg(Vector<ImgItem> bodyImg) {
		this.bodyImg = bodyImg;
	}
	public Vector<ImgItem> getRewardImg() {
		return rewardImg;
	}
	public void setRewardImg(Vector<ImgItem> rewardImg) {
		this.rewardImg = rewardImg;
	}
		
}
