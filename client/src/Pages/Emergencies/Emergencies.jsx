import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllEmergencies } from 'Services/Actions/emergencies.action';

import { EmergenciesTable } from 'Components/Emergencies';

import Loading from 'Components/Loading';

const Emergencies = ({
  emergenciesState: { emergencies, loading, error },
  getAllEmergencies,
}) => {
  useEffect(() => {
    getAllEmergencies();
  }, []);

  if (loading || !emergencies) {
    return <Loading />;
  }

  return (
    <>
      <h1>Emergencies</h1>
      {!emergencies.length ? (
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
