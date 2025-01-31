import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedAdminProps {
    Component: React.ElementType;
}

export const ProtectedAdmin = ({ Component }: ProtectedAdminProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const passKey = localStorage.getItem("adminKey");
        if (!passKey) {
            navigate("/pass");
        }
    }, [navigate]);

    return localStorage.getItem("passKey") ? <Component /> : null;
};
