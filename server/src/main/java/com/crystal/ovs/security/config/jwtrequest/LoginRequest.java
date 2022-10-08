package com.crystal.ovs.security.config.jwtrequest;


public class LoginRequest {

	private String email;


	private String password;

	public String getUsername() {
		return email;
	}
	public void setUsername(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
