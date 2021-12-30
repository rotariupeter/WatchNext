package com.petru.WatchNext.buisness.logic.movie.userMovies;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserMovieRepo extends JpaRepository<UserMovieEntity,Long> {
}
