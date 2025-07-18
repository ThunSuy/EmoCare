import React from 'react'
import Header from '../components/Header'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const MindBloom = () => {
    return (
        <div className="flex h-screen">
            <aside className="">
                <Header />
            </aside>
            <div>
                <h2 className="text-2xl font-semibold mb-2">
                    👋 Chào bạn, hôm nay bạn cảm thấy thế nào?
                </h2>
                <p className="text-gray-600 mb-4">
                    Hãy ghi lại một điều khiến bạn biết ơn, vui vẻ hoặc nhẹ lòng nhé.
                </p>

                <div className="flex gap-2">
                    <input type="text" placeholder="Ví dụ: Hôm nay mình dậy sớm và pha một ly trà 🍵"
                        className="flex-1 px-4 py-2 border rounded-xl shadow-sm" />
                    <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
                        🌱 Gieo hoa
                    </button>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">🌸 Vườn cảm xúc của bạn</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <DotLottieReact
                        src="https://lottie.host/6de187a7-c709-459d-84e5-84509a2362f5/ORg5x1ZIBK.lottie"
                        loop
                        autoplay
                    />
                    {/* {flowers.map(flower => (
                        <div key={flower.id} className="relative group">
                            <img src={`/flowers/${flower.type}.png`} className="w-20 h-20 mx-auto" />
                            <div className="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 p-2 text-sm rounded-xl transition">
                                {flower.message}
                            </div>
                        </div>
                    ))} */}
                </div>



            </div>

        </div>)
}

export default MindBloom






