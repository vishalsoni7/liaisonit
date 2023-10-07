import axios from "axios";

// The base URL for API calls
const BASE_URL = "https://liaisonit.vishalsoni7.repl.co";

// Function to fetch all tasks from the server and dispatch them to the context
export const getTasks = async (taskDispatch) => {
  try {
    const {
      data: { allTasks },
    } = await axios.get(`${BASE_URL}/tasks`);

    // Dispatching fetched tasks to the context
    taskDispatch({ type: "ALL_TASKS", payload: allTasks });
  } catch (error) {
    // Errors handling during the API call
    console.error({ message: "Error while fetching task data!", error });
  }
};

// Function to add a new task to the server and update the context
export const addTask = async (taskDispatch, taskData) => {
  try {
    const {
      data: { newTask },
    } = await axios.post(`${BASE_URL}/tasks`, taskData);

    // Dispatching the new task to the context and closing the modal
    taskDispatch({ type: "ADD_TASK", payload: newTask });
    taskDispatch({ type: "MODAL", payload: false });
  } catch (error) {
    console.error({ message: "Error while adding task data!", error });
  }
};

// Function to update an existing task on the server and update the context
export const updateTask = async (taskDispatch, taskId, taskData) => {
  try {
    const {
      data: { updatedTask },
    } = await axios.post(`${BASE_URL}/tasks/update/${taskId}`, taskData);
    console.log(updatedTask);
    // Dispatching the updated task to the context and closing the modal
    taskDispatch({ type: "UPDATE_TASK_DETAILS", payload: updatedTask });
    taskDispatch({ type: "MODAL", payload: false });
  } catch (error) {
    console.error({ message: "Error while updating task!", error });
  }
};

// Function to mark a task as complete or incomplete on the server and update the context
export const markComplete = async (taskDispatch, taskId, completion) => {
  try {
    const {
      data: { completedTask },
    } = await axios.post(`${BASE_URL}/tasks/completion/${taskId}`, {
      completed: completion,
    });
    console.log(completedTask);
    // Dispatching the completed task to the context
    taskDispatch({ type: "MARK_AS_COMPLETED", payload: completedTask });
  } catch (error) {
    console.error({ message: "Error while completing task!", error });
  }
};

// Function to delete a task from the server and update the context
export const deleteTask = async (taskDispatch, taskId) => {
  try {
    const {
      data: { deletedTask },
    } = await axios.delete(`${BASE_URL}/tasks/${taskId}`);

    // Dispatching the deleted task to the context
    taskDispatch({ type: "DELETE_TASK", payload: deletedTask });
  } catch (error) {
    console.error({ message: "Error while deleting task!", error });
  }
};
