import Message from './Message';

const Messages = ({ data, setState }) => {
  if (data.length === 0) {
    return <div className="mt-8">No messages found.</div>;
  }
  return (
    <ul>
      {data.map((msg) => (
        <Message key={msg.id} msg={msg} setState={setState} data={data} />
      ))}
    </ul>
  );
};

export default Messages;
