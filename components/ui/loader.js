import React from 'react';

const Loader = () => {
  return (
    <div className='flex justify-center items-center text-gray-800'>
      <div
        className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
        role='status'
      >
        <span className='visually-hidden'></span>
      </div>
    </div>
  );
};

export default Loader;
