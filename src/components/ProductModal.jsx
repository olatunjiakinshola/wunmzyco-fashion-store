import { memo, useState } from 'react';
import styled from 'styled-components';
import { X, ShoppingCart, Heart } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  overflow: hidden;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const ModalBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  min-height: 400px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  cursor: zoom-in;
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

const ProductName = styled.h2`
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-size: 2.1rem;
  font-weight: 700;
  color: #000;
  margin: 16px 0;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1.05rem;
`;

const SizeContainer = styled.div`
  margin: 24px 0;
`;

const SizeLabel = styled.p`
  font-weight: 600;
  margin-bottom: 12px;
`;

const SizeButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SizeButton = styled.button`
  padding: 10px 18px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #000;
  }
  &.selected {
    border-color: #000;
    background: #000;
    color: white;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: black;
  color: white;
  border: none;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  &:hover {
    background: #222;
  }
`;

const ProductModal = memo(({
  isOpen,
  onClose,
  product,
  addToCart,
  toggleWishlist,
  wishlist
}) => {
  const [selectedSize, setSelectedSize] = useState(null);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedSize: selectedSize || (product.sizes && product.sizes[0]) || "M"
    };
    addToCart(itemToAdd);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>Product Details</h3>
          <CloseButton onClick={onClose}>
            <X size={28} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <ImageSection>
            <ProductImage 
              src={product.image} 
              alt={product.name}
              onClick={() => {
                const win = window.open();
                win.document.write(`<img src="${product.image}" style="width:100%;height:auto;" />`);
              }}
            />
          </ImageSection>

          <DetailsSection>
            <ProductName>{product.name}</ProductName>
            <p style={{ color: "#666", marginBottom: "8px" }}>{product.color}</p>
            
            <Price>₦{product.price.toLocaleString()}</Price>

            {product.description ? (
              <Description>{product.description}</Description>
            ) : (
              <Description>No description available for this product.</Description>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <SizeContainer>
                <SizeLabel>Select Size</SizeLabel>
                <SizeButtons>
                  {product.sizes.map(size => (
                    <SizeButton 
                      key={size} 
                      className={selectedSize === size ? "selected" : ""}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeButton>
                  ))}
                </SizeButtons>
              </SizeContainer>
            )}

            <AddToCartButton onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Add to Cart
            </AddToCartButton>

            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "12px",
                background: "none",
                border: "2px solid #ddd",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "1rem"
              }}
            >
              <Heart 
                size={20} 
                fill={isWishlisted ? "#ef4444" : "none"} 
                color={isWishlisted ? "#ef4444" : "#333"} 
              />
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </DetailsSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
});

export default ProductModal;