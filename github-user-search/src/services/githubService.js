import axios from 'axios';

export const fetchUserData = async (username, location, minRepos, page) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  let query = `q=${username ? `user:${username}` : ''}`;

  if (location) {
    query += ` location:${location}`;
  }

  if (minRepos) {
    query += ` repos:>=${minRepos}`;
  }

  query += `&page=${page}&per_page=30`;

  try {
    const response = await axios.get(`https://api.github.com/search/users?${query}`, {
      headers: {
        'Authorization': `token ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};
