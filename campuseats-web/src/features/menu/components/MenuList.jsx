import DishCard from "./DishCard";

function MenuList({ dishes }) {
  if (!dishes.length) {
    return (
      <div className="menu-grid">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p>No dishes match your search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default MenuList;
