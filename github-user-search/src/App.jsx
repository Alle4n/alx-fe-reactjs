import { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null); // Clear any previous errors
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      if (data.message === "Not Found") {
        setError("User not found");
        setUserData(null);
      } else {
        setUserData(data);
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <input 
        type="text" 
        placeholder="Enter GitHub username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{color: 'red'}}>{error}</p>}
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default App;
