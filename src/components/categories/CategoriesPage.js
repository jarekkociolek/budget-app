import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapCategories = (categories) =>
  categories.map((category) => <li key={category.id}>{category.name}</li>);

const CategoriesPage = (props) => {
  return <>{mapCategories(props.categories)}</>;
};

CategoriesPage.propTypes = {
  categories: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
  };
}

export default connect(mapStateToProps)(CategoriesPage);
