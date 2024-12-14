import type { FormProps } from "antd";
import {
  Button,
  notification,
  Form,
  Input,
  DatePicker,
  Select,
  Switch,
} from "antd";
import type { NotificationArgsProps } from "antd";
import { useState } from "react";
import { postTask } from "../api/service";

//@ts-ignore
type NotificationPlacement = NotificationArgsProps["placement"];

type FieldType = {
  tasktitle?: string;
  duedate?: string;
  status?: boolean;
  priority: string;
};

const TaskForm = ({
  handleModel,
  handleTask,
  tasks,
}: {
  handleModel: (bo: boolean) => void;
  handleTask: (data: any) => void;
  tasks: any[];
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    //@ts-ignore
    let date = new Date(values?.duedate?.$d);
    let formated = `${date.getDate()}/${
      date.getMonth() + 1
    }/ ${date.getFullYear()}`;

    const data = {
      tasktitle: values.tasktitle,
      priority: values.priority,
      duedate: formated,
      status: values.status,
    };

    try {
      setLoading(true);
      //@ts-ignore
      const res = await postTask(data);
      handleModel(false);
      setLoading(false);
      api.success({
        message: `Task created successfully`,
        placement: "top",
      });
      handleTask([...tasks, data]);
      form.resetFields();
    } catch (error) {
      api.error({
        message: `cannot create task`,
        placement: "top",
      });
      setLoading(false);
      handleModel(false);
      form.resetFields();
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        name="task"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          tasktitle: "",
          priority: "",
          status: false,
          duedate: null,
        }}
        onFinish={onFinish}
        onFinishFailed={() =>
          api.error({
            message: `Fill the form`,

            placement: "top",
          })
        }
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Task Title"
          name="tasktitle"
          rules={[
            { required: true, message: "Please enter title!" },
            { whitespace: true },
            { min: 5 },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter Task Title" />
        </Form.Item>
        <Form.Item
          label="Select"
          name="priority"
          rules={[{ required: true, message: "Please select value!" }]}
        >
          <Select>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Switch />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="duedate"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TaskForm;
