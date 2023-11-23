import {Button} from "antd";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import ContentCard from "../../../components/ContentCard";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../../context/UserContext.ts";

const Extra = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
`;

const Profile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {logout} = useContext(UserContext);

    return (
        <AppPageWrapper data-cy={'profile-page'}>
            <CenterInline>
                <Button type={"primary"} size={"large"} ghost={true} title={t("Export to Google Sheets")}
                        data-cy="data-export-button">
                    {t("Export to Google Sheets")}
                </Button>
            </CenterInline>
            <CenterInline>
                <Button type={"primary"} danger={true} size={"large"} ghost={true} title={t("Logout")}
                        data-cy="logout-button" onClick={logout}>
                    {t("Logout")}
                </Button>
            </CenterInline>
            <Extra>
                <ContentCard>
                    <span>
                        {t("In the case that you have a feature request you may use the form to contact me directly.")}
                    </span>
                    <CenterInline>
                        <Button type={"link"} size={"large"} ghost={true} title={t("Contact")}
                                icon={<MailOutlined/>} onClick={() => navigate("/legal/contact")}
                                data-cy="contact-button">
                            {t("Contact")}
                        </Button>
                    </CenterInline>
                </ContentCard>
                <CenterInline>
                    <Button type={"text"} danger={true} size={"large"} title={t("Delete Profile")}
                            icon={<UserOutlined/>} data-cy="delete-profile-button">
                        {t("Delete Profile")}
                    </Button>
                </CenterInline>
            </Extra>
        </AppPageWrapper>
    );
};

export default Profile