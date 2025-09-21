import { useState } from "react";
import searchUser from "./components/Search";

export default function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const results = await searchUsers(query.trim());
      setUsers(results);
    } catch (err) {
      setError(" Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>GitHub User Search</h1>
      <searchUser />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub users..."
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "8px", padding: "8px 12px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li
            key={u.id}
            style={{ margin: "12px 0", display: "flex", alignItems: "center" }}
          >
            <img
              src={u.avatar_url}
              alt={u.login}
              width="48"
              height="48"
              style={{ borderRadius: "50%" }}
            />
            <div style={{ marginLeft: "12px" }}>
              <div><strong>{u.login}</strong></div>
              <a href={u.html_url} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
