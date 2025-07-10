import React, { useRef, useState } from 'react';
import Logo from '../assets/logo-emo.png'

const VerifyCode = ({ email = 'a***@g****.com' }) => {
    const inputsRef = useRef([]);
    const [code, setCode] = useState(Array(6).fill(''));

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Focus next input
            if (index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        } else if (value === '') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        alert('Code resent!');
        // TODO: Gọi API gửi lại mã
    };

    return (
        <>
            <div className="mx-auto  my-auto flex flex-col items-center justify-center h-screen ">
                <div className='my-2'>
                    <img src={Logo} alt="Logo" />
                </div>
                <p className="text-center text-gray-700 mb-2 font-medium">
                    We’ve sent you a passcode.
                </p>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Please check your inbox at <b>{email}</b>.
                </p>

                <div className="flex gap-2 mb-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            ref={(el) => (inputsRef.current[index] = el)}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-16 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    ))}
                </div>

                <button
                    onClick={handleResend}
                    className="text-sm text-indigo-500 hover:underline transition-all duration-1000"
                >
                    Resend code
                </button>
            </div>
        </>

    );
};

export default VerifyCode;
