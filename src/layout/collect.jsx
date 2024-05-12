import { Accordion, Image, ListGroup } from 'react-bootstrap';
import { Check2Square, Square } from 'react-bootstrap-icons';
const Collect = ({ Collectibles }) => {
  const orderByValue = (a, b) => {
    if (a.Point < b.Point) {
      return -1;
    }
    if (a.Point > b.Point) {
      return 1;
    }
    return 0;
  };

  return (
    <Accordion className='py-0 py-lg-4' defaultActiveKey={0}>
      {Collectibles.map((x, i) => {
        return (
          <Accordion.Item key={i} eventKey={i}>
            <Accordion.Header>
              <Image
                src={x.Icon}
                alt={x.Type}
                style={{ width: '10%', marginRight: '15px' }}
              />
              <span>{x.Type}</span>
            </Accordion.Header>
            <Accordion.Body className='p-0'>
              <ListGroup
                variant='flush'
                style={{ maxHeight: '12em', height: '100%' }}
                className='overflow-auto'
              >
                {x.CollectiblePoints.sort(orderByValue).map((z, j) => {
                  const isHave = z.Point === z.MaxPoint;
                  return (
                    <ListGroup.Item
                      disabled={isHave}
                      className={
                        isHave
                          ? 'text-decoration-line-through d-flex align-items-center gap-2'
                          : 'd-flex align-items-center gap-2'
                      }
                      key={j}
                    >
                      {isHave ? <Check2Square /> : <Square />}
                      {z.PointName}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
export default Collect;
