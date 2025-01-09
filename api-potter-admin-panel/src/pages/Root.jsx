import {Outlet, useLocation} from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar"
import LandingPage from "./AdminPanel/LandingPage/LandingPage"

function Root(){
    const location = useLocation();
    return(
        <>
        <header>
        <NavBar />
        </header>
        <main>
        {(location.pathname === '/admin-panel/' || location.pathname === "/admin-panel") && <LandingPage />}
         <Outlet />
        </main>
        </>
    )
}

export default Root;