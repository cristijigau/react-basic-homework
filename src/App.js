import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FirstComponent, SecondComponent } from './components';
import TodosProvider from './context';

function App() {
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState();
  const [todo, setTodo] = useState({ id: undefined, value: '' });

  const tick = () => {
    setTimer(timer => timer + 1);
  };

  useEffect(() => {
    setTimerId(setInterval(() => tick(), 1000));
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <TodosProvider>
        <Row className="mt-3">
          <Col className="text-center">
            <span>Seconds spent in application: {timer} </span>
          </Col>
        </Row>
        <Row className="m-5">
          <Col sm={12} md={6}>
            <FirstComponent todo={todo} setTodo={setTodo} />
          </Col>
          <Col sm={12} md={6}>
            <SecondComponent todo={todo} setTodo={setTodo} />
          </Col>
        </Row>
      </TodosProvider>
    </div>
  );
}

export default App;
