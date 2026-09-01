import Navbar from "./header/Navbar";
import { Outlet } from "react-router";
// import { getSession, logout } from "../../features/auth/services/auth";
import { logout as logoutAction } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSession, selectRole } from "../../features/auth/store/authSelectors";

function MainLayout() {
    const dispatch = useDispatch();
    const session = useSelector(selectSession);
    const role = useSelector(selectRole);

    function handleLogout() {
        dispatch(logoutAction())
    }
    return (
        <>
            <Navbar role={role} session={session} onLogout={handleLogout}/>
            <Outlet />
        </>
    );
}

export default MainLayout;