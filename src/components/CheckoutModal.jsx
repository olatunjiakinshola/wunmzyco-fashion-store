import { memo, useState } from "react";
import styled from "styled-components";
import { X, MessageCircle, CreditCard } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 16px;
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  padding: 28px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const OrderSummary = styled.div`
  background: #f8f9fa;
  padding: 18px;
  border-radius: 14px;
  margin: 18px 0 24px;
`;

const WhatsAppButton = styled.button`
  width: 100%;
  background: #25d366;
  color: white;
  border: none;
  padding: 16px 20px;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
  transition: background 0.2s;

  &:hover {
    background: #20ba5c;
  }
`;

const PaystackButtonStyled = styled.button`
  width: 100%;
  background: #0ba4db;
  color: white;
  border: none;
  padding: 16px 20px;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s;

  &:hover {
    background: #0990c0;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CheckoutModal = memo(({ isOpen, onClose, totalPrice, cart }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const phoneNumber = "2348060230990";

  // ========== PAYSTACK PAYMENT ==========
  const handlePaystackPayment = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsLoading(true);

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Your Public Key
      email: "customer@example.com", // You can collect this later
      amount: Math.round(totalPrice * 100), // Amount in kobo
      currency: "NGN",
      ref: "WUNMZY_" + Date.now(),
      metadata: {
        custom_fields: [
          {
            display_name: "Cart Items",
            variable_name: "cart_items",
            value: cart
              .map(
                (item) =>
                  `${item.name}${
                    item.selectedSize ? ` (${item.selectedSize})` : ""
                  } x${item.quantity}`
              )
              .join(", "),
          },
        ],
      },
      callback: function (response) {
        setIsLoading(false);
        alert("Payment successful! Reference: " + response.reference);
        console.log("Paystack success:", response);
        onClose();
        // Optional: clear cart here later
      },
      onClose: function () {
        setIsLoading(false);
        console.log("Payment popup closed");
      },
    });

    handler.openIframe();
  };

  // ========== WHATSAPP ==========
  const createWhatsAppMessage = () => {
    let message = `*New Order from WunmzyCo Website*\n\n`;

    cart.forEach((item, index) => {
      const sizeInfo = item.selectedSize
        ? ` - Size: ${item.selectedSize}`
        : "";
      message += `${index + 1}. ${item.name}${sizeInfo} × ${item.quantity} - *₦${(
        item.price * item.quantity
      ).toLocaleString()}*\n`;
    });

    message += `\n*Total Amount: ₦${totalPrice.toLocaleString()}*\n\n`;
    message += `Please confirm my order. Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSendToWhatsApp = () => {
    const message = createWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "700", margin: 0 }}>
            Complete Your Order
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={26} />
          </button>
        </ModalHeader>

        <p style={{ color: "#555", marginBottom: "8px", fontSize: "0.95rem" }}>
          Choose how you want to complete your order
        </p>

        <OrderSummary>
          <h4 style={{ marginBottom: "14px", fontSize: "1rem" }}>
            Order Summary ({cart.length} item{cart.length !== 1 ? "s" : ""})
          </h4>

          {cart.map((item, i) => (
            <div
              key={item.cartKey || i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom:
                  i !== cart.length - 1 ? "1px solid #ddd" : "none",
                fontSize: "0.95rem",
              }}
            >
              <span>
                {item.name}
                {item.selectedSize && (
                  <span style={{ color: "#666" }}>
                    {" "}
                    (Size: {item.selectedSize})
                  </span>
                )}
                <span style={{ color: "#888" }}> × {item.quantity}</span>
              </span>
              <span style={{ fontWeight: "600" }}>
                ₦{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "18px",
              fontSize: "1.25rem",
              fontWeight: "700",
            }}
          >
            <span>Total</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>
        </OrderSummary>

        {/* WhatsApp Option */}
        <WhatsAppButton onClick={handleSendToWhatsApp}>
          <MessageCircle size={22} />
          Order via WhatsApp
        </WhatsAppButton>

        {/* Paystack Option */}
        <PaystackButtonStyled
          onClick={handlePaystackPayment}
          disabled={isLoading}
        >
          <CreditCard size={22} />
          {isLoading ? "Opening Paystack..." : "Pay with Card / Transfer"}
        </PaystackButtonStyled>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "0.85rem",
            color: "#777",
          }}
        >
          WhatsApp orders are confirmed manually by the seller.
          <br />
          Card & bank transfer payments are processed securely by Paystack.
        </p>
      </ModalContent>
    </ModalOverlay>
  );
});

export default CheckoutModal;