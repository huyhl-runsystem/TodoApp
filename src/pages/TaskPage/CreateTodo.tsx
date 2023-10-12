import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { createTodoAsync } from "../../store/TodoReducer";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import FormControl from "../../components/Common/FormControl";

const CreateTodoForm: React.FC = () => {
    const [form] = Form.useForm();
    const [showForm, setShowForm] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
  
    const { access_token  } = useSelector(
        (state: RootState) => state.login.data  );

    const { _id } = useSelector(
        (state: RootState) => state.login.data.user );

    const onFinish = (values: any) => {
      const { title, desc, status } = values;
      dispatch(createTodoAsync({ accessToken: access_token, id_user : _id, title, desc, status }));
      setShowForm(false);
    };
  
    if (!showForm) {
      return null;
    }
  
    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          title: "",
          desc: "",
          status: 1, // Set the default status if needed
        }}
      >
        <FormControl name="title">
          <Input />
        </FormControl>
        <FormControl name="desc">
          <Input.TextArea />
        </FormControl>
  
        <FormControl name="status">
          <select>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </FormControl>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
            Submit
          </Button>
  
          {/* You might want to add a button to cancel or hide the form */}
          <Button
            htmlType="button"
            onClick={() => {
              setShowForm(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default CreateTodoForm;