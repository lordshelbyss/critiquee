import axios from 'axios';

export const fetchUser=()=>{
    return async (dispatch)=>{
        const response=await axios.get('/api/user');
        dispatch({type:"FETCH_USER",payload:response.data});
    }
};

export const addCredits=(credits)=>{
    return {
        type: "ADD_CREDITS",
        payload: Number(credits)
    };
    
};

export const associateCreditsWithUser=(credits)=>{
    return async (dispatch)=>{
        const response=await axios({
            method: "POST",
            url: "/api/user/add-credits",
            data:{
                credits:credits,
            }
        });
        dispatch({type:"FETCH_USER",payload:response.data});
    }
};

export const changeSurveyInReview=(inReview)=>{
    return {
        type: "CHANGE_INREVIEW",
        payload: inReview
    };
    
};

export const saveSurvey=(formValues)=>{
    return async (dispatch)=>{
        const response=await axios.post('/api/survey/create',formValues);
        dispatch({type:"FETCH_USER",payload:response.data});
    }
};