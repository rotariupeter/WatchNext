package com.petru.WatchNext.buisness.logic.user.role;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Table(name = "role")
@Entity
public class AuthRolesEntity implements GrantedAuthority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String roleName;

    @Column(name = "description")
    private String roleDescription;

    @Override
    public String getAuthority() {
        return roleName;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getRoleName() {
        return roleName;
    }


    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }


    public String getRoleDescription() {
        return roleDescription;
    }


    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }

}
