import {Alert, Button, Space} from "antd";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import ContentCard from "../../../components/ContentCard";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/UserContext.ts";
import RecordsExportButton from "../../../components/RecordsExportButton";
import {useFirestore, useUser} from "reactfire";
import {doc, onSnapshot} from "firebase/firestore";

const Extra = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
`;

const FlexSpace = styled(Space)`
  display: flex;
`;

const Profile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {logout, deleteUser} = useContext(UserContext);
    const firestore = useFirestore();
    const {data: user} = useUser();
    const [userSheetUrl, setUserSheetUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!user?.uid) return

        const userRef = doc(firestore, `users/${user?.uid}`);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            const data = doc.data();
            setUserSheetUrl(data?.sheet?.url);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AppPageWrapper data-cy={'profile-page'}>
            <CenterInline>
                <FlexSpace direction={"vertical"} align={"center"}>
                    <RecordsExportButton disabled={!!userSheetUrl}/>
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
                            showIcon
                        />
                    }
                </FlexSpace>
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
                            icon={<UserOutlined/>} data-cy="delete-profile-button" onClick={deleteUser}>
                        {t("Delete Profile")}
                    </Button>
                </CenterInline>
            </Extra>
        </AppPageWrapper>
    );
};

export default Profile