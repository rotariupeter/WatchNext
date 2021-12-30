package com.petru.WatchNext.buisness.logic.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMovieLiteRepo extends JpaRepository<MoviesEntityLite, Long> {

}
