import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

const Block = styled.div`
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

const Image = styled(Block)`
  width: 100%;
  height: 280px;
`;

const Body = styled.div`
  padding: 16px;
`;

const Line = styled(Block)`
  height: ${(props) => props.$h || "14px"};
  width: ${(props) => props.$w || "100%"};
  border-radius: 8px;
  margin-bottom: 10px;
`;

export default function ProductSkeleton({ count = 8 }) {
  return (
    <Grid>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <Image />
          <Body>
            <Line $w="70%" />
            <Line $w="40%" $h="18px" />
            <Line $w="100%" $h="38px" />
          </Body>
        </Card>
      ))}
    </Grid>
  );
}