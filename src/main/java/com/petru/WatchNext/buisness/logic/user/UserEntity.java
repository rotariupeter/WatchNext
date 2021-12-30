package com.petru.WatchNext.buisness.logic.user;


import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;
import org.springframework.security.core.userdetails.UserDetails;

@Table(name = "user_accounts")
@Entity
public class UserEntity implements UserDetails {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", unique = true)
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "created_on")
    private Date createdOn;

    @Column(name = "update_on")
    private Date updatedOn;


    @Column(name = "surname")
    private String surname;

    @Column(name = "forename")
    private String forename;

    @Column(name = "email")
    private String email;

    @Column(name = "isactiv")
    private boolean enabled = true;


    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<AuthRolesEntity> authorities;

    @Override
    public List<AuthRolesEntity> getAuthorities() {
        return authorities;
    }

    public long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public Date getUpdatedOn() {
        return updatedOn;
    }

    public String getSurename() {
        return surname;
    }

    public String getForename() {
        return forename;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public void setUpdatedOn(Date updatedOn) {
        this.updatedOn = updatedOn;
    }

    public void setSurname(String surename) {
        this.surname = surename;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setAuthorities(List<AuthRolesEntity> authorities) {
        this.authorities = authorities;
    }
}
