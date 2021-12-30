package com.petru.WatchNext.buisness.logic.movie;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class MovieDTOLite {


    protected BigInteger userID;
    protected BigInteger movieId;
    protected String movieName;
    protected Date releaseDate;
    protected String country;
    protected Integer durationInMin;
    protected String userName;


    public MovieDTOLite(BigInteger movieId,
                        BigInteger userID,
                        String movieName,
                        Date releaseDate,
                        String country,
                        Integer durationInMin) {

        this.movieId = movieId;
        this.movieName = movieName;
        this.userID = userID;
        this.releaseDate = releaseDate;
        this.country = country;
        this.durationInMin = durationInMin;

    }

    public BigInteger getMovieId() {
        return movieId;
    }

    public BigInteger getUserID() {
        return userID;
    }

    public String getMovieName() {
        return movieName;
    }


    public String getReleaseDate() {

        if(releaseDate == null) return "";

        Calendar calendar = new GregorianCalendar();
        calendar.setTime(releaseDate);
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        String zero = (month / 10) < 1 ? "0":"";
        return ""+year+" / "+ zero +month;
    }

    public String getCountry() {
        return country;
    }

    public Integer getDurationInMin() {
        return durationInMin;
    }

    public String getUserName() {
        return userName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public void setUserID(BigInteger userID) {
        this.userID = userID;
    }

    public void setMovieId(BigInteger movieId) {
        this.movieId = movieId;
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

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
