import styled from "styled-components";
import Button from "./Button";

const Wrap = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const Title = styled.h3`
  color: #111;
  font-size: 1.2rem;
  margin: 0 0 8px;
`;

const Text = styled.p`
  margin: 0 0 18px;
  line-height: 1.5;
`;

export default function EmptyState({
  title = "Nothing here yet",
  text = "Check back soon.",
  actionLabel,
  onAction,
}) {
  return (
    <Wrap>
      <Title>{title}</Title>
      <Text>{text}</Text>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </Wrap>
  );
}