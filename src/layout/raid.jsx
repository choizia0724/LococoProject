import axios from 'axios';
import { useEffect, useState } from 'react';

import Mycards from './../component/card';

const fetchUrl = 'https://developer-lostark.game.onstove.com';

const Raid = () => {
  const gameContentsArr = [
    { code: 'challenge-abyss-dungeons', name: '도전 어비스 던전' },
    { code: 'challenge-guardian-raids', name: '도전 가디언토벌' },
  ];
  const [gameContentsData, setGameContentsData] = useState({});

  useEffect(() => {
    gameContentsArr.map((x) => getData(x.code));
  }, []);

  const getData = (gameContent) => {
    axios
      .get(`${fetchUrl}/gamecontents/${gameContent}`, {
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_LOST_ARK_KEY}`,
        },
      })
      .then((x) => {
        setGameContentsData((prevState) => ({
          ...prevState,
          [gameContent]: x.data,
        }));
      });
  };

  return (
    <>
      <div className='row'>
        {gameContentsArr.map((x, i) =>
          gameContentsData[x.code] ? (
            <Mycards
              key={i}
              raid={gameContentsData[x.code].Raids || gameContentsData[x.code]}
              rewardItems={
                gameContentsData[x.code].RewardItems ||
                gameContentsData[x.code][0]?.RewardItems
              }
              name={x.name}
            />
          ) : (
            <p key={i}>Loading...</p>
          )
        )}
      </div>
    </>
  );
};
export default Raid;
