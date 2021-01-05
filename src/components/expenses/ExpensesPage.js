import React, { useEffect } from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Progress,
  Statistic,
  Row,
  Col,
  Divider,
  Table,
  Tag,
  Space,
  Spin,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as expenseActions from "../../redux/actions/expensesActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const { Content } = Layout;

const ExpensesPage = (props) => {
  const { actions, expenses } = props;
  const moneySpent = expenses
    .map((expense) => expense.amount)
    .reduce((a, b) => a + b, 0);
  const income = 5000;
  const moneyLeft = income - moneySpent;
  const totalMoney = moneySpent + moneyLeft;

  useEffect(() => {
    if (expenses.length === 0) {
      actions.loadExpenses();
    }
  }, []);
  const editExpense = (expense) => {
    console.log(expense);
    props.actions.toggleAddExpense(true);
  };
  const deleteExpense = (expense) => {
    props.actions.deleteExpense(expense.id);
    toast.success("Usunięto wydatek");
  };
  const deleteColumn = (text, record) => (
    <Space size="middle">
      <span onClick={() => deleteExpense(record)}>
        <DeleteOutlined className="Outlined"></DeleteOutlined>
      </span>
    </Space>
  );
  const editColumn = (text, record) => (
    <Space size="middle">
      <span onClick={() => editExpense(record)}>
        <EditOutlined></EditOutlined>
      </span>
    </Space>
  );

  const tags = (tags) => (
    <>
      {tags.map((tag) => {
        let color = tag.length > 6 ? "geekblue" : "green";
        if (tag === "mieszkanie") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      })}
    </>
  );
  const columns = [
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Kwota",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kategoria",
      key: "tags",
      dataIndex: "tags",
      render: tags,
    },
    {
      key: "action",
      render: editColumn,
    },
    {
      key: "action",
      render: deleteColumn,
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Progress
            strokeLinecap="square"
            percent={Math.round((moneySpent * 100) / totalMoney)}
          />
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="Dochód:" value={income} precision={2} />
            </Col>
            <Col span={8}>
              <Statistic title="Wydano:" value={moneySpent} precision={2} />
            </Col>
            <Col span={8}>
              <Statistic
                title="Pozostało do wydania:"
                value={moneyLeft}
                precision={2}
              />
            </Col>
          </Row>
          <Divider>Lista wydatków</Divider>
          <Spin size="large" spinning={props.loading}></Spin>
          <Table columns={columns} dataSource={expenses} rowKey="id" />
        </div>
      </Content>
    </>
  );
};

ExpensesPage.propTypes = {
  expenses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.items, // (1)
    loading: state.apiCallsInProgress > 0,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(expenseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPage);
