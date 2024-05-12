import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Resources,
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Clock, GeoAltFill, MapFill } from 'react-bootstrap-icons';
import moment from 'moment';

const Content = ({
  children,
  appointmentData,
  appointmentResources,
  ...restProps
}) => (
  <Container className='py-3'>
    <Row className='align-items-end'>
      <Col xs={3}>
        <Row>
          <Image
            className='w-100'
            src={appointmentData.icon}
            alt={appointmentData.title}
            roundedCircle
          />
        </Row>
      </Col>
      <Col item xs={9}>
        <div>
          <small className='small'>
            <GeoAltFill />
            <span>{appointmentData.location}</span>
          </small>
        </div>
        <div className='align-items-end d-flex  justify-content-between'>
          <span className='fs-5'>{appointmentData.title}</span>
        </div>
        <div className='d-flex align-items-center'>
          <Clock />
          <span className='px-2'>
            {moment(appointmentData.startDate).format('HH:mm')}
          </span>
        </div>
      </Col>
    </Row>

    {appointmentResources.map((x, i) => {
      return typeof x.color === 'string' ? (
        <Row className='justify-contents-end py-1'>
          <Col xs={2}>
            <Image className='w-100' src={x.color} key={i} />
          </Col>
          <Col xs={10} className='align-items-center d-flex'>
            <span>{x.text}</span>
          </Col>
        </Row>
      ) : (
        <></>
      );
    })}
  </Container>
);

const MaterialCalendar = ({ data, resource }) => {
  const [schedulerData, setSchedulerData] = useState(data);

  return (
    <Paper>
      <Scheduler data={data} height={500} firstDayOfWeek={3}>
        <ViewState defaultCurrentViewName='Week' />

        <DayView />
        <WeekView />

        <Toolbar />
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip
          headerComponent={() => {}}
          contentComponent={Content}
          appointmentData={data}
          appointmentResources={resource}
        />
        <Resources color='blue' data={resource} mainResourceName='location' />
        <CurrentTimeIndicator shadePreviousCells shadePreviousAppointments />
      </Scheduler>
    </Paper>
  );
};

export default MaterialCalendar;
