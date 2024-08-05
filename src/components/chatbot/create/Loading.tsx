
interface LoadingProps {
    message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white text-blue-500" role="output">
            </div>
            <span className="text-lg font-medium text-gray-500">{message}</span>
        </div>
    );
};

export default Loading