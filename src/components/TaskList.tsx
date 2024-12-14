import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { Task } from "../type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  id: string;
  tasktitle: string;
  priority: string;
  duedate: string;
  status: boolean;
}

const TaskList = ({
  data,
  removeTask,
  handleEditModal,
  handleTask,
}: {
  data: DataType[];
  removeTask: (id: string) => void;

  handleEditModal: (e: boolean) => void;
  handleTask: (data: Task) => void;
}) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Task Title",
      dataIndex: "tasktitle",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (_, tags: any) => (
        <>
          <Tag
            color={
              tags.priority === "high"
                ? "red"
                : tags.priority === "low"
                ? "green"
                : "yellow"
            }
          >
            {tags.priority}
          </Tag>
        </>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, tags: any) => (
        <>
          <Tag color={!tags.status ? "red" : "green"}>
            {tags.status ? "Completed" : "In Complete"}
          </Tag>
        </>
      ),
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, d) => (
        <div className="space-x-1">
          <Button
            onClick={() => {
              handleTask(d);
              handleEditModal(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              removeTask(d.id);
            }}
            danger
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const dataSource = data.map((item) => ({
    ...item,
    key: item.id, // Use 'id' as the unique key
  }));
  return (
    <div className="container-lg mx-auto max-w-[700px] mt-10 px-2">
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        size="middle"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TaskList;
