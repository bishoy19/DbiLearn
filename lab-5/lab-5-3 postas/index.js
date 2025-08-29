const postsContainer = document.getElementById("posts");
const btnAsync = document.getElementById("btn-async");
const btnClear = document.getElementById("btn-clear");

btnAsync.addEventListener("click", fetchPostsAsync);
btnClear.addEventListener("click", clearPosts);

async function fetchPostsAsync() {
  postsContainer.innerHTML = "<h3>Loading posts...</h3>";
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts = await res.json();
    postsContainer.innerHTML = "";

    for (let post of posts) {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <div class="comments">Loading comments...</div>
      `;
      postsContainer.appendChild(postEl);
      try {
        const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
        const comments = await resComments.json();
        const commentsDiv = postEl.querySelector(".comments");
        commentsDiv.innerHTML = "<h4>Comments:</h4>";
        comments.forEach(comment => {
          const c = document.createElement("div");
          c.classList.add("comment");
          c.innerHTML = `<b>${comment.email}:</b> ${comment.body}`;
          commentsDiv.appendChild(c);
        });
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
}
function clearPosts() {
  postsContainer.innerHTML = "";
}