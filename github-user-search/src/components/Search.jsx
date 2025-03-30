import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = ({ setUserData, setError, setLoading }) => {
  const [username, setUsername] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const user = await fetchUserData(username);
      setUserData(user);
    } catch (err) {
      setError('Looks like we can\'t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {setLoading && <p>Loading...</p>}

      {setError && <p style={{ color: 'red' }}>{setError}</p>}

      {setUserData && (
        <div>
          <img src={setUserData.avatar_url} alt={setUserData.login} width="100" />
          <h2>{setUserData.login}</h2>
          <p>{setUserData.bio}</p>
          <a href={setUserData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
