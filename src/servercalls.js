import axios from "axios";

export const getTasks = async (taskDispatch) => {
  try {
    const {
      data: { allTasks },
    } = await axios.get("https://liaisonit.vishalsoni7.repl.co/tasks");
    taskDispatch({ type: "ALL_TASKS", payload: allTasks });
  } catch (error) {
    console.error({ message: "Error while fetching task data!", error });
  }
};

export const addTask = async (taskDispatch, taskData) => {
  try {
    const {
      data: { newTask },
    } = await axios.post(
      "https://liaisonit.vishalsoni7.repl.co/tasks",
      taskData
    );
    taskDispatch({ type: "ADD_TASK", payload: newTask });
    taskDispatch({ type: "MODAL", payload: false });
  } catch (error) {
    console.error({ message: "Error while adding task data!", error });
  }
};

export const updateTask = async (taskDispatch, taskId, taskData) => {
  try {
    const {
      data: { updatedTask },
    } = await axios.post(
      `https://liaisonit.vishalsoni7.repl.co/tasks/update/${taskId}`,
      taskData
    );
    taskDispatch({ type: "UPDATE_TASK_DETAILS", payload: updatedTask });
    taskDispatch({ type: "MODAL", payload: false });
  } catch (error) {
    console.error({ message: "Error while updating task!", error });
  }
};

export const markComplete = async (taskDispatch, taskId, completion) => {
  try {
    const {
      data: { completedTask },
    } = await axios.post(
      `https://liaisonit.vishalsoni7.repl.co/tasks/completion/${taskId}`,
      { completed: completion }
    );

    taskDispatch({ type: "MARK_AS_COMPLETED", payload: completedTask });
  } catch (error) {
    console.error({ message: "Error while completing task!", error });
  }
};

export const deleteTask = async (taskDispatch, taskId) => {
  try {
    const {
      data: { deletedTask },
    } = await axios.delete(
      `https://liaisonit.vishalsoni7.repl.co/tasks/${taskId}`
    );
    taskDispatch({ type: "DELETE_TASK", payload: deletedTask });
  } catch (error) {
    console.error({ message: "Error while deleting task!", error });
  }
};
