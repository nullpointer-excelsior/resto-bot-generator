import { CoreMessage } from "ai";

function MessageIndicatorUser() {
    return (
        <div className="flex flex-row-reverse">
            <div className={`w-0 h-0 border-l-[0px] border-r-[25px] border-b-[20px] border-transparent border-b-lime-800 transform rotate-180`}></div>
        </div>
    )
}

function MessageIndicatorChatbot() {
    return (
        <div className="flex flex-row">
            <div className={`w-0 h-0 border-l-[25px] border-r-[0px] border-b-[20px] border-transparent border-b-gray-800 transform rotate-180`}></div>
        </div>
    )
}

export default function Message({ message }: Readonly<{ message: CoreMessage }>) {
    const { role, content } = message;
    const roleName = role === 'user' ? 'User' : 'RestoBot';
    const messageCssClasses = role === 'user' ? 'bg-lime-800 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-end' : 'bg-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl ';
    const messageDirectionFlexClass = role === 'user' ? 'flex-row-reverse' : 'flex-row';
    return (
        <div className={`flex ${messageDirectionFlexClass}`}>
            <div className='w-4/5 m-4'>
                <div className={`whitespace-pre-wrap p-4 px-8  text-neutral-300 shadow-md  ${messageCssClasses}`}>
                    <p className='text-xl font-semibold text-cyan-500'>{roleName}</p>
                    <p>{content as string}</p>
                </div>
                {role === 'user' ? <MessageIndicatorUser /> : <MessageIndicatorChatbot />}
            </div>
        </div>
    );
}