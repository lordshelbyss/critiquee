import AddCreditsForm from "./AddCreditsForm";
import { connect } from "react-redux";
import { addCredits } from "../../actions";

const PaymentLanding=(props)=>{

    const handleSubmit=(values)=>{
        // add the credits to the redux store , so it can be retreived later 
        props.addCredits(values.credits);
        props.history.push('/payments');
    };

    return (
        <div className="container" style={{marginTop:"20px"}}>
            <AddCreditsForm onSubmit={handleSubmit}/>
        </div>
    );
};

export default connect(null,{addCredits})(PaymentLanding);