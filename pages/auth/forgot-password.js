import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
            <Header />
            <main>
                <h1>Восстановление пароля</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Введите почту</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Отправить</button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
