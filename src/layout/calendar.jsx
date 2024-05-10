import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialCalendar from '../component/outCalendar';

const fetchUrl = 'https://developer-lostark.game.onstove.com';

const WeekCalendar = ({ Collectibles }) => {
  //console.log(Collectibles);
  const [group, setGroup] = useState([]);
  const [dailyEvent, setdailyEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notHave, setNotHave] = useState([]);
  useEffect(() => {
    const notHave = Collectibles.map((x) =>
      x.CollectiblePoints.filter((x) => x.Point !== 1)
    );
    console.log(notHave);

    setNotHave(notHave.flat().map((x) => x.PointName.replaceAll(' ', '')));
  }, [Collectibles]);
  useEffect(() => {
    const getData = () => {
      axios
        .get(`${fetchUrl}/gamecontents/calendar`, {
          headers: {
            Authorization: `bearer ${process.env.REACT_APP_LOST_ARK_KEY}`,
          },
        })
        .then((res) => {
          let eventId = 0;

          const resourceArr = [
            { fieldName: 'location', instances: [] },
            { fieldName: 'rewards', instances: [], allowMultiple: true },
          ];

          const eventArr = [];
          res.data.map((x) => {
            if (
              resourceArr[0].instances.find(
                (z) => z.text === x.CategoryName
              ) === undefined
            ) {
              resourceArr[0].instances.push({
                id: x.CategoryName,
                text: x.CategoryName,
              });
            }
            if (
              resourceArr[1].instances.find(
                (z) => z.RewardItems === x.RewardItems
              ) === undefined &&
              x.CategoryName !== '카오스게이트' &&
              x.CategoryName !== '필드보스'
            ) {
              x.RewardItems.map((z, i) => {
                return resourceArr[1].instances.push({
                  title: z.Name,
                  text: z.Name,
                  id: `${x.ContentsName.replaceAll(' ', '')}${z.Name.replaceAll(
                    ' ',
                    ''
                  )}`,
                  color: z.Icon,
                });
              });
            }
            return x.StartTimes.map((z) => {
              if (
                x.CategoryName !== '카오스게이트' &&
                x.CategoryName !== '필드보스'
              ) {
                eventId++;
                const eventObject = {
                  id: eventId,
                  title: x.ContentsName,
                  startDate: moment(z),
                  location: x.CategoryName,
                  icon: x.ContentsIcon,
                  rewards: x.RewardItems.map((y, i) => {
                    return `${x.ContentsName.replaceAll(
                      ' ',
                      ''
                    )}${y.Name.replaceAll(' ', '')}`;
                  }),
                };
                eventArr.push(eventObject);
              }
            });
          });
          console.log(eventArr);

          const filterd = eventArr.filter(
            (z) =>
              z.rewards.filter(
                (y) => notHave.filter((v) => y.includes(v)).length > 0
              ).length > 0
          );

          filterd.map((el, idx) => {
            el, (el.id = idx + 1);
          });

          setGroup(resourceArr);
          setdailyEvent(filterd);
          setLoading(false);
        });
    };
    getData();
  }, [notHave]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <MaterialCalendar data={dailyEvent} resource={group} />
      </div>
    );
  }
};

export default WeekCalendar;
