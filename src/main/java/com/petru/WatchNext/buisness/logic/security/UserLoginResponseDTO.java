package com.petru.WatchNext.buisness.logic.security;

import java.util.Date;

public class UserLoginResponseDTO {

    private String token;
    private String name;
    private String username;
    private Long user_id;
    private Date expirationDate;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUser_id() { return user_id; }

    public void setUser_id(Long user_id) { this.user_id = user_id; }

    public Date getExpirationDate() {return expirationDate;}

    public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate; }
}