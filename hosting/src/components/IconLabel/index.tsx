import React, {ReactNode} from 'react';
import styled from "styled-components";

const Wrapper = styled.div<{ $gapSize?: number }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({$gapSize}) => $gapSize}px;
`;

type IconLabelProps = {
    gapSize?: "medium" | "large",
    icon?: ReactNode,
    label?: ReactNode | string,
};

const IconLabel: React.FC<IconLabelProps> = (props) => {
    const {gapSize, icon, label} = props;
    const gap = gapSize === "large" ? 20 : 10;

    return (
        <Wrapper $gapSize={gap}>
            {
                icon
            }
            {
                label
            }
        </Wrapper>
    );
}

export default IconLabel;