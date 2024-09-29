import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { UserRegister } from "../models/user.model";
import agent from "../api/agent";
import { useStore } from "../store/store";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";

const onFinishFailed: FormProps<UserRegister>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { userStore } = store;

  const onFinish: FormProps<UserRegister>["onFinish"] = (values) => {
    agent.User.register(values)
      .then(userStore.setFromAuthResponse)
      .then(() => navigate("/"));
  };

  return (
    <>
      <Title level={2}>Register</Title>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<UserRegister>
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UserRegister>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserRegister>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Link href="/login">Already have an account? Log in</Link>
    </>
  );
};

export default RegistrationPage;
