import {createContext} from "react";

interface IUserContext {
    logout: () => void,
    login: () => void
}

export const UserContext = createContext<IUserContext>({
    login: () => {
    },
    logout: () => {
    }
});