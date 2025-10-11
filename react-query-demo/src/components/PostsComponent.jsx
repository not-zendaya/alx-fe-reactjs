import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

 function PostsComponent() {
  const PostsComponent = ({ onBack }) => {
    const {
        data,
        error,
        isLoading,
        isError,
        refetch
    } = useQuery('posts', fetchPosts, {
        cacheTime: 1000 * 60 * 5,          // ⏱ Cache data for 5 minutes
        refetchOnWindowFocus: false,       // 🚫 Prevent refetch when tab/window is refocused
        keepPreviousData: true,            // 🧠 Keep old data while new data is loading
    });
  }
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PostsComponent;