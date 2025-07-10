// src/pages/Dashboard.jsx

import React from 'react';
import ModuleCard from '@/components/ModuleCard';

const modules = [
    {
        icon: '💬',
        title: 'SelfTalk',
        description: 'Trò chuyện với chính mình, tích cực hóa suy nghĩ.',
        route: '/selftalk'
    },
    {
        icon: '🌱',
        title: 'MindBloom',
        description: 'Gieo cảm xúc tích cực, nuôi dưỡng vườn nội tâm.',
        route: '/mindbloom'
    },
    {
        icon: '🔒',
        title: 'WorryVault',
        description: 'Cất giữ nỗi lo và xem lại khi sẵn sàng.',
        route: '/worryvault'
    },
    {
        icon: '🔥',
        title: 'HealingNotes',
        description: 'Viết và buông bỏ những điều nặng lòng.',
        route: '/healingnotes'
    },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen px-6 py-10 bg-[#f9f9f9] text-gray-800">
            <h1 className="text-3xl font-semibold mb-4">Chào mừng bạn quay lại 🌟</h1>
            <p className="text-gray-600 mb-8">Hôm nay bạn cảm thấy thế nào?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((mod, idx) => (
                    <ModuleCard key={idx} {...mod} />
                ))}
            </div>
        </div>
    );
}
