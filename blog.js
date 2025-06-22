let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";
  [...posts].reverse().forEach((post, index) => {
    const postEl = document.createElement("article");
    postEl.className = "post";
    postEl.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <div class="actions">
        <button onclick="editPost(${index})">Edit</button>
        <button onclick="deletePost(${index})">Delete</button>
      </div>
    `;
    container.appendChild(postEl);
  });
}

function editPost(index) {
  const newTitle = prompt("Edit title", posts[index].title);
  const newContent = prompt("Edit content", posts[index].content);
  if (newTitle && newContent) {
    posts[index] = { title: newTitle, content: newContent };
    savePosts();
    renderPosts();
  }
}

function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
}

document.getElementById("blogForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (title && content) {
    posts.push({ title, content });
    savePosts();
    renderPosts();
    e.target.reset();
  }
});

renderPosts();