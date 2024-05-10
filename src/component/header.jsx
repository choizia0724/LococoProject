import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className='bg-body-tertiary'>
      <Container>
        <Nav>
          <Nav.Item>
            <Nav.Link href='/home'>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='link-1'>Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='link-2'>Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='disabled' disabled></Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
