import * as React from "react";
import PropTypes from "prop-types";
import { Table, Space } from "antd";
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

  const handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

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
        handleSave: handleSave,
      }),
    };
  });

  return (
    <>
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
};

export default CategoriesTable;
