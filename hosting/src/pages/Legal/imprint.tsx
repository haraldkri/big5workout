import ContentCard from "../../components/ContentCard";
import {useTranslation} from "react-i18next";
import IconLabel from "../../components/IconLabel";
import {
    BookOutlined,
    CompassOutlined,
    CopyrightOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {OfficialAddress, OfficialContactEmailAddress, OfficialMobileNumber, OfficialName} from "../../components/svg";
import {FlexGrowColumn, FlexRow, InnerContent} from "../../components/StyledComponents";

const Imprint = () => {
    const {t} = useTranslation();
    return (
        <InnerContent data-cy={'imprint-page'}>
            <ContentCard data-cy={"official-info"} title={t("Official")} contentGap={15}>
                <IconLabel gapSize={"large"} icon={<TeamOutlined/>} label={<OfficialName/>}/>
                <IconLabel gapSize={"large"} icon={<CompassOutlined/>} label={<OfficialAddress/>}/>
                <IconLabel gapSize={"large"} icon={<MailOutlined/>} label={<OfficialContactEmailAddress/>}/>
                <IconLabel gapSize={"large"} icon={<PhoneOutlined/>} label={<OfficialMobileNumber/>}/>
            </ContentCard>
            <ContentCard data-cy={"usage-info"} title={t("Usage")} contentGap={15}>
                {t("The App is financed entirely by donations of the users. You are free to use the service provided.")}
            </ContentCard>
            <ContentCard data-cy={"credit-info"} title={t("Credits")} contentGap={15}>
                <FlexRow>
                    <FlexGrowColumn>{t("Design")}</FlexGrowColumn>
                    <FlexGrowColumn>
                        <IconLabel gapSize={"medium"} icon={<TeamOutlined/>}
                                   label={"Harald Kriebisch"}/>
                    </FlexGrowColumn>
                </FlexRow>
                <FlexRow>
                    <FlexGrowColumn>{t("Development")}</FlexGrowColumn>
                    <FlexGrowColumn>
                        <IconLabel gapSize={"medium"} icon={<TeamOutlined/>}
                                   label={"Harald Kriebisch"}/>
                    </FlexGrowColumn>
                </FlexRow>
                <FlexRow>
                    <FlexGrowColumn>{t("Inspiration")}</FlexGrowColumn>
                    <FlexGrowColumn>
                        <IconLabel gapSize={"medium"} icon={<BookOutlined/>}
                                   label={t("Body by Science by Doug McGuff, John Little")}/>
                    </FlexGrowColumn>
                </FlexRow>
            </ContentCard>
            <ContentCard data-cy={"copyright-info"} title={t("Copyright")} contentGap={15}>
                <FlexRow>
                    <CopyrightOutlined/>
                    {t("Copyright 2023 Harald Kriebisch")}
                </FlexRow>
            </ContentCard>
        </InnerContent>
    );
};

export default Imprint