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
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 12px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #000;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 12px;
  font-size: 1rem;
  outline: none;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #000;
  }
`;

const WhatsAppButton = styled.button`
  width: 100%;
  background: #25d366;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;

  &:hover {
    background: #20ba5c;
  }
`;

const PaystackButtonStyled = styled.button`
  width: 100%;
  background: #0ba4db;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #0990c0;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CheckoutModal = memo(
  ({ isOpen, onClose, totalPrice, cart, clearCart }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      notes: "",
    });

    if (!isOpen) return null;

    const phoneNumber = "2348060230990";

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const verifyPayment = async (reference) => {
      try {
        const res = await fetch("/.netlify/functions/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference }),
        });

        const result = await res.json();

        if (result.success) {
          alert(
            `Payment successful!\n\nReference: ${result.data.reference}\nAmount: ₦${Number(
              result.data.amount
            ).toLocaleString()}\n\nWe will contact you shortly regarding delivery.`
          );

          if (clearCart) clearCart();
          onClose();
        } else {
          alert("Payment could not be verified. Please contact support.");
          console.error(result);
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert("Could not verify payment. Please contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    const handlePaystackPayment = () => {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.address ||
        !formData.city
      ) {
        alert("Please fill in your name, email, phone, address and city.");
        return;
      }

      if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      if (!window.PaystackPop) {
        alert("Paystack failed to load. Please refresh the page.");
        return;
      }

      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

      if (!publicKey) {
        alert("Paystack public key is missing. Check your .env file.");
        return;
      }

      setIsLoading(true);

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: formData.email,
        amount: Math.round(totalPrice * 100),
        currency: "NGN",
        ref: "WUNMZY_" + Date.now(),
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.name,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: formData.phone,
            },
            {
              display_name: "Delivery Address",
              variable_name: "delivery_address",
              value: formData.address,
            },
            {
              display_name: "City / State",
              variable_name: "city_state",
              value: formData.city,
            },
            {
              display_name: "Order Notes",
              variable_name: "order_notes",
              value: formData.notes || "None",
            },
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
          verifyPayment(response.reference);
        },
        onClose: function () {
          setIsLoading(false);
        },
      });

      handler.openIframe();
    };

    const createWhatsAppMessage = () => {
      let message = `*New Order from WunmzyCo Website*\n\n`;
      message += `*Customer Details*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Email: ${formData.email}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}\n`;
      message += `City/State: ${formData.city}\n`;
      if (formData.notes) {
        message += `Notes: ${formData.notes}\n`;
      }
      message += `\n*Order Items*\n`;

      cart.forEach((item, index) => {
        const sizeInfo = item.selectedSize
          ? ` - Size: ${item.selectedSize}`
          : "";
        message += `${index + 1}. ${item.name}${sizeInfo} × ${
          item.quantity
        } - *₦${(item.price * item.quantity).toLocaleString()}*\n`;
      });

      message += `\n*Total Amount: ₦${totalPrice.toLocaleString()}*\n\n`;
      message += `Please confirm my order. Thank you! 🙏`;

      return encodeURIComponent(message);
    };

    const handleSendToWhatsApp = () => {
      if (!formData.name || !formData.phone || !formData.address || !formData.city) {
        alert("Please enter your name, phone, address and city for WhatsApp order.");
        return;
      }

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

          {/* Customer + Delivery Details */}
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "12px" }}>Your Details</h4>
            <Input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="address"
              placeholder="Delivery Address *"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="city"
              placeholder="City / State *"
              value={formData.city}
              onChange={handleChange}
            />
            <TextArea
              name="notes"
              placeholder="Order Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          {/* Order Summary */}
          <OrderSummary>
            <h4 style={{ marginBottom: "12px", fontSize: "1rem" }}>
              Order Summary ({cart.length} item
              {cart.length !== 1 ? "s" : ""})
            </h4>

            {cart.map((item, i) => (
              <div
                key={item.cartKey || i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
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
                marginTop: "14px",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              <span>Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
          </OrderSummary>

          {/* WhatsApp Button */}
          <WhatsAppButton onClick={handleSendToWhatsApp}>
            <MessageCircle size={22} />
            Order via WhatsApp
          </WhatsAppButton>

          {/* Paystack Button */}
          <PaystackButtonStyled
            onClick={handlePaystackPayment}
            disabled={isLoading}
          >
            <CreditCard size={22} />
            {isLoading ? "Processing..." : "Pay with Card / Transfer"}
          </PaystackButtonStyled>

          <p
            style={{
              textAlign: "center",
              marginTop: "16px",
              fontSize: "0.85rem",
              color: "#777",
            }}
          >
            WhatsApp orders are confirmed manually.
            <br />
            Card & bank transfer payments are verified securely with Paystack.
          </p>
        </ModalContent>
      </ModalOverlay>
    );
  }
);

export default CheckoutModal;