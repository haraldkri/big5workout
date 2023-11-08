import {Tabs} from "antd";
import Imprint from "./imprint.tsx";
import PrivacyPolicy from "./privacyPolicy.tsx";
import Contact from "./contact.tsx";
import {AntDesignOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Content} from "../../components/StyledComponents";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";

type LegalPages = 'imprint' | 'privacy-policy' | 'contact';

const TabLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus, &:hover, &:visited, &:link, &:active {
    color: inherit;
  }
`;

const LegalLayout = () => {
    const {t} = useTranslation();
    let location = useLocation();
    const getActiveTab = () => {
        const path = location.pathname.split('/')[2] as LegalPages;
        return path ? path : 'imprint'
    }
    const [activeTab, setActiveTab] = useState<LegalPages>(getActiveTab());

    const tabs = [
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
        <Content data-cy={'legal-pages'}>
            <Tabs
                activeKey={activeTab}
                centered
                type={"line"}
                items={tabs}
                style={{height: "100%"}}
            />
        </Content>
    );
};

export default LegalLayout