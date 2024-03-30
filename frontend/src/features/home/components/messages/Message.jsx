const Message = ({ message, key }) => {
  const { username, body } = message;

  return (
    <div key={key} className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {body}
    </div>
  );
};

export default Message;
