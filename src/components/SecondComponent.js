import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import MainContainer from './MainContainer';

const SecondComponent = () => {
  // if you check the localStorage, they are saved in there.
  const { todos, filteredTodos } = useSelector(state => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredTodos = todos.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && !a.completed) return -1;
      return 0;
    });
    dispatch({
      type: 'SET_FILTERED_TODOS',
      payload: {
        filteredTodos,
      },
    });
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
    dispatch({ type: 'SET_TODO', payload: { id, value } });
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
            <span
              style={{
                textDecoration: `${completed ? 'line-through' : 'none'}`,
              }}
            >
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
