document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('username');
  const card = document.getElementById('card');
  const errorEl = document.getElementById('error');

  async function getUser(username) {
    errorEl.textContent = '';
    card.hidden = true;

    if (!username) {
      errorEl.textContent = '⚠️ Please enter a username';
      return;
    }

    try {
      // optional: show loading
      errorEl.textContent = 'Loading...';

      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('User not found');
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();

      document.getElementById('avatar').src = data.avatar_url;
      document.getElementById('name').textContent = data.name || data.login;
      document.getElementById('bio').textContent = data.bio || 'No bio available';
      document.getElementById('repos').textContent = data.public_repos ?? 0;
      document.getElementById('followers').textContent = data.followers ?? 0;
      document.getElementById('following').textContent = data.following ?? 0;
      document.getElementById('profile').href = data.html_url;

      card.hidden = false;
      errorEl.textContent = '';
    } catch (err) {
      card.hidden = true;
      errorEl.textContent = '❌ ' + (err.message || 'Something went wrong');
      console.error(err);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    getUser(input.value.trim());
  });
});
