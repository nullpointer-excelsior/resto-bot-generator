import React, { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    return (
        <div className="relative flex items-center group">
            {children}
            <div className="absolute bottom-full mb-2 hidden w-max px-2 py-1 text-xs text-white bg-gray-700 rounded shadow-lg group-hover:block">
                {text}
            </div>
        </div>
    );
}

export default Tooltip;
