import React from 'react';
import { Image } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="loading">
      <Image src={require('Assets/Images/loading.gif')} fluid />
      <h3>Loading</h3>
    </div>
  );
};

export default Loading;
