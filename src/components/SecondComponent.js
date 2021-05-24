import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { TODO_CONTEXT } from '../context';
import useLocalStorage from '../useLocalStorage';
import MainContainer from './MainContainer';

const SecondComponent = ({ setTodo }) => {
  const { todos, dispatch } = useContext(TODO_CONTEXT);

  // if you check the localStorage, they are saved in there.
  const [filteredTodos, setFilteredTodos] = useLocalStorage('todos', []);

  useEffect(() => {
    setFilteredTodos(
      todos.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && !a.completed) return -1;
        if (a.completed && b.completed) return 0;
      })
    );
  }, [todos]);

  //just for the purpose of using useMemo
  const total = useMemo(() => {
    let counter = 0;
    todos.forEach(() => {
      counter++;
    });
    return counter;
  }, [todos]);

  const editHandler = (value, id) => {
    dispatch({ type: 'SET_ACTION', payload: { action: 'edit' } });
    setTodo({
      id,
      value,
    });
  };

  const completeHandler = id => {
    dispatch({
      type: 'SET_COMPLETE',
      payload: { id },
    });
  };

  return (
    <MainContainer>
      {filteredTodos.map(({ id, value, completed }) => (
        <Row className="my-1" key={id}>
          <Col xs={6} md={6}>
            <input
              className="mr-2"
              type="checkbox"
              onClick={() => completeHandler(id)}
            />
            <span Style={completed ? 'text-decoration: line-through;' : ''}>
              {value}
            </span>
          </Col>
          <Col xs={3} md={3}>
            <Button
              variant="danger"
              onClick={() => {
                dispatch({
                  type: 'DELETE_TODOS',
                  payload: {
                    id,
                  },
                });
              }}
              block
            >
              delete
            </Button>
          </Col>
          <Col xs={3} md={3}>
            <Button variant="info" onClick={() => editHandler(value, id)} block>
              edit
            </Button>
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          <span>Total: {total}</span>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default SecondComponent;
