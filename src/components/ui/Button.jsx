import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  border-radius: ${(props) => props.$rounded || "12px"};
  width: ${(props) => (props.$full ? "100%" : "auto")};

  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return `
          background: white;
          color: #111;
          border: 1.5px solid #ddd;
          &:hover { background: #f5f5f5; }
        `;
      case "danger":
        return `
          background: #ef4444;
          color: white;
          &:hover { background: #dc2626; }
        `;
      case "ghost":
        return `
          background: transparent;
          color: #333;
          border: 1.5px solid #ddd;
          &:hover { background: #f8f8f8; }
        `;
      default:
        return `
          background: #111;
          color: white;
          &:hover { background: #222; }
        `;
    }
  }}

  ${(props) => {
    switch (props.$size) {
      case "sm":
        return `padding: 8px 12px; font-size: 0.85rem;`;
      case "lg":
        return `padding: 14px 20px; font-size: 1rem;`;
      default:
        return `padding: 11px 16px; font-size: 0.95rem;`;
    }
  }}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  rounded,
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $full={full}
      $rounded={rounded}
      {...props}
    >
      {children}
    </StyledButton>
  );
}