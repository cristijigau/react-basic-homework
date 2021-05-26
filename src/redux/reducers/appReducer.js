const initialState = {
  todos: [],
  todo: {
    id: undefined,
    value: '',
  },
  filteredTodos: [],
  action: 'add',
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODOS':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload?.id,
            value: action.payload?.value,
            completed: action.payload?.completed,
          },
        ],
      };
    case 'EDIT_TODOS':
      return {
        ...state,
        todos: state.todos.map(item => {
          return item.id === action.payload.id
            ? {
                ...item,
                value: action.payload.value,
              }
            : item;
        }),
      };
    case 'DELETE_TODOS':
      return {
        ...state,
        todos: state.todos.filter(({ id: item }) => item !== action.payload.id),
      };
    case 'SET_ACTION':
      return {
        ...state,
        action: action.payload.action,
      };
    case 'SET_COMPLETE':
      return {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };
    case 'SET_TODO':
      return {
        ...state,
        todo: {
          ...state.todo,
          ...action.payload,
        },
      };
    case 'SET_FILTERED_TODOS':
      return {
        ...state,
        filteredTodos: action.payload.filteredTodos,
      };
    default:
      return state;
  }
};
