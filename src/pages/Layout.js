import { Outlet } from "react-router-dom";
import 'assets/Layout.css'

const Layout = () => {
    return (
        <div className="root">
            <Outlet />
        </div>
    )
};

export default Layout;