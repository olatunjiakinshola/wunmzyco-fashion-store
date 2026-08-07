import { memo, useState, useEffect } from "react";
import styled from "styled-components";
import {
  X,
  ShoppingCart,
  Heart,
  ZoomIn,
  Minus,
  Plus,
  Share2,
} from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 16px;
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
  padding: 16px 20px;
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
  padding: 0 20px 24px;
`;

const ImageSection = styled.div`
  width: 100%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border-radius: 16px;
  margin: 16px 0 20px;
  position: relative;
  cursor: pointer;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 380px;
  object-fit: contain;
  border-radius: 12px;
`;

const DetailsSection = styled.div`
  padding-bottom: 20px;
`;

const SizeButton = styled.button`
  min-width: 48px;
  height: 42px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => (props.$active ? "#000" : "#ddd")};
  background: ${(props) => (props.$active ? "#000" : "white")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 16px 0 20px;
`;

const QtyBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const MobileActionBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 12px 16px;
    border-top: 1px solid #eee;
    gap: 10px;
    z-index: 20;
  }
`;

const ProductModal = memo(
  ({
    isOpen,
    onClose,
    product,
    addToCart,
    toggleWishlist,
    wishlist,
    showToast,
  }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
      if (product) {
        setSelectedSize(product.sizes?.[0] || null);
        setQuantity(1);
      }
    }, [product]);

    if (!isOpen || !product) return null;

    const isWishlisted = wishlist?.includes(product.id);
    const outOfStock = !product.stock || product.stock <= 0;

    const handleAddToCart = () => {
      if (outOfStock) {
        alert("This product is currently out of stock.");
        return;
      }

      const size = selectedSize || product.sizes?.[0] || "M";

      for (let i = 0; i < quantity; i++) {
        addToCart(product, size);
      }
    };

    const handleShare = async () => {
      const shareData = {
        title: product.name,
        text: `Check out ${product.name} for ₦${product.price.toLocaleString()} on WunmzyCo`,
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(
            `${shareData.text}\n${shareData.url}`
          );
          if (showToast) showToast("Product link copied");
          else alert("Product link copied");
        }
      } catch (err) {
        // User cancelled share sheet
      }
    };

    return (
      <>
        <ModalOverlay onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "700", margin: 0 }}>
                {product.name}
              </h2>
              <CloseButton onClick={onClose} aria-label="Close product details">
                <X size={26} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <ImageSection onClick={() => setIsFullScreen(true)}>
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: "white",
                    borderRadius: "50%",
                    padding: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <ZoomIn size={18} />
                </div>

                {outOfStock && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      padding: "6px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    Out of Stock
                  </div>
                )}
              </ImageSection>

              <DetailsSection>
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  ₦{product.price.toLocaleString()}
                </p>

                <p
                  style={{
                    marginBottom: "12px",
                    color: outOfStock ? "#ef4444" : "#16a34a",
                    fontWeight: "600",
                  }}
                >
                  {outOfStock
                    ? "Out of Stock"
                    : `In Stock (${product.stock} left)`}
                </p>

                <p style={{ color: "#666", marginBottom: "16px" }}>
                  {product.description}
                </p>

                <p style={{ marginBottom: "8px", fontWeight: "600" }}>
                  Color: {product.color}
                </p>

                {product.sizes && product.sizes.length > 0 && (
                  <div style={{ marginBottom: "8px" }}>
                    <p style={{ marginBottom: "10px", fontWeight: "600" }}>
                      Select Size
                    </p>
                    <div>
                      {product.sizes.map((size) => (
                        <SizeButton
                          key={size}
                          $active={selectedSize === size}
                          onClick={() => setSelectedSize(size)}
                          disabled={outOfStock}
                          style={{
                            opacity: outOfStock ? 0.5 : 1,
                            cursor: outOfStock ? "not-allowed" : "pointer",
                          }}
                        >
                          {size}
                        </SizeButton>
                      ))}
                    </div>
                  </div>
                )}

                <p style={{ marginBottom: "8px", fontWeight: "600" }}>
                  Quantity
                </p>
                <QuantityControl>
                  <QtyBtn
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={outOfStock}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </QtyBtn>
                  <span style={{ minWidth: "24px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <QtyBtn
                    onClick={() =>
                      setQuantity((prev) => Math.min(10, prev + 1))
                    }
                    disabled={outOfStock}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </QtyBtn>
                </QuantityControl>

                {/* Desktop / main actions */}
                <div className="desktop-actions">
                  <ActionButton
                    onClick={handleAddToCart}
                    disabled={outOfStock}
                    style={{
                      background: outOfStock ? "#999" : "black",
                      color: "white",
                    }}
                  >
                    <ShoppingCart size={18} />
                    {outOfStock ? "Out of Stock" : "Add to Cart"}
                  </ActionButton>

                  <ActionButton
                    onClick={() => toggleWishlist(product.id)}
                    style={{
                      background: "white",
                      color: "#333",
                      border: "1.5px solid #ddd",
                    }}
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? "#ef4444" : "none"}
                      color={isWishlisted ? "#ef4444" : "#333"}
                    />
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </ActionButton>

                  <ActionButton
                    onClick={handleShare}
                    style={{
                      background: "white",
                      color: "#333",
                      border: "1.5px solid #ddd",
                    }}
                  >
                    <Share2 size={18} />
                    Share Product
                  </ActionButton>
                </div>
              </DetailsSection>
            </ModalBody>

            {/* Mobile sticky action bar */}
            <MobileActionBar>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  border: "1.5px solid #ddd",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "#ef4444" : "none"}
                  color={isWishlisted ? "#ef4444" : "#333"}
                />
              </button>

              <button
                onClick={handleShare}
                aria-label="Share product"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  border: "1.5px solid #ddd",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Share2 size={20} />
              </button>

              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                style={{
                  flex: 1,
                  background: outOfStock ? "#999" : "black",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: outOfStock ? "not-allowed" : "pointer",
                }}
              >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </MobileActionBar>
          </ModalContent>
        </ModalOverlay>

        {/* Full screen image viewer */}
        {isFullScreen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.95)",
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setIsFullScreen(false)}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            <button
              onClick={() => setIsFullScreen(false)}
              aria-label="Close full screen image"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "white",
                border: "none",
                padding: "10px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <X size={24} />
            </button>
          </div>
        )}
      </>
    );
  }
);

export default ProductModal;