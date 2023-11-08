import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {InnerContent, MediumText} from "../../components/StyledComponents";
import ContentCard from "../../components/ContentCard";

const Subsection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PrivacyPolicy = () => {
    const {t} = useTranslation();
    return (
        <InnerContent data-cy={'privacy-policy-page'}>
            <ContentCard
                data-cy={"data-info"}
                title={t("Collection and Use of Information")}
                contentGap={20}>
                <Subsection>
                    <MediumText>{t("Sign-In via Google")}</MediumText>
                    {t("When you sign in on our website, you have the option to do so through your Google account. By doing so, we gain access to certain information from your Google profile, such as your name and email address. We use this information to grant you access to our services and manage your user account.")}
                </Subsection>
                <Subsection>
                    <MediumText>{t("Storage of Training Data")}</MediumText>
                    {t("This website allows you to input and store your recorded training data. The training data you provide is stored using the database services provided by Firebase and is solely for the purpose of enabling you to use our training services. We do not share this data with third parties. For legal reasons we do not however guarantee that the data will be a available at all times (e.g. in case of downtime of the server hosting this website).")}
                </Subsection>
            </ContentCard>
            <ContentCard data-cy={"cookies-info"} title={t("Cookies")} contentGap={15}>
                {t("Our website uses cookies to enhance your user experience. Cookies are small text files stored on your device. You can choose to accept or reject the use of cookies. Rejecting cookies may affect the functionality of the website.")}
            </ContentCard>
            <ContentCard title={t("Security")} contentGap={15}>
                {t("We take appropriate security measures to protect your personal data, including safeguards against unauthorized access, misuse, and loss.")}
            </ContentCard>
            <ContentCard data-cy={"disclosure-of-information-info"}
                         title={t("Disclosure of Information")}
                         contentGap={15}>
                {t("We do not disclose your personal data to third parties unless required by law or with your explicit consent.")}
            </ContentCard>
        </InnerContent>
    );
};

export default PrivacyPolicy