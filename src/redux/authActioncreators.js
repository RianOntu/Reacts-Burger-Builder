import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess=(token,userId)=>{
    return {
        type:actionTypes.auth_success,
        payload:{
            token:token,
            userId:userId
        }
    }
}
export const authLoading=isLoading=>{
    return {
        type:actionTypes.auth_loading,
        payload:isLoading
    }

}
export const authFailed=errMsg=>{
    return {
        type:actionTypes.auth_failed,
        payload:errMsg
    }
}
export const auth=(email,password,mode)=>dispatch=>{
    dispatch(authLoading(true));
    const authData={
        email:email,
        password:password,
        returnSecureToken:true
    }
    let authUrl=null;
    if(mode==='sign_up'){
        authUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    }
    else{
        authUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }
    const API_KEY="AIzaSyAC7HcSY41QvH-XNEE2urmHZJXfACXd5Xo";
    axios.post(authUrl+API_KEY,authData).then(response=>{
        dispatch(authLoading(false));
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        const expirationTime=new Date(new Date().getTime()+response.data.expiresIn*1000);
        localStorage.setItem('expirationTime',expirationTime);
       dispatch(authSuccess(response.data.idToken,response.data.localId));
        
    }).catch(err=>{console.log(err.response);
                       dispatch(authLoading(false));    
                       dispatch(authFailed(err.response.data.error.message))
    });
}
export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type:actionTypes.auth_logout,
    }
    
}
export const authCheck=()=>dispatch=>{
    const token=localStorage.getItem('token');
    if(!token){
        //logout
        dispatch(logOut());
    }
    else{
        const expirationTime=new Date(localStorage.getItem('expirationTime'));
        if(expirationTime<=new Date()){
            //logout
            dispatch(logOut());
        }
        else{
            const userId=localStorage.getItem('userId');
            dispatch(authSuccess(token,userId));
        }
    }
}

