import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FirstComponent, SecondComponent } from './components';

function App() {
  return (
    <div className="App">
      <Row className="m-5">
        <Col sm={12} md={6}>
          <FirstComponent />
        </Col>
        <Col sm={12} md={6}>
          <SecondComponent />
        </Col>
      </Row>
    </div>
  );
}

export default App;
