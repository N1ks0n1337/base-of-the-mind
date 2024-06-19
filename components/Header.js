// components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <div className="flex items-center">
                <img src="img/logo.svg" alt="Logo" className="h-8" />
            </div>
            <div className="relative" ref={menuRef}>
                {user ? (
                    <div className="flex items-center cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                        <span className="ml-2">{user.name}</span>
                        <span className="ml-1">&#9660;</span>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link href="/auth/login" className="mr-4">
                            Войти
                        </Link>
                        <Link href="/auth/register">
                            Зарегистрироваться
                        </Link>
                    </div>
                )}
                {menuOpen && user && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                            Профиль
                        </Link>
                        <Link href="/favorites" className="block px-4 py-2 hover:bg-gray-100">
                            Избранное
                        </Link>
                        <Link href="/my-files" className="block px-4 py-2 hover:bg-gray-100">
                            Мои файлы
                        </Link>
                        <button onClick={logout} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                            Выйти
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
