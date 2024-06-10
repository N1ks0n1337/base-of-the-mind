import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
            setMessage('Вход выполнен успешно');
        } else {
            setMessage(data.error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <h1>Вход</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Введите почту</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Введите пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Link href="/auth/forgot-password">Забыли пароль?</Link>
                    </div>
                    <div>
                        <button type="submit">Войти</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
                <p>
                    <Link href="/auth/register">Зарегистрироваться</Link>
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
