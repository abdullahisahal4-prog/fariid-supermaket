import { createContext, useContext, useState, type ReactNode } from "react";
import { initialProducts, updateQuantity, type Cart, type Product } from "@/lib/store-data";
type Store = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: Cart;
  changeQuantity: (id: string, delta: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};
const StoreContext = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        changeQuantity: (id, delta) => setCart((current) => updateQuantity(current, id, delta)),
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("StoreProvider is required");
  return store;
}
