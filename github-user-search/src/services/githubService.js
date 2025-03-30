import axios from 'axios';

export const fetchUserData = async (username, location, minRepos, page) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  
  // Construct the search query
  let query = `${username ? `user:${username}` : ''}`;

  if (location) {
    query += ` location:${location}`;
  }

  if (minRepos) {
    query += ` repos:>=${minRepos}`;
  }

  // Complete query for GitHub API
  query = query ? `q=${query}` : ''; // Only append `q=` if there’s any valid query

  try {
    // Fetch user data with advanced search criteria
    const response = await axios.get(`https://api.github.com/search/users?${query}&page=${page}&per_page=30`, {
      headers: {
        'Authorization': `token ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};
