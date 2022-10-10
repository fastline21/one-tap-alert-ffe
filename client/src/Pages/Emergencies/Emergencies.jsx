import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllEmergencies } from 'Services/Actions/emergencies.action';

import { EmergenciesTable } from 'Components/Emergencies';

const Emergencies = ({
  emergenciesState: { emergencies, loading, error },
  getAllEmergencies,
}) => {
  useEffect(() => {
    getAllEmergencies();
  }, []);

  return (
    <>
      <h1>Emergencies</h1>
      {!emergencies || !emergencies.length ? (
        <p>Not found</p>
      ) : (
        <EmergenciesTable data={emergencies} />
      )}
    </>
  );
};

Emergencies.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  getAllEmergencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  getAllEmergencies,
})(Emergencies);
