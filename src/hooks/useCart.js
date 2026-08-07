import { useState, useEffect } from "react";

export default function useCart(showToast) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize = null) => {
    const size =
      selectedSize || product.selectedSize || product.sizes?.[0] || "M";
    const cartKey = `${product.id}-${size}`;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.cartKey === cartKey);
      if (existingItem) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          selectedSize: size,
          cartKey,
          quantity: 1,
        },
      ];
    });

    if (showToast) {
      showToast(`${product.name} (Size: ${size}) added to cart`);
    }
  };

  const increaseQuantity = (cartKey) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (cartKey) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
    if (showToast) showToast("Cart cleared successfully");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  };
}