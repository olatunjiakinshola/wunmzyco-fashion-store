import styled from "styled-components";

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;

  ${(props) => {
    switch (props.$tone) {
      case "success":
        return `background: #dcfce7; color: #166534;`;
      case "danger":
        return `background: #ef4444; color: white;`;
      case "warning":
        return `background: #fef3c7; color: #92400e;`;
      default:
        return `background: #111; color: white;`;
    }
  }}
`;

export default function Badge({ children, tone = "neutral", ...props }) {
  return (
    <StyledBadge $tone={tone} {...props}>
      {children}
    </StyledBadge>
  );
}