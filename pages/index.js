// pages/index.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Content from '../components/Content';
import SearchBar from '../components/SearchBar';
import FileUpload from '../components/FileUpload';

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
            <main className="py-10 w-screen flex justify-center">
                <div className='xl:w-5/6 flex justify-center gap-10'>
                    <Filters applyFilters={handleApplyFilters} />
                    <div className="flex-1">
                        <SearchBar onSearch={handleSearch} />
                        <Content posts={posts} />
                    </div>
                    <FileUpload />
                </div>
            </main>
        </div>
    );
};

export default Home;
