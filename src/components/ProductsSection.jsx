import { memo } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`;

const ProductsSection = memo(
  ({ products, addToCart, toggleWishlist, wishlist }) => {
    return (
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))}
      </Grid>
    );
  }
);

export default ProductsSection;