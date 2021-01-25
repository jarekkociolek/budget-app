import * as React from "react";
import PropTypes from "prop-types";
import { Table, Space, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { EditableRow, EditableCell } from "../common/EditableRow";

const CategoriesTable = (props) => {
  const [t] = useTranslation();

  const deleteColumn = (text, record) => (
    <Space size="small">
      <span
        onClick={() => {
          props.deleteCategory(record.id);
        }}
      >
        <DeleteOutlined className="Outlined"></DeleteOutlined>
      </span>
    </Space>
  );

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
      render: deleteColumn,
      align: "center",
    },
  ];

  const editableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: props.editCategory,
      }),
    };
  });

  return (
    <>
      <Button
        onClick={props.addCategory}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        {t("add_category")}
      </Button>
      <Table
        columns={editableColumns}
        dataSource={props.categories}
        rowKey="id"
        size="small"
        bordered
        components={components}
        rowClassName={() => "editable-row"}
      />
    </>
  );
};

CategoriesTable.propTypes = {
  categories: PropTypes.array,
  deleteCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoriesTable;
