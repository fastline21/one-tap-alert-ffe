import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import {
  getAllBarangays,
  getBarangay,
  createBarangay,
  updateBarangay,
  deleteBarangay,
  barangaysReset,
} from 'Services/Actions/barangays';

import { BarangaysTable, BarangaysModal } from 'Components/Barangays';
import Loading from 'Components/Loading';

const Barangays = ({
  barangaysState: { barangays, barangay, message, loading },
  getAllBarangays,
  getBarangay,
  createBarangay,
  updateBarangay,
  deleteBarangay,
  barangaysReset,
}) => {
  const initialModalInfo = {
    type: null, // create, view, edit, delete
    title: null, //
    body: null, //
    action: null, //
    show: false, // true, false
  };

  const [modalInfo, setModalInfo] = useState(initialModalInfo);

  const handleBarangay = ({ id, type }) => {
    getBarangay(id);
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
      updateBarangay(data);
    } else if (type === 'create') {
      createBarangay({ name: data.name });
    } else if (type === 'delete') {
      deleteBarangay({ id: data.id });
    }
  };

  useEffect(() => {
    getAllBarangays();

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (barangay) {
      if (modalInfo.type === 'view') {
        viewModal(barangay);
      } else if (modalInfo.type === 'edit') {
        editModal(barangay);
      } else if (modalInfo.type === 'delete') {
        deleteModal(barangay);
      }
    }

    if (message) {
      messageModal({ title: 'Success', message });
      barangaysReset();
      getAllBarangays();
    }

    return () => {
      return false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barangay, message]);

  if (loading && !barangays) {
    return <Loading />;
  }

  return (
    <>
      <BarangaysModal
        type={modalInfo.type}
        title={modalInfo.title}
        body={modalInfo.body}
        isShowModal={modalInfo.show}
        hideModal={() => setModalInfo(initialModalInfo)}
        submitForm={({ data, type }) => submitForm({ data, type })}
      />
      <h1>Barangays</h1>
      <div>
        <Button
          onClick={() =>
            setModalInfo({
              type: 'create',
              title: 'New Barangay',
              show: true,
            })
          }
        >
          New
        </Button>
      </div>
      {!barangays || !barangays.length ? (
        <p>Not found</p>
      ) : (
        <>
          <BarangaysTable
            data={barangays}
            getBarangayID={({ id, type }) => handleBarangay({ id, type })}
          />
        </>
      )}
    </>
  );
};

Barangays.propTypes = {
  barangaysState: PropTypes.object.isRequired,
  getAllBarangays: PropTypes.func.isRequired,
  getBarangay: PropTypes.func.isRequired,
  createBarangay: PropTypes.func.isRequired,
  updateBarangay: PropTypes.func.isRequired,
  deleteBarangay: PropTypes.func.isRequired,
  barangaysReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  barangaysState: state.barangaysState,
});

export default connect(mapStateToProps, {
  getAllBarangays,
  getBarangay,
  createBarangay,
  updateBarangay,
  deleteBarangay,
  barangaysReset,
})(Barangays);
