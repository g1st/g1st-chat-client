const EditMessage = ({ handleEdit, edit }) => {
  const handleClick = () => {
    handleEdit();
  };

  return (
    <div
      className="inline-block ml-2 px-2 py-1 bg-blue-300 hover:bg-blue-500 cursor-pointer rounded text-xs"
      onClick={handleClick}
    >
      {edit ? 'Save' : 'Edit'}
    </div>
  );
};

export default EditMessage;
