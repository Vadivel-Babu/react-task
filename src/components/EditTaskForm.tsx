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
import { useEffect, useState } from "react";
import { Task } from "../type";
import { updateTask } from "../api/service";
import moment from "moment";

//@ts-ignore
type NotificationPlacement = NotificationArgsProps["placement"];

type FieldType = {
  newTasktitle?: string;
  newDuedate?: string;
  newStatus?: boolean;
  newPriority: string;
};

const EditTaskForm = ({
  handleModel,
  handleTask,
  editTask,
  tasks,
}: {
  handleModel: (e: boolean) => void;
  handleTask: (data: any) => void;
  tasks: any[];
  editTask: Task;
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  //formatting date to set value in datepicker field
  const formattedDate = moment(editTask?.duedate, "DD/MM/YYYY");

  //submitting updated value
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    //@ts-ignore
    let date = new Date(values?.newDuedate?.$d);
    let formated = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const data = {
      id: editTask.id,
      tasktitle: values.newTasktitle,
      priority: values.newPriority,
      duedate: formated,
      status: values.newStatus,
    };

    try {
      setLoading(true);
      //@ts-ignore
      const res = await updateTask(data);
      handleModel(false);
      setLoading(false);
      api.success({
        message: `Task Updated successfully`,
        placement: "top",
      });
      const newTasks = tasks.map((task) => {
        if (task.id === editTask.id) {
          task = data;
        }
        return task;
      });
      handleTask(newTasks);
      form.resetFields();
    } catch (error) {
      api.error({
        message: `cannot update task`,
        placement: "top",
      });
      setLoading(false);
      handleModel(false);
      form.resetFields();
    }
  };

  //setting data for input to edit
  useEffect(() => {
    form.setFieldsValue({
      newTasktitle: editTask?.tasktitle,
      newPriority: editTask?.priority,
      newStatus: editTask?.status,
      newDuedate: formattedDate,
    });
  }, [editTask]);
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
          newTasktitle: editTask?.tasktitle,
          newPriority: editTask?.priority,
          newStatus: editTask?.status,
          newDuedate: formattedDate,
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
          name="newTasktitle"
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
          name="newPriority"
          rules={[{ required: true, message: "Please select value!" }]}
        >
          <Select>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="newStatus">
          <Switch />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="newDuedate"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" loading={loading} htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditTaskForm;
