import { memo } from "react";
import styled from "styled-components";
import { X, Plus, Minus, Trash2 } from "lucide-react";

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

const ItemInfo = styled.div`
  flex: 1;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const Footer = styled.div`
  padding: 24px;
  border-top: 1px solid #eee;
  background: white;
`;

const CartDrawer = memo(({
  isOpen,
  onClose,
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  totalPrice,
  onCheckout
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Drawer>
        <Header>
          <h2>Your Cart ({cart.length})</h2>
          <CloseButton onClick={onClose}>
            <X size={28} />
          </CloseButton>
        </Header>

        <Content>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "80px", color: "#888" }}>
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <Item key={item.cartKey}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <h4>{item.name}</h4>
                  {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  <p style={{ fontWeight: "bold", margin: "8px 0" }}>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>

                  <QuantityControl>
                    <button onClick={() => decreaseQuantity(item.cartKey)} style={{ width: "32px", height: "32px" }}>-</button>
                    <span style={{ minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.cartKey)} style={{ width: "32px", height: "32px" }}>+</button>
                    
                    <button 
                      onClick={() => removeFromCart(item.cartKey)}
                      style={{ marginLeft: "auto", color: "#ef4444", background: "none", border: "none" }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </QuantityControl>
                </ItemInfo>
              </Item>
            ))
          )}
        </Content>

        {cart.length > 0 && (
          <Footer>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.3rem", fontWeight: "700", marginBottom: "20px" }}>
              <span>Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
            <button 
              onClick={onCheckout}
              style={{ 
                width: "100%", 
                padding: "18px", 
                background: "black", 
                color: "white", 
                border: "none", 
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Proceed to Checkout
            </button>
          </Footer>
        )}
      </Drawer>
    </>
  );
});

export default CartDrawer;