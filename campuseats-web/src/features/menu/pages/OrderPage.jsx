import { useState } from "react";

const NAME_PATTERN = /^[\p{L}][\p{L}'-]*(?:\s[\p{L}][\p{L}'-]*)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v) {
  const e = {};
  const name = v.name.trim();
  if (name.length < 2 || name.length > 100)  e.name  = "Name must be 2-100 characters";
  else if (!NAME_PATTERN.test(name))         e.name  = "Name can only contain letters, spaces, hyphens and apostrophes";

  const email = v.email.trim();
  if (email.length > 254)                    e.email = "Email is too long";
  else if (!EMAIL_PATTERN.test(email))       e.email = "Enter a valid email address";

  if (Number(v.qty) < 1)                     e.qty   = "Quantity must be at least 1";
  return e;
}

function OrderPage() {
  const [form,   setForm]   = useState({ name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState({});
  const [done,   setDone]   = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear the field's error as the user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) {
    return (
      <main className="page page-centered">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Order received!</h2>
          <p>Thanks, <strong>{form.name}</strong>! Your food is being prepared. Head to the counter when you hear your name.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header page-header-center">
        <h1>Place an Order</h1>
        <p>Quick and easy. Tell us who you are and we'll get your food ready.</p>
      </div>

      <div className="order-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Kasun Perera"
              className={`form-input${errors.name ? " input-error" : ""}`}
              autoComplete="name"
            />
            {errors.name && (
              <span className="form-error" role="alert">⚠ {errors.name}</span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@university.lk"
              className={`form-input${errors.email ? " input-error" : ""}`}
              autoComplete="email"
            />
            {errors.email && (
              <span className="form-error" role="alert">⚠ {errors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="qty">Quantity</label>
            <input
              id="qty"
              name="qty"
              type="number"
              min="1"
              value={form.qty}
              onChange={handleChange}
              className={`form-input${errors.qty ? " input-error" : ""}`}
              style={{ maxWidth: 120 }}
            />
            {errors.qty && (
              <span className="form-error" role="alert">⚠ {errors.qty}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Yes, order this
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default OrderPage;
