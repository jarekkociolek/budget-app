import "antd/dist/antd.css";
import "../.././index.css";
import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  AreaChartOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import * as React from "react";
import { Link } from "react-router-dom";
import AddExpense from "../expenses/AddExpense";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as expenseAction from "../../redux/actions/expensesActions";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const { Sider } = Layout;
const { SubMenu } = Menu;

const AppSider = (props) => {
  const [t] = useTranslation();

  const handleShow = () => {
    props.actions.toggleAddExpense(true);
  };

  return (
    <>
      <Sider collapsible>
        <AddExpense></AddExpense>
        <Menu theme="dark" mode="inline">
          <SubMenu
            key="sub"
            title={t("menu_expenses")}
            icon={<AreaChartOutlined />}
          >
            <Menu.Item key="1" icon={<PlusOutlined />} onClick={handleShow}>
              {t("menu_add_expense")}
            </Menu.Item>
            <Menu.Item key="2" icon={<AreaChartOutlined />}>
              <Link to="/expenses">{t("menu_expenses")}</Link>
            </Menu.Item>{" "}
          </SubMenu>
          <Menu.Item key="sub1" icon={<NumberOutlined />} title="Kategorie">
            <Link to="/categories">{t("menu_categories")}</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

AppSider.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps() {
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
