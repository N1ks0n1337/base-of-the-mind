import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mt-8">Добро пожаловать в Base of the Mind</h1>
                <p className="text-center mt-4">База знаний мирового опыта создания Умных городов.</p>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Навигация</h2>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link href="/auth/login" className="text-blue-500 hover:underline">Вход</Link>
                        </li>
                        <li>
                            <Link href="/auth/register" className="text-blue-500 hover:underline">Регистрация</Link>
                        </li>
                        <li>
                            <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">Забыли пароль?</Link>
                        </li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
