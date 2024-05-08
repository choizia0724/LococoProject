import { useState } from 'react';
import {
  Badge,
  Modal,
  Stack,
  Image,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Stars } from 'react-bootstrap-icons';

const Mymodal = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderRewardItems = (items) => {
    return (
      items &&
      items.map((item, index) => {
        let grade = item.Grade;
        let itemComponent;
        if (grade === '고대') {
          itemComponent = (
            <BgImage
              className='w-100'
              src={item.Icon}
              alt={item.Name}
              $boxColor='linear-gradient(135deg, #3d3325, #dcc999)'
              thumbnail
            />
          );
        } else if (grade === '유물') {
          itemComponent = (
            <BgImage
              className='w-100'
              src={item.Icon}
              alt={item.Name}
              $boxColor='linear-gradient(135deg,#341a09,#a24006)'
              thumbnail
            />
          );
        } else if (grade === '전설') {
          itemComponent = (
            <BgImage
              className='w-100'
              src={item.Icon}
              alt={item.Name}
              $boxColor='linear-gradient(135deg, #362003, #9e5f04)'
              thumbnail
            />
          );
        } else if (grade === '영웅') {
          itemComponent = (
            <BgImage
              className='w-100'
              src={item.Icon}
              alt={item.Name}
              $boxColor='linear-gradient(135deg, #261331, #480d5d)'
              thumbnail
            />
          );
        } else if (grade === '희귀') {
          itemComponent = (
            <BgImage
              className='w-100'
              src={item.Icon}
              alt={item.Name}
              $boxColor='linear-gradient(135deg, #111f2c, #113d5d)'
              thumbnail
            />
          );
        } else {
          itemComponent = (
            <BgImage
              className='w-100'
              src={item.Icon}
              alt={item.Name}
              $boxColor='linear-gradient(135deg, #232323, #575757)'
              thumbnail
            />
          );
        }
        return (
          <div key={index}>
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip id='button-tooltip'>
                  [{grade}]{item.Name}
                </Tooltip>
              }
            >
              {itemComponent}
            </OverlayTrigger>
          </div>
        );
      })
    );
  };

  const renderStack = (items, isGuardian, level) => {
    return (
      <Stack
      //direction={isGuardian ? 'vertical' : 'horizontal'}
      >
        {isGuardian ? (
          items.map((reward, index) => (
            <div key={index}>
              <Badge>{reward.ExpeditionItemLevel}</Badge>
              <Stack direction='horizontal'>
                {renderRewardItems(reward.Items)}
              </Stack>
            </div>
          ))
        ) : (
          <div>
            <Badge>{level}</Badge>
            <Stack direction='horizontal'>{renderRewardItems(items)}</Stack>
          </div>
        )}
      </Stack>
    );
  };

  return (
    <>
      <Stars className='text-warning' onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderStack(
            props.reward,
            props.title === '도전 가디언토벌',
            props.level
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Mymodal;

const BgImage = styled(Image)`
  ${(props) => `background:${props.$boxColor}`};
`;
