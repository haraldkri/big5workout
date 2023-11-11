import styled from "styled-components";
import {TabLink} from "../StyledComponents/routerComponents";
import {Tabs} from "antd";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {FireOutlined, RadarChartOutlined, UserOutlined} from "@ant-design/icons";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({theme}) => theme.purple10};

  & .ant-tabs-nav::before {
    top: 0;
    bottom: auto;
  }

  & .ant-tabs-nav {
    margin: 0;
    padding: 8px 0;
  }
`;

type AppPages = 'workout' | 'profile';

const AppFooter = () => {
    const {t} = useTranslation();
    let location = useLocation();
    const getActiveTab = () => {
        const path = location.pathname.split('/')[2] as AppPages;
        return path ? path : 'workout'
    }
    const [activeTab, setActiveTab] = useState<AppPages>(getActiveTab());

    const items = [
        {
            label: <TabLink to={"/app/workout"}>
                <FireOutlined/>
                {t('Workout')}
            </TabLink>,
            key: 'workout',
            path: 'workout'
        },
        {
            label: <TabLink to={"/app/profile"}>
                <UserOutlined/>
                {t('Profile')}
            </TabLink>,
            key: 'profile',
            path: 'profile',
        },
        {
            label: <span>
                <RadarChartOutlined/>
                {t('Statistics')}
            </span>,
            key: 'statistics',
            path: 'statistics',
            disabled: true
        }
    ];

    useEffect(() => {
        setActiveTab(getActiveTab())
    }, [location]);

    return (
        <Wrapper data-cy={"app-page"}>
            <Tabs
                data-cy="bottom-navigation"
                activeKey={activeTab}
                centered
                type={"line"}
                items={items}
                style={{height: "100%", width: "100%"}}
            />
        </Wrapper>
    );
}

export default AppFooter;