import "antd/dist/antd.css";
import ".././index.css";
import { Layout, Menu, Row, Avatar, Space, Popover } from "antd";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { UserOutlined } from "@ant-design/icons";
import { oidcConfig } from "../config";
import { useTranslation } from "react-i18next";

const { Header, Content } = Layout;

const App = (props) => {
  useEffect(() => {
    async function getUser() {
      let user = await userManager.getUser();
      if (user != null) {
        let usr = {
          isAuthenticated: true,
          firstName: user.profile.given_name,
          lastName: user.profile.family_name,
        };
        props.actions.setUserAuthenticated(usr);
      }
    }
    getUser();
  }, [props.user.isAuthenticated]);

  const [t] = useTranslation();

  const handleLogin = async () => {
    await userManager.signinRedirect();
  };

  const handleLogout = () => {
    userManager.signoutRedirect();
  };

  const content = (
    <>
      <Space>{props.user.firstName}</Space>
      <Space>{props.user.lastName}</Space>
    </>
  );

  return (
    <>
      <Router>
        <Switch>
          <Route path="/signin-oidc" component={SignInCallback}></Route>
          <Route path="/">
            <Layout style={{ height: "100vh" }}>
              <Header>
                <Row justify={"end"} align={"middle"}>
                  {props.user.isAuthenticated ? (
                    <>
                      <Popover content={content}>
                        <Avatar size="large" icon={<UserOutlined />} />{" "}
                      </Popover>
                      ,
                    </>
                  ) : (
                    <></>
                  )}
                  <Menu theme="dark" mode="horizontal">
                    {!props.user.isAuthenticated ? (
                      <>
                        <Menu.Item key="1" onClick={handleLogin}>
                          {t("menu_login")}
                        </Menu.Item>
                        <Menu.Item key="2">
                          <a href={oidcConfig.registration_uri}>
                            {t("menu_register")}
                          </a>
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item key="4" onClick={handleLogout}>
                          {t("menu_logout")}
                        </Menu.Item>
                      </>
                    )}
                  </Menu>
                </Row>
              </Header>
              <Layout>
                {props.user.isAuthenticated ? <AppSider></AppSider> : <></>}
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
              </Layout>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    user: state.authorization.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authenticationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
