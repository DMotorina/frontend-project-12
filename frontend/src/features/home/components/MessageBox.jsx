export const MessageBox = ({currentMessages}) => {
    return (
        <div id="message-box" className="chat-messages overflow-auto px-5">
            {currentMessages.length 
                ? currentMessages.map((message) => message) 
                : 'Сообщений пока нет'
            }
        </div>
    )
}