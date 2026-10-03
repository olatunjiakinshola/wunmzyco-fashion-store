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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

const SELLER_WHATSAPP = "2348060230990";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function normalizePhone(phone) {
  let p = String(phone).replace(/[^\d+]/g, "");

  // Local Nigerian format: 08012345678 -> 2348012345678
  if (p.startsWith("0") && p.length === 11) {
    return "234" + p.slice(1);
  }

  // Remove leading +
  if (p.startsWith("+")) {
    return p.slice(1);
  }

  return p;
}

function isValidPhone(phone) {
  const normalized = normalizePhone(phone);
  // Accept international numbers: 10 to 15 digits
  return /^\d{10,15}$/.test(normalized);
}

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

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const resetForm = () => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        notes: "",
      });
    };

    const validateCheckoutForm = (requireEmail = true) => {
      if (!formData.name.trim()) {
        alert("Please enter your full name.");
        return false;
      }

      if (requireEmail && !isValidEmail(formData.email)) {
        alert("Please enter a valid email address.");
        return false;
      }

      if (!isValidPhone(formData.phone)) {
        alert(
          "Please enter a valid phone number.\nExample: 08012345678 or +14155552671"
        );
        return false;
      }

      if (!formData.address.trim()) {
        alert("Please enter your delivery address.");
        return false;
      }

      if (!formData.city.trim()) {
        alert("Please enter your city / state.");
        return false;
      }

      if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return false;
      }

      if (!totalPrice || Number(totalPrice) <= 0) {
        alert("Invalid order total.");
        return false;
      }

      return true;
    };

    const buildOrderItemsText = () => {
      return cart
        .map((item, index) => {
          const sizeInfo = item.selectedSize
            ? ` - Size: ${item.selectedSize}`
            : "";
          return `${index + 1}. ${item.name}${sizeInfo} × ${item.quantity} - ₦${(
            item.price * item.quantity
          ).toLocaleString()}`;
        })
        .join("\n");
    };

    const notifySellerOnWhatsApp = (paymentReference, paidAmount) => {
      let message = `*PAYMENT RECEIVED - WunmzyCo*\n\n`;
      message += `*Payment Reference:* ${paymentReference}\n`;
      message += `*Amount Paid:* ₦${Number(paidAmount).toLocaleString()}\n\n`;
      message += `*Customer Details*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Email: ${formData.email}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}\n`;
      message += `City/State: ${formData.city}\n`;

      if (formData.notes) {
        message += `Notes: ${formData.notes}\n`;
      }

      message += `\n*Order Items*\n${buildOrderItemsText()}\n\n`;
      message += `Please confirm and process this order.`;

      const url = `https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    };

    const verifyPayment = async (reference) => {
      try {
        const res = await fetch("/.netlify/functions/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference,
            expectedAmount: Number(totalPrice),
            expectedCurrency: "NGN",
          }),
        });

        const result = await res.json();

        if (result.success) {
          try {
            localStorage.setItem(
              "lastPaymentReference",
              result.data.reference || reference
            );
          } catch (e) {
            // ignore storage errors
          }

          alert(
            `Payment successful!\n\nReference: ${result.data.reference}\nAmount: ₦${Number(
              result.data.amount
            ).toLocaleString()}\n\nWe will contact you shortly about delivery.\nA WhatsApp message will open so the seller can process your order.`
          );

          notifySellerOnWhatsApp(result.data.reference, result.data.amount);

          if (clearCart) clearCart();
          resetForm();
          onClose();
        } else {
          alert(
            `${
              result.message || "Payment could not be verified."
            }\n\nIf money left your account, contact us on WhatsApp with this reference:\n${reference}`
          );
          console.error(result);
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert(
          `Could not verify payment right now.\n\nIf money left your account, contact us on WhatsApp with this reference:\n${reference}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    const handlePaystackPayment = () => {
      if (isLoading) return;

      if (!validateCheckoutForm(true)) return;

      if (!window.PaystackPop) {
        alert("Paystack failed to load. Please refresh the page and try again.");
        return;
      }

      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

      if (!publicKey) {
        alert(
          "Paystack is not configured yet. Please use WhatsApp order or contact support."
        );
        return;
      }

      setIsLoading(true);

      const normalizedPhone = normalizePhone(formData.phone);

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: formData.email.trim(),
        amount: Math.round(Number(totalPrice) * 100),
        currency: "NGN",
        ref: "WUNMZY_" + Date.now(),
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.name.trim(),
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: normalizedPhone,
            },
            {
              display_name: "Delivery Address",
              variable_name: "delivery_address",
              value: formData.address.trim(),
            },
            {
              display_name: "City / State",
              variable_name: "city_state",
              value: formData.city.trim(),
            },
            {
              display_name: "Order Notes",
              variable_name: "order_notes",
              value: formData.notes.trim() || "None",
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

    const handleSendToWhatsApp = () => {
      if (!validateCheckoutForm(false)) return;

      let message = `*New Order from WunmzyCo Website*\n\n`;
      message += `*Customer Details*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Email: ${formData.email || "N/A"}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}\n`;
      message += `City/State: ${formData.city}\n`;

      if (formData.notes) {
        message += `Notes: ${formData.notes}\n`;
      }

      message += `\n*Order Items*\n${buildOrderItemsText()}\n\n`;
      message += `*Total Amount: ₦${Number(totalPrice).toLocaleString()}*\n\n`;
      message += `Please confirm my order. Thank you!`;

      const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
              aria-label="Close checkout"
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

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "12px" }}>Your Details</h4>
            <Input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number * (e.g. 08012345678 or +14155552671)"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            <Input
              type="text"
              name="address"
              placeholder="Delivery Address *"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
            />
            <Input
              type="text"
              name="city"
              placeholder="City / State *"
              value={formData.city}
              onChange={handleChange}
              autoComplete="address-level2"
            />
            <TextArea
              name="notes"
              placeholder="Order Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

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
              <span>₦{Number(totalPrice).toLocaleString()}</span>
            </div>
          </OrderSummary>

          <WhatsAppButton onClick={handleSendToWhatsApp} disabled={isLoading}>
            <MessageCircle size={22} />
            Order via WhatsApp
          </WhatsAppButton>

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