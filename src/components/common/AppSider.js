import "antd/dist/antd.css";
import "../.././index.css";
import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  AreaChartOutlined,
  HomeOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import * as React from "react";
import { Link } from "react-router-dom";
import AddExpense from "../expenses/AddExpense";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as expenseAction from "../../redux/actions/expensesActions";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

const AppSider = (props) => {
  const [t, i18n] = useTranslation();

  function onCollapse(collapsed) {
    // this.setState({ collapsed });
  }

  const handleShow = () => {
    props.actions.toggleAddExpense(true);
  };

  return (
    <>
      <Sider
        collapsible
        //   collapsed={this.state.collapsed}
        onCollapse={onCollapse}
      >
        <AddExpense></AddExpense>
        <Link to="/">
          {" "}
          <div className="logo" />
        </Link>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PlusOutlined />} onClick={handleShow}>
            {t("menu_add_expense")}
          </Menu.Item>
          <Menu.Item key="2" icon={<HomeOutlined />}>
            <Link to="/">Strona głowna</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AreaChartOutlined />}>
            <Link to="/expenses">Wydatki</Link>
          </Menu.Item>
          <Menu.Item key="sub1" icon={<NumberOutlined />} title="Kategorie">
            <Link to="/categories">Kategorie</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toggleAddExpense: bindActionCreators(
        expenseAction.toggleAddExpense,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSider);
