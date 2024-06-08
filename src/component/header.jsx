import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Image,
  InputGroup,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Logo from './../img/logo.png';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ name = '', isRealChar = false }) => {
  const [charName, setCharName] = useState(name);
  const navigate = useNavigate();

  const changeValue = (e) => {
    setCharName(e.target.value);
  };

  return (
    <Navbar className='bg-body-tertiary'>
      <Container>
        <Nav className='w-100 justify-content-between'>
          <Navbar.Brand as={Link} to='/'>
            <Image
              alt=''
              src={Logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            <span className='d-none d-sm-inline-block'>로코코 프로젝트</span>
          </Navbar.Brand>
          <Nav.Link as={Link} to='/cost'>
            효율표
          </Nav.Link>
          <Form className='ms-auto'>
            <Form.Group controlId='HeaderSearch'>
              <InputGroup className='d-flex'>
                <Form.Control
                  value={charName}
                  onChange={changeValue}
                  type='text'
                  placeholder='캐릭터 이름'
                />
                <Button
                  onClick={() => navigate(`/char/${charName}`)}
                  variant='primary'
                  type='submit'
                >
                  <Search />
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
