import { DatePicker, Form, Input, Modal } from "antd";
import { TodoListItemCreate } from "../models/todolistitem.model";
import { useEffect } from "react";
import dayjs from "dayjs";

interface TaskInputModalProps {
  title: string;
  open: boolean;
  defaultValues?: TodoListItemCreate | null;
  onClose: () => void;
  onFinish: (values: TodoListItemCreate) => void;
}
function TaskInputModal({
  title,
  open,
  defaultValues,
  onClose,
  onFinish,
}: Readonly<TaskInputModalProps>) {
  const [form] = Form.useForm<TodoListItemCreate>();
  useEffect(() => {
    if (!!defaultValues) {
      form.setFieldsValue(defaultValues);
    } else {
      form.resetFields();
    }
  }, [defaultValues, open]);
  return (
    <Modal
      centered
      destroyOnClose
      title={title}
      open={open}
      onClose={onClose}
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      okText="Save"
      cancelButtonProps={{ htmlType: "reset" }}
      cancelText="Cancel"
      onCancel={onClose}
      modalRender={(modal) => (
        <Form form={form} onFinish={onFinish}>
          {modal}
        </Form>
      )}
    >
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Deadline"
        name="deadline"
        getValueProps={(value) => ({
          value: dayjs(value),
        })}
      >
        <DatePicker allowClear={false}/>
      </Form.Item>
    </Modal>
  );
}

export default TaskInputModal;
