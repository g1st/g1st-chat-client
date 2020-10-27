import { baseUrl } from '../config';

const DeleteMessage = ({ id, setState, data }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      // delete from server
      fetch(`${baseUrl}/messages/${id}`, { method: 'delete' }).catch(
        (error) => {
          console.log(error);
        }
      );
      // delete from state
      data = data.filter((msg) => msg.id !== id);
      setState({ status: 'success', error: null, data });
    }
  };

  return (
    <button
      className="bg-red-300 hover:bg-red-700 text-white font-bold px-1 rounded-full text-xs"
      onClick={handleDelete}
    >
      X
    </button>
  );
};

export default DeleteMessage;
