import moment from 'moment';

import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialCalendar from '../component/outCalendar';

const fetchUrl = 'https://developer-lostark.game.onstove.com';

const WeekCalendar = ({ Collectibles }) => {
  const [group, setGroup] = useState([]);
  const [dailyEvent, setdailyEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notHave, setNotHave] = useState([]);
  useEffect(() => {
    const notHaveArr = Collectibles.map((x) =>
      x.CollectiblePoints.filter((x) => x.Point !== 1)
    );

    console.log(notHaveArr);
    setNotHave(notHaveArr.flat());
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

            x.RewardItems.map((z, i) => {
              return resourceArr[1].instances.push({
                title: z.Name,
                text: z.Name,
                id: z.Name,
                color: z.Icon,
              });
            });
            resourceArr[1].instances = resourceArr[1].instances.filter(
              (item1, idx1) => {
                return (
                  resourceArr[1].instances.findIndex((item2, idx2) => {
                    return item1.id == item2.id;
                  }) == idx1
                );
              }
            );

            return (
              x.StartTimes &&
              x.StartTimes.map((z) => {
                if (
                  x.CategoryName !== '카오스게이트' &&
                  x.CategoryName !== '필드보스'
                ) {
                  const eventObject = {
                    id: eventId,
                    title: x.ContentsName,
                    startDate: moment(z),
                    location: x.CategoryName,
                    icon: x.ContentsIcon,
                    rewards: x.RewardItems.map((y, i) => y.Name),
                  };

                  eventObject.rewards.some((y) =>
                    notHave.some((el2) => el2.PointName.includes(y))
                  )
                    ? (eventArr.push(eventObject), eventId++)
                    : null;
                }
              })
            );
          });

          const set = new Set(resourceArr);

          setGroup([...set]);
          setdailyEvent(eventArr);
          setLoading(false);
        });
    };
    getData();
  }, [notHave]);
  return (
    <div>
      {loading && dailyEvent.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <MaterialCalendar data={dailyEvent} resource={group} />
      )}
    </div>
  );
};

export default WeekCalendar;
