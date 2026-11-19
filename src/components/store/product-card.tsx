import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "./store-provider";
import { money, type Product } from "@/lib/store-data";
export function ProductCard({ product }: { product: Product }) {
  const { cart, changeQuantity } = useStore();
  const quantity = cart[product.id] ?? 0;
  return (
    <article className="product-card">
      <div className="product-photo">
        {product.oldPrice && (
          <span className="discount">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
        <img src={product.image} alt={product.name} loading="lazy" width={384} height={384} />
      </div>
      <div className="product-details">
        <p className="product-unit">{product.unit}</p>
        <h3>{product.name}</h3>
        <div className="price-row">
          <strong>{money(product.price)}</strong>
          {product.oldPrice && <del>{money(product.oldPrice)}</del>}
        </div>
        {quantity === 0 ? (
          <Button variant="add" className="w-full" onClick={() => changeQuantity(product.id, 1)}>
            <ShoppingCart />
            Add to Cart
          </Button>
        ) : (
          <div className="quantity-control">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Decrease ${product.name}`}
              onClick={() => changeQuantity(product.id, -1)}
            >
              <Minus />
            </Button>
            <span>{quantity} in cart</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Increase ${product.name}`}
              onClick={() => changeQuantity(product.id, 1)}
            >
              <Plus />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
