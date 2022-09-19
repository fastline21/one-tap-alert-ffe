import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import {
  getAllEmergencyStatuses,
  getEmergencyStatus,
  createEmergencyStatus,
  updateEmergencyStatus,
  deleteEmergencyStatus,
  emergencyStatusesReset,
} from 'Services/Actions/emergency-statuses';

import {
  EmergencyStatusesTable,
  EmergencyStatusesModal,
} from 'Components/EmergencyStatuses';
import Loading from 'Components/Loading';

const EmergencyStatuses = ({
  emergencyStatusesState: {
    emergencyStatuses,
    emergencyStatus,
    message,
    loading,
  },
  getAllEmergencyStatuses,
  getEmergencyStatus,
  createEmergencyStatus,
  updateEmergencyStatus,
  deleteEmergencyStatus,
  emergencyStatusesReset,
}) => {
  const initialModalInfo = {
    type: null, // create, view, edit, delete
    title: null, //
    body: null, //
    action: null, //
    show: false, // true, false
  };

  const [modalInfo, setModalInfo] = useState(initialModalInfo);

  const handleEmergencyStatus = ({ id, type }) => {
    getEmergencyStatus(id);
    setModalInfo({
      type,
    });
  };

  const viewModal = (data) => {
    setModalInfo({
      ...modalInfo,
      title: `View ${data.name}`,
      body: data,
      show: true,
    });
  };

  const editModal = (data) => {
    setModalInfo({
      ...modalInfo,
      title: `Edit ${data.name}`,
      body: data,
      show: true,
    });
  };

  const deleteModal = (data) => {
    setModalInfo({
      ...modalInfo,
      title: `Delete ${data.name}`,
      body: {
        message: `Are you sure you want to delete ${data.name}?`,
        _id: data._id,
      },
      show: true,
    });
  };

  const messageModal = (data) => {
    setModalInfo({
      type: 'message',
      title: data.title,
      body: { message: data.message },
      show: true,
    });
  };

  const submitForm = ({ data, type }) => {
    if (type === 'edit') {
      updateEmergencyStatus(data);
    } else if (type === 'create') {
      createEmergencyStatus({ name: data.name });
    } else if (type === 'delete') {
      deleteEmergencyStatus({ id: data.id });
    }
  };

  useEffect(() => {
    getAllEmergencyStatuses();

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emergencyStatus) {
      if (modalInfo.type === 'view') {
        viewModal(emergencyStatus);
      } else if (modalInfo.type === 'edit') {
        editModal(emergencyStatus);
      } else if (modalInfo.type === 'delete') {
        deleteModal(emergencyStatus);
      }
    }

    if (message) {
      messageModal({ title: 'Success', message });
      emergencyStatusesReset();
      getAllEmergencyStatuses();
    }

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyStatus, message]);

  if (loading && !emergencyStatuses) {
    return <Loading />;
  }

  return (
    <>
      <EmergencyStatusesModal
        type={modalInfo.type}
        title={modalInfo.title}
        body={modalInfo.body}
        isShowModal={modalInfo.show}
        hideModal={() => setModalInfo(initialModalInfo)}
        submitForm={({ data, type }) => submitForm({ data, type })}
      />
      <h1>Emergency Statuses</h1>
      <div>
        <Button
          onClick={() =>
            setModalInfo({
              type: 'create',
              title: 'New Emergency Status',
              show: true,
            })
          }
        >
          New
        </Button>
      </div>
      {!emergencyStatuses || !emergencyStatuses.length ? (
        <p>Not found</p>
      ) : (
        <>
          <EmergencyStatusesTable
            data={emergencyStatuses}
            getEmergencyStatusID={({ id, type }) =>
              handleEmergencyStatus({ id, type })
            }
          />
        </>
      )}
    </>
  );
};

EmergencyStatuses.propTypes = {
  emergencyStatusesState: PropTypes.object.isRequired,
  getAllEmergencyStatuses: PropTypes.func.isRequired,
  getEmergencyStatus: PropTypes.func.isRequired,
  createEmergencyStatus: PropTypes.func.isRequired,
  updateEmergencyStatus: PropTypes.func.isRequired,
  deleteEmergencyStatus: PropTypes.func.isRequired,
  emergencyStatusesReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergencyStatusesState: state.emergencyStatusesState,
});

export default connect(mapStateToProps, {
  getAllEmergencyStatuses,
  getEmergencyStatus,
  createEmergencyStatus,
  updateEmergencyStatus,
  deleteEmergencyStatus,
  emergencyStatusesReset,
})(EmergencyStatuses);
