import styled from "styled-components";
import {Button} from "antd";

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

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const Grow = styled.div`
  flex-grow: 1;
  width: 100%;
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

export const CenterInline = styled.div`
  display: grid;
  place-items: center;
`;

export const AppPageWrapper = styled.div`
  padding: 25px 0;
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;