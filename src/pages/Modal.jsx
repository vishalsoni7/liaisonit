import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { addTask, updateTask } from "../servercalls";

export const Modal = ({ _id }) => {
  // Destructuring values from the TaskContext
  const {
    setTaskId,
    taskState: { allTask },
    taskDispatch,
  } = useContext(TaskContext);

  // Find the task with the provided _id from allTask array
  const findTask = allTask.find((task) => task._id === _id);

  // State to manage the input values for title and description
  const [input, setInput] = useState({
    title: findTask?.title || "",
    description: findTask?.description || "",
  });

  // Handle input changes for title and description
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle form submission for adding or updating a task
  const handleSubmit = (e) => {
    e.preventDefault();

    // If _id is present, update the task; otherwise, add a new task
    if (_id) {
      updateTask(taskDispatch, _id, input, false);
    } else {
      addTask(taskDispatch, input, false);
    }

    // Reset task ID, close the modal, and reset input values
    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };

  // Handle modal closure without submitting the form
  const handleModal = () => {
    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };

  return (
    <div className="modal-div">
      <p>LiaisonIT</p>
      <h2>{_id ? "Update Task" : "New Task"}</h2>

      {/* Input field for the title */}
      <input
        name="title"
        placeholder="Title"
        onChange={handleInput}
        value={input.title}
      />

      {/* Textarea for the description */}
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleInput}
        value={input.description}
      ></textarea>

      {/* Buttons for submitting and canceling the modal */}
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
