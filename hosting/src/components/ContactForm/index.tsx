import React, {useState} from 'react';
import {SendOutlined} from '@ant-design/icons';
import {Button, Form, Input, message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ContentCard from "../ContentCard";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {getFunctions, httpsCallable} from "firebase/functions";
import {useUser} from "reactfire";

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
    const [loadingState, setLoadingState] = useState(false);
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const functions = getFunctions();
    // define region again, because it is not set for some reason
    functions.region = "europe-west3";
    const createContactEmail = httpsCallable(functions, 'createContactEmail');
    const user = useUser();

    const handleOnClick = async () => {
        const userName = user?.data?.displayName;
        const userEmail = user?.data?.email;

        // Perform export or further processing here
        setLoadingState(true);
        createContactEmail({
            name: userName,
            email: userEmail || form.getFieldValue("email"),
            subject: form.getFieldValue("subject"),
            message: form.getFieldValue("message")
        })
            .then((response: any) => {
                if (response?.data?.code === 200) {
                    message.success(t("Message sent successfully"));
                } else {
                    message.error(t("Something went wrong"));
                }
            })
            .catch((error) => {
                console.error(error);
                message.error(t("Failed to send message"));
            })
            .finally(() => {
                form.resetFields();
                setLoadingState(false);
            });
    }

    return (
        <CustomForm
            form={form}
            layout="vertical"
            requiredMark={"optional"}
        >
            <ContentCard data-cy={"input-info"}>
                {
                    user?.data?.email
                        ? null
                        : <Form.Item required tooltip={t("This is a required field")} name={"email"} rules={[
                            {
                                type: 'email',
                                message: t("Please enter a valid email address")
                            },
                        ]}>
                            <Input data-cy={"email-input"} size={"large"} placeholder={t("Your Email")}/>
                        </Form.Item>
                }

                <Form.Item name={"subject"}>
                    <Input data-cy={"subject-input"} size={"large"} placeholder={t("Subject")}/>
                </Form.Item>
                <Form.Item name={"message"} required>
                    <TextArea
                        data-cy={"message-input"}
                        size={"large"}
                        placeholder={t("Your message...")}
                        autoSize={{minRows: 3, maxRows: 12}}
                    />
                </Form.Item>
            </ContentCard>
            <Form.Item>
                <ButtonWrapper>
                    <Button onClick={handleOnClick} type="primary" ghost={true} icon={<SendOutlined/>}
                            loading={loadingState}>
                        {t("Send Message")}
                    </Button>
                </ButtonWrapper>
            </Form.Item>
        </CustomForm>
    );
};

export default ContactForm;