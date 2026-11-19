import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { useStore } from "@/components/store/store-provider";
import { categories } from "@/lib/store-data";
export const Route = createFileRoute("/shop")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { q?: string; category?: string; offers?: boolean } => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category: typeof search["category"] === "string" ? search["category"] : "all",
    offers: search["offers"] === true || search["offers"] === "true",
  }),
  head: () => ({
    meta: [
      { title: "Shop groceries & special offers | Fariid Supermarket" },
      {
        name: "description",
        content:
          "Browse fresh produce, dairy, cooking oil, rice and everyday essentials at Fariid Supermarket. Sample prices in KSh.",
      },
      { property: "og:title", content: "Shop at Fariid Supermarket" },
      { property: "og:description", content: "Find your everyday favourites and special offers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});
function Shop() {
  const { q = "", category = "all", offers = false } = Route.useSearch();
  const { products } = useStore();
  const [sort, setSort] = useState("featured");
  const selectedCategory = categories.find((c) => c.id === category);
  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (!offers || p.oldPrice) &&
      p.name.toLowerCase().includes(q.toLowerCase()),
  );
  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <main>
      <section className="page-heading">
        <div className="site-width">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>Shop
          </div>
          <h1>{offers ? "Special Offers" : (selectedCategory?.name ?? "Shop All Products")}</h1>
          <p>
            {q
              ? `Results for “${q}”`
              : "Fresh favourites and everyday essentials, all in one place."}
          </p>
        </div>
      </section>
      <div className="site-width shop-layout">
        <aside className="shop-sidebar">
          <h2>Categories</h2>
          <Link
            to="/shop"
            search={{ category: "all", q: "", offers }}
            className={category === "all" ? "selected" : ""}
          >
            All Products
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ category: c.id, q: "", offers }}
              className={c.id === category ? "selected" : ""}
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </aside>
        <section>
          <div className="shop-toolbar">
            <span>{filtered.length} products · Sample catalogue</span>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
          {filtered.length ? (
            <div className="product-grid shop-products">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <Search className="mx-auto mb-4" size={32} />
              <h2>No products found</h2>
              <p>
                {q
                  ? "Try another search or browse all products."
                  : "More products will be added to this category soon."}
              </p>
              <Button asChild>
                <Link to="/shop" search={{ q: "", category: "all", offers: false }}>
                  Browse all products
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
