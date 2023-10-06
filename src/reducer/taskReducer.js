export const initialState = {
  allTask: [],
  modal: false,
};

export const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_TASKS":
      return {
        ...state,
        allTask: payload,
        error: null,
      };

    case "ADD_TASK":
      return {
        ...state,
        allTask: [...state.allTask, payload],
      };

    case "DELETE_TASK":
      return {
        ...state,
        allTask: state.allTask.filter(({ _id }) => _id !== payload._id),
      };

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

    case "MARK_AS_COMPLETED":
      return {
        ...state,
        allTask: state.allTask.map((task) =>
          task._id === payload._id
            ? { ...task, completed: payload.completed }
            : task
        ),
      };

    case "MODAL":
      return {
        ...state,
        modal: payload,
      };

    default:
      return state;
  }
};
