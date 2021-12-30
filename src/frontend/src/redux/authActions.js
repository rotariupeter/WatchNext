import {AUTH_REQ,AUTH_SUCCESS,AUTH_FAILURE} from './types';


export const authenticate=()=>{
    return {
        type:AUTH_REQ
    }
}


export const authSuccess= (content)=>{
    localStorage.setItem('USER_KEY',content.token);
    localStorage.setItem('NAME',content.name);
    localStorage.setItem('USER_ID',content.user_id);
    localStorage.setItem('EXPIRATION_DATE',content.expirationDate);

    //console.log(content.token + " user id:" + content.user_id);
    //document.cookie  = "USER_KEY = Bearer "+ content.token +"" ;

    return {
        type:AUTH_SUCCESS,
        payload:content
    }
}

export const authFailure=(error)=>{
    return {
        type:AUTH_FAILURE,
        payload:error
    }
}