import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

    // Read API base URL from environment variable (Vite convention: VITE_*)
  const API_BASE = import.meta.env.VITE_API_URL;
  const apiUrl = API_BASE ? `${API_BASE}/api/menu` : "/menu.json";
  const { data: dishes, isLoading, error } = useFetch(apiUrl);

  if (isLoading) {
    return (
      <main className="page">
        <div className="status-msg">
          <span>⏳</span> Loading menu…
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="status-msg" style={{ color: "var(--red)" }}>
          <span>⚠️</span> Could not load menu: {error}
        </div>
      </main>
    );
  }

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <main className="page">
      <div className="page-header">
        <h1>Today's Menu</h1>
        <p>Hot meals, snacks and drinks freshly prepared right here on campus</p>
      </div>

      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes…"
          aria-label="Search menu"
          type="search"
        />
      </div>

      <MenuList dishes={filtered} />
    </main>
  );
}

export default MenuPage;
