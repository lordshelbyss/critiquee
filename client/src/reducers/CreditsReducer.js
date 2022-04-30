import types from '../actions/types';

export const creditsReducer=(state=null,action)=>{
    switch(action.type){
        case "ADD_CREDITS":
            return action.payload;
        default:
            return state;
    }
};