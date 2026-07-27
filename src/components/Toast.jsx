import { memo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CheckCircle, X } from "lucide-react";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ToastItem = styled.div`
  background: #111;
  color: white;
  padding: 14px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 360px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  animation: ${props => (props.$closing ? slideOut : slideIn)} 0.3s ease forwards;
`;

const Message = styled.span`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  display: flex;
  padding: 4px;

  &:hover {
    color: white;
  }
`;

const Toast = memo(({ toasts, removeToast }) => {
  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} $closing={toast.closing}>
          <CheckCircle size={20} color="#4ade80" />
          <Message>{toast.message}</Message>
          <CloseBtn onClick={() => removeToast(toast.id)}>
            <X size={18} />
          </CloseBtn>
        </ToastItem>
      ))}
    </ToastContainer>
  );
});

export default Toast;