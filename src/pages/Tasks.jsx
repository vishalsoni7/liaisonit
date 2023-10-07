import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";
import { Modal } from "./Modal";

export const AllTasks = () => {
  // Destructuring values from the TaskContext
  const {
    taskId,
    setTaskId,
    taskState: { allTask, modal },
    taskDispatch,
  } = useContext(TaskContext);

  // Handler to open the modal for adding a new task
  const addHandle = () => {
    taskDispatch({ type: "MODAL", payload: true });
  };

  // Handler to close the modal
  const closeModal = () => {
    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };

  return (
    <div className="all-task-div">
      {/* Header section */}
      <div className="all-task-header">
        <h1> LiaisonIT Task Management</h1>
        <div>
          {/* Button to trigger the addHandle function */}
          <button onClick={addHandle} className="button-add">
            Add Task
          </button>
        </div>
      </div>

      {/* Modal section */}
      {modal && (
        <div onClick={closeModal} className="modal_outer_div">
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal_outer_container"
          >
            {/* Render the Modal component with the current task ID */}
            <Modal _id={taskId} />
          </div>
        </div>
      )}

      {/* Task cards section */}
      <div className="card-parent">
        {allTask?.map((task) => (
          <div className="card-div" key={task?._id}>
            {/* Render TaskCard component for each task */}
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
