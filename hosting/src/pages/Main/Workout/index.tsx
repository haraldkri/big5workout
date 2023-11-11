import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";

const WorkoutSelectList = () => {
    const {t} = useTranslation();

    return (
        <AppPageWrapper data-cy={'workout-select-page'}>
            <CenterInline>
                <Button data-cy="start-workout-button" type={"primary"} size={"large"} ghost={true}
                        title={t("Start Workout")}>
                    {t("Start Workout")}
                </Button>
            </CenterInline>
        </AppPageWrapper>
    );
};

export default WorkoutSelectList