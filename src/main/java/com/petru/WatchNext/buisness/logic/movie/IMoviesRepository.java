package com.petru.WatchNext.buisness.logic.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMoviesRepository extends JpaRepository<MovieEntity, Long> {

    @Query(nativeQuery = true)
    List<MovieDTOLite> findMovies(Long u_id);

    @Query("SELECT m FROM MovieEntity m LEFT JOIN m.user u WHERE u.id = ?1 ")
    List<MovieEntity> findUserFavoriteMovies(Long u_id);

    @Query("SELECT distinct m FROM MovieEntity m  WHERE m.id = ?1 ")
    MovieEntity getMovieByID(Long movie_id);

}
