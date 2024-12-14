import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";

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
  deleteLoading,
}: {
  data: DataType[];
  removeTask: (id: string) => void;
  deleteLoading: boolean;
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
      width: 150,
      render: (_, key) => (
        <div className="space-x-1">
          <Button onClick={() => console.log(key)}>Edit</Button>
          <Button
            loading={deleteLoading}
            onClick={() => removeTask(key.id)}
            danger
          >
            delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="container-lg mx-auto max-w-[700px] mt-10">
      <Table<DataType>
        rowKey="id"
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TaskList;
