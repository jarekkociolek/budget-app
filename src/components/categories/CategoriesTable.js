import * as React from "react";
import PropTypes from "prop-types";
import { Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const CategoriesTable = (props) => {
  const [t] = useTranslation();

  const deleteColumn = (text, record) => (
    <Space size="small">
      <span onClick={() => {}}>
        <DeleteOutlined className="Outlined"></DeleteOutlined>
      </span>
    </Space>
  );
  const editColumn = (text, record) => (
    <Space size="small">
      <span onClick={() => {}}>
        <EditOutlined></EditOutlined>
      </span>
    </Space>
  );

  const columns = [
    {
      title: t("title"),
      dataIndex: "name",
      key: "name",
      width: "90%",
      editable: true,
    },
    {
      key: "action",
      render: editColumn,
      align: "center",
    },
    {
      key: "action",
      render: deleteColumn,
      align: "center",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.categories}
        rowKey="id"
        size="small"
        bordered
      />
    </>
  );
};

CategoriesTable.propTypes = {
  categories: PropTypes.array,
};

export default CategoriesTable;
