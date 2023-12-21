import {Tabs} from "antd";
import Imprint from "./imprint.tsx";
import PrivacyPolicy from "./privacyPolicy.tsx";
import Contact from "./contact.tsx";
import {AntDesignOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Content} from "../../components/StyledComponents";
import {TabLink} from "../../components/StyledComponents/routerComponents";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import AppHeader from "../../components/AppHeader";
import {useUser} from "reactfire";
import styled from "styled-components";

type LegalPages = 'imprint' | 'privacy-policy' | 'contact';

const LayoutContent = styled(Content)`
  padding: 0;
`;

const LegalLayout = () => {
    const {t} = useTranslation();
    let location = useLocation();
    const loggedIn = !!useUser().data;

    const getActiveTab = () => {
        const path = location.pathname.split('/')[2] as LegalPages;
        return path ? path : 'imprint'
    }
    const [activeTab, setActiveTab] = useState<LegalPages>(getActiveTab());

    const items = [
        {
            label: <TabLink to={"/legal/imprint"}>
                <AntDesignOutlined/>
                {t('Imprint')}
            </TabLink>,
            key: 'imprint',
            path: 'imprint',
            children: <Imprint/>
        },
        {
            label: <TabLink to={"/legal/privacy-policy"}>
                <AntDesignOutlined/>
                {t('Privacy Policy')}
            </TabLink>,
            key: 'privacy-policy',
            path: 'privacy-policy',
            children: <PrivacyPolicy/>
        },
        {
            label: <TabLink to={"/legal/contact"}>
                <AntDesignOutlined/>
                {t('Contact')}
            </TabLink>,
            key: 'contact',
            path: 'contact',
            children: <Contact/>
        }
    ];

    useEffect(() => {
        setActiveTab(getActiveTab())
    }, [location]);

    return (
        <LayoutContent data-cy={'legal-pages'}>
            <AppHeader enableBackNavigation={true} navigateBackTarget={loggedIn ? "/app" : "/"}/>
            <Tabs
                activeKey={activeTab}
                centered
                type={"line"}
                items={items}
                style={{height: "100%"}}
            />
        </LayoutContent>
    );
};

export default LegalLayout