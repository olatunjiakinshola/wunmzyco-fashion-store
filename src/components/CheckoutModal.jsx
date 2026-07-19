import { memo } from 'react'
import styled from 'styled-components'
import { X, MessageCircle } from 'lucide-react'

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  padding: 32px;
  max-height: 90vh;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px
`

const WhatsAppButton = styled.button`
  width: 100%;
  background: #25D366;
  color: white;
  border: none;
  padding: 18px 24px;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  &:hover {
    background: #20ba5c;
  }
`

const OrderSummary = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
`

const CheckoutModal = memo(({ isOpen, onClose, totalPrice, cart }) => {
  if (!isOpen) return null

  const phoneNumber = "+2348060230990"

  const createWhatsAppMessage = () => {
    let message = `*New Order from WunmzyCo Website*\n\n`;
    
    cart.forEach((item, index) => {
      const sizeInfo = item.selectedSize ? ` - Size: ${item.selectedSize}` : '';
      message += `${index + 1}. ${item.name}${sizeInfo} × ${item.quantity} - *₦${(item.price * item.quantity).toLocaleString()}*\n`;
    });

    message += `\n*Total Amount: ₦${totalPrice.toLocaleString()}*\n\n`;
    message += `Please confirm my order. Thank you! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleSendToWhatsApp = () => {
    const message = createWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Complete Your Order</h2>
          <button onClick={onClose}>
            <X size={28} />
          </button>
        </ModalHeader>

        <p style={{ color: '#555', marginBottom: '20px' }}>
          Send your order details directly to the seller via WhatsApp
        </p>

        <OrderSummary>
          <h4 style={{ marginBottom: '16px' }}>Order Summary ({cart.length} items)</h4>
          {cart.map((item, i) => (
            <div key={item.cartKey} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: i !== cart.length - 1 ? '1px solid #ddd' : 'none'
            }}>
              <span>
                {item.name}
                {item.selectedSize && <span style={{ color: "#666" }}> (Size: {item.selectedSize})</span>}
              </span>
              <span style={{ fontWeight: '600' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            fontSize: '1.4rem',
            fontWeight: '700'
          }}>
            <span>Total</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>
        </OrderSummary>

        <WhatsAppButton onClick={handleSendToWhatsApp}>
          <MessageCircle size={24} />
          Send Order via WhatsApp
        </WhatsAppButton>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          You will be redirected to WhatsApp to chat with the seller
        </p>
      </ModalContent>
    </ModalOverlay>
  )
})

export default CheckoutModal