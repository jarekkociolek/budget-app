import React, { useEffect } from "react";
import * as userService from "../userService";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authenticationActions from "../redux/actions/authenticationActions";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const SignInCallback = (props) => {
  const [t] = useTranslation();

  const history = useHistory();
  useEffect(() => {
    async function signinAsync() {
      await userService.signinRedirectCallback();
      let usr = {
        isAuthenticated: true,
      };
      props.actions.setUserAuthenticated(usr);
      history.push("/");
    }
    signinAsync();
  }, [history]);
  return <h1>{t("logging_in_info")}</h1>;
};

SignInCallback.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthorized: state.authorization.isAuthorized,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authenticationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInCallback);
