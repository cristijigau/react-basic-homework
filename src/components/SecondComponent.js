import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import MainContainer from './MainContainer';

const SecondComponent = ({ todos, setTodos }) => {
  return (
    <MainContainer>
      {todos.map(({ id, value }) => (
        <Row className="my-1" key={id}>
          <Col xs={6} md={10}>
            <i className="far fa-circle mr-2"></i>
            {value}
          </Col>
          <Col xs={6} md={2}>
            <Button
              variant="danger"
              onClick={() =>
                setTodos(todos.filter(({ id: item }) => item !== id))
              }
              block
            >
              x
            </Button>
          </Col>
        </Row>
      ))}
    </MainContainer>
  );
};

export default SecondComponent;
