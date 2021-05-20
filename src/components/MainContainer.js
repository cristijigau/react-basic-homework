import React from 'react';
import { Card } from 'react-bootstrap';

const MainContainer = props => {
  return (
    <Card>
      <Card.Title className="text-center m-1">Todo List</Card.Title>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
};

export default MainContainer;
