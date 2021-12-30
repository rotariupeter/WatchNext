import axios from 'axios';

 export const getAllMovies =(user_id)=>{
    return axios({
        method:'GET',
        url:`/all`,
         params: {
            id: user_id
            }
    })
}

export const getUserFavoriteMovies =(user_id)=>{
    return axios({
        method:'GET',
        url:`user/FavoriteMovies`,
         params: {
            id: user_id
            }
    })
}

 export const getMovieByID = (movieId,user_id) =>{
    return axios({
        method:'GET',
        url:`/movieByID`,
        params: {
            id: movieId,
            userId: user_id
          }
    })

}

export const updateUserMovies = (userId,movieId,action) =>{
    return axios({
        method:'PUT',
        url:`/updateUserMovie/${userId}/${action}/${movieId}`,
    })
}

export const saveUser=(userDetails)=>{
    return axios({
        'method':'POST',
        'url':`/createUser`,
        'data':userDetails
    })
}





