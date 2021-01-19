import * as React from "react";
import { Spin } from "antd";

const PageLoader = () => (
  <div className="page-loader-container">
    <Spin size="large" className="page-loader"></Spin>
  </div>
);

export default PageLoader;
