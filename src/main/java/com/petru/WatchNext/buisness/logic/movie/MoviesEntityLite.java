package com.petru.WatchNext.buisness.logic.movie;

import javax.persistence.*;

@Entity
@Table(name = "movies")
public class MoviesEntityLite {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long movieId;

    @Column(name = "name")
    private String name;

    public long getMovieId() {
        return movieId;
    }

    public void setMovieId(long movieId) {
        this.movieId = movieId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
