import styled from "styled-components";
import {Link} from "react-router-dom";

export const TabLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  gap: 8px;

  &:focus, &:hover, &:visited, &:link, &:active {
    color: inherit;
  }
`;