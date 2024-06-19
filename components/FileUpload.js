// components/FileUpload.js
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import fileImg from '../public/img/filesImg.svg';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      const { summary, tags, title } = res.data;

      setSummary(summary);
      setTags(tags);
      setTitle(title);
      setLoading(false);
    } catch (error) {
      console.error('Error during file upload:', error);
      setMessage('Ошибка при загрузке файла');
      setLoading(false);
    }
  };

  const handleSubmitForModeration = async () => {
    try {
      const res = await axios.post('/api/moderation', {
        summary,
        tags,
        title,
      });
      setMessage('Файл отправлен на модерацию');
      setShowModal(false);
    } catch (error) {
      console.error('Error during moderation submission:', error);
      setMessage('Ошибка при отправке на модерацию');
    }
  };

  return (
    <div className="flex flex-col my-6 border border-2 border-orangeCustom p-4 md:w-60 md:h-60 justify-around items-center rounded-lg">
      <p className='text-wrap text-14px'>Загрузите свой файл, после модерации он будет добавлен на платформу</p>
      <Image src={fileImg} alt="Upload file" />
      <p className='text-14px'>txt, csv, pdf, word, xlsx</p>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Загрузить</button>
      </form>
      {message && <p>{message}</p>}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            {loading ? (
              <div className="loading-spinner">Загрузка...</div>
            ) : (
              <>
                <h2 className="text-2xl mb-4">Редактирование информации о файле</h2>
                <label className="block mb-2">Название</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="border p-2 mb-4 w-full"
                />
                <label className="block mb-2">Саммари</label>
                <textarea 
                  value={summary} 
                  onChange={(e) => setSummary(e.target.value)} 
                  className="border p-2 mb-4 w-full"
                />
                <label className="block mb-2">Теги</label>
                <input 
                  type="text" 
                  value={tags.join(', ')} 
                  onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))} 
                  className="border p-2 mb-4 w-full"
                />
                <button 
                  onClick={handleSubmitForModeration} 
                  className="bg-orangeCustom text-white py-2 px-4 rounded"
                >
                  Отправить на модерацию
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
