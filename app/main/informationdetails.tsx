import React from 'react';

const InformationDetails: React.FC = () => {
  return (
    <div className="flex-grow p-4 border border-gray-300 overflow-y-auto ml-5">
      <h2 className="text-xl font-bold mb-4">Information Details</h2>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="border border-black h-12"></div>
        ))}
      </div>
    </div>
  );
};

export default InformationDetails;
