import { memo } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

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

const Footer = styled.div`
  padding: 24px;
  border-top: 1px solid #eee;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: black;
  color: white;
  border: none;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #222;
  }
`;

const CartDrawer = memo(
  ({
    isOpen,
    onClose,
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    onCheckout,
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
              <p
                style={{
                  textAlign: "center",
                  marginTop: "80px",
                  color: "#888",
                }}
              >
                Your cart is empty
              </p>
            ) : (
              cart.map((item, index) => (
                <Item key={index}>
                  <ItemImage src={item.image} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <h4>{item.name}</h4>
                    <p style={{ fontWeight: "bold", margin: "8px 0" }}>
                      ₦{item.price * item.quantity}
                    </p>

                    <div>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>

                      <span style={{ margin: "0 12px" }}>{item.quantity}</span>

                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(id)}
                      style={{ color: "#ef4444", fontSize: "0.95rem" }}
                    >
                      Remove
                    </button>
                  </div>
                </Item>
              ))
            )}
          </Content>

          {cart.length > 0 && (
            <Footer>
              <Total>
                <span>Total</span>
                <span>₦{totalPrice}</span>
              </Total>
              <CheckoutButton onClick={onCheckout}>
                Proceed to Checkout
              </CheckoutButton>
            </Footer>
          )}
        </Drawer>
      </>
    );
  },
);

export default CartDrawer;
