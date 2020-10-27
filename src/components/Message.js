import { useState } from 'react';
import { formatDistance, parseISO } from 'date-fns';
import DeleteMessage from './DeleteMessage';
import EditMessage from './EditMessage';
import { baseUrl } from '../config';

const Message = ({ msg, setState, data }) => {
  const [edit, setEdit] = useState(false);
  const [msgText, setMsgText] = useState(msg.text);
  const [msgFrom, setMsgFrom] = useState(msg.from);

  const handleEdit = () => {
    if (edit) {
      msg.text = msgText;
      msg.from = msgFrom;
      // update in server
      fetch(`${baseUrl}/messages/edit/${msg.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(msg),
      }).catch((err) => console.log(err));
    }
    // update in client
    let updatedData = data.map((message) => {
      if (message.id === msg.id) {
        message.text = msgText;
        message.from = msgFrom;
      }
      return message;
    });
    setState({ status: 'success', error: null, data: updatedData });
    setEdit(!edit);
  };

  const handleTextChange = (e) => {
    setMsgText(e.target.value);
  };

  const handleFromChange = (e) => {
    setMsgFrom(e.target.value);
  };

  return (
    <li key={msg.id} className="bg-blue-200 rounded my-6 px-3 py-3">
      <div className="mb-4">
        <DeleteMessage id={msg.id} setState={setState} data={data} />
        <EditMessage edit={edit} handleEdit={handleEdit} />
      </div>
      {edit ? (
        <input
          className="mb-2 w-full px-2 py-1 rounded"
          value={msgText}
          onChange={handleTextChange}
        />
      ) : (
        <div className="mb-2">{msg.text}</div>
      )}
      <div className="text-right">
        <span className="text-gray-600">
          {formatDistance(parseISO(msg.timeSent), new Date())} ago by{' '}
        </span>
        {edit ? (
          <input
            className=" px-2 py-1 rounded"
            value={msgFrom}
            onChange={handleFromChange}
          />
        ) : (
          <span className="text-gray-800">{msg.from}</span>
        )}
      </div>
    </li>
  );
};

export default Message;
