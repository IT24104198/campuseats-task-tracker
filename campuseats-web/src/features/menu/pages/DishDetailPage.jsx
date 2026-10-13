import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const CATEGORY_EMOJI = {
  Mains:   "🍽️",
  Snacks:  "🥪",
  Dessert: "🍮",
  Drinks:  "🥤",
};

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch("/menu.json");

  if (isLoading) {
    return (
      <main className="page">
        <div className="status-msg">⏳ Loading dish details…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="status-msg" style={{ color: "var(--red)" }}>
          ⚠️ Could not load dish: {error}
        </div>
      </main>
    );
  }

  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) {
    return (
      <main className="page">
        <Link to="/" className="back-link">Back to menu</Link>
        <div className="detail-card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤷</div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-heading)", marginBottom: 8 }}>
            Dish not found
          </h1>
          <p style={{ fontSize: 14, color: "var(--text)" }}>
            This dish does not exist or may have been removed.
          </p>
        </div>
      </main>
    );
  }

  const emoji = CATEGORY_EMOJI[dish.category] ?? "🍴";

  return (
    <main className="page">
      <Link to="/" className="back-link">Back to menu</Link>

      <div className="detail-card">
        <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 20 }} aria-hidden="true">
          {emoji}
        </div>

        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-heading)", marginBottom: 6 }}>
            {dish.name}
          </h1>
          <span className="badge badge-category">{dish.category}</span>
        </div>

        <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, marginBottom: 24 }}>
          {dish.description}
        </p>

        <div className="detail-meta">
          <div className="detail-meta-row">
            <span className="detail-meta-label">Price</span>
            <span className="detail-meta-value">Rs. {dish.price.toFixed(2)}</span>
          </div>
          <div className="detail-meta-row">
            <span className="detail-meta-label">Category</span>
            <span className="detail-meta-value">{dish.category}</span>
          </div>
          <div className="detail-meta-row">
            <span className="detail-meta-label">Availability</span>
            <span>
              {dish.available
                ? <span className="badge badge-available">Available now</span>
                : <span className="badge badge-soldout">Sold out</span>
              }
            </span>
          </div>
        </div>

        {dish.available && (
          <div style={{ marginTop: 28 }}>
            <Link to="/order" className="btn btn-primary" style={{ display: "inline-flex", textDecoration: "none" }}>
              Grab this dish
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default DishDetailPage;
