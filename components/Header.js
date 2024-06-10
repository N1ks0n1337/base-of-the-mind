import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <nav>
                <Link href="/">Главная</Link>
                <Link href="/auth/login">Вход</Link>
                <Link href="/auth/register">Регистрация</Link>
            </nav>
        </header>
    );
};

export default Header;