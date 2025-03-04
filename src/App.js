import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const submitPost = async () => {
    await axios.post("http://127.0.0.1:8000/posts", {
      title,
      content,
    });
    setTitle("");
    setContent("");
    window.location.reload();
  };

  return (
    <div>
      <h1>Blog Writing App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={submitPost}>Submit</button>
      </div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
