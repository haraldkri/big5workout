import styled from "styled-components";
import ContactForm from "../../components/ContactForm";

const Wrapper = styled.div``;

const Contact = () => {
    return (
        <Wrapper data-cy={'contact-page'}>
            <ContactForm/>
        </Wrapper>
    );
};

export default Contact