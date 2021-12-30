package com.petru.WatchNext.buisness.logic.movie;

import com.petru.WatchNext.buisness.logic.user.UserLiteEntity;

import javax.persistence.*;
import java.util.Date;

//This query is mean
@NamedNativeQuery(name = "MovieEntity.findMovies",
        query = "select mov.id as movieId," +
                "   user_m.user_id as userID," +
                "   mov.name as movieName, " +
                "   mov.release_date as releaseDate," +
                "   mov.country as country," +
                "   mov.duration_min as durationInMin" +
                "  from movies as mov left join users_movies as user_m on mov.id = user_m.movies_id and user_m.user_id = ?1 " +
                " order by mov.release_date desc;",
        resultSetMapping = "com.petru.WatchNext.buisness.logic.movie.UserMovieLiteDTO")
@SqlResultSetMapping(name = "com.petru.WatchNext.buisness.logic.movie.UserMovieLiteDTO",
        classes = @ConstructorResult(targetClass = MovieDTOLite.class,
                columns = {@ColumnResult(name = "movieId"),
                        @ColumnResult(name = "userID"),
                        @ColumnResult(name = "movieName"),
                        @ColumnResult(name = "releaseDate"),
                        @ColumnResult(name = "country"),
                        @ColumnResult(name = "durationInMin")}))


@Entity
@Table(name = "movies")
public class MovieEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long movieId;

    @Column(name = "name")
    protected String movieName;

    @Column(name = "description")
    protected String description;

    @Column(name = "release_date")
    protected Date releaseDate;

    @Column(name = "country")
    protected String country;

    @Column(name = "duration_min")
    protected Integer durationInMin;

//    @OneToOne
//    protected UserLiteEntity user = new UserLiteEntity();


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_movies",
            joinColumns = @JoinColumn(name = "movies_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private UserLiteEntity user;

    public UserLiteEntity getUser() {
        return user;
    }

    public void setUser(UserLiteEntity user) {
        this.user = user;
    }

    public Long getMovieId() {
        return movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public String getDescription() {
        return description;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public String getCountry() {
        return country;
    }

    public Integer getDurationInMin() {
        return durationInMin;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setDurationInMin(Integer durationInMin) {
        this.durationInMin = durationInMin;
    }
}
