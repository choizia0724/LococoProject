import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src='/img/logo.svg'
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
        </Navbar.Brand>
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
            <Nav.Link eventKey='disabled' disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
