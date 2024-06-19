// pages/auth/login.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <main className="flex w-screen">
        <div className="xl:w-2/3 h-screen bg-orangeCustom self-center">
          <div className="flex flex-col items-center justify-center min-h-screen space-x-10 font-montserrat">
            <img src="/img/kub.svg" alt="Kub Image" />
            <p className="text-xl text-white text-center">База знаний мирового опыта создания Умных городов.</p>
          </div>
        </div>
        <div className="xl:w-1/3 h-screen self-center">
          <div className="flex flex-col items-center justify-center min-h-screen space-x-10">
            <div className="my-10 text-xl font-montserrat font-medium text-4xl">
              <h1>Вход</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 text-sm text-14px">
                <div className="flex flex-col h-37">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Введите почту"
                    className="xl:w-96 border border-gray-300 rounded-lg h-10 p-4"
                  />
                </div>
                <div className="flex flex-col h-37">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Введите пароль"
                    className="xl:w-96 border border-gray-300 rounded-lg h-10 p-4"
                  />
                </div>
              </div>
              <div className="text-blueCustom text-12px my-2">
                <Link href="/auth/forgot-password">Забыли пароль?</Link>
              </div>
              <div className="flex items-center gap-5 my-5 text-14px">
                <p>
                  <Link className="text-greyCustom" href="/auth/register">Зарегистрироваться</Link>
                </p>
                <button type="submit" className="xl:w-52 bg-orangeCustom rounded-lg h-10 text-white">Войти</button>
              </div>
            </form>
            <div>{message && <p>{message}</p>}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
