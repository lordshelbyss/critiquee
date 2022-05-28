// This should be the parent container for the logic for toggle between the review and form views of creating surveys
// Can be controlled through a state variable --> inReview : false

import { useState } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
import { saveSurvey } from "../../actions";
import { changeSurveyInReview } from "../../actions";

const SurveyNew = (props) => {

  const onCancelClick = () => {
    props.history.push("/surveys");
  };

  const onNextClick = () => {
    props.changeSurveyInReview(true);
  };

  const onBackClick = () => {
    props.changeSurveyInReview(false);
  };

  const onSubmitClick = (values) => {
    console.log("values are ",values);

    // call action creator
    props.saveSurvey(values);
    props.history.push("/surveys");
  };

  const renderFormPage = () => {
    if (props.inReview) {
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

const mapStateToProps = (state) => {
  return {
    inReview: state.surveyFormInReview,
    
  };
};

// very important trick to wrap this with reduxForm, sets destroyOnUnmount to true if
// we navigate to any component not under SurveyNew
export default connect(mapStateToProps, { saveSurvey,changeSurveyInReview })(
  reduxForm({
    form: "surveyForm",
  })(SurveyNew)
);
