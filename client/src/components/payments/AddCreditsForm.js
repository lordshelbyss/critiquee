import React from "react";
import { Field, reduxForm } from "redux-form";

const AddCreditsForm = (props) => {
  const { handleSubmit, submitting } = props;

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

  return (
    <form id="addCreditsForm" onSubmit={handleSubmit}>
      <div>
        <Field
          name="credits"
          component={renderField}
          type="text"
          label="Add Credits"
        />
      </div>
      <button disable={submitting} type="submit">
        Submit
      </button>
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.credits) {
    errors.credits = "required";
  } else if (isNaN(Number(values.credits))) {
    errors.credits = "Must be a number";
  }
  return errors;
};

export default reduxForm({
  form: "credits",
  validate,
})(AddCreditsForm);
