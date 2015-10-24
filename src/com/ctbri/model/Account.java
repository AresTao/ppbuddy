package com.ctbri.model;

public class Account implements java.io.Serializable {

	private static final long serialVersionUID = -3571257114011954L;
	
	private String id;
	private String passwd;
	
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
}
