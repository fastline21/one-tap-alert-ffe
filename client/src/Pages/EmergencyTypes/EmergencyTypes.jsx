import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import {
  getAllEmergencyTypes,
  getEmergencyType,
  createEmergencyType,
  updateEmergencyType,
  deleteEmergencyType,
  emergencyTypesReset,
} from 'Services/Actions/emergency-types';

import {
  EmergencyTypesTable,
  EmergencyTypesModal,
} from 'Components/EmergencyTypes';
import Loading from 'Components/Loading';

const EmergencyTypes = ({
  emergencyTypesState: { emergencyTypes, emergencyType, message, loading },
  getAllEmergencyTypes,
  getEmergencyType,
  createEmergencyType,
  updateEmergencyType,
  deleteEmergencyType,
  emergencyTypesReset,
}) => {
  const initialModalInfo = {
    type: null, // create, view, edit, delete
    title: null, //
    body: null, //
    action: null, //
    show: false, // true, false
  };

  const [modalInfo, setModalInfo] = useState(initialModalInfo);

  const handleEmergencyType = ({ id, type }) => {
    getEmergencyType(id);
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
      updateEmergencyType(data);
    } else if (type === 'create') {
      createEmergencyType({ name: data.name });
    } else if (type === 'delete') {
      deleteEmergencyType({ id: data.id });
    }
  };

  useEffect(() => {
    getAllEmergencyTypes();

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emergencyType) {
      if (modalInfo.type === 'view') {
        viewModal(emergencyType);
      } else if (modalInfo.type === 'edit') {
        editModal(emergencyType);
      } else if (modalInfo.type === 'delete') {
        deleteModal(emergencyType);
      }
    }

    if (message) {
      messageModal({ title: 'Success', message });
      emergencyTypesReset();
      getAllEmergencyTypes();
    }

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyType, message]);

  if (loading && !emergencyTypes) {
    return <Loading />;
  }

  return (
    <>
      <EmergencyTypesModal
        type={modalInfo.type}
        title={modalInfo.title}
        body={modalInfo.body}
        isShowModal={modalInfo.show}
        hideModal={() => setModalInfo(initialModalInfo)}
        submitForm={({ data, type }) => submitForm({ data, type })}
      />
      <h1>Emergency Types</h1>
      <div>
        <Button
          onClick={() =>
            setModalInfo({
              type: 'create',
              title: 'New Emergency Type',
              show: true,
            })
          }
        >
          New
        </Button>
      </div>
      {!emergencyTypes || !emergencyTypes.length ? (
        <p>Not found</p>
      ) : (
        <>
          <EmergencyTypesTable
            data={emergencyTypes}
            getEmergencyTypeID={({ id, type }) =>
              handleEmergencyType({ id, type })
            }
          />
        </>
      )}
    </>
  );
};

EmergencyTypes.propTypes = {
  emergencyTypesState: PropTypes.object.isRequired,
  getAllEmergencyTypes: PropTypes.func.isRequired,
  getEmergencyType: PropTypes.func.isRequired,
  createEmergencyType: PropTypes.func.isRequired,
  updateEmergencyType: PropTypes.func.isRequired,
  deleteEmergencyType: PropTypes.func.isRequired,
  emergencyTypesReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergencyTypesState: state.emergencyTypesState,
});

export default connect(mapStateToProps, {
  getAllEmergencyTypes,
  getEmergencyType,
  createEmergencyType,
  updateEmergencyType,
  deleteEmergencyType,
  emergencyTypesReset,
})(EmergencyTypes);
