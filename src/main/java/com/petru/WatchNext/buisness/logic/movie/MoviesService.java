package com.petru.WatchNext.buisness.logic.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class MoviesService {

    private final IMoviesRepository moviesRepo;

    @Autowired
    public MoviesService(IMoviesRepository moviesRepo) {
        this.moviesRepo = moviesRepo;
    }

    public List<MovieDTOLite> getMoviesIncludeUserId(long userID) {

        return  moviesRepo.findMovies(userID);

    }

    public MovieDTO getMovie(long movieID){


        MovieEntity movie = moviesRepo.getMovieByID(movieID);//problema aici

        MovieDTO movieDTO = new MovieDTO(null,null,null,null,null,null);
        movieDTO.setMovieId(BigInteger.valueOf(movie.getMovieId()));
        movieDTO.setMovieName(movie.getMovieName());
        movieDTO.setReleaseDate(movie.getReleaseDate());
        movieDTO.setCountry(movie.getCountry());
        movieDTO.setMovieDescription(movie.getDescription());
        movieDTO.setDurationInMin(movie.getDurationInMin());

        return movieDTO;

    }

    public List<MovieDTOLite> getUserFavoriteMovies(long userID) {

        List<MovieEntity> userFavoriteMovies = moviesRepo.findUserFavoriteMovies(userID);

        List<MovieDTOLite> results = new ArrayList<>();

        userFavoriteMovies.forEach(movie -> {
            MovieDTOLite movieDTO = new MovieDTOLite(null, null, null, null, null, null);
            movieDTO.setMovieId(BigInteger.valueOf(movie.getMovieId()));
            movieDTO.setMovieName(movie.getMovieName());
            movieDTO.setReleaseDate(movie.getReleaseDate());
            movieDTO.setCountry(movie.getCountry());
            movieDTO.setDurationInMin(movie.getDurationInMin());
            movieDTO.setUserID(BigInteger.valueOf(userID));
            movieDTO.setUserName("Petru");
            results.add(movieDTO);
        });

        return results;
    }
}
