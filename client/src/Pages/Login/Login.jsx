import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { loginUser } from 'Services/Actions/auth';

import Loading from 'Components/Loading';

const Login = ({ authState: { user }, loginUser }) => {
  const navigate = useNavigate();

  const initialFormData = {
    username: null,
    password: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const { username, password } = formData;

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser(formData);
    setIsLoading(true);

    setFormData(initialFormData);
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      navigate('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="text-center">
          <Image
            src={require('Assets/Images/logo.png')}
            fluid
            className="logo-login"
          />
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username || ''}
                onChange={handleChangeInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password || ''}
                onChange={handleChangeInput}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  authState: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, { loginUser })(Login);
