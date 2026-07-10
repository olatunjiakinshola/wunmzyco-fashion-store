import { memo } from "react";
import styled from "styled-components";
import { Heart, ShoppingCart } from "lucide-react";

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 35px rgba(0,0,0,0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 320px;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 480px) {
    height: 280px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 3;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const AddButton = styled.button`
  background: white;
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 3;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
`;

const ProductCard = memo(
  ({ 
    product, 
    addToCart, 
    toggleWishlist, 
    wishlist,
    onOpenModal 
  }) => {
    const handleImageClick = (e) => {
      e.stopPropagation();
      onOpenModal(product);
    };

    return (
      <Card>
        <ImageContainer onClick={handleImageClick}>
          <ProductImage 
            src={product.image}
            alt={product.name}
          />
          <WishlistButton 
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart
              size={20}
              fill={wishlist.includes(product.id) ? "#ef4444" : "none"}
              color={wishlist.includes(product.id) ? "#ef4444" : "#333"}
            />
          </WishlistButton>

          <HoverOverlay>
            <AddButton 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </AddButton>
          </HoverOverlay>
        </ImageContainer>

        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <p style={{ color: "#666", marginBottom: "8px" }}>
            {product.color}
          </p>
          <Price>₦{product.price.toLocaleString()}</Price>
        </ProductInfo>
      </Card>
    );
  }
);

export default ProductCard;