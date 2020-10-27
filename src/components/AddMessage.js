import { useState } from 'react';
import { baseUrl } from '../config';

const AddMessage = ({ fireRequest, data, setState }) => {
  const [text, setText] = useState('');
  const [from, setFrom] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'text') {
      setText(value);
    } else if (name === 'from') {
      setFrom(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // add in server
    fetch(`${baseUrl}/messages`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, from }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.message);
        }
      })
      .catch((err) => setError(error.message));

    // add in client
    const updatedData = [
      {
        id: Math.floor(Math.random() * 9999),
        text,
        from,
        timeSent: new Date().toISOString(),
      },
      ...data,
    ];
    setState({ status: 'success', error: null, data: updatedData });

    resetForm();
  };

  const resetForm = () => {
    setText('');
    setFrom('');
  };

  return (
    <div>
      <form className="py-4" onSubmit={handleSubmit}>
        <textarea
          className="px-4 py-2 rounded w-full max-w-xl block"
          rows={4}
          type="text"
          name="text"
          value={text}
          onChange={handleChange}
          placeholder="Your message"
          required
        />
        <input
          className="px-4 py-2 mt-2 mr-4 rounded"
          type="text"
          name="from"
          value={from}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
          type="submit"
          value="Post"
        >
          Post
        </button>
      </form>
      {error && <div className="text-sm text-red-700">Error: {error}</div>}
    </div>
  );
};

export default AddMessage;
