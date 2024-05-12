import { Navbar, Container, Nav, Modal } from 'react-bootstrap';
import { useState } from 'react';
import Insert from '../page/insert';

const Header = ({ name }) => {
  const [smShow, setSmShow] = useState(false);
  return (
    <Navbar className='bg-body-tertiary'>
      <Container>
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => setSmShow(true)}>{name}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      <Modal
        size='sm'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <Modal.Title id='modal-sizes-title-sm'>캐릭터 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Insert char={name} size={'modal'} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};
export default Header;
