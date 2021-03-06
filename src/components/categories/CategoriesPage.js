import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CategoriesTable from "./CategoriesTable";
import { Layout, Row, Divider, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import * as categoriesActions from "../../redux/actions/categoriesActions";
import { toast } from "react-toastify";

const { Content } = Layout;

const CategoriesPage = (props) => {
  const [t] = useTranslation();

  const deleteCategory = (categoryId) => {
    props.actions.deleteCategory(categoryId);
    toast.success(t("removed_category"));
  };

  const editCategory = (data) => {
    props.actions.editCategory(data);
    toast.success(t("edited_category"));
  };

  const addCategory = () => {
    props.actions.addCategory({
      id: (props.categories.length + 1).toString(),
      name: t("new_category_placeholder"),
    });
    toast.success(t("added_category"));
  };

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
          <CategoriesTable
            categories={props.categories}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            addCategory={addCategory}
          ></CategoriesTable>
        </div>
      </Content>
    </>
  );
};

CategoriesPage.propTypes = {
  categories: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoriesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
