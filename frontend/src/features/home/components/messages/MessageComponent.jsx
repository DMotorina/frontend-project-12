import { Col } from 'react-bootstrap';

import MessagesHeader from './MessagesHeader';
import Message from './Message';
import MessagesForm from './MessagesForm';

const MessageComponent = ({
  activeChannel, activeChannelMessages, handleSubmit,
  inputMessage, handleChangeInputMessage, inputElement,
}) => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <MessagesHeader
        activeChannel={activeChannel}
        activeChannelMessages={activeChannelMessages}
      />

      <div id="message-box" className="chat-messages overflow-auto px-5">
        {activeChannelMessages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>

      <MessagesForm
        handleSubmit={handleSubmit}
        inputMessage={inputMessage}
        handleChangeInputMessage={handleChangeInputMessage}
        inputElement={inputElement}
      />
    </div>
  </Col>
);

export default MessageComponent;
