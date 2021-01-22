import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CategoriesTable from "./CategoriesTable";
import { Layout, Row, Divider, Spin } from "antd";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const CategoriesPage = (props) => {
  const [t] = useTranslation();

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Row justify="center">
            <Divider>{t("categories_list")}</Divider>
            <Spin size="large" spinning={props.loading}></Spin>
          </Row>
          <CategoriesTable categories={props.categories}></CategoriesTable>
        </div>
      </Content>
    </>
  );
};

CategoriesPage.propTypes = {
  categories: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(CategoriesPage);
