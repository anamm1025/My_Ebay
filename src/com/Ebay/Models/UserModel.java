package com.Ebay.Models;

public class UserModel {
	
	
	
	
	
	//================================================================
	
	public String getScrName() {
		return scrName;
	}

	public void setScrName(String scrName) {
		this.scrName = scrName;
	}

	public String getEmailAddr() {
		return emailAddr;
	}

	public void setEmailAddr(String emailAddr) {
		this.emailAddr = emailAddr;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getcPassword() {
		return cPassword;
	}

	public void setcPassword(String cPassword) {
		this.cPassword = cPassword;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public UserModel(String scrName, String emailAddr, String password, String cPassword, String contactNo) {
		super();
		this.scrName = scrName;
		this.emailAddr = emailAddr;
		this.password = password;
		this.cPassword = cPassword;
		this.contactNo = contactNo;
	}

	private String scrName, emailAddr, password,cPassword,contactNo;
	
	//================================================================
	

}
