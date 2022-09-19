import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TotalRegisterResident = ({ count, link }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{count}</Card.Title>
        <Card.Text>Total Register Resident</Card.Text>
        <Card.Link as={Link} to={link}>
          More info
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default TotalRegisterResident;
