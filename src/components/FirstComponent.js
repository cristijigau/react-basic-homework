import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';

const FirstComponent = () => {
  const { todos, todo, action } = useSelector(state => state.app);
  const dispatch = useDispatch();
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
        dispatch({
          type: 'SET_TODO',
          payload: {
            id: undefined,
            value: '',
            completed: false,
          },
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
    [todo.value, todo.id]
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
                ? dispatch({
                    type: 'SET_TODO',
                    payload: {
                      id: Math.random() * 100,
                      value,
                      completed: false,
                    },
                  })
                : dispatch({
                    type: 'SET_TODO',
                    payload: {
                      id: todo.id,
                      value,
                      completed: false,
                    },
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
