import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Badge, Stack, Accordion, Image } from 'react-bootstrap';
import { AwardFill, PencilFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

const MyCharacter = ({ ArmoryProfile }) => {
  return (
    <Row className='h-100'>
      <BackgroundCol className='py-4' image={ArmoryProfile?.CharacterImage}>
        <Row className='justify-content-between h-100'>
          <Col
            xs={12}
            md={4}
            className='d-flex flex-column justify-content-around'
          >
            <Row className='text-md-center py-3'>
              <Col xs={12}>
                <div className='text-warning'>원정대 레벨</div>
                <div className='display-5  align-content-end'>
                  {ArmoryProfile?.ExpeditionLevel}
                </div>
                <Stack
                  className='mb-2 d-inline-flex'
                  gap={2}
                  direction='horizontal'
                >
                  <Badge bg='secondary'>
                    {ArmoryProfile?.CharacterClassName}
                  </Badge>
                  <Badge bg='secondary'>{ArmoryProfile?.ServerName}</Badge>
                </Stack>
                <div>
                  <span className='fs-5'>{ArmoryProfile?.CharacterName}</span>
                </div>
              </Col>
            </Row>
            <Row className='flex-column text-md-center py-3'>
              <Col className=' fs-6'>
                <span className='text-info'>{ArmoryProfile?.Title}</span>
              </Col>
            </Row>
            <Row className='flex-column text-md-center py-3'>
              <Col>
                <div>장착 아이템 레벨</div>
                <div className='display-6'>{ArmoryProfile?.ItemAvgLevel}</div>
                <div>
                  <span className='light'>달성 아이템 레벨</span>
                  <span className='text-warning'>
                    {ArmoryProfile?.ItemMaxLevel}
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </BackgroundCol>
    </Row>
  );
};
export default MyCharacter;

const BackgroundCol = styled(Col)`
  background-image: linear-gradient(
      90deg,
      rgb(33, 37, 41) 20%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0) 60%,
      rgb(33, 37, 41) 80%
    ),
    url(${(props) => props.image});
  background-position: top center;
  background-repeat: no-repeat;
`;
