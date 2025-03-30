import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = ({ setUserData, setError, setLoading }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const users = await fetchUserData(username, location, minRepos, page);
      setUserData(users);
    } catch (err) {
      setError('Looks like we can\'t find any users with that criteria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Min Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {setLoading && <p>Loading...</p>}

      {setError && <p className="text-red-500">{setError}</p>}

      {setUserData && (
        <div className="mt-6 space-y-4">
          {setUserData.items.map((user) => (
            <div key={user.login} className="border p-4 rounded-md">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <h2 className="text-xl font-bold">{user.login}</h2>
              <p className="text-gray-600">{user.location || 'No location provided'}</p>
              <p>Repositories: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          ))}
          {setUserData.total_count > 30 && (
            <button
              onClick={() => setPage(page + 1)}
              className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-700"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
