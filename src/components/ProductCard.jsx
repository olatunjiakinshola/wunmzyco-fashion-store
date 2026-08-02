import { memo } from "react";
import styled from "styled-components";
import { Heart, ShoppingCart } from "lucide-react";

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  opacity: ${(props) => (props.$outOfStock ? 0.75 : 1)};

  &:hover {
    transform: ${(props) => (props.$outOfStock ? "none" : "translateY(-4px)")};
    box-shadow: ${(props) =>
      props.$outOfStock
        ? "0 2px 10px rgba(0, 0, 0, 0.06)"
        : "0 8px 20px rgba(0, 0, 0, 0.1)"};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background: #f5f5f5;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${(props) => (props.$outOfStock ? "#ef4444" : "#111")};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 999px;
`;

const WishlistBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  padding: 16px;
`;

const Name = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #111;
`;

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const CartButton = styled.button`
  flex: 1;
  background: ${(props) => (props.disabled ? "#999" : "black")};
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.9rem;

  &:hover {
    background: ${(props) => (props.disabled ? "#999" : "#222")};
  }
`;

const ProductCard = memo(
  ({ product, addToCart, toggleWishlist, wishlist, onOpenModal }) => {
    const isWishlisted = wishlist?.includes(product.id);
    const outOfStock = !product.stock || product.stock <= 0;

    return (
      <Card $outOfStock={outOfStock}>
        <ImageWrapper onClick={() => onOpenModal(product)}>
          <ProductImage
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />

          {outOfStock && <Badge $outOfStock>Out of Stock</Badge>}

          <WishlistBtn
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart
              size={18}
              fill={isWishlisted ? "#ef4444" : "none"}
              color={isWishlisted ? "#ef4444" : "#333"}
            />
          </WishlistBtn>
        </ImageWrapper>

        <Info>
          <Name onClick={() => onOpenModal(product)}>{product.name}</Name>
          <Price>₦{product.price.toLocaleString()}</Price>

          <Actions>
            <CartButton
              disabled={outOfStock}
              onClick={(e) => {
                e.stopPropagation();
                if (!outOfStock) addToCart(product);
              }}
            >
              <ShoppingCart size={16} />
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </CartButton>
          </Actions>
        </Info>
      </Card>
    );
  }
);

export default ProductCard;