import { Card, CardGroup } from 'react-bootstrap';
import Mymodal from './modal';

const Mycards = (props) => {
  return (
    <div className='pt-4'>
      <h5>
        {props.name}
        <Mymodal
          title={props.name}
          reward={props.rewardItems}
          level={props.raid[0].MinItemLevel}
        />
      </h5>
      <div className='d-flex flex-column flex-sm-row'>
        {props.raid &&
          props.raid.map((x, i) => {
            return (
              <Card key={i}>
                <Card.Img variant='top' src={x.Image} />
                <Card.ImgOverlay className='bg-black bg-opacity-50'>
                  <Card.Title className='text-white'>{x.Name}</Card.Title>
                  {/* <Card.Text>{x.Description}</Card.Text> */}
                </Card.ImgOverlay>
              </Card>
            );
          })}
      </div>
    </div>
  );
};
export default Mycards;
