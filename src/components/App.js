import "antd/dist/antd.css";
import ".././index.css";
import { Layout, Menu, Row, Col } from "antd";
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

const { Header, Footer, Content } = Layout;

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

  return (
    <>
      <React.Suspense fallback="loading">
        <Route path="/signin-oidc" component={SignInCallback}></Route>
        <Layout style={{ minHeight: "100vh" }}>
          {props.isAuthenticated ? (
            <>
              <AppSider></AppSider>
              <Layout className="site-layout">
                <Content>
                  <Switch>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/expenses" component={ExpensesPage}></Route>
                    <Route component={PageNotFound}></Route>
                  </Switch>
                  <ToastContainer
                    autoClose={3000}
                    hideProgressBar
                  ></ToastContainer>
                </Content>
                <Footer style={{ textAlign: "center" }}></Footer>
              </Layout>
            </>
          ) : (
            <Header className="header">
              <div className="logo" />
              <Row justify={"end"}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="1" onClick={handleLogin}>
                    Login
                  </Menu.Item>
                  <Menu.Item key="2">Register</Menu.Item>
                </Menu>
              </Row>
            </Header>
          )}
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
