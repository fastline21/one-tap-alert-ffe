import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FireIncident = ({ count, link }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{count}</Card.Title>
        <Card.Text>Fire Incident</Card.Text>
        <Card.Link as={Link} to={link}>
          More info
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default FireIncident;
