import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ThreeDots height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
