// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите поисковый запрос"
                className="px-4 py-2 border rounded w-full"
            />
            <button onClick={handleSearch} className="mt-2 px-4 py-2 bg-orange-500 text-white rounded">Искать</button>
        </div>
    );
};

export default SearchBar;
