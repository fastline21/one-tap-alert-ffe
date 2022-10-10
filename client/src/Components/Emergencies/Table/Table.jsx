import React from 'react';
import { Table, Button } from 'react-bootstrap';

const EmergenciesTable = ({ data, getEmergencyID }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User ID</th>
          <th>Emergency Type</th>
          <th>Emergency Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.user_id}</td>
            <td>{data.emergency_type_id.name}</td>
            <td>{data.emergency_status_id.name}</td>
            <td>
              <Button
                onClick={() => getEmergencyID({ id: data._id, type: 'view' })}
              >
                View
              </Button>{' '}
              <Button
                onClick={() => getEmergencyID({ id: data._id, type: 'edit' })}
              >
                Edit
              </Button>{' '}
              <Button
                onClick={() => getEmergencyID({ id: data._id, type: 'delete' })}
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

export default EmergenciesTable;
