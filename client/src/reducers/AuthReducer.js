import types from '../actions/types';

export const authReducer=(state=null,action)=>{
    switch(action.type){
        case types.FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
};