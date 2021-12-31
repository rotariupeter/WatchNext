package com.petru.WatchNext.dummyTest;

import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;

import javax.persistence.*;
import java.util.List;

@Table(name = "user_accounts")
@Entity
public class UserEntityTest {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<AuthRolesEntity> authorities;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<AuthRolesEntity> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<AuthRolesEntity> authorities) {
        this.authorities = authorities;
    }
}
