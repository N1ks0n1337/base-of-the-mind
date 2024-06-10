import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Добро пожаловать в Base of the Mind</h1>
                <p>База знаний мирового опыта создания Умных городов.</p>
                <div>
                    <h2>Навигация</h2>
                    <ul>
                        <li>
                            <Link href="/auth/login">Вход</Link>
                        </li>
                        <li>
                            <Link href="/auth/register">Регистрация</Link>
                        </li>
                        <li>
                            <Link href="/auth/forgot-password">Забыли пароль?</Link>
                        </li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;