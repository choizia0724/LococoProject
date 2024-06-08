import React, { useState, useEffect } from 'react';
import {
  Container,
  Image,
  Row,
  Card,
  Col,
  InputGroup,
  Form,
} from 'react-bootstrap';
import Header from '../component/header';
import packages from './../static/packages.json';
import loyal_crystal from './../img/royal_crystal.png';
import shop_icon_6540 from './../img/shop_icon_6540.webp';
import shop_icon_6542 from './../img/shop_icon_6542.webp';
import shop_icon_6544 from './../img/shop_icon_6544.webp';
import shop_icon_6545 from './../img/shop_icon_6545.webp';
import axios from 'axios';
import money from './../img/money.png';

const images = {
  shop_icon_6540,
  shop_icon_6542,
  shop_icon_6544,
  shop_icon_6545,
};

const fetchUrl = 'https://developer-lostark.game.onstove.com';

const fetchItemData = async (code) => {
  try {
    const response = await axios.get(`${fetchUrl}/markets/items/${code}`, {
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_LOST_ARK_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching item data:', error);
    return null;
  }
};

const ItemRow = ({ item }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchData = await Promise.all(
        item.items.map(async (x) => {
          return fetchItemData(x.code);
        })
      );
      setData(fetchData);
    };
    if (item.name === '크리스탈') {
      setData([[{ Name: '크리스탈', Stats: [{ AvgPrice: 27.5 }] }]]);
    } else {
      loadData();
    }
  }, [item]);

  return (
    <Row className='py-2'>
      <Col xs='auto' className='align-items-center d-flex'>
        <Image src={images[item.img] || item.img} style={{ width: '64px' }} />
      </Col>
      <Col>
        <div className='fs-5'>
          {item.name} x {item.amount}
        </div>
        <Row>
          <Col>
            {data.length > 0 ? (
              <>
                {data.map((itemData, index) => {
                  const object = item.items.find((x) =>
                    x.name.includes(itemData[0].Name)
                  );

                  return (
                    <div key={index} className='my-2'>
                      <div className='ms-2 align-items-center d-flex'>
                        <Image
                          src={object.img}
                          className='mx-1'
                          style={{ width: '24px' }}
                        />
                        <span>{itemData[0].Name}</span>
                      </div>
                      <div className='ms-2 align-items-center d-flex'>
                        <Image
                          src={money}
                          className='mx-1'
                          style={{ width: '24px' }}
                        />
                        <span>{itemData[0].Stats[0].AvgPrice}</span>
                        <span>x</span>
                        <span>{object.amount}</span>
                        <span>=</span>
                        <span>
                          {Math.round(
                            itemData[0].Stats[0].AvgPrice * object.amount
                          )}
                        </span>
                      </div>

                      <div className='ms-2'>
                        <Image
                          src={money}
                          className='mx-1'
                          style={{ width: '24px' }}
                        />
                        최종 비용:{' '}
                        {Math.round(
                          itemData[0].Stats[0].AvgPrice *
                            object.amount *
                            item.amount
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              'Loading...'
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const RenderData = (x, gold) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClickMethod = () => {
    setIsVisible(!isVisible);
  };
  return (
    <Card key={x.code} className='h-100' onClick={onClickMethod}>
      <Card.Body>
        <div className='fs-4 fw-medium m-0'>{x.name}</div>
        <Card.Text>
          <span className='mx-1'>{x.cost}원 =</span>
          <span className='mx-1'>
            <Image src={loyal_crystal} style={{ width: '24px' }} />
            {x.cost} =
          </span>
          <span className='mx-1'>
            <Image src={money} style={{ width: '30px' }} />
            {gold > 0 ? ((100 / gold) * x.cost * 0.95).toFixed(0) : 0}
          </span>
        </Card.Text>

        {isVisible &&
          x.items.map((item, i2) => <ItemRow key={i2} item={item} />)}
      </Card.Body>
    </Card>
  );
};

const Cost = () => {
  const [gold, setGold] = useState(50);
  const onChangeMethod = (e) => {
    if (e.target.value < 0) {
      setGold(1);
    }
    setGold(e.target.value);
  };
  return (
    <>
      <Header />
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col lg={2}>
            <Form.Label>
              <Image src={money} style={{ width: '30px' }} />
              서버 내 골드 비율
            </Form.Label>
            <InputGroup className='mb-3'>
              <InputGroup.Text>100</InputGroup.Text>
              <Form.Control
                aria-label='GOLD'
                type='number'
                value={gold}
                onChange={onChangeMethod}
              />
            </InputGroup>
          </Col>
          <Col lg={5}>
            {packages.map((x, i) => (
              <Col xl={12} key={i} className='mb-3'>
                {RenderData(x, gold)}
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cost;
