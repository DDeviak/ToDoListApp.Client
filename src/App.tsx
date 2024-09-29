import React, { useEffect } from "react";
import { Layout, Card, Button, Space } from "antd";
import Title from "antd/es/typography/Title";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "./store/store";
import { observer } from "mobx-react-lite";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  useEffect(() => {
    if (
      !store.userStore.isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  });
  return (
    <Layout>
      <Layout.Header
        style={{
          padding: "1rem",
          height: "5rem",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Link to={"/"}>
          <Title style={{ color: "white" }} level={1}>
            To-Do List App
          </Title>
        </Link>
        {store.userStore.user && (
          <Space>
            <Title style={{ color: "white" }} level={5}>
              {`Welcome, ${store.userStore.user.userName}`}
            </Title>
            <Button
              ghost
              onClick={() => {
                store.userStore.logout();
                navigate("/login");
              }}
            >
              Log out
            </Button>
          </Space>
        )}
      </Layout.Header>
      <Layout.Content style={{ padding: "3rem", minHeight: "92vh" }}>
        <Card bordered={true}>
          <Outlet />
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default observer(App);
