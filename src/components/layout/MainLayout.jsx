import Navbar from "./header/Navbar";
import { Outlet, useSearchParams } from "react-router";
// import { getSession, logout } from "../../features/auth/services/auth";
import { logout as logoutAction } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSession, selectRole } from "../../features/auth/store/authSelectors";
import { useEffect } from "react";
import { fetchEvents } from "../../redux/slices/eventSlice";

function MainLayout() {
    const dispatch = useDispatch();
    const session = useSelector(selectSession);
    const role = useSelector(selectRole);

    function handleLogout() {
        dispatch(logoutAction())
    }

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";

    useEffect(() => {
        dispatch(fetchEvents({search, location, category}));
    }, [dispatch, search, location, category]);

    return (
        <>
            <Navbar role={role} session={session} onLogout={handleLogout}/>
            <Outlet />
        </>
    );
}

export default MainLayout;