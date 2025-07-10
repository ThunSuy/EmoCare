// src/components/ModuleCard.jsx

import { useNavigate } from "react-router-dom";

export default function ModuleCard({ icon, title, description, route }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => navigate(route)}
        >
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
            <button className="mt-4 text-sm text-indigo-600 hover:underline">
                Vào
            </button>
        </div>
    );
}
