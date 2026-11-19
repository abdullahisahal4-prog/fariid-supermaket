import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, ArrowRight, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/store/store-provider";
import { cartTotal, money } from "@/lib/store-data";
export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Your Checkout | Fariid Supermarket" },
      {
        name: "description",
        content: "Review your Fariid Supermarket basket and preview your grocery order.",
      },
      { property: "og:title", content: "Fariid Supermarket Checkout" },
      { property: "og:description", content: "Review the essentials in your shopping basket." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});
function Checkout() {
  const { products, cart } = useStore();
  const [complete, setComplete] = useState(false);
  const total = cartTotal(products, cart);
  return (
    <main>
      <section className="page-heading">
        <div className="site-width">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>Checkout
          </div>
          <h1>Your next basket of goodness.</h1>
          <p>Review your items and shopping details.</p>
        </div>
      </section>
      {complete ? (
        <div className="site-width checkout-success">
          <CheckCircle size={52} />
          <h2>Your order preview is ready.</h2>
          <p>
            Your basket totals {money(total)}. This is a demonstration only: no order has been sent,
            no payment taken, and your basket is still available.
          </p>
          <Button asChild>
            <Link to="/shop" search={{ q: "", category: "all", offers: false }}>
              Continue shopping
              <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : total === 0 ? (
        <div className="site-width empty-cart">
          <ShoppingBasket size={45} />
          <h3>Your basket is empty</h3>
          <Button asChild>
            <Link to="/shop" search={{ q: "", category: "all", offers: false }}>
              Start shopping
              <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="site-width checkout-layout">
          <section>
            <h2>Customer details</h2>
            <div className="notice">
              Demonstration checkout. Live orders and payments will be available after the store is
              connected.
            </div>
            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                setComplete(true);
              }}
            >
              <div className="form-row">
                <label>
                  Full name
                  <input required autoComplete="name" placeholder="Your full name" />
                </label>
                <label>
                  Phone number
                  <input type="tel" required autoComplete="tel" placeholder="Your phone number" />
                </label>
              </div>
              <label>
                Email address (optional)
                <input type="email" autoComplete="email" placeholder="you@example.com" />
              </label>
              <label>
                Collection method
                <select>
                  <option>Collect from store</option>
                </select>
              </label>
              <label>
                Order notes (optional)
                <input placeholder="Anything you’d like us to know?" />
              </label>
              <Button type="submit" size="lg">
                Preview order
                <ArrowRight />
              </Button>
            </form>
          </section>
          <aside className="order-summary">
            <h2>Order summary</h2>
            {products
              .filter((p) => cart[p.id])
              .map((p) => (
                <div className="cart-item" key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <div>
                    <strong>{p.name}</strong>
                    <small>
                      {p.unit} × {cart[p.id]}
                    </small>
                  </div>
                  <strong>{money(p.price * (cart[p.id] ?? 0))}</strong>
                </div>
              ))}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{money(total)}</span>
            </div>
            <div className="summary-row">
              <span>Collection</span>
              <span>Free</span>
            </div>
            <div className="cart-total">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
            <Button variant="link" onClick={() => window.history.back()}>
              Continue shopping
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}
