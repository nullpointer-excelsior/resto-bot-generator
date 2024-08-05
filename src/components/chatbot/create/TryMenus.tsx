import React from 'react';

type Option = {
  imgSrc: string;
  description: string;
};

type OptionsProps = {
  options: Option[];
  onChange: (img: string) => void;
};

const TryMenus: React.FC<OptionsProps> = ({ options, onChange }) => {
  return (
    <div className="text-center bg-lime-700 p-6 rounded-lg">
      <h2 className="text-white text-lg mb-4">O <span className="font-bold">Prueba uno de estos:</span></h2>
      <div className="flex justify-center space-x-8">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center hover:cursor-pointer"
            onClick={() => onChange(option.imgSrc)}
          >
            <img
              src={option.imgSrc}
              alt={`Option ${index}`}
              className="w-16 h-16 rounded-full mb-2 transform transition-transform duration-200 hover:scale-125"
            />
            <span className="text-white text-sm">{option.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TryMenus;
