// initial state for reducer
export const initialState = {
  allTask: [], // Array to store all tasks
  modal: false, // Boolean to track the modal state
};

// reducer cases
export const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Update all tasks in the state with the provided payload
    case "ALL_TASKS":
      return {
        ...state,
        allTask: payload,
        error: null, // Reset error to null
      };

    // Add a new task to the list of all tasks in the state
    case "ADD_TASK":
      return {
        ...state,
        allTask: [...state.allTask, payload],
      };

    // Remove a task from the list of all tasks in the state
    case "DELETE_TASK":
      return {
        ...state,
        allTask: state.allTask.filter(({ _id }) => _id !== payload._id),
      };

    // Update details (title and description) of a specific task
    case "UPDATE_TASK_DETAILS":
      return {
        ...state,
        allTask: state.allTask.map((task) =>
          task._id === payload._id
            ? {
                ...task,
                title: payload.title,
                description: payload.description,
              }
            : task
        ),
      };

    // Mark a specific task as completed or not completed
    case "MARK_AS_COMPLETED":
      return {
        ...state,
        allTask: state.allTask.map((task) =>
          task._id === payload._id
            ? { ...task, completed: payload.completed }
            : task
        ),
      };

    // Update the modal state in the reducer
    case "MODAL":
      return {
        ...state,
        modal: payload,
      };

    // Default case: return the current state if the action type is not recognized
    default:
      return state;
  }
};
