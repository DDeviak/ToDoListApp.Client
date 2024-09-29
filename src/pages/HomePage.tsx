import { Button, Form, Input, List, Modal } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { TodoListCreate } from "../models/todolist.model";
import agent from "../api/agent";
import { observer } from "mobx-react-lite";

const HomePage: React.FC = () => {
  const store = useStore();
  const { todolistStore, userStore } = store;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    todolistStore.loadTodoLists(userStore.user!.id);
  }, [userStore, todolistStore, navigate]);
  return (
    <>
      <List
        header={<Title level={2}>Tasklists</Title>}
        footer={
          <Button
            type="dashed"
            size="large"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Add Tasklist
          </Button>
        }
        dataSource={todolistStore.todoListsArray}
        renderItem={(item) => (
          <List.Item>
            <Link to={`tasklist/${item.id}`}>
              <Title level={3}>{item.title}</Title>
            </Link>
          </List.Item>
        )}
      />
      <Modal
        centered
        destroyOnClose
        title={"Add To-Do list"}
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        modalRender={(modal) => (
          <Form
            form={form}
            onFinish={(values: TodoListCreate) => {
              agent.TodoLists.create({
                ...values,
                userId: userStore.user!.id,
              })
                .then(todolistStore.setTodoList)
                .then(() => {
                  setIsModalVisible(false);
                });
            }}
            onFinishFailed={(errorInfo) => {
              setIsModalVisible(false);
              console.log("Failed:", errorInfo);
            }}
          >
            {modal}
          </Form>
        )}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default observer(HomePage);
