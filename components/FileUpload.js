// components/FileUpload.js
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import fileImg from '../public/img/filesImg.svg';
import EditBtn from '../public/img/editBtn.svg';
import RemoveBtn from '../public/img/removeBtn.svg';
import CloseBtn from '../public/img/closeBtn.svg';
import AddBtn from '../public/img/addBtn.svg';
import DocumentImg from '../public/img/documentImg.svg';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', localStorage.getItem('userId')); // Предположим, что userId хранится в localStorage

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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDocumentUpload = async () => {
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
              <div className='flex flex-col items-center text-montserrat'>
                <div className='flex justify-between w-full'>
                  <div className='w-full flex justify-center'>
                    <h2 className="text-2xl mb-4 text-18px text-medium">Создание статьи</h2>
                  </div>
                  <button onClick={handleCloseModal}>
                    <Image src={CloseBtn} alt="Close" />
                  </button>
                </div>

                <div className='w-full'>
                  <label className="block mb-2 text-12px">Название</label>
                  <div className='flex justify-center items-start'>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      className="border p-2 mb-4 w-full text-14px border-blueDarkCustom rounded-xl"
                      placeholder='Эффективная модель городского развития из Бразилии'
                    /> 
                    <button>
                      <Image src={EditBtn} alt="Edit" />
                    </button>
                    <button>
                      <Image src={RemoveBtn} alt="Remove" />
                    </button>
                  </div>
                </div>

                <div className='w-full'>
                  <label className="block mb-2 text-12px">Сводка</label>
                  <div className='flex justify-center items-start'>
                    <textarea 
                      type="text"
                      value={summary} 
                      onChange={(e) => setSummary(e.target.value)} 
                      className="border p-2 mb-4 w-full text-14px border-blueDarkCustom rounded-xl"
                      placeholder='Город научившийся решать широкий спектр проблем: от транспортных и экономических — до социальных и экологических'
                    />
                    <button>
                        <Image src={EditBtn} alt="Edit" />
                    </button>
                    <button>
                      <Image src={RemoveBtn} alt="Remove" />
                    </button>
                  </div>
                </div>

                <div className='w-full'>
                  <label className="block mb-2 text-12px">Теги</label>
                  <div className='flex justify-between'>
                    <Image src={AddBtn} />
                    <Image src={RemoveBtn} />
                  </div>
                </div>

                <div className='w-full my-5'>
                  <div className='flex items-center gap-5'>
                    <Image src={DocumentImg} alt="Document" />
                    <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                    <label htmlFor="fileInput" className='flex items-center cursor-pointer'>
                      <Image src={AddBtn} alt="Document" />
                      <span className="ml-2">Загрузить файл</span>
                    </label>
                  </div>
                  {fileName && (
                    <div className='mt-2'>
                      <span className='text-14px'>{fileName}</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSubmitForModeration} 
                  className="bg-orangeCustom text-white py-2 px-4 rounded"
                >
                  Отправить на модерацию
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;