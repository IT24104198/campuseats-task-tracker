// CampusEats task list

const tasks = [
  { title: "Design the menu screen", dueDate: "2026-09-25" },
  { title: "Build the orders API", dueDate: "2026-09-30" },
  { title: "Add user login", dueDate: "2026-10-05" },
];

function addDueDate(task, dueDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    throw new Error("dueDate must use YYYY-MM-DD format");
  }

  const parsedDate = new Date(`${dueDate}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== dueDate) {
    throw new Error("dueDate must be a valid calendar date");
  }

  return { ...task, dueDate };
}

console.log(`CampusEats has ${tasks.length} open tasks`);

module.exports = { tasks, addDueDate };

const VIP_DISCOUNT = 0.1;

function calculateTotal(price, quantity, customerType) {
  if (
    typeof price !== "number" ||
    typeof quantity !== "number" ||
    price < 0 ||
    quantity < 0
  ) {
    throw new Error("price and quantity must be valid non-negative numbers");
  }

  const subtotal = price * quantity;

  return customerType === "vip"
    ? subtotal * (1 - VIP_DISCOUNT)
    : subtotal;
}

module.exports = { calculateTotal };
