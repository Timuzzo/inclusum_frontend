import { useState, useEffect } from "react";

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:8080/posts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="posts">
      {posts.length ? (
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>
              <strong>title: </strong>
              {post.title}
            </p>
            <p>
              <strong>text: </strong>
              {post.body}
            </p>
          </div>
        ))
      ) : (
        <h1 style={{ color: "red" }}>No posts found</h1>
      )}
    </div>
  );
}
