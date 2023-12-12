import {Alert, Button, Space} from "antd";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import ContentCard from "../../../components/ContentCard";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../../context/UserContext.ts";
import RecordsExportButton from "../../../components/RecordsExportButton";
import {useFirestore, useFirestoreDocData, useUser} from "reactfire";
import {doc} from "firebase/firestore";

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
    const firestore = useFirestore();
    const user = useUser();
    const uid = user?.data?.uid;
    const userRef = doc(firestore, `users/${uid}`);
    const {data, status} = useFirestoreDocData(userRef);

    const userSheetUrl = data?.sheet?.url;

    return (
        <AppPageWrapper data-cy={'profile-page'}>
            <CenterInline>
                {/*todo: After updating the sheet deletion logic in the functions add the following back again: disabled={!!userSheetUrl}*/}
                <Space direction={"vertical"} size={"large"}>
                    <RecordsExportButton loading={status === "loading"}/>
                    {
                        userSheetUrl && <Alert
                            message={t("Successfully created Google Sheet")}
                            description={
                                <>
                                    {t("Use the link below to access the sheet. The created sheet is available for one hour. You can of course simply create a copy to have permanent access to the sheet.")}
                                    <Button type="link"
                                            onClick={() => window.open(userSheetUrl, "_blank")}>
                                        {t("Google Sheet")}
                                    </Button>
                                </>
                            }
                            type="success"
                        />
                    }
                </Space>
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