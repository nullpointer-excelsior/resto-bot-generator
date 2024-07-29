import React from 'react';

type TextInputProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function TextInput({
  value,
  placeholder = "Enter text...",
  onChange,
  className = "",
}: Readonly<TextInputProps>) {
  return (
    <input
      className={`basis-4/5 py-2 px-4 border text-neutral-500 border-gray-300 shadow-xl rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
