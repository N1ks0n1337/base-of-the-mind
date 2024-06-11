// pages/index.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Content from '../components/Content';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        year: [],
        keywords: [],
        direction: [],
    });

    const handleSearch = (query) => {
        // Логика поиска и установки постов
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        // Логика фильтрации постов
    };

    return (
        <div>
            <Header />
            <main className="flex">
                <Filters applyFilters={handleApplyFilters} />
                <div className="flex-1">
                    <SearchBar onSearch={handleSearch} />
                    <Content posts={posts} />
                </div>
                <div className="w-1/4 p-4">
                    <p>Загрузите свой файл, после модерации он будет добавлен на платформу</p>
                    <div className="border-dashed border-2 border-gray-300 p-4">
                        <p>txt, csv, pdf, word, xlsx</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
