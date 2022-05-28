export const surveyFormInReviewReducer=(state=false,action)=>{
    switch(action.type){
        case "CHANGE_INREVIEW":
            return action.payload;
        default:
            return state;
    }
};