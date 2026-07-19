import { memo, useState } from 'react';
import styled from 'styled-components';
import { X, ShoppingCart, Heart, ZoomIn } from 'lucide-react';

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
  max-height: 95vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const ModalBody = styled.div`
  padding: 0 24px 32px;
`;

const ImageSection = styled.div`
  width: 100%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  border-radius: 16px;
  margin-bottom: 24px;
  position: relative;
  cursor: pointer;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 420px;
  object-fit: contain;
  border-radius: 12px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  background: rgba(0,0,0,0.3);
  border-radius: 16px;

  ${ImageSection}:hover & {
    opacity: 1;
  }
`;

const FullScreenButton = styled.div`
  background: white;
  color: black;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
`;

const DetailsSection = styled.div``;

const ProductName = styled.h2`
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-size: 2.1rem;
  font-weight: 700;
  color: #000;
  margin: 12px 0 20px;
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
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedSize: selectedSize || (product.sizes && product.sizes[0]) || "M"
    };
    addToCart(itemToAdd, selectedSize);
  };

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <h3>Product Details</h3>
            <CloseButton onClick={onClose}>
              <X size={28} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <ImageSection onClick={openFullScreen}>
              <ProductImage 
                src={product.image} 
                alt={product.name}
              />
              <ImageOverlay>
                <FullScreenButton>
                  <ZoomIn size={20} />
                  View Full Image
                </FullScreenButton>
              </ImageOverlay>
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

      {/* Full Screen Image Viewer */}
      {isFullScreen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.95)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }} onClick={closeFullScreen}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
          <button 
            onClick={closeFullScreen}
            style={{
              position: "absolute",
              top: "30px",
              right: "30px",
              background: "white",
              border: "none",
              padding: "12px",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          >
            <X size={28} />
          </button>
        </div>
      )}
    </>
  );
});

export default ProductModal;