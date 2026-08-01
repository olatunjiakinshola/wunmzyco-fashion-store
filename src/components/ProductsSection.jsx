import { memo } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
`;

const ProductsSection = memo(
  ({ products, addToCart, toggleWishlist, wishlist, onOpenModal }) => {
    if (!products || products.length === 0) {
      return (
        <p
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "#888",
          }}
        >
          No products found in this category.
        </p>
      );
    }

    return (
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onOpenModal={onOpenModal}
          />
        ))}
      </Grid>
    );
  }
);

export default ProductsSection;