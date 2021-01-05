import "antd/dist/antd.css";
import ".././index.css";
import { Layout } from "antd";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ExpensesPage from "./expenses/ExpensesPage";
import HomePage from "./home/HomePage";
import AppSider from "./common/AppSider";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <AppSider></AppSider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content>
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route path="/expenses" component={ExpensesPage}></Route>
              <Route component={PageNotFound}></Route>
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar></ToastContainer>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
