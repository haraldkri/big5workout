import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 20px;
  padding: 15px 0;
  height: 100%;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 20px;
  height: 100%;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const FlexGrowColumn = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MediumText = styled.span`
  font-weight: 500;
`;

export const Center = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;