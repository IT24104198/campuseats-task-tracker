import { Link } from "react-router-dom";


const CATEGORY_EMOJI = {
  Mains:   "🍽️",
  Snacks:  "🥪",
  Dessert: "🍮",
  Drinks:  "🥤",
};

function DishCard({ dish }) {
  const emoji = CATEGORY_EMOJI[dish.category] ?? "🍴";

  return (
    <Link to={`/dish/${dish.id}`} style={{ textDecoration: "none" }}>
      <article className="dish-card">
        <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 4 }} aria-hidden="true">
          {emoji}
        </div>

        <div className="dish-card-top">
          <h3 className="dish-name">{dish.name}</h3>
          <span className="dish-price">Rs.&nbsp;{dish.price.toFixed(2)}</span>
        </div>

        <div className="dish-card-footer">
          <span className="badge badge-category">{dish.category}</span>
          {dish.available
            ? <span className="badge badge-available">Available</span>
            : <span className="badge badge-soldout">Sold out</span>
          }
        </div>
      </article>
    </Link>
  );
}

export default DishCard;
