// This should be the parent container for the logic for toggle between the review and form views of creating surveys
// Can be controlled through a state variable --> inReview : false

import { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from './SurveyReview';

const SurveyNew = (props) => {
  const [inReview, setInReview] = useState(false);

  const onCancelClick = () => {
    props.history.push("/surveys");
  };

  const onNextClick = () => {
    setInReview(true);
  };

  const onBackClick=()=>{
    setInReview(false);
  };

  const onSubmitClick=()=>{

  };

  const renderFormPage = () => {
    if (inReview) {
      return (
        <SurveyReview onBackClick={onBackClick} onSubmitClick={onSubmitClick} />
      );
    }
    return (
      <SurveyForm onCancelClick={onCancelClick} onNextClick={onNextClick} />
    );
  };
  return <div>{renderFormPage()}</div>;
};

// very important trick to wrap this with reduxForm, sets destroyOnUnmount to true if
// we navigate to any component not under SurveyNew 
export default reduxForm({
    form: "surveyForm"
})(SurveyNew);
