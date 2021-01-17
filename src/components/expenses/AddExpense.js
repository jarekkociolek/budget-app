import "antd/dist/antd.css";
import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";

const AddExpense = (props) => {
  const [t] = useTranslation();
  const [componentSize, setComponentSize] = useState();
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
        toast.success(t("added_expense"));
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
        title={t("new_expense")}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            //   loading={this.state.loading}
            onClick={handleOk}
            loading={saving}
            disabled={saving}
          >
            {t("add")}
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
          <Form.Item label={t("title")} name="name">
            <Input />
          </Form.Item>
          <Form.Item label={t("amount")} name="amount">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label={t("category")} name="category">
            <Select>
              <Select.Option value="food">
                {t("expense_category_food")}
              </Select.Option>
              <Select.Option value="apartment">
                {t("expense_category_apartment")}
              </Select.Option>
              <Select.Option value="debts">
                {t("expense_category_debts")}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={t("date")} name="date" format="DD.MM.RRRR">
            <DatePicker />
          </Form.Item>
        </Form>
        {error ? (
          <Alert
            message={t("title")}
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
