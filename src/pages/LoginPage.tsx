import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { UserLogin } from "../models/user.model";
import { useStore } from "../store/store";
import agent from "../api/agent";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";

const onFinishFailed: FormProps<UserLogin>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { userStore } = store;

  const onFinish: FormProps<UserLogin>["onFinish"] = (values) => {
    agent.User.login(values)
      .then(userStore.setFromAuthResponse)
      .then(() => navigate("/"));
  };

  return (
    <>
      <Title level={2}>Log in</Title>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<UserLogin>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserLogin>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
      <Link href="/register">Don`t have an account yet? Register</Link>
    </>
  );
};

export default LoginPage;
