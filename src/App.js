import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './component/header';
import Raid from './page/raid';
import { Container, Row, Col } from 'react-bootstrap';
function App() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={12}>
            <Raid />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
