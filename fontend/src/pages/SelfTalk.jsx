import React, { useEffect, useRef, useState } from 'react';
import BotAvatar from '@/assets/bot.png'; // ảnh avatar
import Header from '../components/Header';

const SelfTalk = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Xin chào, bạn đang cảm thấy thế nào hôm nay?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const endOfMessagesRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/self-talks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ message: input })
            });

            const data = await res.json();

            // ✅ Xử lý mảng nhiều phản hồi
            const botMessages = Array.isArray(data.data)
                ? data.data.map(item => ({ sender: 'bot', text: item.response }))
                : [{ sender: 'bot', text: data.data?.response || 'Cảm ơn vì đã chia sẻ.' }];

            // Gửi từng đoạn với delay
            for (const msg of botMessages) {
                await new Promise(r => setTimeout(r, 2000)); // ⏱ delay giữa các đoạn
                setMessages(prev => [...prev, msg]);
            }
        } catch (err) {
            console.error('Lỗi khi gửi yêu cầu:', err);
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: 'Xin lỗi, có lỗi xảy ra khi kết nối đến máy chủ.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/self-talks`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();

                if (Array.isArray(data.data)) {
                    const loadedMessages = data.data.flatMap(item => ([
                        { sender: 'user', text: item.message },
                        { sender: 'bot', text: item.response } // vẫn là 1 khối dài
                    ]
                    ));
                    setMessages(loadedMessages);
                }
            } catch (err) {
                console.error('Không thể tải tin nhắn:', err);
            }
        };

        fetchMessages();
    }, []);


    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex h-screen">
            <aside className="">
                <Header />
            </aside>

            <div className="w-full h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                <div className="bg-purple-600 text-white p-4 flex items-center gap-3">
                    <img src={BotAvatar} alt="Bot" className="w-10 h-10 rounded-full bg-white" />
                    <h2 className="text-xl font-semibold">SelfTalk - Bạn Tích Cực</h2>
                </div>

                <div className="flex-1 px-4 pt-4 pb-2 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
                    {messages.flatMap((msg, idx) => {
                        if (msg.sender === 'bot') {
                            const chunks = msg.text.split(/\n{2,}/); // tách đoạn

                            return chunks.map((chunk, i) => {
                                const showAvatar = i === 0 && (idx === 0 || messages[idx - 1]?.sender !== 'bot');

                                return (
                                    <div key={`${idx}-${i}`} className="flex justify-start items-start">
                                        {showAvatar ? (
                                            <img src={BotAvatar} className="w-8 h-8 rounded-full mr-2 mt-1" alt="bot" />
                                        ) : (
                                            <div className="w-8 mr-2" />
                                        )}
                                        <div className="px-4 py-2 rounded-lg max-w-2xl bg-gray-200 text-gray-800">
                                            {chunk}
                                        </div>
                                    </div>
                                );
                            });
                        }

                        return (
                            <div key={idx} className="flex justify-end items-end">
                                <div className="px-4 py-2 rounded-lg max-w-2xl bg-blue-500 text-white">
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}


                    <div ref={endOfMessagesRef} />
                </div>

                {isTyping && (
                    <div className="typing text-gray-500 text-sm px-4 py-2">
                        📝 Đang soạn tin nhắn<span className="animate-pulse">...</span>
                    </div>
                )}

                <div className="p-6 pb-10 border-t flex gap-4 bg-white">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg ml-4 px-6 py-3 focus:outline-none focus:ring focus:border-purple-400"
                        placeholder="Nhập tin nhắn..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        className="bg-purple-600 text-white px-8 py-3 mr-4 rounded-lg hover:bg-purple-700"
                        onClick={handleSend}
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelfTalk;
