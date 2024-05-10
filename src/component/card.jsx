import { Card, Col } from 'react-bootstrap';

const Mycards = (props) => {
  return (
    <Col xs={12} lg={props.name === '도전 어비스 던전' ? 4 : 8}>
      <div className='pt-4 fs-5'>{props.name}</div>
      <div className='d-flex gap-1'>
        {props.raid &&
          props.raid.map((x, i) => {
            return (
              <Card key={i} flush>
                <Card.Img variant='top' src={x.Image} />
                <Card.ImgOverlay className='bg-black bg-opacity-50'>
                  <Card.Text className='text-white'>{x.Name}</Card.Text>
                </Card.ImgOverlay>
              </Card>
            );
          })}
      </div>
    </Col>
  );
};
export default Mycards;
