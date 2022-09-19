import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import {
  getAllUserTypes,
  getUserType,
  createUserType,
  updateUserType,
  deleteUserType,
  userTypesReset,
} from 'Services/Actions/user-types';

import { UserTypesTable, UserTypesModal } from 'Components/UserTypes';
import Loading from 'Components/Loading';

const UserTypes = ({
  userTypesState: { userTypes, userType, message, loading },
  getAllUserTypes,
  getUserType,
  createUserType,
  updateUserType,
  deleteUserType,
  userTypesReset,
}) => {
  const initialModalInfo = {
    type: null, // create, view, edit, delete
    title: null, //
    body: null, //
    action: null, //
    show: false, // true, false
  };

  const [modalInfo, setModalInfo] = useState(initialModalInfo);

  const handleUserType = ({ id, type }) => {
    getUserType(id);
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
      updateUserType(data);
    } else if (type === 'create') {
      createUserType({ name: data.name });
    } else if (type === 'delete') {
      deleteUserType({ id: data.id });
    }
  };

  useEffect(() => {
    getAllUserTypes();

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userType) {
      if (modalInfo.type === 'view') {
        viewModal(userType);
      } else if (modalInfo.type === 'edit') {
        editModal(userType);
      } else if (modalInfo.type === 'delete') {
        deleteModal(userType);
      }
    }

    if (message) {
      messageModal({ title: 'Success', message });
      userTypesReset();
      getAllUserTypes();
    }

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, message]);

  if (loading && !userTypes) {
    return <Loading />;
  }

  return (
    <>
      <h1>User Types</h1>
      {!userTypes ? (
        <p>not found</p>
      ) : (
        <>
          <UserTypesModal
            type={modalInfo.type}
            title={modalInfo.title}
            body={modalInfo.body}
            isShowModal={modalInfo.show}
            hideModal={() => setModalInfo(initialModalInfo)}
            submitForm={({ data, type }) => submitForm({ data, type })}
          />
          <div>
            <Button
              onClick={() =>
                setModalInfo({
                  type: 'create',
                  title: 'New User Type',
                  show: true,
                })
              }
            >
              New
            </Button>
          </div>
          <UserTypesTable
            data={userTypes}
            getUserTypeID={({ id, type }) => handleUserType({ id, type })}
          />
        </>
      )}
    </>
  );
};

UserTypes.propTypes = {
  userTypesState: PropTypes.object.isRequired,
  getAllUserTypes: PropTypes.func.isRequired,
  getUserType: PropTypes.func.isRequired,
  createUserType: PropTypes.func.isRequired,
  updateUserType: PropTypes.func.isRequired,
  deleteUserType: PropTypes.func.isRequired,
  userTypesReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userTypesState: state.userTypesState,
});

export default connect(mapStateToProps, {
  getAllUserTypes,
  getUserType,
  createUserType,
  updateUserType,
  deleteUserType,
  userTypesReset,
})(UserTypes);
