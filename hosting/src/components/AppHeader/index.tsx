import styled from "styled-components";
import {FlexGrow} from "../StyledComponents";
import {SmallLogo} from "../svg";
import usePageTitle from "../../hooks/usePageTitle";
import {useNavigate} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 20px;
  background: ${({theme}) => theme.purple10};
`;

const Title = styled.h2`
  margin: 0;
`;

const TitleWrapper = styled(FlexGrow)`
  flex-grow: 1;
  display: flex;
  gap: 16px;
  align-items: center;

  & > svg {
    height: 18px;
    width: 18px;
  }
`;

const Extra = styled.div`
  height: 33px;
  width: 33px;

  & > svg {
    height: 100%;
    width: 100%;
  }
`;

type Props = {
    enableBackNavigation?: boolean,
    navigateBackTarget?: string
}

const AppHeader = ({enableBackNavigation, navigateBackTarget}: Props) => {
    const title = usePageTitle();
    const navigate = useNavigate();

    return (
        <Wrapper data-cy="page-header">
            <TitleWrapper>
                {
                    enableBackNavigation && <LeftOutlined onClick={
                        () => navigateBackTarget
                            ? navigate(navigateBackTarget)
                            : navigate(-1)
                    }/>
                }
                <Title data-cy="workout-title">{title}</Title>
            </TitleWrapper>
            <Extra>
                <SmallLogo data-cy="application-logo" onClick={() => navigate("/", {replace: true})}/>
            </Extra>
        </Wrapper>
    );
}

export default AppHeader;