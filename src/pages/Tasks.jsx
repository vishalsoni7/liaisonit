import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";
import { Modal } from "./Modal";

export const AllTasks = () => {
  const {
    taskId,
    setTaskId,
    user,
    taskState: { allTask, modal },
    taskDispatch,
  } = useContext(TaskContext);

  const addHandle = () => {
    taskDispatch({ type: "MODAL", payload: true });
  };

  const closeModal = () => {
    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };

  return (
    <div className="all-task-div">
      <div className="all-task-header">
        <h1> LiaisonIT Task Management</h1>
        <div>
          <button onClick={addHandle} className="button-add">
            Add Task
          </button>
        </div>
      </div>

      {modal && (
        <div onClick={closeModal} className="modal_outer_div">
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal_outer_container"
          >
            <Modal _id={taskId} />
          </div>
        </div>
      )}

      <div className="card-parent">
        {allTask?.map((task) => (
          <div className="card-div" key={task?._id}>
            <TaskCard
              _id={task?._id}
              title={task?.title}
              description={task?.description}
              completed={task?.completed}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
