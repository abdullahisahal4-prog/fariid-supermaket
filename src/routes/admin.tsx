import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Package, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useStore } from "@/components/store/store-provider";
import { categories, money, type Product } from "@/lib/store-data";
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store Management Demo | Fariid Supermarket" },
      {
        name: "description",
        content:
          "Preview product management for Fariid Supermarket. This is a public demonstration, not a live administrator dashboard.",
      },
      { property: "og:title", content: "Fariid Supermarket Management Demo" },
      { property: "og:description", content: "Sample product management workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});
function Admin() {
  const { products, setProducts, changeQuantity, cart } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("products");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  function edit(p?: Product) {
    setEditing(p ?? null);
    setImage(p?.image ?? "");
    setError("");
    setOpen(true);
  }
  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!image) {
      setError("Please upload a product image.");
      return;
    }
    const product: Product = {
      id: editing?.id ?? crypto.randomUUID(),
      name: String(data.get("name")),
      price: Number(data.get("price")),
      category: String(data.get("category")),
      unit: String(data.get("unit")),
      image,
      featured: true,
    };
    if (data.get("oldPrice")) {
      const previous = Number(data.get("oldPrice"));
      if (previous <= product.price) {
        setError("Original price must be higher than the current price.");
        return;
      }
      product.oldPrice = previous;
    }
    setProducts((current) =>
      editing ? current.map((p) => (p.id === editing.id ? product : p)) : [...current, product],
    );
    setOpen(false);
  }
  return (
    <main>
      <section className="page-heading">
        <div className="site-width">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>Store Management
          </div>
          <h1>Store management</h1>
          <p>Product catalogue demonstration</p>
        </div>
      </section>
      <section className="site-width admin-layout">
        <div className="notice">
          Public demonstration only. Changes last for this visit and do not affect a live store.
          Secure administrator access and real customer orders require a connected store.
        </div>
        <div className="admin-tabs">
          <Button
            variant={tab === "products" ? "default" : "ghost"}
            onClick={() => setTab("products")}
          >
            <Package />
            Products
          </Button>
          <Button variant={tab === "orders" ? "default" : "ghost"} onClick={() => setTab("orders")}>
            <ClipboardList />
            Orders
          </Button>
        </div>
        {tab === "orders" ? (
          <div className="empty-results">
            <ClipboardList className="mx-auto mb-4" size={35} />
            <h2>No live orders yet</h2>
            <p>Customer orders will appear here after a store is connected.</p>
          </div>
        ) : (
          <>
            <div className="admin-heading">
              <h2>Products ({products.length})</h2>
              <Button onClick={() => edit()}>
                <Plus />
                Add product
              </Button>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="admin-product">
                          <img src={p.image} alt={p.name} />
                          <span>
                            {p.name}
                            <small className="block text-muted-foreground">{p.unit}</small>
                          </span>
                        </div>
                      </td>
                      <td>{categories.find((c) => c.id === p.category)?.name}</td>
                      <td>{money(p.price)}</td>
                      <td>
                        <div className="admin-actions">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label={`Edit ${p.name}`}
                            onClick={() => edit(p)}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Remove ${p.name}`}
                            onClick={() => setDeleteId(p.id)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="cart-dialog">
          <DialogTitle>{editing ? "Edit product" : "Add product"}</DialogTitle>
          <DialogDescription>
            Changes apply to this demonstration for your current visit.
          </DialogDescription>
          <form className="admin-form" onSubmit={save}>
            <label>
              Product name
              <input name="name" required defaultValue={editing?.name} />
            </label>
            <div className="form-row">
              <label>
                Price (KSh)
                <input
                  name="price"
                  required
                  type="number"
                  min="1"
                  step="1"
                  defaultValue={editing?.price}
                />
              </label>
              <label>
                Original price (optional)
                <input
                  name="oldPrice"
                  type="number"
                  min="1"
                  step="1"
                  defaultValue={editing?.oldPrice}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Category
                <select name="category" defaultValue={editing?.category ?? "fresh"}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Size or unit
                <input name="unit" required defaultValue={editing?.unit} placeholder="e.g. 1 kg" />
              </label>
            </div>
            <label>
              Product image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    setError("Choose an image smaller than 5 MB.");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") setImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {image && <img className="upload-preview" src={image} alt="Product preview" />}
            {error && (
              <p role="alert" className="text-destructive text-xs my-3">
                {error}
              </p>
            )}
            <Button className="w-full mt-4" type="submit">
              Save product
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <DialogContent>
          <DialogTitle>Remove product?</DialogTitle>
          <DialogDescription>
            This product will be removed from the demonstration catalogue and your basket.
          </DialogDescription>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!deleteId) return;
                changeQuantity(deleteId, -(cart[deleteId] ?? 0));
                setProducts((current) => current.filter((p) => p.id !== deleteId));
                setDeleteId(null);
              }}
            >
              Remove product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
