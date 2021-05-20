import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FirstComponent, SecondComponent } from './components';

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <Row className="m-5">
        <Col sm={12} md={6}>
          <FirstComponent todos={todos} setTodos={setTodos} />
        </Col>
        <Col sm={12} md={6}>
          <SecondComponent todos={todos} setTodos={setTodos} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
