import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { deleteTask, markComplete } from "../servercalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const TaskCard = ({ _id, title, description, completed }) => {
  // Accessing the taskDispatch and setTaskId from the TaskContext
  const { taskDispatch, setTaskId } = useContext(TaskContext);

  // Handler for deleting a task
  const deleteTaskHandler = () => {
    // Calling the deleteTask function from servercalls module
    deleteTask(taskDispatch, _id);
  };

  // Handler for editing a task
  const editTaskHandler = (e) => {
    e.preventDefault();
    // Setting the current task ID and opening the modal for editing
    setTaskId(_id);
    taskDispatch({ type: "MODAL", payload: true });
  };

  // Handler for toggling the completion status of a task
  const toggleCheckBox = () => {
    // Calling the markComplete function from servercalls module
    markComplete(taskDispatch, _id, !completed);
  };

  return (
    <div className={completed ? "card-completed" : "card"}>
      <div className="icons">
        <div className="fontAwsome-div">
          {/* Checkbox for marking the task as completed */}
          <input
            type="checkbox"
            onChange={toggleCheckBox}
            checked={completed}
          />
          {/* Displaying the task title */}
          <b> {title} </b>
        </div>

        <div className="fontAwsome-div">
          {/* Icon for deleting a task */}
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            className="fontAwsome-trash"
            onClick={deleteTaskHandler}
          />
          {/* Icon for editing a task */}
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="fontAwsome-edit"
            onClick={editTaskHandler}
          />
        </div>
      </div>
      {/* Displaying the task description */}
      <span> {description} </span>
    </div>
  );
};
