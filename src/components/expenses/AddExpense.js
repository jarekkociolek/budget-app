import "antd/dist/antd.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../../index.css";
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Modal,
  Button,
  Input,
  Alert,
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as expenseActions from "../../redux/actions/expensesActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AddExpense = (props) => {
  const [componentSize, setComponentSize] = useState();
  const [redirect, setRedirect] = useState(false);
  const [expense, setExpense] = useState({ ...props.expense });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formIsValid = () => {
    return true;
  };

  const handleOk = async () => {
    if (!formIsValid()) {
      return;
    }

    if (!saving) {
      setError(false);
      form.validateFields();
      setSaving(true);
      try {
        await props.actions.saveExpense({
          name: form.getFieldValue("name"),
          amount: form.getFieldValue("amount"),
          date: form.getFieldValue("date"),
          tags: [form.getFieldValue("category")],
        });
        setSaving(false);
        props.actions.toggleAddExpense(false);
        form.resetFields();
        toast.success("Dodano wydatek");
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        setSaving(false);
      }
    }
  };
  const handleCancel = () => {
    props.actions.toggleAddExpense(false);
  };

  return (
    <>
      <Modal
        visible={props.addExpenseVisible}
        title="Nowy wydatek"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Anuluj
          </Button>,
          <Button
            key="submit"
            type="primary"
            //   loading={this.state.loading}
            onClick={handleOk}
            loading={saving}
            disabled={saving}
          >
            Dodaj
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
            date: moment(),
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          form={form}
        >
          <Form.Item label="Tytuł" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Kwota" name="amount">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Kategoria" name="category">
            <Select>
              <Select.Option value="food">Jedzenie</Select.Option>
              <Select.Option value="apartment">Mieszkanie</Select.Option>
              <Select.Option value="demo">Spłata długów</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Data" name="date" format="DD.MM.RRRR">
            <DatePicker />
          </Form.Item>
        </Form>
        {error ? (
          <Alert
            message="Wystąpił błąd"
            description={errorMessage}
            type="error"
            showIcon
          />
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

AddExpense.propTypes = {
  addExpenseVisible: PropTypes.bool,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    addExpenseVisible: state.expenses.addExpenseVisible,
    expenses: state.expenses.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(expenseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
