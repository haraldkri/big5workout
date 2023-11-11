import {useLocation, useMatches} from "react-router-dom";

const usePageTitle = () => {
    const location = useLocation();
    const locationMatch: any = useMatches().find(match => match.pathname === location.pathname);
    return locationMatch?.handle?.title ?? '';
};

export default usePageTitle;