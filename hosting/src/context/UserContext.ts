import {createContext} from "react";

interface IUserContext {
    logout: () => void,
    login: () => void,
    deleteUser: () => void,
    user: any
}

export const UserContext = createContext<IUserContext>({
    login: () => {
    },
    logout: () => {
    },
    deleteUser: () => {
    },
    user: null
});