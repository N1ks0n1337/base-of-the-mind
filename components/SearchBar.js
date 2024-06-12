// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="p-4">
            <div className='flex'>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Введите поисковый запрос"
                    className="mt-2 px-4 py-2 border rounded w-full"
                />
                <button onClick={handleSearch} className="mt-2 px-4 py-2 bg-orangeCustom text-white rounded">Искать</button>
            </div>
            <div className='flex my-2'>
                <label className='text-12px text-greyCustom'>Сортировать: </label>
                <a className='text-12px text-blueCustom'>А-Я</a>
            </div>
        </div>
    );
};

export default SearchBar;
