import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, taskReducer } from "../reducer/taskReducer";
import { getTasks } from "../servercalls";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, initialState);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    getTasks(taskDispatch);
  }, []);

  const values = { taskState, taskDispatch, taskId, setTaskId };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};
