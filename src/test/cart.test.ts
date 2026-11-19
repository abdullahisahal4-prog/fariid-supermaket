import { describe, it, expect } from "vitest";
import { cartTotal, initialProducts, updateQuantity } from "@/lib/store-data";
describe("Shopping cart", () => {
  it("adds products and increases quantities", () => {
    expect(updateQuantity({ bananas: 1 }, "bananas", 1)).toEqual({ bananas: 2 });
  });
  it("decreases quantities and removes zero-quantity products", () => {
    expect(updateQuantity({ bananas: 1 }, "bananas", -1)).toEqual({});
  });
  it("automatically totals quantities at current prices in KSh", () => {
    expect(cartTotal(initialProducts, { bananas: 2, oil: 1 })).toBe(560);
  });
});
