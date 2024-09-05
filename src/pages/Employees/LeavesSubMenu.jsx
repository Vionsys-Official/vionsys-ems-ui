import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

const LeavesSubMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePath, setIsActivePath] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setIsActivePath(path);
        navigate(path);
    }

    const isActive = (path) => activePath === path;
    return (
        <div className="flex text-sm px-6 flex-col h-screen items-center gap-2 bg-gray-100 shadow-lg py-10 mx-auto text-gray-900">
            <div className="flex flex-col gap-2">
                <Link to={"/empLeaves"}
                    onClick={() => handleLinkClick("/empLeaves")}
                    className={`${isActive("/empLeaves") ? "text-blue-400" : ""} font-semibold`}>
                    Leave Requests
                </Link>
                <Link to={"/empCanceledLeaves"}
                    onClick={() => handleLinkClick("/empCanceledLeaves")}
                    className={`${isActive("/empCanceledLeaves") ? "text-blue-400" : ""} font-semibold`}
                >
                    Cancelled leaves
                </Link>
            </div>
        </div>
    )
}

export default LeavesSubMenu