import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FloodIncident = ({ count, link }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{count}</Card.Title>
        <Card.Text>Flood Incident</Card.Text>
        <Card.Link as={Link} to={link}>
          More info
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default FloodIncident;
