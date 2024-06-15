import React, { useState, useEffect } from 'react';
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
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import Header from '../component/header';
import packages from './../static/packages.json';
import loyal_crystal from './../img/royal_crystal.png';

import axios from 'axios';
import money from './../img/money.png';
import crystal from './../img/crystal.png';
import { QuestionLg } from 'react-bootstrap-icons';

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
    return console.log(error);
  }
};
const FormCheckComponent = ({
  item,
  itemindex,
  x,
  i,
  itemData,
  onCheckMethod,
  children,
}) => {
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    onCheckMethod(x, i, isChecked);
  };
  return (
    <Form.Check type={item?.select === true ? 'checkbox' : 'radio'} key={i}>
      <Form.Check.Input
        name={item.code}
        id={`${itemindex}_${item.code}_${x.code}`}
        type={item?.select === true ? 'checkbox' : 'radio'}
        defaultChecked={item?.select ? true : i === 0 ? true : false}
        onChange={handleChange}
      />
      <Form.Check.Label
        htmlFor={`${itemindex}_${item.code}_${x.code}`}
        className='mb-2'
      >
        {children ? (
          children
        ) : (
          <div>
            <div className='ms-3 align-items-center d-flex'>
              <Image src={x.img} className='mx-1' style={{ width: '24px' }} />
              <span>{itemData[i][0]?.Name}</span>
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
        )}
      </Form.Check.Label>
    </Form.Check>
  );
};
const ItemDetail = ({ idx, item, itemData, setTotalGold, itemindex }) => {
  const onCheckMethod = (x, i, ischecked) => {
    setTotalGold((prevTotalGold) => {
      const updatedTotalGold = [...prevTotalGold];
      if (item.nested) {
        updatedTotalGold[idx] = itemData[i].map((z, j) => {
          return Math.round(
            z.data[0].Stats[0].AvgPrice * x.items[j].amount * item.amount
          );
        });
      } else if (item.select) {
        updatedTotalGold[idx] = [...updatedTotalGold[idx]];
        updatedTotalGold[idx][i] =
          itemData[i][0].Stats[0].AvgPrice * x.amount * item.amount;
        if (ischecked !== undefined && ischecked == false) {
          updatedTotalGold[idx][i] = 0;
        }
      } else {
        updatedTotalGold[idx] = Math.round(
          itemData[i][0].Stats[0].AvgPrice * x.amount * item.amount
        );
      }

      return updatedTotalGold;
    });
  };

  useEffect(() => {
    if (item.items.length > 0) {
      if (item.select) {
        item.items.map((x, i) => onCheckMethod(x, i, true));
      } else {
        onCheckMethod(item.items[0], 0, true);
      }
    }
  }, []);

  return (
    <Form>
      {item.items.map((x, i) => {
        if (item.nested && item.nested === true) {
          return (
            <FormCheckComponent
              key={i}
              item={item}
              itemData={itemData}
              itemindex={itemindex}
              x={x}
              onCheckMethod={onCheckMethod}
              i={i}
            >
              <div>
                <div className='ms-3 flex-column d-flex'>
                  <div>
                    <Image
                      src={x.img}
                      className='mx-1'
                      style={{ width: '24px' }}
                    />
                    <span>{x.name}</span>
                  </div>
                  <div className='d-flex flex-column'>
                    {itemData[i].map((ele, index) => {
                      return (
                        <div className='d-flex' key={index}>
                          <Image
                            src={x.items[index].img}
                            className='mx-1'
                            style={{ width: '24px' }}
                          />
                          <div>
                            <span>{ele.data[0].Name}</span>
                            <Image
                              src={money}
                              className='mx-1'
                              style={{ width: '24px' }}
                            />
                            <span>{ele.data[0].Stats[0]?.AvgPrice}</span>
                            <span>x</span>
                            <span>{x.items[index].amount}</span>
                            <span>=</span>
                            <span>
                              {ele.data[0]?.Stats[0]
                                ? Math.round(
                                    ele.data[0].Stats[0].AvgPrice *
                                      x.items[index].amount
                                  )
                                : 'Loading...'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className='ms-3'>
                  <Image
                    src={money}
                    className='mx-1'
                    style={{ width: '24px' }}
                  />
                  최종 비용:
                  {itemData[i][0]?.data[0].Stats[0]
                    ? Math.round(
                        itemData[i][0].data[0].Stats[0].AvgPrice *
                          x.items.reduce(
                            (sum, currentItem) => sum + currentItem.amount,
                            0
                          ) *
                          item.amount
                      )
                    : 'Loading...'}
                </div>
              </div>
            </FormCheckComponent>
          );
        }
        return (
          <FormCheckComponent
            key={i}
            item={item}
            itemData={itemData}
            itemindex={itemindex}
            x={x}
            onCheckMethod={onCheckMethod}
            i={i}
          />
        );
      })}
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
  itemArray,
  itemindex,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const parsedData = item.items.map((x) => {
        if (item.nested && item.nested === true) {
          return x.items.map((z) => {
            if (z.code === 65021010) {
              return {
                code: z.code,
                data: [
                  {
                    Name: '1레벨 보석',
                    Stats: [{ AvgPrice: 15 }],
                  },
                ],
              };
            }
            return itemArray.find((x) => z.code === x.code);
          });
        } else {
          if (x.code === 40100011) {
            return [
              {
                Name: '크리스탈',
                Stats: [{ AvgPrice: Math.round((crystalVal * 1) / 95) }],
              },
            ];
          } else {
            const data = itemArray.find((z) => z.code === x.code);
            return data.data;
          }
        }
      });

      setData(parsedData);
    };
    loadData();
  }, [itemArray, crystalVal, item]);

  return (
    <>
      <Row className='pt-2 border-top'>
        <p className='mb-2'>
          {item.name} x {item.amount}
        </p>
      </Row>
      <Row key={index}>
        <Col xs='auto'>
          <Image src={item.img} style={{ width: '64px' }} />
        </Col>
        <Col>
          {data.length === 0 ? (
            'Loading...'
          ) : (
            <ItemDetail
              itemindex={itemindex}
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
const initializeTotalGold = (items) => {
  return items.map((item) =>
    item.nested || item.select ? Array(item.items.length).fill(0) : 0
  );
};
const RenderData = (x, gold, crystalVal, itemArray, itemindex, sellCrystal) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePopOver, setIsVisiblePopOver] = useState(false);
  const [totalGold, setTotalGold] = useState(() =>
    initializeTotalGold(x.items)
  );
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
                  <div className='small'>화폐거래소 크리스탈 판매 시,</div>
                  <div className='mb-2'>
                    <Image src={money} style={{ width: '24px' }} />
                    <span className='small'>
                      {sellCrystal > 0
                        ? ((sellCrystal * x.cost) / 2750).toFixed(0)
                        : 0}
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
              itemindex={itemindex}
              gold={gold}
              crystalVal={crystalVal}
              key={i2}
              idx={i2}
              itemArray={itemArray}
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
  const [crystalVal, setCrysralVal] = useState(3000);
  const [sellCrystal, setSellCrystal] = useState(3000);
  const [itemArray, setItemArray] = useState([]);
  const [radioValue, setRadioValue] = useState('1');
  const onChangeMethod = (e, fun, radioValue) => {
    if (e.target.value < 0) {
      fun(1);
    }
    fun(e.target.value);
  };
  useEffect(() => {
    const fetchAllItemsData = async () => {
      const promises = packages.itemscode.map(async (x) => {
        const data = await fetchItemData(x);
        return { code: x, data: data };
      });
      const arr = await Promise.all(promises);
      return arr;
    };
    const savedArr = localStorage.getItem('itemArr');
    if (savedArr) {
      const { data, timestamp } = JSON.parse(savedArr);
      const now = new Date().getTime();

      if (now - timestamp < 3600000) {
        setItemArray(data);
      } else {
        localStorage.removeItem('itemArr');
        fetchAllItemsData().then((fetchedArr) => {
          setItemArray(fetchedArr);
          localStorage.setItem(
            'itemArr',
            JSON.stringify({ data: fetchedArr, timestamp })
          );
        });
      }
    } else {
      fetchAllItemsData().then((fetchedArr) => {
        setItemArray(fetchedArr);
        const timestamp = new Date().getTime();
        localStorage.setItem(
          'itemArr',
          JSON.stringify({ data: fetchedArr, timestamp })
        );
      });
    }
  }, []);
  const radios = [
    { name: '서버 내 골드 비율', value: '1' },
    { name: '화폐거래소 크리스탈 판매', value: '2' },
  ];
  return (
    <>
      <Header />
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col lg={4}>
            <Form.Label className='d-block'>골드 구매</Form.Label>
            <ButtonGroup className='mb-2'>
              {radios.map((radio, idx) => (
                <ToggleButton
                  style={{ wordBreak: 'keep-all' }}
                  className='fs-6'
                  key={idx}
                  id={`radio-${idx}`}
                  type='radio'
                  variant={'outline-primary'}
                  name='radio'
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>{' '}
            <InputGroup className='mb-3'>
              <InputGroup.Text>
                100{' '}
                <Image
                  src={radioValue === '1' ? money : crystal}
                  style={{ width: '24px', paddingLeft: '5px' }}
                />
              </InputGroup.Text>
              <Form.Control
                aria-label='GOLD'
                type='number'
                value={radioValue === '1' ? gold : sellCrystal}
                onChange={(e) =>
                  radioValue === '1'
                    ? onChangeMethod(e, setGold)
                    : onChangeMethod(e, setSellCrystal)
                }
              />{' '}
            </InputGroup>
            <Form.Label>화폐거래소 크리스탈 구매</Form.Label>
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
            {packages.packages.map((x, i) => (
              <Col xl={12} key={i} className='mb-3'>
                {RenderData(x, gold, crystalVal, itemArray, i, sellCrystal)}
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cost;
