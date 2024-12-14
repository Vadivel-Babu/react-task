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

type NotificationPlacement = NotificationArgsProps["placement"];

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const TaskForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Task added succefully`,

      placement,
    });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    openNotification("top");
  };
  return (
    <>
      {contextHolder}
      <Form
        name="task"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Task Title"
          //@ts-ignore
          name={"tasktitle"}
          rules={[{ required: true, message: "Please enter title!" }]}
        >
          <Input placeholder="Enter Task Title" />
        </Form.Item>
        <Form.Item
          label="Select"
          name={"priority"}
          rules={[{ required: true, message: "Please select value!" }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" valuePropName="checked">
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TaskForm;
