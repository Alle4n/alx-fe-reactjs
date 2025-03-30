import axios from 'axios';

export const fetchUserData = async (username, location, minRepos, page = 1) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

  let query = '';

  if (username) {
    query += `user:${username}`;
  }

  if (location) {
    if (query) query += ' ';
    query += `location:${location}`;
  }

  if (minRepos) {
    if (query) query += ' ';
    query += `repos:>=${minRepos}`;
  }

  const queryString = query ? `q=${query}` : '';

  const url = `https://api.github.com/search/users?q=${queryString}&page=${page}&per_page=30`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${apiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users. Please try again later.');
  }
};
