import { useEffect, useState } from "react";
import { deleteTask, fetchAllTasks } from "./api/service";
import TaskList from "./components/TaskList";
import { Button, Modal, notification, Spin } from "antd";
import TaskForm from "./components/TaskForm";
import { Task } from "./type";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  //fetching task from server
  async function getTasks() {
    try {
      setLoading(true);
      const task = await fetchAllTasks();
      setTasks(task);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //deleting task
  async function removeTask(id: string) {
    try {
      //setDeleteLoading(true);
      const task = await deleteTask(id);
      let newTask = tasks.filter((task: Task) => task.id !== id);
      console.log(task);

      api.success({
        message: `Task Deletes successfully`,
        placement: "top",
      });
      setDeleteLoading(false);
      setTasks(newTask);
    } catch (error) {
      api.error({
        message: `Task cannot be deleted`,
        placement: "top",
      });
      setDeleteLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="overflow-x-hidden">
      {contextHolder}
      <h1 className="text-xl md:text-3xl font-bold text-orange-700 text-center">
        Task
      </h1>
      <div className="flex w-full justify-center gap-2 mt-5">
        <p className="font-semibold text-slate-500">Add New Task:</p>
        <Button
          onClick={() => setIsModalOpen(true)}
          color="default"
          variant="solid"
        >
          Add Task
        </Button>
      </div>
      {loading ? (
        <div className="w-full flex justify-center gap-3 mt-10">
          <Spin size="large" />
          <p className="font-bold text-xl">Loading...</p>
        </div>
      ) : (
        <TaskList
          data={tasks}
          deleteLoading={deleteLoading}
          removeTask={removeTask}
        />
      )}

      <Modal
        title="Form"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            cancel
          </Button>,
        ]}
        className="overflow-x-hidden"
      >
        <TaskForm
          handleModel={setIsModalOpen}
          handleTask={setTasks}
          tasks={tasks}
        />
      </Modal>
    </div>
  );
}

export default App;
