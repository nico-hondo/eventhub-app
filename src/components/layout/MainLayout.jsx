import Navbar from "./header/Navbar";
import { useState } from "react";
import { Outlet } from "react-router";
import { getSession, logout } from "../../features/auth/services/auth";
// import { getRole } from "../../features/auth/services/auth";

function MainLayout() {
    const [session, setSession] = useState(getSession());
    const role = session?.role ?? "guest";

    function handleLogout() {
        logout();
        setSession(null);
    }
    return (
        <>
            <Navbar role={role} session={session} onLogout={handleLogout}/>
            <Outlet />
        </>
    );
}

export default MainLayout;