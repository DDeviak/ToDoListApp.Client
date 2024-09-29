import { Button, Collapse, Empty, Modal, Select, Space, Spin } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import TodoListItem from "../models/todolistitem.model";
import TaskInputModal from "../components/TaskInputModal";
import agent from "../api/agent";

const colorMap = new Map<string, any>([
  ["ToDo", "#ffcccc"],
  ["InProgress", "#ffffcc"],
  ["Done", "#ccffcc"],
]);

const TasklistPage: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<TodoListItem | null>(null);
  const [currentModal, setCurrentModal] = useState<"Create" | "Edit" | null>(
    null
  );
  const store = useStore();
  const { todolistitemStore, todolistStore } = store;
  const { todolistId } = useParams();

  useEffect(() => {
    todolistitemStore.loadTodoListItems(todolistId!);
  }, [todolistitemStore, todolistId]);

  return (
    <>
      <Title level={3}>{todolistStore.getTodoList(todolistId!)?.title}</Title>
      {todolistitemStore.getTodoListItemsByList(todolistId!).length === 0 && (
        <Empty style={{ padding: "1rem" }} description="No tasks found" />
      )}
      <Spin tip="Loading..." spinning={todolistitemStore.isLoading}>
        <Collapse ghost accordion size="large" bordered={true}>
          {todolistitemStore.todoListItemsArray
            .filter((t) => t.todolistId === todolistId)
            .map((item) => (
              <Collapse.Panel
                header={
                  <Title
                    level={5}
                    style={{ background: colorMap.get(item.status) }}
                  >
                    {item.title}
                  </Title>
                }
                key={item.id}
              >
                <Paragraph>{item.description}</Paragraph>
                <Paragraph>
                  <strong>
                    Deadline: {new Date(item.deadline).toDateString()}
                  </strong>
                </Paragraph>
                <Select
                  style={{
                    display: "block",
                    width: "10rem",
                    marginBottom: "1rem",
                  }}
                  value={item.status}
                  onChange={(value) => {
                    todolistitemStore.setTodoListItemStatus(item.id, value);
                  }}
                >
                  <Select.Option value="ToDo">To-Do</Select.Option>
                  <Select.Option value="InProgress">In Progress</Select.Option>
                  <Select.Option value="Done">Done</Select.Option>
                </Select>
                <Space>
                  <Button
                    type="dashed"
                    onClick={() => {
                      setCurrentItem(item);
                      setCurrentModal("Edit");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      Modal.confirm({
                        title: "Are you sure?",
                        content: "This action cannot be undone.",
                        onOk: () =>
                          todolistitemStore.removeTodoListItem(item.id),
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              </Collapse.Panel>
            ))}
        </Collapse>
      </Spin>
      <Button
        type="dashed"
        size="large"
        onClick={() => {
          setCurrentModal("Create");
        }}
      >
        Add Task
      </Button>
      <TaskInputModal
        title={currentModal!}
        open={!!currentModal}
        defaultValues={currentItem}
        onClose={() => setCurrentModal(null)}
        onFinish={async (values) => {
          let item: TodoListItem;
          if (currentModal === "Create") {
            item = await agent.TodoListItems.create({
              ...values,
              todolistId: todolistId!,
            });
            console.log(item);
          } else if (currentModal === "Edit") {
            item = await agent.TodoListItems.replace({
              ...currentItem!,
              ...values,
            });
          }
          todolistitemStore.setTodoListItem({
            ...item!,
            deadline: new Date(item!.deadline),
          });
          setCurrentModal(null);
        }}
      />
    </>
  );
};

export default observer(TasklistPage);
