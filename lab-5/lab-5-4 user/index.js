const output = document.getElementById("output");
const btnFetch = document.getElementById("btn-fetch");
const btnClear = document.getElementById("btn-clear");
const userIdInput = document.getElementById("userId");

// handel
btnFetch.addEventListener("click", fetchParallel);
btnClear.addEventListener("click", () => output.innerHTML = "");

// xml
function renderData(user, posts) {
  output.innerHTML = `
    <div class="user">
      <h2>${user.name} (${user.username})</h2>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>City:</b> ${user.address.city}</p>
    </div>
    <div class="posts">
      <h3>Posts:</h3>
      ${posts.map(p => `
        <div class="post">
          <h4>${p.title}</h4>
          <p>${p.body}</p>
        </div>
      `).join(`<hr>`)}
    </div>
  `;
}

async function fetchParallel() {
  const userId = userIdInput.value;
  output.innerHTML = `<h3>Loading...</h3>`;

  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    ]);

    const user = await userRes.json();
    const posts = await postsRes.json();

    renderData(user, posts);
  } catch (err) {
    console.error("Error:", err);
    output.innerHTML = `<p class="error">Failed to fetch data.</p>`;
  }
}