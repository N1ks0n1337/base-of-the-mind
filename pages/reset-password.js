import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else {
            setConfirmPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Пароли не совпадают');
            return;
        }

        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, password })
        });

        const data = await res.json();
        if (res.ok) {
            setMessage('Пароль успешно сброшен');
        } else {
            setMessage(data.error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <h1>Сброс пароля</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password">Новый пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Сбросить пароль</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </main>
            <Footer />
        </div>
    );
};

export default ResetPassword;
