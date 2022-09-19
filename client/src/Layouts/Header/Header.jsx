import React from 'react';
import { Container, Navbar, Nav, Col, Image, Button } from 'react-bootstrap';

const Header = ({ logoutUser }) => {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Navbar expand="lg" sticky="top" className="flex-md-nowrap p-0 header">
      <Container fluid>
        <Col md={3} lg={2} className="me-0">
          <Navbar.Brand href="/">
            <Image
              fluid
              src={require('Assets/Images/logo.png')}
              className="d-inline-block align-top"
              width={48}
            />{' '}
            <span className="fs-6 header-text">One-Tap Alert FFE</span>
          </Navbar.Brand>
        </Col>
        <Nav className="ms-auto">
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
