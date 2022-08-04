import axios from 'axios';

const github = axios.create({
  headers: { Authorization: 'token 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' },
});

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(
    `https://api.github.com/search/users?${params}`
  );

  return response.data.items;
};

// get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`https://api.github.com/users/${login}`),
    github.get(`https://api.github.com/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
