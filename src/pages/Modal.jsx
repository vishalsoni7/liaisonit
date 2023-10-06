import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { addTask, updateTask } from "../servercalls";

export const Modal = ({ _id }) => {
  const {
    setTaskId,
    taskState: { allTask },
    taskDispatch,
  } = useContext(TaskContext);

  const findTask = allTask.find((task) => task._id === _id);

  const [input, setInput] = useState({
    title: findTask?.title || "",
    description: findTask?.description || "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (_id) {
      updateTask(taskDispatch, _id, input, false);
    } else {
      addTask(taskDispatch, input, false);
    }

    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };

  const handleModal = () => {
    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };

  return (
    <div className="modal-div">
      <p>LiaisonIT</p>
      <h2>{_id ? "Update Task" : "New Task"}</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleInput}
        value={input.title}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleInput}
        value={input.description}
      ></textarea>

      <div className="modal-btn-div">
        <button onClick={handleSubmit} className="button-add">
          {_id ? " Update" : "Add"}
        </button>

        <button onClick={handleModal} className="button-cancle">
          Cancel
        </button>
      </div>
    </div>
  );
};
