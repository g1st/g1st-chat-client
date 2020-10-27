import { useState } from 'react';
import useFetch from './hooks/useFetch';
import './App.css';
import { baseUrl } from './config';
import Messages from './components/Messages';
import Header from './components/Header';
import AddMessage from './components/AddMessage';

function App() {
  const [display, setDisplay] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [request, setRequest] = useState(false);

  let path = '';
  if (display === 'all') {
    path = 'messages';
  } else if (display === 'latest') {
    path = 'messages/latest';
  }
  const [{ status, error, data }, setState] = useFetch(
    `${baseUrl}/${path}`,
    1000 * 30, // refetch every 30s
    request
  );

  const fireRequest = () => {
    setRequest(!request);
  };

  const handleDisplayChange = (value) => {
    setDisplay(value);
    fireRequest();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setState({ status: 'loading', error: null, data: null });
    fetch(`${baseUrl}/messages/search?term=${searchTerm}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setState({ status: 'success', error: null, data });
      })
      .catch((error) => {
        setState({ status: 'error', error, data: null });
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div className="container mx-auto py-10 px-3 xl:px-0">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
            onClick={() => handleDisplayChange('all')}
          >
            ALL
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 mt-2 rounded"
            onClick={() => handleDisplayChange('latest')}
          >
            LATEST 5
          </button>
          <div className="sm:inline-block sm:ml-4 mt-2">
            <input
              className="px-4 py-2 rounded block sm:inline-block"
              type="text"
              name="search"
              placeholder="Search (backend)"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:ml-4 mt-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <AddMessage fireRequest={fireRequest} data={data} setState={setState} />
        {status === 'error' && <div>Error {error.message}</div>}
        {status === 'loading' && <div>Loading...</div>}
        {status === 'success' && (
          <Messages data={data} setState={setState}></Messages>
        )}
      </div>
    </div>
  );
}

export default App;
