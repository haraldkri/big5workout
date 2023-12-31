import {createContext} from "react";

interface IUserContext {
    logout: () => void,
    login: () => void,
    deleteUser: () => void,
}

export const UserContext = createContext<IUserContext>({
    login: () => {
    },
    logout: () => {
    },
    deleteUser: () => {
    }
});