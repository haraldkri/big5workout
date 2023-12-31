import React, {useEffect} from "react";
import {PropsWithChildren} from "../types.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {UserContext} from "../context/UserContext.ts";
import {App} from "antd";
import {useTranslation} from "react-i18next";

const UserProvider: React.FC<PropsWithChildren> = ({children}) => {
    const navigate = useNavigate();
    let location = useLocation();
    const auth = getAuth();
    const {t} = useTranslation();
    const {message} = App.useApp();

    // listen to changes on the firebase auth object and update user accordingly
    // If the user is not logged in but tries to access the app, redirect to landing page (login)
    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (!user && location.pathname.includes('app')) {
                navigate("/home", {replace: true})
            }
        });

        return () => AuthCheck();
    }, [auth, navigate, location.pathname]);

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(_response => {
                navigate('/app', {replace: true})
                message.success(t("Login successful"))
            })
            .catch(_error => {
                message.error(t("Login failed"))
                navigate('/', {replace: true})
            })
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            message.success(t("Logout successful"))
            navigate('/', {replace: true})
        });
    }

    const handleUserDeletion = () => {
        if (!auth.currentUser) return message.error(t("Currently no user is logged in."))
        const email = auth.currentUser.email;
        deleteUser(auth.currentUser).then(() => {
            message.success(t("User with the following email deleted successfully: ") + email)
            navigate('/', {replace: true})
        });
    }

    return (
        <UserContext.Provider value={{
            login: handleLogin,
            logout: handleLogout,
            deleteUser: handleUserDeletion
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider