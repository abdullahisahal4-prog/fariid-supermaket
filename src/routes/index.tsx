import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Tag,
  HeartHandshake,
  ShoppingBasket,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { useStore } from "@/components/store/store-provider";
import { categories } from "@/lib/store-data";
import hero from "@/assets/fresh-market.jpg";
import bananas from "@/assets/products/bananas.jpg";
import rice from "@/assets/products/rice.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fariid Supermarket | Fresh essentials. Fair prices." },
      {
        name: "description",
        content:
          "Welcome to Fariid Supermarket – Your Trusted Store for Everyday Needs. Shop fresh produce, groceries and household essentials at affordable prices in KSh.",
      },
      { property: "og:title", content: "Fariid Supermarket | Your everyday essentials" },
      {
        property: "og:description",
        content: "Fresh produce, quality groceries and everyday value at Fariid Supermarket.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
function Home() {
  const { products } = useStore();
  return (
    <main>
      <section className="hero">
        <img
          src={hero}
          alt="A basket of fresh vegetables and fruit at Fariid Supermarket"
          width={1600}
          height={912}
          fetchPriority="high"
        />
        <div className="site-width hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <Leaf />
              FRESH PICKS. EVERYDAY SAVINGS.
            </span>
            <h1>
              Fariid Supermarket.
              <br />
              Freshness for your
              <br />
              <span>everyday life.</span>
            </h1>
            <p>Welcome to Fariid Supermarket – Your Trusted Store for Everyday Needs.</p>
            <div className="hero-buttons">
              <Button asChild size="lg">
                <Link to="/shop" search={{ q: "", category: "all", offers: false }}>
                  Start Shopping
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/shop" search={{ q: "", category: "all", offers: true }}>
                  Explore Offers
                  <Tag />
                </Link>
              </Button>
            </div>
            <div className="hero-note">
              <ShieldCheck size={15} />
              Quality you trust. Prices you’ll love.
            </div>
          </div>
        </div>
        <div className="fresh-tag">
          <span>
            <Leaf />
          </span>
          <div>
            <strong>Fresh from the market</strong>
            <small>Picked with care, just for you</small>
          </div>
        </div>
      </section>
      <section className="benefits">
        <div className="site-width benefit-grid">
          {[
            { Icon: Leaf, title: "Fresh & Quality Products", text: "Goodness in every basket" },
            { Icon: Tag, title: "Everyday Affordable Prices", text: "More value for your money" },
            {
              Icon: ShoppingBasket,
              title: "All Your Essentials",
              text: "Everything you need, in one place",
            },
            {
              Icon: HeartHandshake,
              title: "Friendly Customer Service",
              text: "Always happy to help",
            },
          ].map(({ Icon, title, text }) => (
            <div className="benefit" key={title}>
              <Icon />
              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="site-width store-section">
        <div className="section-heading">
          <div>
            <h2>Shop by Category</h2>
            <p>From fresh favourites to everyday must-haves.</p>
          </div>
          <Link to="/shop" search={{ category: "all", q: "", offers: false }}>
            View all categories
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c) => (
            <Link
              to="/shop"
              search={{ category: c.id, q: "", offers: false }}
              className="category-tile"
              key={c.id}
            >
              <span aria-hidden="true">{c.icon}</span>
              <h3>{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="site-width store-section featured-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker">FRESH FINDS, GREAT PRICES</div>
            <h2>Featured Products</h2>
            <p>A little of everything your home needs.</p>
          </div>
          <Link to="/shop" search={{ category: "all", q: "", offers: false }}>
            View all products
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .slice(0, 6)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      <section className="site-width offers-band">
        <div className="offer-grid">
          <div className="offer-panel">
            <img src={bananas} width={384} height={384} loading="lazy" alt="Fresh bananas" />
            <div>
              <small>FRESHNESS YOU CAN TASTE</small>
              <h3>
                Nature’s best,
                <br />
                in your basket.
              </h3>
              <p>Fresh fruits & vegetables for every day.</p>
              <Link to="/shop" search={{ category: "fresh", q: "", offers: false }}>
                Shop fresh produce
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="offer-panel orange">
            <img src={rice} width={384} height={384} loading="lazy" alt="Premium rice" />
            <div>
              <small>BIG VALUE. EVERYDAY ESSENTIALS.</small>
              <h3>
                Stock up.
                <br />
                Spend less.
              </h3>
              <p>Your pantry favourites, at prices you’ll love.</p>
              <Link to="/shop" search={{ category: "all", q: "", offers: true }}>
                Discover special offers
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="sr-only">
        <BadgeCheck />
        Demonstration catalogue with sample products and prices.
      </div>
    </main>
  );
}
