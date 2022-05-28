import { reduxForm ,Field} from "redux-form";
import _ from 'lodash';
import formFields from './formFields';
const emailReg = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`);


const SurveyForm = ({onCancelClick,onNextClick}) => {

  const renderField = ({ input, label, type, meta }) => {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      </div>
    );
  };

  const renderForm = () => {

    return formFields.map(({ name, label }) => {
      return (
        <div>
          <Field
            name={name}
            component={renderField}
            type="text"
            label={label}
          />
        </div>
      );
    });
  };

  return (
    <div style={{marginTop:"20px"}}>
      <form>
        {renderForm()}
        <a onClick={onNextClick} className="waves-effect waves-light btn-large right">Next</a>
        <a onClick={onCancelClick} className="red btn-large left ">Cancel</a>
      </form>
    </div>
  );
};

const validate=(values)=>{

    const errors={};

    // Empty field validation 
    // Array.map() function has to always return something 
  //  _.map(formFields,({name})=>{

  //       if(!values[name]){
  //           errors[name]= `${name} should be present`;
  //       }
  //   });

    // Email validation 
    // Getting errors here !!
    // const invalidMails=values.recipients.split(',').map((email)=> email.trim()).filter((email)=> !emailReg.test(email));
    // if(invalidMails.length){
    //     errors.recipients= `Invalid emails entered `;
    // }

    // console.log("erros",invalidMails);
    return errors;
};

export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount:false
})(SurveyForm);
