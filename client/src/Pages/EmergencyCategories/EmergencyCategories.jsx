import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import {
  getAllEmergencyCategories,
  getEmergencyCategory,
  createEmergencyCategory,
  updateEmergencyCategory,
  deleteEmergencyCategory,
  emergencyCategoriesReset,
} from 'Services/Actions/emergency-categories';

import {
  EmergencyCategoriesTable,
  EmergencyCategoriesModal,
} from 'Components/EmergencyCategories';
import Loading from 'Components/Loading';

const EmergencyCategories = ({
  emergencyCategoriesState: {
    emergencyCategories,
    emergencyCategory,
    message,
    loading,
  },
  getAllEmergencyCategories,
  getEmergencyCategory,
  createEmergencyCategory,
  updateEmergencyCategory,
  deleteEmergencyCategory,
  emergencyCategoriesReset,
}) => {
  const initialModalInfo = {
    type: null, // create, view, edit, delete
    title: null, //
    body: null, //
    action: null, //
    show: false, // true, false
  };

  const [modalInfo, setModalInfo] = useState(initialModalInfo);

  const handleEmergencyCategory = ({ id, type }) => {
    getEmergencyCategory(id);
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
      updateEmergencyCategory(data);
    } else if (type === 'create') {
      createEmergencyCategory({ name: data.name });
    } else if (type === 'delete') {
      deleteEmergencyCategory({ id: data.id });
    }
  };

  useEffect(() => {
    getAllEmergencyCategories();

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emergencyCategory) {
      if (modalInfo.type === 'view') {
        viewModal(emergencyCategory);
      } else if (modalInfo.type === 'edit') {
        editModal(emergencyCategory);
      } else if (modalInfo.type === 'delete') {
        deleteModal(emergencyCategory);
      }
    }

    if (message) {
      messageModal({ title: 'Success', message });
      emergencyCategoriesReset();
      getAllEmergencyCategories();
    }

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyCategory, message]);

  if (loading && !emergencyCategories) {
    return <Loading />;
  }

  return (
    <>
      <EmergencyCategoriesModal
        type={modalInfo.type}
        title={modalInfo.title}
        body={modalInfo.body}
        isShowModal={modalInfo.show}
        hideModal={() => setModalInfo(initialModalInfo)}
        submitForm={({ data, type }) => submitForm({ data, type })}
      />
      <h1>Emergency Categories</h1>
      <div>
        <Button
          onClick={() =>
            setModalInfo({
              type: 'create',
              title: 'New Emergency Category',
              show: true,
            })
          }
        >
          New
        </Button>
      </div>
      {!emergencyCategories || !emergencyCategories.length ? (
        <p>Not found</p>
      ) : (
        <>
          <EmergencyCategoriesTable
            data={emergencyCategories}
            getEmergencyCategoryID={({ id, type }) =>
              handleEmergencyCategory({ id, type })
            }
          />
        </>
      )}
    </>
  );
};

EmergencyCategories.propTypes = {
  emergencyCategoriesState: PropTypes.object.isRequired,
  getAllEmergencyCategories: PropTypes.func.isRequired,
  getEmergencyCategory: PropTypes.func.isRequired,
  createEmergencyCategory: PropTypes.func.isRequired,
  updateEmergencyCategory: PropTypes.func.isRequired,
  deleteEmergencyCategory: PropTypes.func.isRequired,
  emergencyCategoriesReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergencyCategoriesState: state.emergencyCategoriesState,
});

export default connect(mapStateToProps, {
  getAllEmergencyCategories,
  getEmergencyCategory,
  createEmergencyCategory,
  updateEmergencyCategory,
  deleteEmergencyCategory,
  emergencyCategoriesReset,
})(EmergencyCategories);
