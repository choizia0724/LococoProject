import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Image,
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Tooltip,
  Button,
  OverlayTrigger,
} from 'react-bootstrap';
import Header from '../component/header';
import packages from './../static/packages.json';
import loyal_crystal from './../img/royal_crystal.png';

import shop_icon_6535 from './../img/shop_icon_6535.webp';
import shop_icon_6536 from './../img/shop_icon_6536.webp';
import shop_icon_6539 from './../img/shop_icon_6539.webp';
import shop_icon_6540 from './../img/shop_icon_6540.webp';
import shop_icon_6541 from './../img/shop_icon_6541.webp';
import shop_icon_6542 from './../img/shop_icon_6542.webp';
import shop_icon_6543 from './../img/shop_icon_6543.webp';
import shop_icon_6544 from './../img/shop_icon_6544.webp';
import shop_icon_6545 from './../img/shop_icon_6545.webp';

import axios from 'axios';
import money from './../img/money.png';
import crystal from './../img/crystal.png';
import { QuestionLg, QuestionOctagonFill } from 'react-bootstrap-icons';

const images = {
  shop_icon_6540,
  shop_icon_6541,
  shop_icon_6542,
  shop_icon_6543,
  shop_icon_6544,
  shop_icon_6545,
  shop_icon_6536,
  shop_icon_6539,
  shop_icon_6535,
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

const ItemDetail = ({ idx, item, itemData, totalGold, setTotalGold }) => {
  const onCheckMethod = (x, i) => {
    const arr = [...totalGold];
    arr[idx] = Math.round(
      itemData[i][0].Stats[0].AvgPrice * x.amount * item.amount
    );
    setTotalGold(arr);
  };

  useEffect(() => {
    if (item.items.length > 0) {
      onCheckMethod(item.items[0], 0);
    }
  }, []);

  return (
    <Form>
      {item.items.map((x, i) => (
        <Form.Check
          type={item.select && item.select === 'all' ? 'checkbox' : 'radio'}
          key={i}
        >
          <Form.Check.Input
            name={item.code}
            id={`${item.code}_${x.code}`}
            type={item.select && item.select === 'all' ? 'checkbox' : 'radio'}
            onChange={() => onCheckMethod(x, i)}
          />
          <Form.Check.Label htmlFor={`${item.code}_${x.code}`} className='mb-2'>
            <div>
              <div className='ms-3 align-items-center d-flex'>
                <Image src={x.img} className='mx-1' style={{ width: '24px' }} />
                <span>{itemData[i][0]?.Name}</span>
              </div>
              <div className='ms-3 align-items-center d-flex'>
                <Image src={money} className='mx-1' style={{ width: '24px' }} />
                <span>{itemData[i][0]?.Stats[0]?.AvgPrice}</span>
                <span>x</span>
                <span>{x.amount}</span>
                <span>=</span>
                <span>
                  {itemData[i][0]?.Stats[0]
                    ? Math.round(itemData[i][0].Stats[0].AvgPrice * x.amount)
                    : 'Loading...'}
                </span>
              </div>
              <div className='ms-3'>
                <Image src={money} className='mx-1' style={{ width: '24px' }} />
                최종 비용:
                {Math.round(
                  itemData[i][0].Stats[0].AvgPrice * x.amount * item.amount
                )}
              </div>
            </div>
          </Form.Check.Label>
        </Form.Check>
      ))}
    </Form>
  );
};

const ItemRow = ({
  idx,
  item,
  gold,
  index,
  setTotalGold,
  totalGold,
  crystalVal,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchData = await Promise.all(
        item.items.map(async (x) => {
          if (x.name === '크리스탈') {
            return [
              {
                Name: '크리스탈',
                Stats: [{ AvgPrice: Math.round((crystalVal * 1) / 95) }],
              },
            ];
          } else {
            const data = await fetchItemData(x.code);
            return data;
          }
        })
      );
      setData(fetchData);
    };
    loadData();
  }, [item, crystalVal]);

  return (
    <>
      <Row className='pt-2 border-top'>
        <p className='mb-2'>
          {item.name} x {item.amount}
        </p>
      </Row>
      <Row key={index}>
        <Col xs='auto'>
          <Image src={images[item.img] || item.img} style={{ width: '64px' }} />
        </Col>
        <Col>
          {data.length === 0 ? (
            'Loading...'
          ) : (
            <ItemDetail
              idx={idx}
              item={item}
              itemData={data}
              gold={gold}
              setTotalGold={setTotalGold}
              totalGold={totalGold}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

const RenderData = (x, gold, crystalVal) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePopOver, setIsVisiblePopOver] = useState(false);
  const [totalGold, setTotalGold] = useState(Array(x.items.length).fill(0));
  const [reduceGold, setReduceGold] = useState(0);
  useEffect(() => {
    setReduceGold(totalGold.flat().reduce((a, b) => a + b, 0));
  }, [gold, totalGold]);
  const onClickMethod = () => {
    setIsVisible(!isVisible);
    setIsVisiblePopOver(!isVisible);
  };
  return (
    <Card key={x.code} className='h-100'>
      <Card.Body>
        <div className='d-flex align-items-baseline justify-content-between'>
          <Card.Title className='m-0' onClick={onClickMethod}>
            <Button
              variant='link'
              className='p-0 fw-medium text-light text-decoration-none'
            >
              {x.name}
            </Button>
          </Card.Title>
          <Card.Text className=''>
            <OverlayTrigger
              show={isVisiblePopOver}
              placement='bottom'
              overlay={
                <Tooltip>
                  <div className='small'>로얄크리스탈 충전 시,</div>
                  <div className='mb-2'>
                    <Image src={loyal_crystal} style={{ width: '24px' }} />
                    <span className='small'>{x.cost}</span>
                  </div>
                  <div className='small'>서버 내 거래 시,</div>
                  <div className='mb-2'>
                    <Image src={money} style={{ width: '24px' }} />
                    <span className='small'>
                      {gold > 0 ? ((100 / gold) * x.cost * 0.95).toFixed(0) : 0}
                    </span>
                  </div>
                </Tooltip>
              }
            >
              <Button
                variant='link'
                className='btn-sm text-light text-decoration-none'
                onClick={() => setIsVisiblePopOver(!isVisiblePopOver)}
              >
                {x.cost}원
                <QuestionLg
                  className='gray text-white-50'
                  style={{ width: '0.75rem' }}
                />
              </Button>
            </OverlayTrigger>
          </Card.Text>
        </div>
        {isVisible ? (
          <Card.Text className='mb-1'>
            거래소 구매시: <Image src={money} style={{ width: '30px' }} />{' '}
            {reduceGold}
          </Card.Text>
        ) : null}

        {isVisible &&
          x.items.map((item, i2) => (
            <ItemRow
              gold={gold}
              crystalVal={crystalVal}
              key={i2}
              idx={i2}
              item={item}
              setTotalGold={setTotalGold}
              totalGold={totalGold}
            />
          ))}
      </Card.Body>
    </Card>
  );
};

const Cost = () => {
  const [gold, setGold] = useState(50);
  const [crystalVal, setCrysralVal] = useState(3600);
  const onChangeMethod = (e, fun) => {
    if (e.target.value < 0) {
      fun(1);
    }
    fun(e.target.value);
  };
  return (
    <>
      <Header />
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col lg={3}>
            <Form.Label>서버 내 골드 비율</Form.Label>
            <InputGroup className='mb-3'>
              <InputGroup.Text>
                100{' '}
                <Image
                  src={money}
                  style={{ width: '24px', paddingLeft: '5px' }}
                />
              </InputGroup.Text>
              <Form.Control
                aria-label='GOLD'
                type='number'
                value={gold}
                onChange={(e) => onChangeMethod(e, setGold)}
              />
            </InputGroup>
            <Form.Label>화폐거래소 크리스탈 거래</Form.Label>
            <InputGroup className='mb-3'>
              <InputGroup.Text>
                100{' '}
                <Image
                  src={crystal}
                  style={{ width: '24px', paddingLeft: '5px' }}
                />
              </InputGroup.Text>
              <Form.Control
                aria-label='GOLD'
                type='number'
                value={crystalVal}
                onChange={(e) => onChangeMethod(e, setCrysralVal)}
              />
            </InputGroup>
          </Col>
          <Col lg={6}>
            {packages.map((x, i) => (
              <Col xl={12} key={i} className='mb-3'>
                {RenderData(x, gold, crystalVal)}
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cost;
