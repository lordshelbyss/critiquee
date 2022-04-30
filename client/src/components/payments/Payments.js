import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../../css/payment.css";

const stripePromise = loadStripe(
  "pk_test_51KsogmSGAauIKLoijcDvequbz0P3FuxXqjby5YoN7ke1vichRPQvjnoKYZMETzQGaScbtjEJDu5CWnyoL0JE1zdL0051vGDQce"
);

const Payments = (props) => {

  console.log(props);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm history={props.history}/>
    </Elements>
  );
};

export default Payments;
