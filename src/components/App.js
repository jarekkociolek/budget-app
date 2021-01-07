import "antd/dist/antd.css";
import ".././index.css";
import { Layout, Menu } from "antd";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ExpensesPage from "./expenses/ExpensesPage";
import HomePage from "./home/HomePage";
import AppSider from "./common/AppSider";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as userManager from "../userService";

const { Header, Footer, Content } = Layout;

const App = (props) => {
  const isAuthorized = props.isAuthorized;

  const handleLogin = () => {
    userManager.signinRedirect();
  };

  return (
    <>
      <React.Suspense fallback="loading">
        <Layout style={{ minHeight: "100vh" }}>
          {isAuthorized ? (
            <>
              <AppSider></AppSider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                />
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
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1" onClick={handleLogin}>
                  Login
                </Menu.Item>
                <Menu.Item key="2">Register</Menu.Item>
              </Menu>
            </Header>
          )}
        </Layout>
      </React.Suspense>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isAuthorized: state.authorization.isAuthorized,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
