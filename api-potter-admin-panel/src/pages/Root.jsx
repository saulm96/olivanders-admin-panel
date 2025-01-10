import {Outlet, useLocation} from 'react-router-dom';
import NavBar from "../components/NavBar/NavBar"

function Root(){
    return(
        <>
        <header>
        <NavBar />
        </header>
        <main>
         <Outlet />
        </main>
        </>
    )
}

export default Root;