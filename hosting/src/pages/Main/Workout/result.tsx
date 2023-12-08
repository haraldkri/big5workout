import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div``;

const WorkoutResult = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <Wrapper data-cy={'workout-result-page'}>
            <Result
                status="success"
                title={t("Successfully Saved Workout!")}
                subTitle={t("The recorded weights and durations will be displayed for every exercise the next time you start a workout.")}
                extra={[
                    <Button type="primary" key="console" ghost={true}
                            onClick={() => navigate(`/app`)}
                    >
                        {t('Start Workout')}
                    </Button>
                ]}
            />
        </Wrapper>
    );
};

export default WorkoutResult