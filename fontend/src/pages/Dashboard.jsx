import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.error('Không xác thực được:', err);
                localStorage.removeItem('token');
                navigate('/login');
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Chào, {user.name || user.email}!</h1>
                    <p className="text-gray-600 mb-8">Bạn đã đăng nhập thành công.</p>
                    <button
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </button>
                </>
            ) : (
                <p>Đang tải thông tin người dùng...</p>
            )}
        </div>
    );
};

export default Dashboard;



// // src/pages/Dashboard.jsx

// import React from 'react';
// import ModuleCard from '@/components/ModuleCard';

// const modules = [
//     {
//         icon: '💬',
//         title: 'SelfTalk',
//         description: 'Trò chuyện với chính mình, tích cực hóa suy nghĩ.',
//         route: '/selftalk'
//     },
//     {
//         icon: '🌱',
//         title: 'MindBloom',
//         description: 'Gieo cảm xúc tích cực, nuôi dưỡng vườn nội tâm.',
//         route: '/mindbloom'
//     },
//     {
//         icon: '🔒',
//         title: 'WorryVault',
//         description: 'Cất giữ nỗi lo và xem lại khi sẵn sàng.',
//         route: '/worryvault'
//     },
//     {
//         icon: '🔥',
//         title: 'HealingNotes',
//         description: 'Viết và buông bỏ những điều nặng lòng.',
//         route: '/healingnotes'
//     },
// ];

// export default function Dashboard() {
//     return (
//         <div className="min-h-screen px-6 py-10 bg-[#f9f9f9] text-gray-800">
//             <h1 className="text-3xl font-semibold mb-4">Chào mừng bạn quay lại 🌟</h1>
//             <p className="text-gray-600 mb-8">Hôm nay bạn cảm thấy thế nào?</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {modules.map((mod, idx) => (
//                     <ModuleCard key={idx} {...mod} />
//                 ))}
//             </div>
//         </div>
//     );
// }
