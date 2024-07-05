import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../component/header';
import { useLocation, useNavigate } from 'react-router-dom';

const Insert = ({ size, char }) => {
  const [charName, setCharName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const changeValue = (e) => {
    setCharName(e.target.value);
  };

  return (
    <>
      <Header name={''} isRealChar={false} />
      <Container>
        <Row
          className={
            size === 'modal'
              ? 'd-flex justify-content-center align-items-center'
              : 'd-flex justify-content-center align-items-center vh-100'
          }
        >
          <Col xs={12} md={size === 'modal' ? 12 : 6}>
            <Form>
              <Form.Group className='mb-3' controlId='InsertSearch'>
                {localStorage.getItem('apiKey') ? (
                  <>
                    <Form.Label>캐릭터 이름</Form.Label>
                    <Form.Control
                      onChange={changeValue}
                      type='text'
                      placeholder='캐릭터 이름을 입력하세요'
                    />
                    {location.state == 'notReal' ? (
                      <Form.Text>실제하지 않는 캐릭터 명 입니다.</Form.Text>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Form.Label>로스트아크 API Key</Form.Label>
                    <Form.Control
                      onChange={changeValue}
                      type='text'
                      placeholder='로스트아크 API Key를 입력하세요'
                    />
                    {location.state == 'noAuth' ? (
                      <Form.Text>실제하지 않는 데이터 입니다.</Form.Text>
                    ) : null}
                  </>
                )}
              </Form.Group>
              <Button
                onClick={() => navigate(`/char/${charName}`)}
                variant='primary'
                type='submit'
              >
                입력
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Insert;
