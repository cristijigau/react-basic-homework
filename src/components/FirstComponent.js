import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const FirstComponent = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState({ id: undefined, value: '' });
  return (
    <Form
      className="mb-3"
      onSubmit={e => {
        e.preventDefault();
        if (todo.id) setTodos([...todos, todo]);
        setTodo({
          id: undefined,
          value: '',
        });
      }}
    >
      <Form.Row className="align-items-end">
        <Col xs={12} lg={10} xl={10}>
          <Form.Control
            type="input"
            value={todo.value}
            onChange={({ target: { value } }) =>
              setTodo({
                id: Math.random() * 100,
                value,
              })
            }
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
