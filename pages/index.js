// pages/index.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Content from '../components/Content';
import SearchBar from '../components/SearchBar';
import FileUpload from '../components/FileUpload';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
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

    const toggleFilters = () => {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <div>
            <Header />
            <main className="py-10 w-screen flex flex-col md:flex-row xl:flex-row justify-center">
                <div className='w-full xl:w-5/6 flex flex-col md:flex-row justify-center gap-4 md:gap-10'>
                    <div className="flex justify-end md:hidden mb-4">
                        <button onClick={toggleFilters} className="px-4 py-2 bg-blueCustom text-white rounded-lg">
                            {isFiltersVisible ? 'Скрыть фильтры' : 'Показать фильтры'}
                        </button>
                    </div>
                    <div className={`w-full md:w-1/4 xl:w-1/5 ${isFiltersVisible ? 'block' : 'hidden'} md:static md:block`}>
                        <Filters applyFilters={handleApplyFilters} />
                    </div >
                    <div className="flex-1">
                        <SearchBar onSearch={handleSearch} className="order-1 xl:order-none" />
                        <Content posts={posts} />
                    </div>
                    <FileUpload />
                </div>
            </main>
        </div>
    );
};

export default Home;
