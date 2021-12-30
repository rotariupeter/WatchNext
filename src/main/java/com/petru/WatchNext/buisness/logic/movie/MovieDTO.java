package com.petru.WatchNext.buisness.logic.movie;

import java.math.BigInteger;
import java.util.Date;

public class MovieDTO extends MovieDTOLite {

    protected String movieDescription;

    public String getMovieDescription() {
        return movieDescription;
    }

    public void setMovieDescription(String movieDescription) {
        this.movieDescription = movieDescription;
    }

    public MovieDTO(BigInteger movieId, BigInteger userID, String movieName, Date releaseDate, String country, Integer durationInMin) {
        super(movieId, userID, movieName, releaseDate, country, durationInMin);

    }
}

