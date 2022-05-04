import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="container" style={{ alignItems: "center" }}>
        <div>
            Landing
        </div>
        <Link
          to="/surveys"
          className="waves-effect waves-light btn-large"
          style={{ alignItems: "center" }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Landing;
