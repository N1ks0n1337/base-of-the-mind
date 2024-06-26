//pages/auth/register.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { register } = useAuth();
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
      await register(formData.name, formData.email, formData.password);
      setMessage('Registration successful. Please log in.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <main className='flex w-screen'>
        <div className='xl:w-2/3 h-screen bg-orangeDarckCustom self-center'>
          <div className='flex flex-col items-center justify-center min-h-screen space-x-10 font-montserrat'>
            <img src="/img/registrationKub.svg" alt="Kub Image" />
            <p className='text-xl text-white text-center'>База знаний мирового опыта создания Умных городов.</p>
          </div>
        </div>
        <div className='xl:w-1/3 h-screen self-center'>
          <div className='flex flex-col items-center justify-center min-h-screen space-x-10'>
            <div className='my-10 text-xl  font-montserrat font-medium text-4xl'>
              <h1>Регистрация</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className=' flex flex-col gap-4 text-sm'>
                <div className='flex  flex-col h-37'>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder='Введите имя'
                    className='xl:w-96 border border-gray-300 rounded-lg h-10 p-4'
                  />
                </div>
                <div className='flex  flex-col h-37'>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='Введите почту'
                    className='xl:w-96 h-37 border border-gray-300 rounded-lg h-10 p-4'
                  />
                </div>
                <div className='flex  flex-col'>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder='Введите пароль'
                    className='xl:w-96 border border-gray-300 rounded-lg h-10 p-4'
                  />
                </div>
              </div>
              <div className='flex items-center gap-11 my-5 text-white'>
                <p>
                  <Link className='text-greyCustom' href="/auth/login">Войти</Link>
                </p>
                <button type="submit" className='xl:w-72 bg-orangeCustom rounded-lg h-10'>Зарегистрироваться</button>
              </div>
            </form>
            <div>{message && <p>{message}</p>}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;