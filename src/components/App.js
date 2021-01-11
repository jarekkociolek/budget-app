import "antd/dist/antd.css";
import ".././index.css";
import { Layout, Menu, Row } from "antd";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ExpensesPage from "./expenses/ExpensesPage";
import HomePage from "./home/HomePage";
import AppSider from "./common/AppSider";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as userManager from "../userService";
import SignInCallback from "./SignInCallback";
import { bindActionCreators } from "redux";
import * as authenticationActions from "../redux/actions/authenticationActions";
import PropTypes from "prop-types";

const { Header, Content } = Layout;

const App = (props) => {
  useEffect(() => {
    async function getUser() {
      let user = await userManager.getUser();
      props.actions.setUserAuthenticated(user != null);
    }
    getUser();
  });

  const handleLogin = async () => {
    await userManager.signinRedirect();
  };

  const handleLogout = () => {
    userManager.signoutRedirect();
  };

  return (
    <>
      <React.Suspense fallback="loading">
        <Route path="/signin-oidc" component={SignInCallback}></Route>
        <Layout style={{ height: "100vh" }}>
          <Header>
            <Row justify={"end"}>
              <Menu theme="dark" mode="horizontal">
                {!props.isAuthenticated ? (
                  <>
                    <Menu.Item key="1" onClick={handleLogin}>
                      Login
                    </Menu.Item>
                    <Menu.Item key="2">Register</Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item key="5" onClick={handleLogout}>
                      Logout
                    </Menu.Item>
                  </>
                )}
              </Menu>
            </Row>
          </Header>
          <Layout>
            {props.isAuthenticated ? <AppSider></AppSider> : <></>}
            <Content>
              <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/expenses" component={ExpensesPage}></Route>
                <Route component={PageNotFound}></Route>
              </Switch>
              <ToastContainer autoClose={3000} hideProgressBar></ToastContainer>
            </Content>
          </Layout>
        </Layout>
      </React.Suspense>
    </>
  );
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authorization.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authenticationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
