import React, { useContext, useCallback, useEffect, useRef } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { TODO_CONTEXT } from '../context';

const FirstComponent = ({ todo, setTodo }) => {
  const { dispatch, action, todos } = useContext(TODO_CONTEXT);
  const inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focus();
  }, []);

  const checkValue = value => todos.find(todo => todo.value === value);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (todo.id) {
        if (action === 'add') {
          if (!checkValue(todo.value)) {
            dispatch({
              type: 'ADD_TODOS',
              payload: {
                id: todo.id,
                value: todo.value,
                completed: false,
              },
            });
          }
        }
        setTodo({
          id: undefined,
          value: '',
        });
      }
      if (action === 'edit') {
        if (!checkValue(todo.value)) {
          dispatch({
            type: 'EDIT_TODOS',
            payload: {
              id: todo.id,
              value: todo.value,
            },
          });
          dispatch({
            type: 'SET_ACTION',
            payload: {
              action: 'add',
            },
          });
        }
      }
    },
    [todo.value, todo.id, dispatch]
  );

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Form.Row className="align-items-end">
        <Col xs={12} lg={10} xl={10}>
          <Form.Control
            type="input"
            ref={inputRef}
            value={todo.value}
            onChange={({ target: { value } }) => {
              action === 'add'
                ? setTodo({
                    id: Math.random() * 100,
                    value,
                    completed: false,
                  })
                : setTodo({
                    id: todo.id,
                    value,
                    completed: false,
                  });
            }}
          />
        </Col>
        <Col xs={12} lg={2} xl={2}>
          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default FirstComponent;
