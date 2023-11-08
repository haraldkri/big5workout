import React from 'react';
import styled from "styled-components";
import {PropsWithChildren} from "../../types.ts";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > h5 {
    padding: 0 20px;
  }
`;

const Content = styled.div<{ $gapSize?: number }>`
  padding: 20px;
  background: #1E1D24;
  display: flex;
  flex-direction: column;
  gap: ${({$gapSize}) => $gapSize ?? 10}px;
`;

type ContentCardProps = PropsWithChildren<{
    title?: string,
    contentGap?: number,
    'data-cy'?: string;
}>;
const ContentCard: React.FC<ContentCardProps> = (props) => {
    const {title, contentGap, children, 'data-cy': dataCy} = props;

    return (
        <Wrapper data-cy={dataCy}>
            {
                title && <h5>{title}</h5>
            }

            <Content $gapSize={contentGap}>
                {children}
            </Content>
        </Wrapper>
    );
}

export default ContentCard;