import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBasket,
  ShoppingCart,
  Search,
  ChevronDown,
  MapPin,
  ArrowRight,
  Minus,
  Plus,
  Menu,
  Leaf,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useStore } from "./store-provider";
import { cartTotal, money } from "@/lib/store-data";
export function StoreShell({ children }: { children: React.ReactNode }) {
  const { products, cart, changeQuantity, cartOpen, setCartOpen } = useStore();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = cartTotal(products, cart);
  function findProducts(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: search, category: "all", offers: false } });
  }
  return (
    <>
      <div className="announcement">
        <div className="site-width">
          <span>
            <Leaf size={13} /> Fresh essentials. Fair prices. Every day.
          </span>
          <Link to="/contact">
            Your neighbourhood supermarket <ArrowRight size={13} />
          </Link>
        </div>
      </div>
      <header className="store-header">
        <div className="site-width header-main">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <ShoppingBasket />
            </span>
            <span>
              Fariid<span className="brand-subtitle">SUPERMARKET</span>
            </span>
          </Link>
          <form className="header-search" onSubmit={findProducts}>
            <Search size={19} />
            <input
              aria-label="Search products"
              placeholder="Search for products, brands and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" aria-label="Submit product search">
              <ArrowRight />
            </Button>
          </form>
          <Link to="/contact" className="store-location">
            <MapPin />
            <span>
              <small>Fresh finds, close to home</small>Visit our store <ChevronDown size={12} />
            </span>
          </Link>
          <Button
            variant="ghost"
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${count} items`}
          >
            <span className="cart-icon">
              <ShoppingCart />
              <b>{count}</b>
            </span>
            <span>
              <small>My Cart</small>
              <strong>{money(total)}</strong>
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </Button>
        </div>
        <nav className={`site-width nav-row ${mobileOpen ? "nav-open" : ""}`}>
          <Button asChild variant="category">
            <Link to="/shop" search={{ category: "all", q: "", offers: false }}>
              <Menu />
              Browse Categories
              <ChevronDown />
            </Link>
          </Button>
          <div className="nav-links">
            <Link to="/" activeProps={{ className: "active" }} activeOptions={{ exact: true }}>
              Home
            </Link>
            <Link to="/shop" search={{ category: "all", q: "", offers: false }}>
              Shop All
            </Link>
            <Link to="/shop" search={{ category: "all", q: "", offers: true }}>
              Special Offers <span className="nav-offer">HOT</span>
            </Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <Link to="/contact" className="whatsapp-nav">
            <MessageCircle size={18} />
            Order on WhatsApp
          </Link>
        </nav>
      </header>
      {children}
      <footer className="store-footer">
        <div className="site-width footer-main">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <ShoppingBasket />
            </span>
            <span>
              Fariid<span className="brand-subtitle">SUPERMARKET</span>
            </span>
          </Link>
          <p>Your trusted store for everyday needs.</p>
          <div>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Store management</Link>
          </div>
        </div>
        <div className="site-width footer-bottom">
          <span>© {new Date().getFullYear()} Fariid Supermarket. All rights reserved.</span>
          <span>
            <ShieldCheck size={14} />
            Quality you can trust
          </span>
        </div>
      </footer>
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="cart-dialog">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBasket />
            Your shopping cart
          </DialogTitle>
          <DialogDescription>{count} items in your basket</DialogDescription>
          {count === 0 ? (
            <div className="empty-cart">
              <ShoppingBasket size={45} />
              <h3>Your basket is waiting</h3>
              <p>Fill it with something fresh.</p>
              <Button onClick={() => setCartOpen(false)}>
                Continue shopping <ArrowRight />
              </Button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {products
                  .filter((p) => cart[p.id])
                  .map((p) => (
                    <div key={p.id} className="cart-item">
                      <img src={p.image} alt={p.name} />
                      <div>
                        <strong>{p.name}</strong>
                        <small>{money(p.price)}</small>
                        <div className="quantity-control">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Decrease ${p.name} in cart`}
                            onClick={() => changeQuantity(p.id, -1)}
                          >
                            <Minus />
                          </Button>
                          <span>{cart[p.id]}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Increase ${p.name} in cart`}
                            onClick={() => changeQuantity(p.id, 1)}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>
                      <strong>{money(p.price * (cart[p.id] ?? 0))}</strong>
                    </div>
                  ))}
              </div>
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>{money(total)}</strong>
              </div>
              <Button asChild onClick={() => setCartOpen(false)}>
                <Link to="/checkout">
                  Go to checkout
                  <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
