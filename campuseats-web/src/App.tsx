import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";
import "./index.css";

export default function App() {
  return (
    <>
      <nav className="app-nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-brand">
            <div className="nav-logo-mark" aria-hidden="true">🍛</div>
            <span className="nav-brand-name">
              Campus<span>Eats</span>
            </span>
          </NavLink>

          <div className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Menu
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Place Order
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/"        element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishDetailPage />} />
        <Route path="/order"   element={<OrderPage />} />
        <Route path="*"        element={
          <main className="page" style={{ textAlign: "center", paddingTop: 80 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
            <h1 style={{ fontSize: 24, color: "var(--text-heading)", marginBottom: 8 }}>Page not found</h1>
            <p style={{ fontSize: 14 }}>The page you're looking for doesn't exist.</p>
          </main>
        } />
      </Routes>

      <footer className="app-footer">
        © {new Date().getFullYear()} CampusEats. Fresh meals, right on campus.
      </footer>
    </>
  );
}
