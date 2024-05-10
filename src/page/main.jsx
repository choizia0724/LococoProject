import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../component/header';
import Raid from '../layout/raid';
import WeekCalendar from '../layout/calendar';
import MyCharacter from '../layout/character';
import Collect from '../layout/collect';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Main() {
  const param = useParams();
  const [isRealChar, setIsRealChar] = useState(false);
  const [Collectibles, setCollectibles] = useState([]);
  const [ArmoryProfile, setArmoryProfile] = useState({});
  const fetchUrl = 'https://developer-lostark.game.onstove.com';
  useEffect(() => {
    axios
      .get(`${fetchUrl}/armories/characters/${param.char}`, {
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_LOST_ARK_KEY}`,
        },
      })
      .then((x) => {
        if (x.data.ArmoryAvatars !== null) setIsRealChar(true);
        setArmoryProfile(x.data.ArmoryProfile);
        const arr = [];
        x.data.Collectibles.forEach((element) => {
          if (
            element.Type === '섬의 마음' ||
            element.Type === '위대한 미술품' ||
            element.Type === '항해 모험물'
          ) {
            arr.push(element);
          }
        });
        setCollectibles(arr);
      });
  }, [param]);
  useEffect(() => {}, [isRealChar]);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={7}>
            {isRealChar ? <MyCharacter ArmoryProfile={ArmoryProfile} /> : <></>}
          </Col>
          <Col lg={5}>
            {isRealChar ? <Collect Collectibles={Collectibles} /> : <></>}
          </Col>
        </Row>
        <Row>
          <WeekCalendar Collectibles={Collectibles} />
        </Row>
        <Row>
          <Raid />
        </Row>
      </Container>
    </>
  );
}

export default Main;
