import { useContext } from "react";
import { TaskContext } from "./context/TaskContext";

export const Utils = () => {
  const { taskDispatch, setTaskId } = useContext(TaskContext);
  return <>   const addHandle = () => {
    taskDispatch({ type: "MODAL", payload: true });
  };

  const closeModal = () => {
    setTaskId(null);
    taskDispatch({ type: "MODAL", payload: false });
  };</>;
};
