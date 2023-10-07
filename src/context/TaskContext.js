import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, taskReducer } from "../reducer/taskReducer";
import { getTasks } from "../servercalls";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Initialize the state and dispatch function using useReducer
  const [taskState, taskDispatch] = useReducer(taskReducer, initialState);

  // State to keep track of the currently selected task ID
  const [taskId, setTaskId] = useState(null);

  // Fetch tasks from the server on component mount
  useEffect(() => {
    getTasks(taskDispatch);
  }, []);

  // Combine all context values into a single object
  const values = { taskState, taskDispatch, taskId, setTaskId };

  // Provide the context values to the children components
  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};
