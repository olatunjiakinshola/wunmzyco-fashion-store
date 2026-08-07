import { useState, useEffect } from "react";
import products from "../data/products";

export default function useWishlist(showToast) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    const product = products.find((p) => p.id === id);
    const isAlready = wishlist.includes(id);

    if (isAlready) {
      setWishlist((prev) => prev.filter((item) => item !== id));
      if (showToast) {
        showToast(`${product?.name || "Item"} removed from wishlist`);
      }
    } else {
      setWishlist((prev) => [...prev, id]);
      if (showToast) {
        showToast(`${product?.name || "Item"} added to wishlist`);
      }
    }
  };

  const wishlistItems = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return {
    wishlist,
    wishlistItems,
    toggleWishlist,
  };
}