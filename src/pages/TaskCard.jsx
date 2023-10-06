import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { deleteTask, markComplete } from "../servercalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const TaskCard = ({ _id, title, description, completed }) => {
  const { taskDispatch, setTaskId } = useContext(TaskContext);

  const deleteTaskHandler = () => {
    deleteTask(taskDispatch, _id);
  };

  const editTaskHandler = (e) => {
    e.preventDefault();
    setTaskId(_id);
    taskDispatch({ type: "MODAL", payload: true });
  };

  const toggleCheckBox = () => {
    markComplete(taskDispatch, _id, !completed);
  };

  return (
    <div className={completed ? "card-completed" : "card"}>
      <div className="icons">
        <div className="fontAwsome-div">
          <input
            type="checkbox"
            onChange={toggleCheckBox}
            checked={completed}
          />

          <b> {title} </b>
        </div>

        <div className="fontAwsome-div">
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            className="fontAwsome-trash"
            onClick={deleteTaskHandler}
          />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="fontAwsome-edit"
            onClick={editTaskHandler}
          />
        </div>
      </div>
      <span> {description} </span>
    </div>
  );
};
