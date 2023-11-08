import React from 'react';
import {SendOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ContentCard from "../ContentCard";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const CustomForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 10px;
`;

const ContactForm: React.FC = () => {
    const {t} = useTranslation();
    const [form] = Form.useForm();

    return (
        <CustomForm
            form={form}
            layout="vertical"
            requiredMark={"optional"}
        >
            <ContentCard data-cy={"input-info"} title={t("Enter your email and message")}>
                <Form.Item required tooltip={t("This is a required field")}>
                    <Input data-cy={"email-input"} size={"large"} placeholder={t("Your Email")}/>
                </Form.Item>
                <Form.Item>
                    <Input data-cy={"subject-input"} size={"large"} placeholder={t("Subject")}/>
                </Form.Item>
                <Form.Item>
                    <TextArea
                        data-cy={"message-input"}
                        size={"large"}
                        placeholder={t("Your message...")}
                        autoSize={{minRows: 3, maxRows: 7}}
                    />
                </Form.Item>
            </ContentCard>
            <Form.Item>
                <ButtonWrapper>
                    <Button type="primary" ghost={true} icon={<SendOutlined/>}>{t("Send Message")}</Button>
                </ButtonWrapper>
            </Form.Item>
        </CustomForm>
    );
};

export default ContactForm;