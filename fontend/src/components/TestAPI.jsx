import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestAPI() {
    const [message, setMessage] = useState('Đang gọi API...');

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log("Gọi tới:", `${apiUrl}/ping`);

        axios.get(`${apiUrl}/ping`)
            .then(res => {
                console.log("Kết quả trả về từ API:", res.data);
                setMessage(res.data.message || 'Không có dữ liệu message từ API');
            })
            .catch(err => {
                console.error('Lỗi gọi API:', err);
                setMessage('Lỗi gọi API');
            });
    }, []);


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Kết quả API:</h2>
            <p>{message}</p>
        </div>
    );
}

export default TestAPI;
