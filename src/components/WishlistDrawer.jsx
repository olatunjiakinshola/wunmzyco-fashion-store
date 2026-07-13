import { memo } from "react";
import styled from "styled-components";
import { X, ShoppingCart, Heart } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background: white;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  z-index: 101;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
`;

const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
`;

const WishlistDrawer = memo(({
  isOpen,
  onClose,
  wishlistItems,
  addToCart,
  toggleWishlist,
  removeFromWishlist
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Drawer>
        <Header>
          <h2>My Wishlist ({wishlistItems.length})</h2>
          <CloseButton onClick={onClose}>
            <X size={28} />
          </CloseButton>
        </Header>

        <Content>
          {wishlistItems.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "80px", color: "#888" }}>
              Your wishlist is empty
            </p>
          ) : (
            wishlistItems.map((item) => (
              <Item key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p style={{ color: "#666", margin: "4px 0" }}>{item.color}</p>
                  <p style={{ fontWeight: "bold" }}>₦{item.price.toLocaleString()}</p>

                  <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                    <button 
                      onClick={() => addToCart(item)}
                      style={{ background: "black", color: "white", padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(item.id)}
                      style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Item>
            ))
          )}
        </Content>
      </Drawer>
    </>
  );
});

export default WishlistDrawer;