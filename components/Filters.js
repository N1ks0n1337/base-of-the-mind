// components/Filters.js
import React, { useState } from 'react';

const Filters = ({ applyFilters }) => {
    const [year, setYear] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [direction, setDirection] = useState([]);

    const handleApply = () => {
        applyFilters({ year, keywords, direction });
    };

    return (
        <div className="w-1/4 p-4">
            <h2 className="text-lg font-semibold">Фильтры:</h2>
            {/* Add filter fields here */}
            <button onClick={handleApply} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Применить</button>
        </div>
    );
};

export default Filters;
