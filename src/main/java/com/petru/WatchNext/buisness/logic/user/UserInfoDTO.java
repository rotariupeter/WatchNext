package com.petru.WatchNext.buisness.logic.user;

public class UserInfoDTO {


    private String surname;
    private String forename;
    private String userName;
    private String role;
    private String countryPrefix;
    private String phone;
    private String gender;
    private String intro;
    private String password;
    private String email;

    private Object roles;

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setRoles(Object roles) {
        this.roles = roles;
    }

    public String getSurname() {
        return surname;
    }

    public String getForename() {
        return forename;
    }

    public String getUserName() {
        return userName;
    }

    public Object getRoles() {
        return roles;
    }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }

    public String getCountryPrefix() { return countryPrefix; }

    public void setCountryPrefix(String countryPrefix) { this.countryPrefix = countryPrefix; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getGender() { return gender; }

    public void setGender(String gender) { this.gender = gender; }

    public String getIntro() { return intro; }

    public void setIntro(String intro) { this.intro = intro; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }
}
