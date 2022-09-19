import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TotalRegisterResident from 'Components/TotalRegisterResident';
import FireIncident from 'Components/FireIncident';
import FloodIncident from 'Components/FloodIncident';
import EarthquakeIncident from 'Components/EarthquakeIncident';

const Dashboard = ({}) => {
  return (
    <Container>
      <Row>
        <Col>
          <TotalRegisterResident count="7" link="/residents" />
        </Col>
        <Col>
          <FireIncident count="22" link="/fire-incident" />
        </Col>
        <Col>
          <FloodIncident count="8" link="/flood-incident" />
        </Col>
        <Col>
          <EarthquakeIncident count="2" link="/earthquake-incident" />
        </Col>
      </Row>
    </Container>
  );
};

Dashboard.propTypes = {
  // authState: PropTypes.object.isRequired,
  // loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // authState: state.authState,
});

export default connect(mapStateToProps, null)(Dashboard);
