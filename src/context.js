import React, { createContext, useReducer } from 'react';

const initialState = {
  todos: [],
  action: 'add',
};

export const TODO_CONTEXT = createContext(initialState);

const { Provider } = TODO_CONTEXT;

const reducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TODOS':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: payload?.id,
            value: payload?.value,
            completed: payload?.completed
          },
        ],
      };
    case 'EDIT_TODOS':
      return {
        ...state,
        todos: state.todos.map(item => {
          return item.id === payload.id
            ? {
                ...item,
                value: payload.value,
              }
            : item;
        }),
      };
    case 'DELETE_TODOS':
      return {
        ...state,
        todos: state.todos.filter(({ id: item }) => item !== payload.id),
      };
    case 'SET_ACTION':
      return {
        ...state,
        action: payload.action,
      };
    case 'SET_COMPLETE':
      return {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === payload.id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export default TodosProvider;
