package com.petru.WatchNext.buisness.logic.movie.userMovies;

import com.petru.WatchNext.buisness.logic.movie.MoviesEntityLite;

import javax.persistence.*;
import java.util.Set;

@Table(name = "user_accounts")
@Entity
public class UserMovieEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", unique = true)
    private String userName;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_movies",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "movies_id"))
    private Set<MoviesEntityLite> userMovies;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Set<MoviesEntityLite> getUserMovies() {
        return userMovies;
    }

    public void setUserMovies(Set<MoviesEntityLite> userMovies) {
        this.userMovies = userMovies;
    }
}
