import React, { useState } from 'react';
import Logo from '../assets/logo-emo.png';
import LogoGG from '../assets/gg.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL



    const handleEmailLogin = async () => {
        try {
            await axios.post(`${apiUrl}/auth/email/request`, { email });
            navigate('/verify', { state: { email } });
        } catch (error) {
            console.error("Lỗi gửi email:", error);
            alert("Không thể gửi mã xác thực. Vui lòng thử lại.");
        }
    };


    const loginWithGoogle = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const googleAccessToken = tokenResponse.access_token;
                // console.log(googleAccessToken);
                // console.log(tokenResponse);

                // Gửi token về backend
                const res = await axios.post(`${apiUrl}/auth/google`, {
                    token: googleAccessToken
                });

                // Lưu token và điều hướng
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            } catch (error) {
                console.error('Lỗi đăng nhập Google:', error);
                alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
            }
        },
        onError: error => {
            console.error('Lỗi khi mở popup Google:', error);
            alert('Không thể kết nối Google.');
        }
    });

    return (
        <>
            <div className='mx-auto flex flex-col items-center justify-center h-screen transition'>
                <div className='my-2'>
                    <img src={Logo} alt="Logo" />
                </div>
                <h1 className='text-2xl font-bold text-black my-3'>Welcome back</h1>
                <button
                    className="w-96 my-4 flex items-center justify-center gap-2 border border-zinc-200 rounded-full px-16 py-4 text-2sm font-medium text-black bg-white hover:border-zinc-400 transition-all duration-300"
                    onClick={loginWithGoogle}
                >
                    <img src={LogoGG} alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>
                <p className='text-sm text-gray-600 my-2'>or</p>
                <input
                    type="text"
                    placeholder="Enter your email ... "
                    className="w-96 px-8 py-4 my-4 border border-zinc-300 rounded-lg placeholder-gray-400 focus:outline-none  focus:border-zinc-400 transition-all duration-300"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <button className='w-96 py-4 my-4 bg-black text-white rounded-full font-bold hover:bg-stone-800' onClick={handleEmailLogin}>
                    Continue
                </button>
                <p className='text-sm text-gray-600 my-2'>By continuing, you agree to our Terms and Privacy Policy.</p>
            </div>
        </>
    );
};

export default Login;
