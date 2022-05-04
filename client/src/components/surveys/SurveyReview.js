import formFields from "./formFields";
import { connect} from "react-redux";

const SurveyReview = ({ onBackClick, onSubmitClick,values}) => {

    const renderReviewFields=()=>{
        return formFields.map((field)=>{
            return (
                <div>
                    <h4>{field.name}</h4>
                    <p>{values[field.name]}</p>
                </div>
            );
        })
    };

  return (
    <div>
      {renderReviewFields()}
      <a
        onClick={onSubmitClick}
        className="waves-effect waves-light btn-large right"
      >
        Submit
      </a>
      <a onClick={onBackClick} className="yellow btn-large left ">
        Back
      </a>
    </div>
  );
};

const mapStateToProps=(state)=>{
    return {
        values: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps,{})(SurveyReview);
