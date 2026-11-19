import bananas from "@/assets/products/bananas.jpg";
import oil from "@/assets/products/oil.jpg";
import milk from "@/assets/products/milk.jpg";
import rice from "@/assets/products/rice.jpg";
import tomatoes from "@/assets/products/tomatoes.jpg";
import bread from "@/assets/products/bread.jpg";
export const categories = [
  { id: "fresh", name: "Fruits & Vegetables", icon: "🥦" },
  { id: "drinks", name: "Beverages & Drinks", icon: "🧃" },
  { id: "grains", name: "Rice, Flour & Cereals", icon: "🌾" },
  { id: "oil", name: "Cooking Oil", icon: "🫒" },
  { id: "dairy", name: "Milk & Dairy", icon: "🥛" },
  { id: "meat", name: "Meat & Frozen Foods", icon: "🥩" },
  { id: "household", name: "Household Products", icon: "🧽" },
  { id: "care", name: "Personal Care", icon: "🧴" },
  { id: "snacks", name: "Snacks & Biscuits", icon: "🍪" },
];
export type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  oldPrice?: number;
  image: string;
  featured?: boolean;
};
export const initialProducts: Product[] = [
  {
    id: "bananas",
    name: "Fresh Bananas",
    category: "fresh",
    unit: "1 kg",
    price: 120,
    oldPrice: 150,
    image: bananas,
    featured: true,
  },
  {
    id: "oil",
    name: "Golden Cooking Oil",
    category: "oil",
    unit: "1 litre",
    price: 320,
    oldPrice: 380,
    image: oil,
    featured: true,
  },
  {
    id: "milk",
    name: "Fresh Whole Milk",
    category: "dairy",
    unit: "1 litre",
    price: 110,
    image: milk,
    featured: true,
  },
  {
    id: "rice",
    name: "Premium Basmati Rice",
    category: "grains",
    unit: "2 kg",
    price: 450,
    oldPrice: 520,
    image: rice,
    featured: true,
  },
  {
    id: "tomatoes",
    name: "Fresh Tomatoes",
    category: "fresh",
    unit: "1 kg",
    price: 100,
    image: tomatoes,
    featured: true,
  },
  {
    id: "bread",
    name: "Fresh Sliced Bread",
    category: "snacks",
    unit: "400 g",
    price: 65,
    image: bread,
    featured: true,
  },
];
export type Cart = Record<string, number>;
export const money = (value: number) => `KSh ${value.toLocaleString("en-KE")}`;
export function cartTotal(products: Product[], cart: Cart) {
  return products.reduce((total, p) => total + p.price * (cart[p.id] ?? 0), 0);
}
export function updateQuantity(cart: Cart, id: string, delta: number): Cart {
  const next = { ...cart };
  const quantity = Math.max(0, (next[id] ?? 0) + delta);
  if (quantity === 0) delete next[id];
  else next[id] = quantity;
  return next;
}
