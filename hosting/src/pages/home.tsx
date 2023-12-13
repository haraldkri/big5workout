import styled from "styled-components";
import ContentCard from "../components/ContentCard";
import {SmallLogoWithText} from "../components/svg";
import {Button, Modal, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Content} from "../components/StyledComponents";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.ts";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IntroText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
`;

const InlineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Home = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {login} = useContext(UserContext)
    const [modalVisible, setModalVisible] = useState(!localStorage.getItem("inDevModalShown"));

    const closeModal = () => {
        setModalVisible(false);
        localStorage.setItem("inDevModalShown", "true");
    }

    return (
        <Wrapper data-cy='landing-page'>
            <Modal open={modalVisible} onOk={closeModal} onCancel={closeModal}>
                <Result
                    title="This project is still in development."
                    extra={
                        [
                            "You are welcome to try it out, but please be aware that some key functionalities may not be implemented yet.",
                            <br/>,
                            <br/>,
                            "This website is currently developed for mobile only."
                        ]
                    }
                />
            </Modal>
            <ContentCard>
                <SmallLogoWithText/>
                <IntroText>
                    <h1 data-cy="landing-page-title">{t("Good Afternoon, Everyone.")}</h1>
                    <ButtonWrapper>
                        <Button
                            data-cy={"login-button"}
                            onClick={login}
                            type="primary">
                            {t("Login and Start Workout")}
                        </Button>
                    </ButtonWrapper>
                </IntroText>
            </ContentCard>
            <Content data-cy={"landing-page-info"}>
                <ContentCard title={t("What this is about")}>
                    {t("This app is about providing a simplistic and easy way to record and keep track of your training by the book “Body by Science”.")}
                </ContentCard>
                <ContentCard title={t("How to get started")}>
                    {t("Simply log in to the app using your google account and start your workout. All your recorded workouts will be saved to your profile. You will always have the option to at any time export all of your recorded workouts to google sheets.")}
                </ContentCard>
            </Content>
            <ContentCard>
                <InlineGrid>
                    <Button
                        data-cy={"imprint-button"}
                        type="link"
                        size="small"
                        onClick={() => navigate("/legal/imprint")}
                    >
                        {t("Imprint")}
                    </Button>
                    <Button
                        data-cy={"privacy-policy-button"}
                        type="link"
                        size="small"
                        onClick={() => navigate("/legal/privacy-policy")}>
                        {t("Privacy Policy")}
                    </Button>
                    <Button
                        data-cy={"contact-button"}
                        type="link" size="small"
                        onClick={() => navigate("/legal/contact")}>
                        {t("Contact")}
                    </Button>
                </InlineGrid>
            </ContentCard>
        </Wrapper>
    );
};

export default Home