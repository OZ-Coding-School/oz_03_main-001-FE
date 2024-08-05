/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

interface AddressSearchProps {
  onClose: () => void;
  onSelectAddress: (data: any) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  onClose,
  onSelectAddress,
}) => {
  const handleComplete = (data: any) => {
    onSelectAddress(data);
    onClose();
  };

  return (
    <div className='bg-gray-500 fixed inset-0 z-50 flex items-center justify-center bg-opacity-75'>
      <div className='w-80 rounded bg-white p-6 shadow-lg'>
        <DaumPostcode onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default AddressSearch;
