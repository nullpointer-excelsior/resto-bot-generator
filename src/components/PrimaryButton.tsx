import React from 'react'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function PrimaryButton({ className, children, ...props }: Readonly<PrimaryButtonProps>) {
    return (
        <button
            {...props}
            type="button"
            className={`py-2 px-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed ${className} `}
        >
            {children}
        </button>
    );
}