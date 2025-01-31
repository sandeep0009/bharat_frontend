import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PassKey = () => {
    const [passKey, setPassKey] = useState<string>("");
    const adminKey = import.meta.env.VITE_ADMIN_KEY; 
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (passKey === adminKey) {
            localStorage.setItem("adminKey", passKey);
            navigate("/");
        } else {
            alert("Invalid Pass Key");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center shadow-lg border">
            <div className="max-w-md w-full p-6 bg-white rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Admin FAQ</h2>
                <p className="mb-4 text-gray-600">Provide Pass Key to enter</p>

                <Input
                    value={passKey}
                    onChange={(e) => setPassKey(e.target.value)}
                    placeholder="Enter admin pass key"
                    className="mb-4"
                />

                <Button onClick={handleSubmit} className="w-full">Apply Pass Key</Button>
            </div>
        </div>
    );
};
