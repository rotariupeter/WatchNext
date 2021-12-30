package com.petru.WatchNext.buisness.logic.movie;

import com.petru.WatchNext.buisness.logic.movie.userMovies.UserMovieEntity;
import com.petru.WatchNext.buisness.logic.movie.userMovies.UserMoviesServiceLite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
//@CrossOrigin(origins = "http://localhost:3000")
public class MoviesWebController {

    private final MoviesService userMovies;
    private final MoviesService movie;
    private final UserMoviesServiceLite userMovieLiteService;
    static final String UPDATE_ACTION = "add";
    static final String REMOVE_ACTION = "remove";


    @Autowired
    public MoviesWebController(MoviesService userMovies, MoviesService movie,  UserMoviesServiceLite userMovieLiteService) {
        this.userMovies = userMovies;
        this.movie = movie;
        this.userMovieLiteService = userMovieLiteService;
    }

//    @GetMapping("/userMovie")
//    public String getUsersMovies(@RequestParam(value = "user",required = true) String user, Model model){
//
//        List<UserMovieDTO> userMovies = this.userMovies.getUserMovies(1);
//        model.addAttribute("userMovie", userMovies);
//        return "UsersMovies";
//    }

//    @RequestMapping(method= RequestMethod.GET)
//    public List<UserMoviesDTO> getMovies( Model model){
//
//        List<UserMoviesDTO> userMovies = this.userMovies.getUserMovies(1);
//        return userMovies;
//    }

    @GetMapping("all")
    public List<MovieDTOLite>  getAllMovies(@RequestParam(value = "id",required = false) String userIDString){

        Long userId = userIDString != null && userIDString.length() > 0 ? Long.parseLong(userIDString):0;
        List<MovieDTOLite> userMovies = this.userMovies.getMoviesIncludeUserId(userId);
        return userMovies;

    }

    @GetMapping("user/FavoriteMovies")
    public List<MovieDTOLite>  getUserFavoriteMovie(@RequestParam(value = "id",required = true) String userIDString){

        Long userId = userIDString != null && userIDString.length() > 0 ? Long.parseLong(userIDString):0;
        List<MovieDTOLite> userMovies = this.userMovies.getUserFavoriteMovies(userId);
        return userMovies;

    }

    @GetMapping("movieByID")
    public MovieDTOLite getMovie(@RequestParam(value = "id",required = true) String movieID, Model model){

        MovieDTOLite userMovies = movie.getMovie( Long.parseLong(movieID));
        return userMovies;

    }

    @PutMapping("updateUserMovie/{user_id}/{action}/{movie_id}")
    public Long updateUserMovies( @PathVariable  Long user_id,  @PathVariable  Long movie_id, @PathVariable  String action){

        MoviesEntityLite movieById = userMovieLiteService.getMovieById(movie_id);
        UserMovieEntity userById = userMovieLiteService.getUserById(user_id);

        if(UPDATE_ACTION.equals(action)) {
            userById.getUserMovies().add(movieById);
        }
        else if(REMOVE_ACTION.equals(action)){
            userById.getUserMovies().remove(movieById);
        }

        userMovieLiteService.updateUserMovieColl(userById);

        return movie_id;
    }

    //No usage
//    @PutMapping("public/updateUserMovie/{user_id}/{movie_id}")
//    public Long updateUserMovies( @PathVariable  Long user_id,  @PathVariable  Long movie_id){
//
//        AuthRolesEntity roleById = userMovieLiteService1.getRoleById(movie_id);
//
//        UserEntityTest user = userMovieLiteService1.getUserByid(user_id);
//
//        user.getAuthorities().remove(roleById);
//
//        userMovieLiteService.getSave(user);
//
//        return movie_id;
//
//        //movieLiteService.updateCustomer();
//    }

}
