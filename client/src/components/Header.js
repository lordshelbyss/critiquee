import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

const Header = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  const renderHeader = () => {
    if (props.user === null)
      return (
        <li>
          <a>Still Loading</a>
        </li>
      );
    if (props.user) {
      return [
        <li>
          Credits:  {props.user.credits}
        </li>,
        <li>
          <Link to="/add-credits">Add credits</Link>
        </li>,
        <li>
          <a href="/auth/logout">Logout</a>
        </li>
      ];
    }
    return (
      <li>
        <a href="/auth/google">Login with Google</a>
      </li>
    );
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            critiquee
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderHeader()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};
export default connect(mapStateToProps, { fetchUser })(Header);
