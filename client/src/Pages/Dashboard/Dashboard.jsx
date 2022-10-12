import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import TotalRegisterResident from 'Components/TotalRegisterResident';
import FireIncident from 'Components/FireIncident';
import FloodIncident from 'Components/FloodIncident';
import EarthquakeIncident from 'Components/EarthquakeIncident';

// Actions
import { getAllUsers } from 'Services/Actions/users';
import { getAllEmergencies } from 'Services/Actions/emergencies.action';

const Dashboard = ({
  usersState: { users },
  emergenciesState: { emergencies },
  getAllUsers,
  getAllEmergencies,
}) => {
  const [count, setCount] = useState({
    resident: 0,
    fire: 0,
    flood: 0,
    earthquake: 0,
  });

  useEffect(() => {
    getAllUsers();
    getAllEmergencies();
  }, []);

  useEffect(() => {
    if (users) {
      const residentCount = users.filter(
        (user) => user.user_type_id.name === 'Resident'
      );
      setCount({ ...count, resident: residentCount.length });
    }

    if (emergencies) {
      const fireCount = emergencies.filter(
        (emergency) => emergency.emergency_type_id.name === 'Fire'
      );
      const floodCount = emergencies.filter(
        (emergency) => emergency.emergency_type_id.name === 'Flood'
      );
      const earthquakeCount = emergencies.filter(
        (emergency) => emergency.emergency_type_id.name === 'Earthquake'
      );

      setCount({
        ...count,
        fire: fireCount.length,
        flood: floodCount.length,
        earthquake: earthquakeCount.length,
      });
    }
  }, [users, emergencies]);

  return (
    <Container>
      <Row>
        <Col>
          <TotalRegisterResident count={count.resident} link="/residents" />
        </Col>
        <Col>
          <FireIncident count={count.fire} t link="/fire-incident" />
        </Col>
        <Col>
          <FloodIncident count={count.flood} link="/flood-incident" />
        </Col>
        <Col>
          <EarthquakeIncident
            count={count.earthquake}
            link="/earthquake-incident"
          />
        </Col>
      </Row>
    </Container>
  );
};

Dashboard.propTypes = {
  usersState: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getAllEmergencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, { getAllUsers, getAllEmergencies })(
  Dashboard
);
