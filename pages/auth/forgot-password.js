// pages/auth/forgot-password.js

import React, { useState } from 'react';
import Link from 'next/link';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <main className='flex w-screen'>
                <div className='xl:w-2/3 h-screen bg-orangeDarckCustom self-center'>
                    <div className='flex flex-col items-center justify-center min-h-screen space-x-10 font-montserrat'>
                        <img src="/img/kub.svg" alt="Kub Image" />
                        <p className='text-xl text-white text-center'>База знаний мирового опыта создания Умных городов.</p>
                    </div>
                </div>

                <div className='xl:w-1/3 h-screen self-center'>
                    <div className='flex flex-col items-center justify-center min-h-screen space-x-10'>
                        <div className='my-10 text-xl  font-montserrat font-medium text-4xl'>
                            <h1>Восстановление пароля</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className=' flex flex-col gap-4 text-sm'>
                                <div className='flex  flex-col h-37'>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        placeholder='Введите почту'
                                        className='xl:w-96 border border-gray-300 rounded-lg h-10 p-4'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-11 my-5 text-white'>
                                <p>
                                    <Link className='text-greyCustom' href="/auth/login">Назад</Link>
                                </p>
                                <button type="submit"  className='xl:w-72 bg-orangeCustom rounded-lg h-10'>Сбросить пароль</button>
                            </div>
                        </form>
                    </div>
                </div>
                
               
            </main>
        </div>
    );
};

export default ForgotPassword;