import React from 'react';
import { Table, Button } from 'react-bootstrap';

const EmergencyStatusesTable = ({ data, getEmergencyStatusID }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>
              <Button
                onClick={() =>
                  getEmergencyStatusID({ id: data._id, type: 'view' })
                }
              >
                View
              </Button>{' '}
              <Button
                onClick={() =>
                  getEmergencyStatusID({ id: data._id, type: 'edit' })
                }
              >
                Edit
              </Button>{' '}
              <Button
                onClick={() =>
                  getEmergencyStatusID({ id: data._id, type: 'delete' })
                }
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmergencyStatusesTable;
