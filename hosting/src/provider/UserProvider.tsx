import React, {useEffect} from "react";
import {PropsWithChildren} from "../types.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {UserContext} from "../context/UserContext.ts";
import {App} from "antd";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {addDefaultWorkout} from "../utils/firestoreUtils.ts";

const UserProvider: React.FC<PropsWithChildren> = ({children}) => {
    const navigate = useNavigate();
    let location = useLocation();
    const auth = getAuth();
    const firestore = getFirestore();
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
                console.log(_response.user.uid);
                getDocs(collection(firestore, `users/${_response.user.uid}/workouts`))
                    .then(
                        (docSnap: any) => {
                            if (!docSnap.exists() || docSnap.empty) {
                                //add default workout to firestore for new users
                                addDefaultWorkout(firestore, _response.user.uid);
                            }
                        }
                    )
                    .catch((err) => console.log("error getting document", err));

                navigate('/app', {replace: true})
                message.success("Login successful")
            })
            .catch(_error => {
                message.error("Login failed")
                navigate('/', {replace: true})
            })
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            message.success("Logout successful")
            navigate('/', {replace: true})
        });
    }

    return (
        <UserContext.Provider value={{
            login: handleLogin,
            logout: handleLogout,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider