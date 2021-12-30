package com.petru.WatchNext.buisness.logic.movie.userMovies;

import com.petru.WatchNext.buisness.logic.movie.IMovieLiteRepo;
import com.petru.WatchNext.buisness.logic.movie.MoviesEntityLite;
import com.petru.WatchNext.test.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMoviesServiceLite {

    @Autowired
    IUserMovieRepo userMovieRepo;

    @Autowired
    IMovieLiteRepo movieLiteRepo;

    @Autowired
    IUserMovieMapper userMapper;

    //no usage - please ignore - this is just a test
    public void updateUserMovieColl1(UserDTO dto) {
        UserMovieEntity myUserMovieColl = userMovieRepo.findById(dto.getId()).get();
        userMapper.updateUserFromDto(dto, myUserMovieColl);
        userMovieRepo.save(myUserMovieColl);
    }

    public MoviesEntityLite getMovieById(long id){ return movieLiteRepo.getById(id); }

    public UserMovieEntity getUserById(Long id) {
        return userMovieRepo.getById(id);
    }

    public UserMovieEntity updateUserMovieColl(UserMovieEntity user)
    {
        return userMovieRepo.save(user);
    }
}
