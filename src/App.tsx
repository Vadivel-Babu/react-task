import { useEffect, useState } from "react";
import { fetchAllTasks } from "./api/service";
import TaskList from "./components/TaskList";
import { Button, Modal } from "antd";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getTasks() {
    try {
      const task = await fetchAllTasks();
      setTasks(task);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-orange-700 text-center">
        Task
      </h1>
      <div className="flex w-full justify-center gap-2 mt-5">
        <p className="font-semibold text-slate-500">Add New Task:</p>
        <Button onClick={showModal} color="default" variant="solid">
          Add Task
        </Button>
      </div>
      <TaskList data={tasks} />
      <Modal
        title="Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            cancel
          </Button>,
        ]}
      >
        <TaskForm />
      </Modal>
    </>
  );
}

export default App;
