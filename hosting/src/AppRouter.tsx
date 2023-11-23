import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import Home from "./pages/home.tsx";
import MainLayout from "./pages/Main/Layout.tsx";
import WorkoutSelectList from "./pages/Main/Workout";
import Workout from "./pages/Main/Workout/workout.tsx";
import Profile from "./pages/Main/Profile";
import LegalLayout from "./pages/Legal/Layout.tsx";
import Imprint from "./pages/Legal/imprint.tsx";
import PrivacyPolicy from "./pages/Legal/privacyPolicy.tsx";
import Contact from "./pages/Legal/contact.tsx";
import {useTranslation} from "react-i18next";
import UserProvider from "./provider/UserProvider.tsx";
import ErrorView from "./components/ErrorView";
import WorkoutResult from "./pages/Main/Workout/result.tsx";

const AppRouter = () => {
    const {t} = useTranslation();

    const router = createBrowserRouter([
            {
                path: "/",
                errorElement: <ErrorView/>,
                element: <UserProvider><Outlet/></UserProvider>,
                children: [
                    {
                        path: "",
                        element: <Navigate to="/home" replace/>
                    },
                    {
                        path: "home",
                        errorElement: <ErrorView/>,
                        element: <Home/>,
                        handle: {
                            title: t('Landing Page')
                        }
                    },
                    {
                        path: "app",
                        errorElement: <ErrorView/>,
                        element: <MainLayout/>,
                        children: [
                            {
                                path: "",
                                element: <Navigate relative={"route"} to="workout"/>
                            },
                            {
                                path: "workout",
                                errorElement: <ErrorView/>,
                                element: <Outlet/>,
                                children: [
                                    {
                                        path: "",
                                        element: <Navigate relative={"route"} to="list"/>
                                    },
                                    {
                                        path: "list",
                                        errorElement: <ErrorView/>,
                                        element: <WorkoutSelectList/>,
                                        handle: {
                                            title: t('Start Workout')
                                        }
                                    },
                                    {
                                        path: ":id",
                                        errorElement: <ErrorView/>,
                                        element: <Workout/>,
                                        handle: {
                                            title: t('Workout')
                                        }
                                    },
                                    {
                                        path: "result",
                                        errorElement: <ErrorView/>,
                                        element: <WorkoutResult/>,
                                        handle: {
                                            title: t('Workout Result')
                                        }
                                    }
                                ]
                            },
                            {
                                path: "profile",
                                errorElement: <ErrorView/>,
                                element: <Profile/>,
                                handle: {
                                    title: t('Profile')
                                }
                            },
                            {
                                // Feature not implemented yet
                                path: "statistics",
                                errorElement: <ErrorView/>,
                                element: <ErrorView/>,
                                handle: {
                                    title: t('Statistics')
                                }
                            }
                        ]
                    },
                    {
                        path: "legal",
                        errorElement: <ErrorView/>,
                        element: <LegalLayout/>,
                        children: [
                            {
                                path: "",
                                element: <Navigate relative={"route"} to="imprint"/>
                            },
                            {
                                path: "imprint",
                                errorElement: <ErrorView/>,
                                element: <Imprint/>,
                                handle: {
                                    title: t('Imprint')
                                }
                            },
                            {
                                path: "privacy-policy",
                                errorElement: <ErrorView/>,
                                element: <PrivacyPolicy/>,
                                handle: {
                                    title: t('Privacy Policy')
                                }
                            },
                            {
                                path: "contact",
                                errorElement: <ErrorView/>,
                                element: <Contact/>,
                                handle: {
                                    title: t('Contact')
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    );

    return <RouterProvider router={router}/>;
}

export default AppRouter;