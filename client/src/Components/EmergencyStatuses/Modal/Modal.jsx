import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmergencyStatusesModal = ({
  title,
  type,
  body,
  isShowModal,
  hideModal,
  submitForm,
}) => {
  const initialFormData = {
    id: null,
    name: null,
    description: null,
    message: null,
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const { id, name, description, message } = formData;

  const handleClose = () => {
    setShowModal(false);
    setFormData(initialFormData);
    hideModal();
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submitForm({ data: formData, type });
    handleClose();
  };

  useEffect(() => {
    if (showModal !== isShowModal) {
      setShowModal(isShowModal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowModal]);

  useEffect(() => {
    if (body) {
      const { _id: id, name, description, message } = body;
      setFormData({
        id,
        name,
        description,
        message,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {type === 'view' && (
            <>
              <Form.Group className="mb-3" controlId="formDataID">
                <Form.Label>ID: </Form.Label>
                <Form.Control value={id} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDataName">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" value={name} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDataDescription">
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  disabled
                />
              </Form.Group>
            </>
          )}
          {type === 'edit' && (
            <>
              <Form.Group className="mb-3" controlId="formDataID">
                <Form.Label>ID: </Form.Label>
                <Form.Control value={id} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDataName">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChangeInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDataDescription">
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  row={3}
                  value={description}
                  onChange={handleChangeInput}
                />
              </Form.Group>
            </>
          )}
          {type === 'message' && <p>{message}</p>}
          {type === 'create' && (
            <>
              <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  value={name || ''}
                  type="text"
                  name="name"
                  onChange={handleChangeInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  value={description || ''}
                  as="textarea"
                  name="description"
                  onChange={handleChangeInput}
                />
              </Form.Group>
            </>
          )}
          {type === 'delete' && <p>{message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Close
            </Button>
            {type !== 'view' && type !== 'message' && (
              <Button variant="primary" type="submit">
                Save
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EmergencyStatusesModal;
